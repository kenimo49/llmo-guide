---
title: "3. 검색 시그널 (Retrieval Signals)"
description: "검색 시그널은 AI 시스템이 콘텐츠를 발견하고 접근할 수 있게 하는 메커니즘입니다. robots.txt, llms.txt, sitemap, /ai/ 엔드포인트, 크로스 플랫폼 존재감을 포함합니다."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "LLMO Component 3: Retrieval Signals",
        "description": "Ensuring AI systems can find your content through crawlability, llms.txt, and machine-readable endpoints.",
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"},
        "publisher": {"@type": "Organization", "name": "LLMO Framework"}
      }
---

## 개요

검색 시그널은 AI 시스템이 여러분의 콘텐츠를 발견하고 접근할 수 있게 하는 지표와 메커니즘입니다. 전통적인 크롤링 가능성과 최신 AI 전용 발견 방법을 모두 포함합니다.

## 왜 중요한가

아무리 명확하고 잘 구조화된 콘텐츠라도 AI 시스템이 찾을 수 없다면 무용지물입니다. LLM이 RAG(Retrieval-Augmented Generation), 웹 브라우징, 도구 사용을 점점 더 활용함에 따라, 콘텐츠는 여러 채널을 통해 발견 가능해야 합니다.

## 구현 방법

### 1. 기본적인 크롤링 가능성 확보
- AI 크롤러를 허용하는 최신 `robots.txt` 유지
- `sitemap.xml` 생성 및 제출
- 가능하면 JavaScript 없이 페이지가 로드되도록 보장 (SSG/SSR)

### 2. llms.txt 표준 구현
사이트의 간결한 요약, 주요 페이지, 콘텐츠 탐색 방법을 제공하는 `/llms.txt` 파일을 생성하세요. 이것은 사이트의 "소개" 페이지에 해당하는 AI 버전입니다.

### 3. 기계 판독 가능한 엔드포인트 제공
AI 시스템이 쉽게 소비할 수 있는 형식으로 콘텐츠를 제공하세요:
- 주요 페이지의 Markdown 버전
- 구조화 데이터용 API 엔드포인트
- 업데이트를 위한 RSS/Atom 피드

### 4. AI 검색 엔진 최적화
Perplexity, SearchGPT, Google AI Overviews 같은 AI 기반 검색 도구의 각 가이드라인을 따라 콘텐츠가 노출되도록 하세요.

### 5. 플랫폼 간 상호 참조
여러 플랫폼(웹사이트, GitHub, LinkedIn 등)에 일관된 정보를 게시하여 AI 시스템이 여러 출처에서 콘텐츠를 삼각 검증하고 확인할 수 있도록 하세요.

## 예시

**최소 검색 설정:**
```
/robots.txt          — 크롤러 허용
/sitemap.xml         — 모든 페이지 목록
/llms.txt            — AI 전용 요약
/feed.xml            — RSS 피드
```

**고급 검색 설정:**
```
/api/info.json       — 구조화 데이터 엔드포인트
/docs/overview.md    — 문서의 Markdown 버전
```

## 체크리스트

- [ ] robots.txt가 주요 AI 크롤러를 허용하는가
- [ ] sitemap.xml이 생성되어 최신 상태인가
- [ ] llms.txt 파일이 정확한 사이트 요약과 함께 존재하는가
- [ ] 주요 콘텐츠가 JavaScript 없이 이용 가능한가
- [ ] 상호 참조를 위해 콘텐츠가 여러 플랫폼에 게시되어 있는가
