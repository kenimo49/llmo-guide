---
title: LLMO vs SEO vs AEO vs GEO
description: "LLMO, SEO, AEO, GEO 비교. LLMO는 AEO와 GEO를 포괄하면서 모든 LLM 인터랙션을 다루는 상위 프레임워크이다."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO vs SEO vs AEO vs GEO",
        "description": "Comparison of search optimization approaches: LLMO, SEO, AEO, and GEO.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 검색 최적화의 진화

```
1997: SEO — 검색 엔진을 위한 최적화
2018: AEO — 답변 엔진을 위한 최적화
2023: GEO — 생성형 엔진을 위한 최적화
2024: LLMO — 모든 LLM 인터랙션을 위한 최적화
```

## 비교

| | SEO | AEO | GEO | LLMO |
|---|---|---|---|---|
| **초점** | 검색 순위 | AI 답변 | 생성형 검색 | 모든 LLM 인터랙션 |
| **대상** | Google, Bing | 음성 비서, AI 검색 | AI 기반 검색 엔진 | ChatGPT, Claude, Gemini, Perplexity |
| **학술적 기반** | 수십 년간의 연구 | 제한적 | 프린스턴 (KDD 2024) | 형성 중 |
| **프레임워크** | 잘 확립됨 | 비공식적 | 연구 중심 | LLMO Framework (5 컴포넌트) |
| **범위** | 웹 검색 | 좁음 (답변만) | 좁음 (생성형 검색만) | 넓음 (모든 LLM 컨텍스트) |

## 상호 관계

LLMO는 AEO와 GEO 같은 접근 방식을 포괄하면서, 검색을 넘어 LLM이 웹 콘텐츠와 상호작용하는 모든 맥락을 다룬다.

```
LLMO (모든 LLM 인터랙션)
├── GEO (생성형 검색 엔진)
│   └── AEO (답변 중심 검색)
└── 직접 LLM 쿼리 (ChatGPT, Claude 등)
    └── RAG 기반 애플리케이션
    └── 웹을 탐색하는 AI 에이전트
```
