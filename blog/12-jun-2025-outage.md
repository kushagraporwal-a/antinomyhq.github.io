---
slug: gcp-cloudflare-anthropic-outage
title: "When Google Sneezes, the Whole World Catches a Cold"
authors: [forge]
tags: ["Cloud", "SRE", "Incident Analysis", "DevOps"]
date: 2025-06-12
description: "Deep dive into the IAM failure that took down Google Cloud, cascaded into Cloudflare and Anthropic, and rippled across dozens of internet services."
hide_table_of_contents: false
image: /images/blog/outage-cover.jpeg
---

> **TL;DR** Google Cloud's global IAM service glitched at 10:50 AM PT, causing authentication failures across dozens of GCP products. Cloudflare's Workers KV which depends on a Google hosted backing store followed suit, knocking out Access, WARP and other Zero Trust features. Anthropic, which runs on GCP, lost file uploads and saw elevated error rates. Two stressful hours later, mitigations rolled out and services recovered. Let’s unpack the chain reaction.

<!-- truncate -->

## 1. Timeline at a Glance

| Time (PT) | Signal            | What We Saw                                              |
| --------- | ----------------- | -------------------------------------------------------- |
| **10:50** | Internal alerts   | GCP SRE receives spikes in 5xx from IAM endpoints        |
| **11:05** | DownDetector      | User reports for Gmail, Drive, Meet skyrocket            |
| **11:19** | Cloudflare status | “Investigating widespread Access failures”               |
| **11:25** | Anthropic status  | Image and file uploads disabled to cut error volume      |
| **12:12** | Cloudflare update | Root cause isolated to third‑party KV dependency         |
| **12:41** | Google update     | Mitigation rolled out to IAM fleet, most regions healthy |
| **13:30** | Cloudflare green  | Access, KV and WARP back online worldwide                |
| **14:05** | Anthropic green   | Full recovery, Claude stable                             |

<details>
<summary>Click to expand raw status snippets</summary>

```text
11:19 PT  Cloudflare: "We are investigating an issue causing Access authentication to fail. Cloudflare Workers KV is experiencing elevated errors."
11:47 PT  Google Cloud: "Multiple products are experiencing impact due to an IAM service issue. Our engineers have identified the root cause and mitigation is in progress."
12:12 PT  Cloudflare: "Workers KV dependency outage confirmed. All hands working with third‑party vendor to restore service."
```

</details>

## 2. What Broke Inside Google Cloud

GCP’s **Identity and Access Management (IAM)** is the front door every API call must pass. When the fleet that issues and validates OAuth and service account tokens misbehaves, the blast radius reaches storage, compute, control planes essentially everything.

> ![Screenshot of GCP status dashboard at 11:30 AM PT showing red for IAM, Cloud Storage, Bigtable](/images/blog/google-creative.png)
>
> _Figure 1: GCP status page during the first hour_

### 2.1 Suspected Trigger

- Google’s incident ticket calls it an **“IAM back‑end rollout issue”** language SREs often use for a buggy config or binary push that propagated globally before automated canaries stopped it.
- Engineers inside Google reportedly rolled back the binary and purged bad configs, then forced token cache refresh across regions. us‑central1 lagged behind because it hosts quorum shards for IAM metadata.

### 2.2 Customer Impact Checklist

- Cloud Storage: 403 and 500 errors on signed URL fetches
- Cloud SQL and Bigtable: auth failures on connection open
- Workspace: Gmail, Calendar, Meet intermittently 503
- Vertex AI, Dialogflow, Apigee: elevated latency then traffic drops

## 3. Cloudflare’s Dependency Chain Reaction

Cloudflare’s **Workers KV** stores billions of key‑value entries and replicates them across 270+ edge locations. The hot path is in Cloudflare’s own data centers, but the **persistent back‑end** is a multi‑region database hosted on Google Cloud. When IAM refused new tokens, Writes and eventually Reads to the backing store timed out.

![Cloudflare status excerpt highlighting Access, KV and WARP as degraded](/images/blog/cloudflare-creative.png)

> _Figure 2: Cloudflare status excerpt highlighting Access, KV and WARP as degraded_

### 3.1 Domino Effects

- **Cloudflare Access** uses KV to store session state -> login loops
- **WARP** stores Zero Trust device posture in KV -> client could not handshake
- **Durable Objects (SQLite)** relied on KV for metadata -> subset of DOs failed
- **AI Gateway and Workers AI** experienced cold‑start errors due to missing model manifests in KV

Cloudflare’s incident commander declared a _Code Orange_ their highest severity and spun up a cross‑vendor bridge with Google engineers. Once IAM mitigation took hold, KV reconnected and the edge quickly self‑healed.

## 4. Anthropic Caught in the Crossfire

Anthropic hosts Claude on GCP. The immediate failure mode was **file upload** (hits Cloud Storage) and **image vision** features, while raw text prompts sometimes succeeded due to cached tokens.

```text
[12:07 PT] status.anthropic.com: "We have disabled uploads to reduce error volume while the upstream GCP incident is in progress. Text queries remain available though elevated error rates persist."
```

Anthropic throttled traffic to keep the service partially usable, then restored uploads after Google’s IAM fleet was stable.

## 5. Lessons for Engineers

1. **Control plane failures hurt more than data plane faults.** Data replication across zones cannot save you if auth is down.
2. **Check hidden dependencies.** Cloudflare is multi‑cloud at the edge, yet a single‑vendor choice deep in the stack still cascaded.
3. **Status pages must be fast and honest.** Google took nearly an hour to flip the incident flag. Customers were debugging ghosts meanwhile.
4. **Design an emergency bypass.** If your auth proxy (Cloudflare Access) fails, can you temporarily route around it?
5. **Chaos drills still matter.** Rare multi‑provider events happen and the playbooks must be rehearsed.

## 6. Still Waiting for the Full RCAs

- Google will publish a postmortem once internal review wraps expect details on the faulty rollout, scope of blast radius and planned guardrails.
- Cloudflare traditionally ships a forensic blog within a week. Watch for specifics on Workers KV architecture and new redundancy layers.

![GIF of refreshing Cloudflare status page ](/images/blog/refresh-meme.png)

> _Figure 3: What every SRE did for two hours straight_

## 7. Wrap Up

At 10:50 AM a bug in a single Google Cloud service took down authentication worldwide. Within half an hour that failure reached Cloudflare and Anthropic. By 1:30 PM everything was green again, but not before reminding the internet just how tangled our dependencies are.

Keep an eye out for the official RCAs. Meanwhile, update your incident playbooks, test your failovers and remember that sometimes the cloud’s biggest danger is a bad config on a Tuesday.
