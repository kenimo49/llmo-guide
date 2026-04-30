---
title: "LLMO 퀵스타트: 30분 만에 구현하기"
description: "30분 안에 사이트에 LLMO 필수 파일 3개를 추가하세요: llms.txt, AI 크롤러용 robots.txt, JSON-LD 구조화 데이터."
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "LLMO Quickstart: Implement in 30 Minutes",
        "description": "Add the three essential LLMO files to your site in under 30 minutes.",
        "totalTime": "PT30M",
        "step": [
          {"@type": "HowToStep", "name": "Add robots.txt for AI crawlers", "position": 1},
          {"@type": "HowToStep", "name": "Create llms.txt", "position": 2},
          {"@type": "HowToStep", "name": "Add JSON-LD structured data", "position": 3}
        ],
        "author": {"@type": "Person", "name": "Ken Imoto", "url": "https://kenimoto.dev"}
      }
---

3개의 파일만 추가하면 30분 안에 사이트를 AI가 발견할 수 있도록 만들 수 있다. 이 가이드는 최소한의 LLMO 구현 방법을 다룬다.

## 필수 파일 3가지

| 파일 | 목적 | 소요 시간 |
|------|---------|------|
| `robots.txt` | AI 크롤러의 사이트 접근 허용 | 5분 |
| `llms.txt` | AI에게 사이트의 구조화된 요약 제공 | 15분 |
| JSON-LD `<script>` | AI에게 콘텐츠의 구조화 데이터 제공 | 10분 |

## 1단계: AI 크롤러용 robots.txt (5분)

대부분의 사이트에는 이미 `robots.txt`가 있다. AI 크롤러를 위한 명시적 `Allow` 규칙을 추가하자:

```txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**명시적 Allow가 필요한 이유:** 일부 호스팅 플랫폼과 CDN은 기본적으로 AI 크롤러를 차단한다. 명시적 규칙으로 의도치 않은 차단을 방지할 수 있다.

### 알려진 AI 크롤러

| 크롤러 | 운영자 | 용도 |
|---------|----------|---------|
| GPTBot | OpenAI | ChatGPT, 웹 브라우징 |
| ClaudeBot | Anthropic | Claude 웹 검색 |
| Google-Extended | Google | Gemini, AI Overviews |
| PerplexityBot | Perplexity | Perplexity 검색 |
| Amazonbot | Amazon | Alexa, 상품 검색 |
| CCBot | Common Crawl | 학습 데이터 수집 |

## 2단계: llms.txt 생성 (15분)

`llms.txt` 파일([llmstxt.org](https://llmstxt.org)에서 Jeremy Howard가 제안)은 AI 시스템에 사이트의 구조화된 요약을 제공한다.

이 파일을 사이트 루트에 배치한다: `https://yoursite.com/llms.txt`

### 템플릿

```markdown
# 사이트 이름

> 사이트가 하는 일을 한 문장으로 설명.

## What We Do

핵심 서비스, 전문 분야, 목적을 설명하는 간단한 단락.
평이한 언어를 사용하고 마케팅 용어는 피한다.

## Key Facts

- Founded: [연도]
- Team: [규모 또는 핵심 인원]
- Location: [해당하는 경우]
- Specialization: [핵심 전문 분야]

## Products / Services

- **Product A**: 간략한 설명
- **Product B**: 간략한 설명

## Links

- Website: https://yoursite.com
- Documentation: https://yoursite.com/docs
- GitHub: https://github.com/yourorg
- Contact: https://yoursite.com/contact
```

### 모범 사례

1. **사실을 먼저, 마케팅은 나중에.** "AI 자동화로 Android 앱을 개발합니다"가 "최첨단 시너지를 활용합니다"보다 낫다.
2. **구조화 데이터를 포함하라.** 표, 목록, 키-값 쌍은 산문보다 AI가 파싱하기 쉽다.
3. **2,000단어 이내로 유지하라.** 간결한 요약이 전체가 수집될 가능성이 높다.
4. **정기적으로 업데이트하라.** AI 시스템은 주기적으로 재크롤링한다. 오래된 llms.txt는 오래된 AI 응답을 의미한다.

## 3단계: JSON-LD 구조화 데이터 (10분)

홈페이지의 `<head>`에 JSON-LD 스크립트를 추가한다. AI가 엔티티 유형, 관계, 핵심 속성을 이해하는 데 도움이 된다.

### Organization Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yoursite.com",
  "description": "회사가 하는 일을 한 문장으로.",
  "founder": {
    "@type": "Person",
    "name": "Founder Name"
  },
  "sameAs": [
    "https://github.com/yourorg",
    "https://linkedin.com/company/yourorg",
    "https://x.com/yourorg"
  ]
}
</script>
```

### Article Schema (블로그 포스트용)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Article Title",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://authorsite.com"
  },
  "datePublished": "2026-01-15",
  "publisher": {
    "@type": "Organization",
    "name": "Your Company"
  }
}
</script>
```

### Schema 유형 선택 가이드

| 콘텐츠 유형 | Schema | 우선순위 |
|-------------|--------|----------|
| 홈페이지 | Organization 또는 Person | 높음 |
| 블로그 포스트 | Article 또는 BlogPosting | 높음 |
| 제품 | Product | 높음 |
| FAQ 페이지 | FAQPage | 중간 |
| 문서 | TechArticle | 중간 |
| 도서 | Book | 중간 |

## 구현 확인

배포 후 다음을 확인한다:

1. **robots.txt**: `https://yoursite.com/robots.txt`에 접속하여 AI 크롤러가 허용되어 있는지 확인
2. **llms.txt**: `https://yoursite.com/llms.txt`에 접속하여 내용이 정확한지 확인
3. **JSON-LD**: [Google의 리치 결과 테스트](https://search.google.com/test/rich-results)를 사용하거나 페이지 소스를 확인하여 스크립트 태그가 있는지 확인
4. **AI 테스트**: ChatGPT 또는 Perplexity에 사이트/제품에 대해 질문하고 응답을 관찰

## 다음 단계

이 퀵스타트는 LLMO Framework의 **Retrieval Signals**와 **Structural Formatting** 컴포넌트를 다뤘다. 전체 프레임워크:

- [Knowledge Clarity](/ko/framework/knowledge-clarity/) -- AI가 이해할 수 있는 콘텐츠 작성
- [Authority Signals](/ko/framework/authority-signals/) -- 검증 가능한 전문성 구축
- [Citation Signals](/ko/framework/citation-signals/) -- AI가 인용하고 싶은 데이터 제공
- [Framework Overview](/ko/framework/overview/) -- 5가지 컴포넌트로 사이트 점수 확인
