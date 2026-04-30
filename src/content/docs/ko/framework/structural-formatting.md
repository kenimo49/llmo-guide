---
title: "2. 구조적 포맷팅 (Structural Formatting)"
description: "구조적 포맷팅은 AI 시스템이 효율적으로 파싱하고 정보를 추출할 수 있도록 콘텐츠를 기계 판독 가능한 형식(JSON-LD, 시맨틱 HTML, Markdown, llms.txt)으로 구성하는 방법입니다."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 2: Structural Formatting",
        "description": "Structuring your content for machine consumption with JSON-LD, semantic HTML, and llms.txt.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 개요

구조적 포맷팅은 AI 시스템이 효율적으로 파싱, 분류, 정보 추출을 할 수 있도록 기계 판독 가능한 형식과 시맨틱 마크업으로 콘텐츠를 구성하는 방법입니다.

## 왜 중요한가

AI 시스템은 인간처럼 페이지를 "읽지" 않습니다. 구조화된 데이터를 자유 형식 텍스트보다 훨씬 안정적으로 처리합니다. 적절한 구조를 갖추면 콘텐츠가 올바르게 해석되고 인용될 가능성이 높아지며, 오해되거나 간과되는 일이 줄어듭니다.

## 구현 방법

### 1. 시맨틱 HTML과 Markdown 사용
적절한 제목(h1-h6), 목록, 표, 시맨틱 요소로 콘텐츠를 구조화하세요. 시각적 서식(볼드, 폰트 크기)을 구조적 계층의 대체물로 사용하지 마세요.

### 2. JSON-LD 구조화 데이터 구현
Schema.org 마크업을 페이지에 추가하세요. 최소한 다음을 포함하세요:
- 정체성을 위한 `Organization` 또는 `Person`
- 콘텐츠 페이지를 위한 `Article` 또는 `WebPage`
- Q&A 콘텐츠를 위한 `FAQPage`

### 3. llms.txt 파일 제공
[llms.txt 표준](https://llmstxt.org/)에 따라 도메인 루트에 `/llms.txt` 파일을 생성하세요. 이것은 AI 시스템에 사이트의 간결하고 기계 친화적인 요약을 제공합니다.

### 4. 콘텐츠를 계층적으로 구성
명확한 정보 구조를 사용하세요: 넓은 카테고리 -> 구체적인 주제 -> 상세 콘텐츠. URL 구조와 제목 계층에도 이를 반영하세요.

### 5. 비교 데이터에는 표 사용
비교, 기능, 사양을 제시할 때는 산문 설명 대신 적절한 HTML/Markdown 표를 사용하세요.

## 예시

**❌ 비구조화:**
> 우리는 세 가지 플랜을 제공합니다. 기본 플랜은 $10이며 5명의 사용자를 포함합니다. 프로 플랜은 $25이며 20명의 사용자를 포함합니다. 엔터프라이즈 플랜은 맞춤 가격이며 무제한 사용자를 포함합니다.

**✅ 구조화:**

| 플랜 | 가격 | 사용자 수 |
|------|------|-----------|
| Basic | $10/월 | 5 |
| Pro | $25/월 | 20 |
| Enterprise | 맞춤 | 무제한 |

## 체크리스트

- [ ] 페이지가 적절한 제목 계층(h1 -> h2 -> h3)을 사용하는가
- [ ] 주요 페이지에 JSON-LD 구조화 데이터가 있는가
- [ ] 도메인 루트에 llms.txt 파일이 존재하는가
- [ ] 적절한 곳에 목록과 표를 사용하고 있는가
- [ ] URL 구조가 콘텐츠 계층을 반영하는가
