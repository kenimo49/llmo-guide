---
title: "LLMO FAQ"
description: "LLMO 구현에 관한 자주 묻는 질문 — SEO와의 관계, 소요 시간, 우선 구현 항목, AI 가시성 측정 방법."
pubDate: 2026-05-08
head:
  - tag: script
    attrs:
      type: application/ld+json
    content: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "inLanguage": "ko",
        "mainEntity": [
          {"@type": "Question", "name": "LLMO가 SEO를 대체합니까?", "acceptedAnswer": {"@type": "Answer", "text": "아닙니다. LLMO와 SEO는 서로 다른 문제를 해결하고 병렬로 실행됩니다. SEO는 순위 검색 결과를 노리고, LLMO는 AI 시스템(ChatGPT, Claude, Gemini, Perplexity)에 의해 인용·요약·직접 답변되는 것을 노립니다. LLMO 작업의 대부분(시맨틱 HTML, JSON-LD, sitemap, robots.txt)은 SEO도 강화하므로 둘 중 하나를 선택할 필요가 없습니다."}},
          {"@type": "Question", "name": "LLMO 구현에 얼마나 걸립니까?", "acceptedAnswer": {"@type": "Answer", "text": "최소 LLMO 기준선(llms.txt, /ai/ Markdown, GPTBot/ClaudeBot/PerplexityBot 허용 robots.txt, 주요 페이지 JSON-LD)은 소규모 사이트에서 약 30분. LLMO 프레임워크에서 13/15 달성에는 보통 몇 주의 점진적 작업이 필요."}},
          {"@type": "Question", "name": "무엇을 먼저 구현해야 합니까?", "acceptedAnswer": {"@type": "Answer", "text": "검색 신호(컴포넌트 3)부터 시작: /llms.txt, /ai/ Markdown 요약, AI 크롤러를 명시적으로 허용하는 robots.txt, 도달 가능한 sitemap.xml. 이것들 없이는 지식 명확성이나 권위 작업이 발견되지 않습니다."}},
          {"@type": "Question", "name": "정말로 /llms.txt와 /ai/ 디렉토리가 필요합니까?", "acceptedAnswer": {"@type": "Answer", "text": "둘 다 권장이지만 선택. /llms.txt(llmstxt.org 기반)는 AI에게 사이트의 빠르고 구조화된 맵을 제공 — AI 에이전트가 검색을 통하지 않고 페이지를 직접 가져올 때 특히 가치 있음. /ai/ Markdown은 크롤러와 복사-붙여넣기 사용자에게 HTML chrome 없는 깨끗한 텍스트 제공."}},
          {"@type": "Question", "name": "원치 않는 AI 크롤러를 차단하려면?", "acceptedAnswer": {"@type": "Answer", "text": "robots.txt에 명시적인 User-agent 지시문 사용. 예: 'User-agent: GPTBot' + 'Disallow: /'로 OpenAI 학습 크롤에서 옵트아웃. 각 주요 크롤러(GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider)는 사용자 에이전트와 옵트아웃 시맨틱을 공개. LLMO는 옵트인이며 차단은 항상 허용됨."}},
          {"@type": "Question", "name": "LLMO가 작동하는지 어떻게 측정합니까?", "acceptedAnswer": {"@type": "Answer", "text": "세 층: (1) 서버 로그 — GPTBot, ClaudeBot, PerplexityBot 사용자 에이전트와 가져간 페이지; (2) AI 프롬프트 감사 — ChatGPT, Claude, Perplexity에 산업 관련 질문을 던져 자기 사이트가 인용되는지 확인; (3) 리퍼럴 분석 — chat.openai.com, claude.ai, perplexity.ai 등에서 방문. 월별로 모두 추적."}},
          {"@type": "Question", "name": "JSON-LD가 필수입니까? 일반 HTML로 충분합니까?", "acceptedAnswer": {"@type": "Answer", "text": "일반 시맨틱 HTML 단독으로도 작동하지만 성능이 떨어집니다. JSON-LD는 author, publisher, datePublished, sameAs 정체성 등 명시적 사실을 표현해 AI 시스템이 산문 파싱 없이 소비할 수 있게 합니다. LLMO에서 구조화 포맷과 권위 신호를 동시에 끌어올리는 가장 저렴한 단일 수단."}},
          {"@type": "Question", "name": "트래픽이 적은 B2B 사이트에도 LLMO가 중요합니까?", "acceptedAnswer": {"@type": "Answer", "text": "네 — 오히려 더 중요. AI 검색의 B2B 트래픽은 일반 검색보다 훨씬 높은 전환율(Go Fish Digital 관찰 25배). 바이어가 AI 어시스턴트에게 벤더를 물을 때 인용되는 출처가 되는 것이 Google 2페이지보다 가치 있음."}},
          {"@type": "Question", "name": "LLMO와 AEO·GEO의 관계?", "acceptedAnswer": {"@type": "Answer", "text": "LLMO는 상위 개념. AEO(Jason Barnard, 2018)는 피처드 스니펫·음성 답변을 노리지만 학술 프레임워크 없음. GEO(Princeton/IIT Delhi/Adobe, KDD 2024)는 생성 검색에 특화된 학술 논문. LLMO는 둘에 검색·권위 신호를 더해 구현 가능한 프레임워크로 통합."}},
          {"@type": "Question", "name": "정적 사이트(백엔드 없음)에서도 LLMO를 구현할 수 있습니까?", "acceptedAnswer": {"@type": "Answer", "text": "네. 정적 사이트는 LLMO의 이상적 타겟 — 모든 컴포넌트(llms.txt, /ai/ Markdown, JSON-LD, robots.txt, sitemap.xml)가 정적 파일. 지금 읽고 있는 사이트는 GitHub Pages의 정적 Astro 사이트로 LLMO 프레임워크 15/15."}},
          {"@type": "Question", "name": "인용 신호를 위해 콘텐츠를 얼마나 자주 업데이트해야 합니까?", "acceptedAnswer": {"@type": "Answer", "text": "AI 시스템은 신선도에 가중치를 둡니다. 주요 참조 페이지(프레임워크, 가이드, 논문/연구)는 분기마다 최소 한 번, 빠르게 변하는 주제(모델 릴리스, AI 정책, 툴링)는 월별. 항상 datePublished(생성)와 dateModified(개정) 둘 다 업데이트. Microsoft의 2025년 10월 가이드라인은 신선도를 3가지 핵심 원칙 중 하나로 나열."}}
        ]
      }
---

LLMO 프레임워크 구현에 관한 자주 묻는 질문. 당신의 질문이 없으면 [issue를 만드세요](https://github.com/kenimo49/llmo-guide/issues) — issue tracker의 답변은 이 페이지에 반영됩니다.

## LLMO가 SEO를 대체합니까?

아닙니다. LLMO와 SEO는 서로 다른 문제를 해결하고 병렬로 실행됩니다.

- **SEO** 는 순위 검색 결과를 노립니다.
- **LLMO** 는 AI 시스템(ChatGPT, Claude, Gemini, Perplexity)에 의해 인용·요약·직접 답변되는 것을 노립니다.

LLMO 작업의 대부분(시맨틱 HTML, JSON-LD, sitemap, robots.txt)은 SEO도 강화하므로 둘 중 하나를 선택할 필요가 없습니다.

## LLMO 구현에 얼마나 걸립니까?

- **30분**: 최소 기준선(llms.txt, /ai/ Markdown, AI 허용 robots.txt, 주요 페이지 JSON-LD). [빠른 시작](/ko/guide/quickstart/) 참조.
- **몇 주**: [LLMO 프레임워크](/ko/framework/overview/)에서 13/15 달성.

## 무엇을 먼저 구현해야 합니까?

**검색 신호**(컴포넌트 3)부터: 사이트 루트의 `/llms.txt`, `/ai/` Markdown 요약, AI 크롤러를 명시적으로 허용하는 `robots.txt`, 도달 가능한 `sitemap.xml`.

## 정말로 /llms.txt와 /ai/ 디렉토리가 필요합니까?

둘 다 권장이지만 선택. `/llms.txt`([llmstxt.org](https://llmstxt.org/) 기반)는 AI에게 구조화된 사이트 맵을 제공. `/ai/` Markdown은 크롤러에게 HTML chrome 없는 깨끗한 텍스트 제공.

## 원치 않는 AI 크롤러를 차단하려면?

```
User-agent: GPTBot
Disallow: /
```

주요 크롤러의 옵트아웃 사양은 [리서치 → 논문](/ko/research/papers/) 참조.

## LLMO가 작동하는지 어떻게 측정합니까?

세 층 월별 추적: (1) 서버 로그의 AI 크롤러; (2) ChatGPT/Claude/Perplexity 프롬프트 감사; (3) `chat.openai.com`, `claude.ai`, `perplexity.ai`의 리퍼럴.

## JSON-LD가 필수입니까?

필수는 아니지만 **구조화 포맷과 권위 신호를 동시에 끌어올리는 가장 저렴한 수단**. `author`, `publisher`, `datePublished`, `sameAs` 같은 명시적 사실을 표현.

## 트래픽이 적은 B2B 사이트에도 LLMO가 중요합니까?

네 — 오히려 더 중요. AI 검색의 B2B 전환율은 일반 검색보다 25배 높음(Go Fish Digital).

## LLMO와 AEO·GEO의 관계?

| 표준 | 기원 | 범위 |
|-----|-----|-----|
| AEO | Jason Barnard, 2018 | 피처드 스니펫, 음성 |
| GEO | Princeton/IIT Delhi/Adobe, KDD 2024 | 생성 검색 |
| **LLMO** | 본 사이트, 2026 | 모든 LLM 상호작용 |

전체 비교는 [LLMO vs SEO vs AEO vs GEO](/ko/guide/llmo-vs-seo-aeo-geo/) 참조.

## 정적 사이트에서도 LLMO를 구현할 수 있습니까?

네. 모든 컴포넌트가 정적 파일. 이 사이트도 GitHub Pages의 정적 Astro 사이트로 15/15.

## 콘텐츠를 얼마나 자주 업데이트해야 합니까?

분기별 주요 참조 페이지, 월별 빠르게 변하는 주제. 항상 `datePublished`와 `dateModified` 둘 다 업데이트. Microsoft의 2025년 10월 가이드라인은 신선도를 3가지 핵심 원칙 중 하나로 나열.
