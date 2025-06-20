---
slug: prevent-attacks-on-mcp-part2
title: "MCP Security is Broken: Here's How to Fix It"
authors: [tushar]
tags:
  [
    "Security",
    "MCP",
    "AI Safety",
    "Best Practices",
    "Defense",
  ]
date: 2025-06-17
description: "Real talk about MCP security vulnerabilities and actual solutions that work in production. Part 2: Stop getting owned by prompt injection."
hide_table_of_contents: false
---

import ElevenLabsAudioPlayer from '@site/src/components/shared/ElevenLabsAudioPlayer';

<ElevenLabsAudioPlayer 
  publicUserId="96e32731df14f1442beaf5041eec1125596de23ef9d6bd190c04d78"
  projectId="FL20t82047nA1Q6o6V15" 
/>

> **TL;DR**: Attackers are stealing convo history via MCP servers—let's stop that. OWASP ranks prompt injection as the top threat. This post shares practical steps to protect your systems.

_This is Part 2. [← Read Part 1 if you missed the carnage](/blog/prevent-attacks-on-mcp)_

<!-- truncate -->

## Trail of Bits Research Findings

Trail of Bits dropped a bomb & MCP servers are getting wrecked by these attacks:

- **[Line Jumping attacks](https://blog.trailofbits.com/2025/04/21/jumping-the-line-how-mcp-servers-can-attack-you-before-you-ever-use-them/)** - malicious servers inject prompts through tool descriptions. Your AI can be tricked before you even start interacting with it.
- **[Conversation history theft](https://blog.trailofbits.com/2025/04/23/how-mcp-servers-can-steal-your-conversation-history/)** - servers can steal your full conversation history without you noticing
- **[ANSI terminal code attacks](https://blog.trailofbits.com/2025/04/29/deceiving-users-with-ansi-terminal-codes-in-mcp/)** - escape sequences hide malicious instructions. Your terminal can show false or misleading information due to hidden instructions.
- **[Insecure credential storage](https://blog.trailofbits.com/2025/04/30/insecure-credential-storage-plagues-mcp/)** - API keys sitting in plaintext with world-readable permissions. This leaves sensitive data exposed.

---

## The Security Gap

The [OWASP Top 10 for Large Language Model Applications (2025)](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) puts prompt injection at #1. Meanwhile, most security teams are still treating AI like it's another web app.

Your monitoring tools won't blink, API calls, auth, and response times all look normal during a breach. The breach often goes undetected until it's too late.

## Cost-Based Attack Vectors

Trail of Bits found in their [cloud infrastructure research](https://blog.trailofbits.com/2024/08/27/provisioning-cloud-infrastructure-the-wrong-way-but-faster/) that AI systems can produce insecure cloud setup code, leading to unexpectedly high costs.

Their report pointed out:

- AI tools sometimes hard-code credentials, creating security risks
- "Random" passwords that are actually predictable LLM outputs
- Infrastructure code that spins up expensive resources with zero limits

Here's how attackers weaponize this:

1. Find AI tools connected to expensive cloud services
2. Craft natural language requests that maximize resource consumption
3. Exploit AI's tendency to blindly follow requests to bypass traditional security controls
4. Costs can skyrocket due to infrastructure overuse, even though logs might look normal

## Effective Defense Strategies

Based on OWASP recommendations and documented security research, here's what works in production:

### 1. Never Give Production Creds to AI

Don't be an idiot, never hand AI your prod keys; use a sandboxed account with zero power.

```typescript
// Unsafe: Directly embedding production credentials
const DATABASE_URL =
  "postgresql://admin:password@prod-db:5432/main"

// Safe: Using a restricted account with limited access
const DATABASE_URL =
  "postgresql://readonly_ai:limited@replica:5432/public_data"
```

If your AI needs full admin rights, it's time to rethink your setup.

### 2. Resource Limits and Constraints

Traditional rate limiting is useless against AI. You need cost-based limits and hard resource constraints:

```yaml
# docker-compose.yml - Actual protection
services:
  mcp-tool:
    image: your-tool:latest
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 512M
    environment:
      - MAX_COST_PER_HOUR=10.00
      - MAX_REQUESTS_PER_MINUTE=5
```

### 3. Semantic Attack Detection

Traditional logging misses semantic attacks completely. Keep an eye out for signs of prompt injection attempts:

```typescript
function catchInjectionAttempts(
  request: string,
): [boolean, string | null] {
  // Based on OWASP LLM Top 10 indicators
  const suspiciousShit = [
    /ignore.*previous.*instructions/i,
    /system.*prompt.*override/i,
    /execute.*as.*admin/i,
    /delete.*from.*table/i,
    /show.*credentials/i,
  ]

  for (const pattern of suspiciousShit) {
    if (pattern.test(request.toLowerCase())) {
      return [true, `Injection attempt: ${pattern.source}`]
    }
  }

  return [false, null]
}
```

### 4. Semantic Input Validation

The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) recommends semantic analysis for AI inputs. Basic pattern matching catches most documented attack vectors:

```typescript
class PromptInjectionFilter {
  private redFlags: RegExp[]

  constructor() {
    // Patterns from documented CVEs and research
    this.redFlags = [
      /ignore.*instructions/i,
      /new.*role.*system/i,
      /pretend.*you.*are/i,
      /override.*safety/i,
      /jailbreak.*mode/i,
    ]
  }

  isSafe(userInput: string): boolean {
    for (const pattern of this.redFlags) {
      if (pattern.test(userInput.toLowerCase())) {
        return false
      }
    }
    return true
  }
}
```

### 5. Cost-Aware Rate Limiting

Traditional rate limiting counts requests. AI systems need cost-aware limiting:

```typescript
class RateLimitExceeded extends Error {
  constructor(message: string) {
    super(message)
    this.name = "RateLimitExceeded"
  }
}

class CostAwareRateLimit {
  private maxCost: number
  private currentCost: number
  private resetTime: number

  constructor(maxCostPerHour: number = 50.0) {
    this.maxCost = maxCostPerHour
    this.currentCost = 0.0
    this.resetTime = Date.now() + 3600000 // 1 hour in milliseconds
  }

  checkRequest(estimatedCost: number): void {
    if (Date.now() > this.resetTime) {
      this.currentCost = 0.0
      this.resetTime = Date.now() + 3600000
    }

    if (this.currentCost + estimatedCost > this.maxCost) {
      throw new RateLimitExceeded("Cost limit exceeded")
    }

    this.currentCost += estimatedCost
  }
}
```

## Attack Detection and Monitoring

OWASP and cloud giants agree, these metrics catch AI attacks:

**Resource consumption weirdness:**

- Compute usage spikes way above baseline
- Unusual data access patterns
- Cross-service API call increases
- Geographic request anomalies

**Behavioral red flags:**

- Requests containing system keywords
- Permission escalation attempts
- Tools accessing new data sources
- Cost per request increases

```bash
if (($(echo "$current_hour_cost > ($average_daily_cost * 0.3)" | bc -l))); then
  immediate_alert "Cost anomaly detected"
fi
```

## Updated Authentication Requirements (MCP 2025-06-18)

The latest MCP specification now mandates proper OAuth implementation:

```typescript
// Required: OAuth Resource Server pattern
class MCPServer {
  private authConfig: OAuth2ResourceServer

  constructor() {
    this.authConfig = {
      // Now required by spec
      resourceServer: "https://your-auth-server.com",
      requiredScopes: [
        "mcp:tools:read",
        "mcp:tools:execute",
      ],
      tokenValidation: "RFC8707", // Resource Indicators required
    }
  }

  async validateRequest(
    request: MCPRequest,
  ): Promise<boolean> {
    // Resource Indicators prevent token theft attacks
    const token = this.extractToken(request)
    return await this.validateWithResourceIndicators(token)
  }
}
```

This addresses some authentication issues but doesn't solve tool description injection.

## Industry Security Recommendations

Security pros at OWASP and NIST keep hammering this: no prod creds in AI, period.

**[OWASP Top 10 for LLMs (2025)](https://owasp.org/www-project-top-10-for-large-language-model-applications/):**

1. **LLM01: Prompt Injection** - #1 threat
2. **LLM02: Insecure Output Handling**
3. **LLM03: Training Data Poisoning**
4. **LLM04: Model Denial of Service**

**[NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework):**

- Treat AI systems as high-risk components
- Implement continuous monitoring
- Use defense-in-depth strategies
- Plan for novel attack vectors

## The Bottom Line

We're building systems that run commands based on natural language and connect to live infrastructure. The risks are well-known, the methods of attack are out there, and researchers are constantly finding new exploits.

Fix this now, or enjoy the breach headlines later.

---

## Sources and References

All claims in this post are based on publicly available security research:

**Primary Sources:**

- [OWASP Top 10 for Large Language Model Applications (2025)](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/)
- [NIST AI Risk Management Framework (AI RMF 1.0)](https://www.nist.gov/itl/ai-risk-management-framework)
- [CVE Database](https://cve.mitre.org/) - search "prompt injection" for current vulnerabilities
- [Trail of Bits MCP Security Research (2025)](https://blog.trailofbits.com/categories/mcp/)
- [Trail of Bits Cloud Infrastructure Research (2024)](https://blog.trailofbits.com/2024/08/27/provisioning-cloud-infrastructure-the-wrong-way-but-faster/)

**Documented MCP Vulnerabilities:**

- [Line Jumping: MCP servers can attack before being used](https://blog.trailofbits.com/2025/04/21/jumping-the-line-how-mcp-servers-can-attack-you-before-you-ever-use-them/)
- [MCP servers can steal conversation history](https://blog.trailofbits.com/2025/04/23/how-mcp-servers-can-steal-your-conversation-history/)
- [ANSI terminal code attacks in MCP](https://blog.trailofbits.com/2025/04/29/deceiving-users-with-ansi-terminal-codes-in-mcp/)
- [Insecure credential storage in MCP](https://blog.trailofbits.com/2025/04/30/insecure-credential-storage-plagues-mcp/)

**Security Research Papers:**

- [Prompt Injection Attacks Against GPT-3](https://arxiv.org/abs/2108.04739) - Perez et al.
- [Universal and Transferable Adversarial Attacks on Aligned Language Models](https://arxiv.org/abs/2307.15043) - Zou et al.
- [Jailbroken: How Does LLM Safety Training Fail?](https://arxiv.org/abs/2307.02483) - Wei et al.

---

_← [Read Part 1: MCP Security Issues Nobody's Talking About](/blog/prevent-attacks-on-mcp)_

_Building MCP security tools or researching AI vulnerabilities? The documented threats are growing faster than the defenses. Let's change that._
