---
title: "Research Areas — 5 Focus Domains"
description: "Five research areas of the Open LLMO Research Initiative: AI Citation Analysis, Grounding Visibility, LLM Retrieval Optimization, AI-native Documentation, and Agent-oriented Information Architecture."
pubDate: 2026-05-24
---

The Open LLMO Research Initiative organizes its work into five research areas. Each area runs independently but eventually feeds into the metric set defined by the [LLMOFramework Score](/experimental-projects/).

## Overview

| Area | Core question |
|------|---------------|
| [1. AI Citation Analysis](#1-ai-citation-analysis) | What content do LLMs cite, and under what conditions? |
| [2. Grounding Visibility](#2-grounding-visibility) | How do we make AI grounding sources visible? |
| [3. LLM Retrieval Optimization](#3-llm-retrieval-optimization) | How should documents be optimized for the LLM retrieval layer? |
| [4. AI-native Documentation](#4-ai-native-documentation) | What document formats do LLMs handle best? |
| [5. Agent-oriented Information Architecture](#5-agent-oriented-information-architecture) | What information structures are easiest for AI agents to navigate? |

---

## 1. AI Citation Analysis

### Scope

Analysis of which content gets cited by LLMs (ChatGPT, Claude, Gemini, Perplexity) for a given topic. The observations cover citation frequency, structural features of cited documents, and the retrieval path that led to the citation.

### Key Questions

- How much do cited domains overlap across LLMs for the same topic?
- Can we identify the structural features (heading hierarchy, tables, statistical density, external link count) of cited documents?
- Can we build a post-hoc checklist for making content more likely to be cited?

### Current Direction

Data collection for AI citation observation is underway. Phase 1 plan: ship Citation Visibility as a metric in the OSS `llmo-checker`.

---

## 2. Grounding Visibility

### Scope

Visualization of grounding for AI responses. Covers what an LLM relied on to produce an answer, and whether that source can be traced back to a verifiable primary reference.

### Key Questions

- Can a standard reverse-lookup method from AI response to source document be defined?
- Does making grounding "visible" on a site (explicit sources, data references, citation formatting) correlate with higher AI citation rates?
- Is hallucination correlated with weak grounding?

### Current Direction

Already partially addressed as Citation Signals (the fifth component of the LLMO Framework). Phase 1 plan: quantify it as a Grounding Stability metric.

---

## 3. LLM Retrieval Optimization

### Scope

Document-side optimization for the LLM retrieval layer (RAG, embedding retrieval, web search plugins, etc.). Covers chunking strategy, semantic structure, document length, and heading design.

### Key Questions

- How does the relationship between chunk size and retrieval accuracy vary across topics?
- What is the retrieval efficiency gap between Markdown, HTML, and JSON-LD?
- How does internal link density contribute to context expansion in AI search?

### Current Direction

llmoframework.com itself serves as an implementation reference. Phase 1 plan: publish a chunking comparison experiment.

---

## 4. AI-native Documentation

### Scope

Research on document formats that LLMs can read and write well. Covers llms.txt, Markdown conventions, and the optimal form of AI-targeted metadata.

### Key Questions

- Which LLMs and crawlers actually consult llms.txt?
- Where is the optimal balance between retrieval efficiency and expressive power for Markdown versus HTML?
- Does AI-targeted structured metadata (JSON-LD, etc.) affect citation rates?

### Current Direction

llms.txt implementation and effect measurement are ongoing. Phase 1 plan: publish the llms.txt-validator OSS tool.

---

## 5. Agent-oriented Information Architecture

### Scope

Research on information architecture for AI agents (Claude Code, Cursor, autonomous agents, etc.). Covers MCP (Model Context Protocol) exposure, API documentation design, and discoverability.

### Key Questions

- Do sites that expose MCP servers have an advantage in AI search visibility?
- Are agent-readable API docs (OpenAPI + natural language) more discoverable than plain API references?
- Can we establish methods for observing autonomous agent exploration behavior?

### Current Direction

Experiments on the impact of MCP exposure on search visibility are underway. Phase 1 plan: propose a preliminary Agent Visibility metric.

---

## Mapping to Phases

| Area | Phase 1 planned deliverable |
|------|---------------------------|
| AI Citation Analysis | Citation Visibility metric in `llmo-checker` |
| Grounding Visibility | Grounding Stability metric + evaluation dataset |
| LLM Retrieval Optimization | Chunking comparison experiment report |
| AI-native Documentation | llms.txt-validator OSS |
| Agent-oriented IA | Preliminary Agent Visibility metric |

Progress on each area is published in the [Changelog](/changelog/) and [GitHub Issues](https://github.com/kenimo49/llmo-guide/issues).
