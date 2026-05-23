---
title: "Experimental Projects"
description: "Open LLMO Research Initiative의 세 가지 실험 프로젝트: LLMOFramework Score, LLMOFramework Benchmark, LLMOFramework Compatible."
pubDate: 2026-05-24
---

Open LLMO Research Initiative가 공개할 실험 프로젝트 일람. 모두 **Draft / Experimental** 단계로 공개한다. 정식 명세 상태는 Phase 3 이후로 미룬다.

## 개요

| 프로젝트 | 역할 | 비유 | 상태 |
|---------|------|------|------|
| [1. LLMOFramework Score](#1-llmoframework-score) | 사이트의 AI 가시성 측정 | Lighthouse Score | 지표 책정 중 (Phase 1에서 Draft v0.1) |
| [2. LLMOFramework Benchmark](#2-llmoframework-benchmark) | 사이트 구조를 실험적으로 비교 | 업계 표준 벤치마크 | 계획 단계 (Phase 1-2) |
| [3. LLMOFramework Compatible](#3-llmoframework-compatible) | 준수 사이트용 인증 배지 | "Certified" 마크 | 로드맵만 (Phase 3) |

---

## 1. LLMOFramework Score

### 무엇을 측정하는가

"AI가 콘텐츠를 얼마나 인식·인용·이해하기 쉬운가"를 사이트별로 스코어화한다. SEO의 Domain Authority나 Lighthouse Score의 AI 시대판에 해당한다.

### 후보 지표 (v0.1 Draft)

| 지표 | 내용 |
|------|------|
| Citation Visibility | AI에 인용되는가 |
| Chunk Readability | chunk화 용이성 |
| Semantic Structure | 의미 구조의 명시도 |
| AI Crawlability | AI crawler 대응 |
| llms.txt | llms.txt 대응 |
| Markdown Quality | 구조 품질 |
| Entity Clarity | Entity 인식 용이성 |
| Retrieval Stability | retrieval 안정성 |

각 지표에는 **계산식과 OSS checker 코드**를 반드시 동봉한다. Lighthouse가 신뢰를 얻은 이유는 "측정 가능 + 재현 가능"이었기 때문이고, 본 프로젝트도 같은 원칙을 채택한다.

### 관련 OSS

Phase 1에서 `llmo-checker` 공개 예정.

```
npx llmo-checker https://example.com

LLMOFramework Score: 74

Citation Visibility: 81
Semantic Chunkability: 68
AI Readability: 77
Grounding Stability: 70
```

### 상태

지표 정의 책정 중. Draft v0.1 공개는 Phase 1 (시기 미정).

---

## 2. LLMOFramework Benchmark

### 무엇을 비교하는가

"어떤 사이트 구조가 AI에 강한가"를 실험적으로 비교한다. AI retrieval / citation 영역에 아직 표준 벤치마크가 없기 때문에, 본 프로젝트가 먼저 측정 방법을 제안한다.

### 비교 대상 후보

- Markdown vs HTML
- FAQ schema 유무
- Table 구조
- Chunk size
- Citation format
- Internal linking
- GitHub 연동
- llms.txt 대응
- MCP exposure

### 공개 방침

각 실험은 **Reproducible Benchmark Report**로 GitHub와 본 사이트에 공개한다. 데이터셋, 측정 스크립트, 결과 데이터, 평가 프롬프트를 모두 포함한다.

### 상태

계획 단계. Phase 1에서 최초 비교 실험(Markdown vs HTML retrieval 효율) 예정.

---

## 3. LLMOFramework Compatible

### 어떤 배지인가

"AI에 최적화된 구조에 준수하고 있음"을 보이는 인증 마크. SaaS, 문서 사이트, OSS, AI 제품이 부착하는 것을 상정한다.

### 비주얼 이미지

```
[ LLMOFramework Compatible ]
[ AI Retrieval Ready ]
[ Grounding Optimized ]
```

### 준수 요건 (Draft 이미지)

| 요건 | 내용 |
|------|------|
| llms.txt 배치 | 사이트 루트에 유효한 llms.txt가 존재 |
| Semantic Structure | 주요 페이지가 헤딩 계층과 semantic HTML을 만족 |
| Chunk Optimization | 주요 섹션이 권장 chunk size 범위 내에 들어감 |
| Grounding-friendly Docs | 인용처, 데이터 출처, 갱신일이 명시되어 있음 |

### 상태

**로드맵만**. Phase 3(마지막)에 위치. 이유:

- 인증은 ecosystem의 adoption이 전제이므로, Score와 Benchmark가 먼저 성숙해야 한다
- 1인 운영 단계에서 "인증"을 내놓으면 권위감이 선행해 오히려 신뢰를 잃는다
- Compatible 배지는 Open Source 커뮤니티의 third-party adoption을 받은 뒤에 설계에 들어간다

---

## Phase 매핑

| Phase | 프로젝트 진척 |
|-------|--------------|
| Phase 0 (현재) | 지표 책정, 프로젝트 컨셉 공개 |
| Phase 1 | Score Draft v0.1, `llmo-checker` OSS, 최초 Benchmark Report |
| Phase 2 | Score 개정, Benchmark의 지속 갱신, 커뮤니티 피드백 반영 |
| Phase 3 | Compatible 인증 설계, 명세 정식화, Working Group 결성 |

각 프로젝트의 소스 코드와 논의는 [GitHub repository](https://github.com/kenimo49/llmo-guide)와 [Issues](https://github.com/kenimo49/llmo-guide/issues)에 공개한다.
