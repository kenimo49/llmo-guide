---
title: "논문 및 참고 자료"
description: "LLMO 및 AI 검색 최적화 관련 학술 연구와 업계 보고서. GEO (KDD 2024), llms.txt 제안, 관련 연구를 포함합니다."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Research Papers & References",
        "description": "Academic research and industry reports related to LLMO and AI search optimization.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 핵심 논문

### GEO: Generative Engine Optimization
- **저자**: Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande
- **소속**: Princeton University, IIT Delhi, Adobe Research
- **학회**: KDD 2024 (ACM SIGKDD)
- **링크**: [arXiv:2311.09735](https://arxiv.org/abs/2311.09735)
- **요약**: 생성형 검색 엔진에서의 콘텐츠 가시성 최적화를 위한 최초의 학술 프레임워크. 10,000개 쿼리에 대해 9가지 최적화 전략을 테스트. 핵심 발견: 통계 추가 시 가시성이 +115.1% 향상.
- **[상세 요약 보기 →](/ko/research/geo-paper-summary/)**

### llms.txt 제안
- **저자**: Jeremy Howard
- **링크**: [llmstxt.org](https://llmstxt.org/)
- **요약**: 웹사이트에 대한 정보를 LLM에 제공하기 위한 표준화된 파일 제안. 크롤러 제어를 위한 robots.txt와 유사하지만, AI 소비를 위해 설계되었습니다.

## 업계 보고서 및 가이드라인

### Microsoft: AI 기반 검색 답변을 위한 콘텐츠 최적화
- **발행**: Microsoft (Bing Webmaster Blog)
- **일자**: 2025년 10월
- **요약**: AI 콘텐츠 최적화를 위한 3가지 원칙을 제시하는 공식 가이드라인: 구조(Structure), 권위(Authority), 최신성(Freshness).
- **[상세 요약 보기 →](/ko/research/microsoft-guidelines/)**

### Ahrefs: AI 가시성에서 웹 멘션 vs 백링크
- **발행**: Ahrefs
- **데이터셋**: 75,000개 브랜드
- **요약**: 웹 멘션(브랜드 + 키워드)이 기존 백링크보다 AI 가시성을 3배 더 잘 예측합니다.

### Gartner: 검색의 미래
- **발행**: Gartner
- **일자**: 2024년 2월
- **요약**: 사용자가 AI 기반 대안으로 이동함에 따라 2026년까지 기존 검색 엔진 사용이 25% 감소할 것이라는 전망.

### Go Fish Digital: AI 검색 전환율
- **발행**: Go Fish Digital
- **요약**: AI 기반 검색 트래픽은 사전 검증된 사용자 의도로 인해 기존 검색 트래픽의 25배 전환율을 기록합니다.

## 관련 연구

### Schema.org 구조화 데이터
- **URL**: [schema.org](https://schema.org/)
- **관련성**: LLMO Component 2(Structural Formatting)에서 JSON-LD 구조화 데이터 구현에 사용되는 어휘 표준.

### Google 구조화 데이터 문서
- **URL**: [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- **관련성**: 검색 엔진과 AI 시스템 모두에서 인식되는 구조화 데이터 구현 가이드라인.

## 기여하기

관련 논문이나 보고서를 알고 계신가요? [이슈를 등록](https://github.com/kenimo49/llmo-guide/issues)하거나 풀 리퀘스트를 제출하여 이 목록에 추가해 주세요.
