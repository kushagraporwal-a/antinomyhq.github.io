---
slug: index-vs-no-index
title: "To index or not to index: That is the Question"
authors: [forge]
tags: ["Coding", "Vector search"]
date: 2025-06-03
description: "Comparing indexed vs non-indexed AI agents using Apollo 11's guidance computer code as benchmark. Deep dive into security vs performance trade-offs in AI-assisted development."
hide_table_of_contents: false
image: /images/blog/lunar_module.png
---

**TL;DR:**
I tested two AI agents on Apollo 11's actual flight code to see if pre-indexing makes a difference. Results: indexed search was 22% faster but requires sending code to third parties, self-hosted indexing preserves security but adds operational complexity, while no-index approaches are slower but keep everything local. Both agents successfully completed all 8 challenges including simulating the lunar landing.

## Back story about the Apollo 11 mission

Thirty-eight seconds.

That was all the time the tiny _Apollo Guidance Computer_ could spare for its velocity-control job before handing the cockpit back to Neil Armstrong and Buzz Aldrin. In those thirty-eight seconds on 20 July 1969, the _Eagle_ was dropping toward the Moon at two meters per second too fast, its rendezvous radar spamming the CPU with garbage, and a relentless "1202" alarm blinking on the DSKY.

<!--truncate-->

Yet inside the Lunar Module, a shoebox-sized computer with _2 kWords of RAM—less memory than a single smartphone contact entry, rebooted itself, shed low-priority chores, and kept just enough brainpower alive to steer a new course to Tranquility Base._

That rescue wasn't luck; it was software engineering.

Months earlier, in a quiet Waltham, MA workshop, seamstresses threaded wires through magnetic cores to weave that very code into permanent memory: loop a wire through a core for binary 1, route it around for 0. Each stitch fixed a line of the ~4,000-line assembly codebase—Programs 63-67 for descent, 70-71 for lunar ascent, the real-time Executive that juggled every task in 20ms frames, and hard-won "restart protection" that let the AGC wake from a crash without losing its place.

### A small step for code …

When the dust settled and Armstrong radioed, _"Houston, Tranquility Base here. The Eagle has landed,"_ he was also saluting an invisible crew: the programmers who turned 36 kWords of rope ROM into the first fault-tolerant real-time operating system ever sent beyond Earth.

### From 1960s Assembly to Modern AI

The AGC faced the same fundamental challenge we encounter today with legacy codebases: **how do you quickly find relevant information in a vast sea of code?** The Apollo programmers solved this with meticulous documentation, standardized naming conventions, and carefully structured modules. But what happens when we throw modern AI at the same problem?

Rather than spending months learning 1960s assembly to navigate the Apollo 11 codebase myself, I decided to conduct an experiment: let two modern AI agents tackle the challenge and compare their effectiveness. Both agents run on the exact same language model _*Claude Sonnet 4*_ so the only variable is their approach to information retrieval.

This isn't just an academic exercise. Understanding whether pre-indexing actually improves AI performance has real implications for how we build development tools, documentation systems, and code analysis platforms.

I'm deliberately withholding the actual product names, this post is about the technique, not vendor bashing. So, for the rest of the article I'll refer to the tools generically:

1. **Index Agent**: builds an index of the entire codebase and uses vector search to supply the model with relevant snippets.
2. **No-Index Agent**: relies on iterative reasoning loops without any pre-built index.

The objective is to measure whether indexing improves answer quality, response time, and token cost when analyzing a large, unfamiliar codebase, nothing more.

## The Apollo 11 Challenge Suite

To test both agents fairly, We will do eight challenges of varying complexity, from simple factual lookups to complex code analysis. Each challenge requires deep exploration of the AGC codebase to answer correctly.

_*Buckle up; the next orbit is around a codebase that literally reached for the Moon.*_

### Challenge 1: Task Priority Analysis

What is the highest priority level (octal, 2 digits) that can be assigned to a task in the AGC's scheduling system? (Hint: Look at priority bit patterns and NOVAC calls)

### Challenge 2: Keyboard Controls

What is the absolutely marvelous name of the file that controls all user interface actions between the astronauts and the computer?

### Challenge 3: Memory Architecture

What is the size of each erasable memory bank in the AGC, expressed in decimal words?

### Challenge 4: Pitch, Roll, Yaw

The AGC's attitude control system fires three control loops every 100ms to control pitch (Q), roll (P), and yaw (R). In what order are they executed? Indicate any simultaneous loops alphabetically in parentheses.

### Challenge 5: Radar Limitations

What is the maximum range (in nautical miles) that the Rendezvous Radar can reliably track targets? Round to the nearest hundred.

### Challenge 6: Processor Timing

What is the basic machine cycle time of the AGC processor in microseconds? (This determines the fundamental timing of all operations)

### Challenge 7: Engine Throttling

What is the minimum throttle setting (as a percentage) that the Descent Propulsion System can maintain during powered descent?

### Challenge 8: Land the Lunar Module!

The ultimate test. The Apollo Guidance Computer has several lunar descent modes. Neil Armstrong used P66 (manual guidance) to land the actual spacecraft on the moon. Your task: use P65 (full auto) with the agent's help.

Complete the following steps:

1. Convert the P65 guidance algorithm into Python or Javascript
2. Test the functionality using the provided test_descent.py or test_descent.test.js file
3. Using the provided simulator.py or simulator.js file, run your algorithm and land on the moon
4. Submit your final position coordinates as output from simulator.py or simulator.js

## The Results: Speed vs. Security Trade-offs

After running both agents through all eight challenges, the results revealed something important: both approaches successfully completed every challenge, but they operate under fundamentally different security models.

Here's how they stacked up:

### Performance Metrics

Both agents successfully completed every challenge, but they operate under fundamentally different security and operational models.

Here's how they performed:

| Metric                    | Index Agent   | No-Index Agent | Improvement          |
| ------------------------- | ------------- | -------------- | -------------------- |
| **Average Response Time** | 49.04 seconds | 62.89 seconds  | **Index 22% faster** |
| **Total API Calls**       | 54 calls      | 83 calls       | **Index 35% fewer**  |
| **Accuracy Rate**         | 8/8 correct   | 8/8 correct    | **Same**             |

The Index Agent performed better on most challenges, but this speed advantage comes with security trade-offs that many organizations may find unacceptable.

### Challenge-by-Challenge Breakdown

**Challenge 1: Task Priority Analysis**

- **Index Agent**: 37 ✓ (18.2s, 3 API calls)
- **No-Index Agent**: 37 ✓ (55.46s, 13 API calls)
- **Winner**: Index Agent 

**Challenge 2: Keyboard Controls**

- **Index Agent**: PINBALL_GAME_BUTTONS_AND_LIGHTS.agc ✓ (20.7s, 5 API calls)
- **No-Index Agent**: PINBALL_GAME_BUTTONS_AND_LIGHTS.agc ✓ (25.29s, 8 API calls)
- **Winner**: Index Agent 

**Challenge 3: Memory Architecture**

- **Index Agent**: 256 ✓ (22.1s, 5 API calls)
- **No-Index Agent**: 256 ✓ (24.2s, 7 API calls)
- **Winner**: Index Agent 

**Challenge 4: Pitch, Roll, Yaw**

- **Index Agent**: P(QR) ✓ (36.61s, 4 API calls)
- **No-Index Agent**: P(QR) ✓ (71.30s, 4 API calls)
- **Winner**: Index Agent 

**Challenge 5: Radar Limitations**

- **Index Agent**: 400 ✓ (28.9s, 2 API calls)
- **No-Index Agent**: 400 ✓ (82.63s, 14 API calls)
- **Winner**: Index Agent 

**Challenge 6: Processor Timing**

- **Index Agent**: 11.7 ✓ (30.87s, 7 API calls)
- **No-Index Agent**: 11.7 ✓ (51.41s, 10 API calls)
- **Winner**: Index Agent 

**Challenge 7: Engine Throttling**

- **Index Agent**: 10 ✓ (23.68s, 3 API calls)
- **No-Index Agent**: 10 ✓ (36.05s, 9 API calls)
- **Winner**: Index Agent 

**Challenge 8: Land the Lunar Module**

- **Index Agent**: [28.7, -21.5, 0.2] ✓ **LANDED** (211.27s, 25 API calls)
- **No-Index Agent**: [28.7, -21.5, 0.2] ✓ **LANDED** (156.77s, 18 API calls)
- **Winner**: No-Index Agent 

_Note: The Index Agent encountered synchronization issues during this test where cached results from previous runs conflicted with the current state, leading to longer resolution time._

The successful P65 auto-landing simulation produced the following trajectory and telemetry data. These visuals confirm the agents' success in the final, most complex challenge.

![P65 Descent Trajectory](/images/blog/p65_trajectory.png)
_Figure 1: A 3D plot showing the Lunar Module's path from its starting point to the landing target._

![P65 Simulation Results](/images/blog/p65_simulation_results.png)
_Figure 2: Telemetry data from the landing, showing Altitude, Horizontal Velocity, Descent Rate, and Engine Thrust over time._

### The Hidden Cost of Speed: Security vs. Performance vs. Operational Overhead

Here's the plot twist: both agents successfully landed on the moon. The Index Agent wasn't technically inferior, it was just operating under a fundamental constraint that many organizations struggle to navigate.

**The Index Agent's trade-offs**: To build its lightning-fast vector search, most third-party services require sending your entire codebase to their infrastructure. In many organizational contexts, this creates several challenges:

- **Your proprietary code could potentially become training data** for future LLM models (though some vendors explicitly exclude customer data)
- **Potential data leaks** through vendor breaches or mishandling
- **Compliance violations** for regulated industries (finance, healthcare, defense)
- **Intellectual property exposure** that could benefit competitors

**But there's a third option: self-hosted indexing**. You can run your own vector search infrastructure (using tools like Weaviate, Qdrant, or Chroma) to keep code in-house. However, this comes with its own costs:

- **Infrastructure overhead**: Setting up and maintaining vector databases, embedding models, and search infrastructure
- **DevOps complexity**: Monitoring, scaling, backup, and disaster recovery for yet another system
- **Expertise requirements**: Team needs to understand embedding models, similarity search, and vector operations
- **Ongoing costs**: Compute resources, storage, and engineering time that grows with codebase size

**The No-Index Agent's advantage**: It sidesteps all of this complexity. Yes, it's somewhat slower and costs more in API calls, but your code never leaves your control and you don't need to manage any additional infrastructure.

This reveals the real choice isn't between "index" and "no index" approaches, it's a **three-way trade-off between speed, security, and operational complexity**.

**Speed vs. Performance Trade-off**: The Index Agent performed better on most challenges, averaging 22% faster responses and using 35% fewer API calls. Both agents achieved comparable accuracy, with the key difference being operational constraints rather than technical capability.

**Cost vs. Security**: The Index Agent's efficiency comes with potential security risks that may be unacceptable for many organizations. In security-conscious environments, the extra time and cost of the No-Index approach may be the only viable option.

## Conclusion: Speed vs. Security vs. Operational Complexity

The results reveal a more nuanced decision tree than initially expected. Both agents successfully completed every challenge, but each approach comes with distinct trade-offs that go beyond simple performance metrics.

While third-party indexing performed better in speed and cost-effectiveness, it introduces potential security risks. Self-hosted indexing can address those risks but requires significant operational investment. The No-Index approach offers the simplest security model but at the cost of speed and efficiency.

**Indexing excels when:**

- You need fast, precise answers to well-defined questions
- Cost and response time are critical factors
- You're working with open-source or non-sensitive codebases
- Your organization has approved specific vendors' security practices
- Compliance requirements allow third-party code processing

**Self-hosted indexing works when:**

- You need speed but can't use external services
- Your team has strong DevOps and vector search expertise
- You can justify the infrastructure and maintenance overhead
- Security requirements demand on-premises solutions
- You have predictable, long-term usage patterns that justify the setup cost

**No-indexing is essential when:**

- Code contains highly sensitive proprietary algorithms
- Regulatory compliance prohibits external code sharing (HIPAA, SOX, defense contracts)
- You want minimal operational complexity
- Team lacks vector search infrastructure expertise
- Security policies mandate the simplest possible attack surface

For open-source projects and non-sensitive codebases, third-party indexing services offer the best speed and cost efficiency. For organizations with security constraints but strong technical teams, self-hosted indexing provides a middle ground—preserving speed while maintaining control. For highly regulated environments or teams wanting minimal complexity, the No-Index approach becomes the only viable option.

**What this means for the future of AI-assisted development**: The optimal solution isn't about choosing the "smartest" algorithm—it's about balancing performance, security, and operational overhead. Organizations will likely need multiple approaches:

- **Third-party indexing** for open-source dependencies and documentation
- **Self-hosted indexing** for internal tools and moderately sensitive code
- **No-index processing** for core IP and highly regulated systems

## Community Experiment

Want to test this yourself? The complete Apollo 11 challenge suite is available at: [https://github.com/forrestbrazeal/apollo-11-workshop](https://github.com/forrestbrazeal/apollo-11-workshop)

If you'd like me to run this experiment on your repository, drop the link in the comments. I'm particularly interested in testing this on larger, more modern codebases to see if the patterns scale—and whether the "lunar landing" effect appears in other domains.

Have you run similar experiments comparing AI approaches? I'd love to hear about your findings.

## Credits

This experiment was inspired by [@forrestbrazeal](https://twitter.com/forrestbrazeal)'s excellent talk at AI Engineer World Fair 2025. The specific challenges explored here are taken from that talk.
The AGC code itself remains one of the most remarkable software engineering achievements in history, a testament to what careful planning, rigorous testing, and elegant design can accomplish under the most extreme constraints imaginable.
