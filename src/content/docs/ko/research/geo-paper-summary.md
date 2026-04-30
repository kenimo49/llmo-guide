---
title: "GEO 논문: 과학이 말하는 것"
description: "Princeton/IIT Delhi에서 발표하고 KDD 2024에 게재된 GEO (Generative Engine Optimization) 논문 요약. 인용률, 콘텐츠 전략, 통계적 개선에 대한 핵심 발견을 정리합니다."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "GEO Paper: What the Science Says",
        "description": "Summary of the GEO paper (KDD 2024) with key findings on AI citation optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"},
        "citation": {
          "@type": "ScholarlyArticle",
          "name": "GEO: Generative Engine Optimization",
          "author": "Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande",
          "datePublished": "2024",
          "url": "https://arxiv.org/abs/2311.09735"
        }
      }
---

**GEO (Generative Engine Optimization)** 논문은 AI 기반 검색 엔진에서 콘텐츠 가시성을 최적화하기 위한 최초의 학술 프레임워크입니다. KDD 2024 (ACM SIGKDD)에 게재되었으며, LLMO 프레임워크가 기반으로 삼는 콘텐츠 최적화 전략에 대한 실증적 근거를 제공합니다.

## 논문 정보

| 항목 | 내용 |
|------|------|
| 제목 | GEO: Generative Engine Optimization |
| 저자 | Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande |
| 소속 | Princeton University, IIT Delhi, Adobe Research |
| 학회 | KDD 2024 (ACM SIGKDD) |
| arXiv | [2311.09735](https://arxiv.org/abs/2311.09735) |
| 발표 | 2024년 |

## 연구 설계

연구팀은 여러 도메인에 걸친 10,000개 검색 쿼리로 구성된 벤치마크 **GEO-Bench**를 구축했습니다. 생성형 검색 엔진을 대상으로 9가지 콘텐츠 최적화 전략을 테스트하여, 어떤 접근법이 소스 가시성을 향상시키는지 측정했습니다.

### 테스트된 9가지 전략

1. 출처 인용(Cite Sources)
2. 인용문 추가(Quotation Addition)
3. 통계 추가(Statistics Addition)
4. 유창성 최적화(Fluency Optimization)
5. 고유 단어(Unique Words)
6. 전문 용어(Technical Terms)
7. 권위적 어조(Authoritative Tone)
8. 쉬운 언어(Easy-to-Understand Language)
9. 키워드 스터핑(Keyword Stuffing)

## 핵심 발견

### 전략별 효과

| 전략 | 가시성 향상도 | LLMO 구성 요소 |
|------|-------------|---------------|
| **통계 추가** | **+115.1%** | Citation Signals |
| **출처 인용** | **+77.0%** | Citation Signals |
| **인용문 추가** | **+72.2%** | Authority Signals |
| 권위적 어조 | +21.5% | Knowledge Clarity |
| 유창성 최적화 | +15.2% | Knowledge Clarity |
| 전문 용어 | +5.8% | Knowledge Clarity |
| 쉬운 언어 | +2.4% | Knowledge Clarity |
| 고유 단어 | -3.1% | — |
| 키워드 스터핑 | -10.2% | — |

### 상위 3가지 전략

가장 효과적인 세 가지 전략에는 공통점이 있습니다: **검증 가능한 외부 근거**를 제공한다는 것입니다.

1. **통계 추가 (+115.1%)**: 구체적인 숫자와 데이터 포인트를 추가하면 콘텐츠의 가시성이 2배 이상 향상되었습니다. 예: "매출이 전년 대비 34% 성장" vs "매출이 크게 성장".

2. **출처 인용 (+77.0%)**: 특정 논문, 보고서, 문서를 참조하면 가시성이 77% 향상되었습니다. AI 시스템은 교차 검증이 가능한 콘텐츠를 선호합니다.

3. **인용문 추가 (+72.2%)**: 전문가나 권위 있는 출처의 직접 인용을 포함하면 AI 시스템이 인식하고 인용하는 신뢰성이 추가되었습니다.

### 효과가 없는 것

- **키워드 스터핑 (-10.2%)**: 기존 SEO 전술은 AI 가시성에 오히려 해를 끼칩니다. AI 시스템은 인위적인 키워드 밀도를 감지하고 페널티를 줄 수 있습니다.
- **고유 단어 (-3.1%)**: 독특한 어휘를 사용해도 가시성은 향상되지 않았습니다. 명확함이 재치를 이깁니다.

## LLMO에 대한 시사점

### 1. Citation Signals가 최고 레버리지 구성 요소

GEO 데이터에 따르면 Citation Signals(통계, 출처, 인용문)이 가장 큰 가시성 향상을 가져옵니다. 이것이 LLMO 프레임워크가 Citation Signals를 Component 5(다른 모든 구성 요소의 효과를 배가하는 최종 요소)로 배치하는 이유입니다.

### 2. 콘텐츠 명확성은 중요하지만 근거보다는 덜 중요

Knowledge Clarity 관련 전략(권위적 어조, 유창성, 쉬운 언어)은 모두 긍정적이지만 완만한 향상(2~22%)을 보였습니다. 좋은 글쓰기는 필요하지만 그것만으로는 충분하지 않습니다. 진정한 배수 효과는 검증 가능한 사실을 추가할 때 발생합니다.

### 3. SEO 전술은 AI에 역효과

초기 SEO의 핵심이었던 키워드 스터핑은 AI 가시성을 오히려 감소시켰습니다. 이는 LLMO가 기존 SEO와 근본적으로 다른 접근 방식을 필요로 한다는 것을 확인시켜 줍니다.

## 도메인별 차이

GEO 논문은 전략의 효과가 도메인에 따라 달라진다는 것을 발견했습니다:

- **사실/과학 쿼리**: 통계 추가가 가장 효과적
- **의견/주관적 쿼리**: 인용문 추가가 가장 좋은 성과
- **기술 쿼리**: 출처 인용이 가장 높은 효과

이는 LLMO 구현이 콘텐츠 도메인에 맞게 조정되어야 함을 시사합니다. 연구 사이트는 통계에서 가장 큰 이점을 얻고, 사상 리더십 블로그는 전문가 인용에서 더 큰 이점을 얻습니다.

## LLMO가 GEO를 확장하는 방법

LLMO 프레임워크는 세 가지 방식으로 GEO를 확장합니다:

1. **더 넓은 범위**: GEO는 생성형 검색 엔진에 초점을 맞춥니다. LLMO는 직접 쿼리, RAG, AI 에이전트를 포함한 모든 LLM 상호작용을 다룹니다.
2. **구현 중심**: GEO는 *무엇이* 효과적인지를 밝힙니다. LLMO는 특정 파일 형식(llms.txt), 구조화 데이터(JSON-LD), 콘텐츠 설계 패턴으로 *어떻게 구현할지*를 제공합니다.
3. **검색 레이어**: GEO는 콘텐츠가 이미 검색되었다고 가정합니다. LLMO는 콘텐츠가 처음부터 발견될 수 있도록 Retrieval Signals 구성 요소를 추가합니다.

## 더 읽기

- [arXiv 전문 보기](https://arxiv.org/abs/2311.09735)
- [LLMO 프레임워크 개요](/ko/framework/overview/)
- [Citation Signals](/ko/framework/citation-signals/) — 가장 효과적인 GEO 전략 구현하기
