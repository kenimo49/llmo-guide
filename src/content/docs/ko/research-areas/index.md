---
title: "Research Areas — 5개 영역"
description: "Open LLMO Research Initiative의 다섯 연구 영역: AI Citation Analysis, Grounding Visibility, LLM Retrieval Optimization, AI-native Documentation, Agent-oriented Information Architecture."
pubDate: 2026-05-24
---

Open LLMO Research Initiative는 작업을 다섯 연구 영역으로 나눠 진행한다. 각 영역은 독립적으로 운영되지만, 궁극적으로 [LLMOFramework Score](/ko/experimental-projects/)의 지표 체계로 통합된다.

## 개요

| 영역 | 핵심 질문 |
|------|-----------|
| [1. AI Citation Analysis](#1-ai-citation-analysis) | LLM은 어떤 콘텐츠를, 어떤 조건에서 인용하는가? |
| [2. Grounding Visibility](#2-grounding-visibility) | AI의 grounding 출처를 어떻게 가시화할 수 있는가? |
| [3. LLM Retrieval Optimization](#3-llm-retrieval-optimization) | 문서를 LLM 검색 계층에 어떻게 최적화할 것인가? |
| [4. AI-native Documentation](#4-ai-native-documentation) | LLM이 가장 잘 다루는 문서 포맷은 무엇인가? |
| [5. Agent-oriented Information Architecture](#5-agent-oriented-information-architecture) | AI 에이전트가 가장 쉽게 탐색할 수 있는 정보 구조는 무엇인가? |

---

## 1. AI Citation Analysis

### 범위

특정 토픽에 대해 LLM(ChatGPT, Claude, Gemini, Perplexity)이 어떤 콘텐츠를 인용하는지 분석. 인용 빈도, 인용된 문서의 구조적 특징, 인용에 이르는 retrieval 경로를 관찰 대상으로 한다.

### 주요 질문

- 같은 토픽에 대해 인용 도메인이 LLM 간에 어느 정도 겹치는가?
- 인용된 문서의 구조적 특징(헤딩 계층, 표, 통계 밀도, 외부 링크 수 등)을 특정할 수 있는가?
- 콘텐츠를 후천적으로 인용되기 쉽게 만드는 체크리스트를 구축할 수 있는가?

### 현재 방향

AI 인용 관측 데이터 수집을 시작했다. Phase 1 계획: OSS `llmo-checker`에 Citation Visibility 지표로 구현 예정.

---

## 2. Grounding Visibility

### 범위

AI 응답에 대한 grounding 가시화. LLM이 답을 생성할 때 무엇을 근거로 했는지, 그 근거가 검증 가능한 일차 정보로 추적되는지를 다룬다.

### 주요 질문

- AI 응답에서 근거 문서로 거꾸로 추적하는 표준 방법을 정의할 수 있는가?
- 사이트에서 grounding을 "보이게" 만드는 설계(출처 명시, 데이터 출처 인용, 인용 포맷)는 AI 인용률에 영향을 주는가?
- 환각(hallucination)과 grounding 약함은 상관관계가 있는가?

### 현재 방향

LLMO Framework의 다섯 번째 컴포넌트인 Citation Signals로 부분적으로 이미 다루고 있다. Phase 1 계획: Grounding Stability 지표로 정량화 시도.

---

## 3. LLM Retrieval Optimization

### 범위

LLM의 검색 계층(RAG, embedding retrieval, 웹 검색 플러그인 등)에 대해 문서 측에서 할 수 있는 최적화. chunking 전략, semantic structure, 문서 길이, 헤딩 설계가 연구 대상.

### 주요 질문

- chunk 크기와 retrieval 정밀도의 관계는 토픽별로 어떻게 달라지는가?
- Markdown, HTML, JSON-LD의 retrieval 효율 차이는 어느 정도인가?
- 내부 링크 밀도는 AI 검색의 맥락 확장에 어떻게 기여하는가?

### 현재 방향

llmoframework.com 자체가 구현 레퍼런스가 되고 있다. Phase 1 계획: chunking 비교 실험 공개 예정.

---

## 4. AI-native Documentation

### 범위

LLM이 읽고 쓰기 좋은 문서 포맷 연구. llms.txt, Markdown 관례, AI 향 메타데이터의 최적 형태를 다룬다.

### 주요 질문

- llms.txt는 실제로 어떤 LLM과 크롤러가 참조하는가?
- Markdown과 HTML 각각의 retrieval 효율과 표현력의 최적점은 어디인가?
- AI 향 구조화 메타데이터(JSON-LD 등)는 인용률에 영향을 주는가?

### 현재 방향

llms.txt 구현과 효과 측정을 지속 중. Phase 1 계획: llms.txt-validator OSS 도구 공개 예정.

---

## 5. Agent-oriented Information Architecture

### 범위

AI 에이전트(Claude Code, Cursor, 자율 agent 등)가 정보를 취득·조작하기 쉬운 IA 연구. MCP(Model Context Protocol) 노출, API 문서 설계, 검색 가능성을 다룬다.

### 주요 질문

- MCP 서버를 공개한 사이트는 AI 검색 가시성에서 우위를 점할 수 있는가?
- agent-readable한 API 문서(OpenAPI + 자연어)는 일반 API 레퍼런스보다 검색되기 쉬운가?
- 자율 agent의 탐색 행동을 관찰하는 방법을 확립할 수 있는가?

### 현재 방향

MCP 노출의 검색 가시성 영향 검증 중. Phase 1 계획: Agent Visibility의 예비 지표 제안 예정.

---

## Phase 매핑

| 영역 | Phase 1 예정 산출물 |
|------|---------------------|
| AI Citation Analysis | `llmo-checker`의 Citation Visibility 지표 |
| Grounding Visibility | Grounding Stability 지표 + 평가 데이터셋 |
| LLM Retrieval Optimization | chunking 비교 실험 리포트 |
| AI-native Documentation | llms.txt-validator OSS |
| Agent-oriented IA | Agent Visibility 예비 지표 |

각 영역의 진행 상황은 [Changelog](/ko/changelog/)와 [GitHub Issues](https://github.com/kenimo49/llmo-guide/issues)에 공개한다.
