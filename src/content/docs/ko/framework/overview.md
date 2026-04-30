---
title: "LLMO 프레임워크: AI 발견 가능성을 위한 표준"
description: "LLMO 프레임워크는 AI 발견 가능성을 위한 5가지 핵심 구성요소를 정의합니다: 지식 명확성, 구조적 포맷팅, 검색 시그널, 권위 시그널, 인용 시그널. 최고 점수: 15점."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "The LLMO Framework: A Standard for AI Discoverability",
        "description": "Five core components for making your content discoverable by AI.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

LLMO 프레임워크는 AI 시스템이 여러분의 콘텐츠를 발견하고, 이해하고, 정확하게 인용할 수 있는지를 결정하는 5가지 핵심 구성요소를 정의합니다.

## 5가지 구성요소

### 1. 지식 명확성 (Knowledge Clarity)
AI가 여러분의 콘텐츠를 정확하게 이해하고 요약할 수 있을 만큼 명확한가?

- 명확하고 모호하지 않은 언어 사용
- 핵심 용어를 명시적으로 정의
- 구조화된 사실 제공 (누가, 무엇을, 언제, 어디서)
- 설명 없는 전문 용어 사용 금지

### 2. 구조적 포맷팅 (Structural Formatting)
콘텐츠가 기계가 소비할 수 있도록 구조화되어 있는가?

- 시맨틱 HTML과 Markdown 사용
- JSON-LD 구조화 데이터 구현
- AI 전용 콘텐츠를 위한 llms.txt 제공
- 계층적 콘텐츠 구성

### 3. 검색 시그널 (Retrieval Signals)
AI 시스템이 필요할 때 여러분의 콘텐츠를 찾을 수 있는가?

- 크롤링 가능성 보장 (robots.txt, sitemap.xml)
- 기계 판독 가능한 엔드포인트 제공 (/ai/, .md 파일)
- llms.txt 표준 구현
- 가능한 경우 API를 통한 콘텐츠 제공

### 4. 권위 시그널 (Authority Signals)
콘텐츠가 전문성과 신뢰성을 입증하는가?

- 검증 가능한 자격을 갖춘 저자 표시
- 크로스 플랫폼 존재감 (GitHub, LinkedIn, 출판물)
- 모든 플랫폼에서 일관된 정보
- 인용을 동반한 근거 기반 주장

### 5. 인용 시그널 (Citation Signals)
콘텐츠가 AI가 검증할 수 있는 참고 문헌을 제공하는가?

- 1차 출처 링크
- 게시일 포함
- 버전 정보 제공
- 학술 논문 및 공식 문서 참조

## 점수 체계

각 구성요소는 0-3점 척도로 평가할 수 있습니다:

| 점수 | 수준 | 설명 |
|------|------|------|
| 0 | 없음 | 해당 구성요소가 다뤄지지 않음 |
| 1 | 기본 | 최소한의 구현 |
| 2 | 양호 | 개선 여지가 있는 견실한 구현 |
| 3 | 우수 | 모범 사례 수준의 구현 |

**최고 점수: 15점** (5개 구성요소 x 3점)
