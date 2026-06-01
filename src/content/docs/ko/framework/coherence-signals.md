---
title: "6. 일관성 시그널 (일관성 신호)"
description: "일관성 시그널은 AI가 읽는 모든 표면(HTML / JSON-LD / Markdown / llms.txt)에서 동일한 사실이 동일한 이야기를 전하도록 보장합니다. 불일치는 인용 정확도를 떨어뜨리고 신뢰를 훼손합니다."
pubDate: 2026-05-08
---

## 개요

> **구조적 포맷팅과의 경계**: *구조적 포맷팅* 은 "각 표면이 개별적으로 well-formed한가?"를 묻습니다 — 유효한 JSON-LD, 시맨틱 HTML, 스코프된 스키마. *일관성 시그널* 은 "표면들이 서로 일치하는가?"를 묻습니다 — HTML과 Markdown에서 동일한 주소, `llms.txt`와 홈페이지 프로필에서 동일한 수치, 상충하는 필드를 가진 두 개의 `Organization` 엔티티가 존재하지 않는 것. 어떤 페이지는 구조적 포맷팅을 통과하면서도 일관성에서 실패할 수 있습니다. 각 블록은 유효하지만, 합쳐 놓으면 두 가지 이야기를 전하고 있는 것입니다.

일관성 시그널(Coherence Signals)은 **AI 에이전트가 읽을 수 있는 모든 표면에서 동일한 사실이 동일한 이야기를 전하는지**를 측정합니다. LLMO에 최적화된 최신 사이트는 여러 채널을 통해 사실을 노출합니다:

- HTML 본문 (사람과 AI 크롤러 모두가 봄)
- JSON-LD 구조화 데이터
- llms.txt 및 llms-full.txt
- /ai/*.md 및 URL.md 엔드포인트 (예: `/company.md`)
- OG / Twitter 메타 태그
- sitemap, robots.txt, hreflang 선언

동일한 사실(숫자, 주소, 서비스 목록, 게시일)이 이 표면들 중 두 곳에서 서로 다르게 적혀 있으면, 두 곳을 모두 참조하는 AI 시스템은 혼란을 겪습니다. 모델은 더 무겁게 가중하는 값을 채택하거나, 오래된 수치를 표면화하거나, 불일치를 낮은 품질의 시그널로 해석해 인용 자체를 거부할 수 있습니다.

일관성은 모든 표면에서 **단일 진실 공급원(Single Source of Truth)** 을 보장하는 LLMO의 규율입니다.

## 왜 중요한가

인용 정확도는 **수렴하는 증거**에 의존합니다. 모델이 여러 경로로 여러분의 콘텐츠를 검색했을 때 값들이 일치하면 확신이 높아지고 인용이 사용자에게 전달됩니다. 값들이 일치하지 않으면 몇 가지 실패 양상이 나타납니다:

- **인용률 하락** — 내부 증거가 일관된 출처에 모델이 양보합니다.
- **잘못된 사실 인용** — AI가 `/ai/founder.md`의 오래된 변형을 채택하면, 홈페이지에서 업데이트된 수치는 사용자에게 결코 도달하지 못합니다.
- **환각 증폭** — 표면들이 상충하면, 모델은 어느 쪽과도 맞지 않는 "절충" 답변을 보간할 가능성이 높아집니다.
- **권위 침식** — 정교한 AI 리랭커(Perplexity, AI Overviews)는 교차 참조를 비교합니다. 자기 모순은 낮은 품질로 읽힙니다.

2024년 [Propel-Lab](https://propel-lab.co.jp/)에서 실시한 자체 감사에서는, 동일한 저자 프로필이 **4권 / Qiita 39,000+ PV**(`/ai/founder.md`, `llms-full.txt`)와 **14권 / Qiita 80,000+ PV**(홈페이지 프로필 컴포넌트)를 동시에 주장하고 있었습니다 — 수개월 동안 AI 크롤러에게 계속 제공되어 온 적극적인 모순이었습니다.

## 구현 방법

### 1. 각 사실에 대해 단일 출처를 지정하세요

모든 수치 또는 사실 주장에 대해, **하나의** 파일을 정규 출처로 지정하세요. 다른 모든 표면은 거기서 import하거나 인용합니다.

| 사실 | 정규 출처 | 참조처 |
|------|----------|--------|
| 저서 수, PV 통계 | `src/data/profile.ts` | 프로필 컴포넌트, `/ai/founder.md`, `llms-full.txt`, JSON-LD |
| 서비스 카탈로그 | `src/data/services.ts` | `/products/`, JSON-LD `Service[]`, `/ai/services.md`, `llms.txt` |
| 주소, 설립일 | `src/data/company.ts` | 푸터, `/company.md`, JSON-LD `Organization`, `llms-full.txt` |
| FAQ 항목 | `src/lib/faq-schema.ts` | FAQ 컴포넌트, JSON-LD `FAQPage`, `/faq.md` |

패턴은 콘텐츠 컬렉션 또는 타입 지정 데이터 모듈 → 템플릿과 정적 엔드포인트가 모두 거기서 값을 끌어오는 형태입니다.

### 2. AI 표면을 HTML과 같은 출처에서 생성하세요

`llms.txt`나 `/ai/*.md`의 내용이 이미 타입 지정 데이터에 존재한다면, 손으로 작성하지 마세요:

```typescript
// src/pages/products.md.ts
import { services } from '../data/services';

export const GET: APIRoute = async () => {
  const markdown = services
    .map((s) => `## ${s.name}\n\n${s.summary}\n\n— 대상: ${s.target}`)
    .join('\n\n---\n\n');
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

HTML 뷰, JSON-LD `Service[]`, `/products.md`가 모두 `services`에서 파생됩니다. 드리프트가 구조적으로 발생할 수 없게 됩니다.

### 3. URL 정규화를 일관성 문제로 다루세요

`https://www.example.com/`과 `https://example.com/`은 문자열 매칭 크롤러에게는 두 개의 다른 문자열입니다. 하나의 정규 호스트를 선택하고, 이를 강제하세요:

- 모든 페이지에 `<link rel="canonical">`
- `og:url`, JSON-LD `url`, 사이트맵 항목 — 동일한 호스트
- `/ai/*.md`, `llms.txt` 내 참조 — 동일한 호스트
- 내부 링크 — 상대 경로 또는 정규 절대 URL만, 대체 호스트는 사용하지 않음

흔한 버그는 `www.`에서 apex(또는 그 반대)로 이전할 때 `/ai/*.md` 파일을 업데이트하는 것을 잊는 것입니다. 사이트의 나머지는 정규화되어 있는데, Markdown 표면이 조용히 잘못된 호스트를 AI에게 흘립니다.

### 4. 끝 슬래시 정책을 일관성 문제로 다루세요

호스트가 `/blog/post` → `/blog/post/`를 301로 정규화한다면, 모든 내부 링크는 처음부터 슬래시를 포함해야 합니다. 혼합된 형태는 다음을 낳습니다:

- 리다이렉트로 인한 크롤 예산 낭비
- 리다이렉트 적용 기간 중 정규 시그널 충돌
- 슬래시 있음과 없음이 섞인 hreflang

프레임워크 수준에서 정책을 정하고(Astro `trailingSlash: 'always'` 또는 `'never'`), 리포지토리를 grep하여 위반 사항이 남아 있지 않은지 확인하세요.

### 5. 교차 파일 검사로 드리프트를 탐지하세요

동일한 수치 또는 문자열 주장이 여러 표면에서 일치하는지를 grep으로 검사하는 CI 단계를 추가하세요:

```bash
# 오래된 저서 수가 남아 있으면 실패
! grep -rn "4 books\|4冊\|Kindle著者: 4" public/ src/data/ src/content/
```

더 나아가면, 인라인 `<script>` 내 JSON-LD와 별도의 `.jsonld` 파일을 모두 파싱하여, 공유 `@id` 값이 일치하는지 검증하는 검사기를 작성할 수 있습니다.

### 6. 릴리스 프로세스는 일관성 표면입니다

LLMO의 의미에서 버전 번호는 사실입니다 — AI가 인용할 수 있는 사이트에 관한 주장. `package.json`이 `1.2.0`이라 말하고, `src/data/version.ts`가 `1.1.0`이라 말하고, changelog 페이지가 영어판에서 `v1.2.0`, 일본어판에서 `v1.1.0`이라 말하고, 최신 git 태그가 `v1.1.0`이라면, 사이트는 동일한 사실에 대해 다섯 개의 표면에 걸쳐 자기 자신과 모순하고 있는 것입니다.

이것은 이론이 아닙니다. 여러분이 읽고 있는 이 프레임워크가 v1.2.0에서 바로 그 드리프트를 냈습니다. [자체 감사 사례 연구](/ko/case-studies/llmo-framework-self-audit/)에 무슨 일이 일어났는지 기록되어 있습니다.

이를 방지하는 패턴:

1. **가능한 한 많은 버전 표면을 하나의 출처에서 생성하세요**. `package.json` + 타입 지정 데이터 모듈 + changelog Markdown을 함께 업데이트하는 bump 스크립트는, 일관성을 가치로 내세우는 프레임워크에게 필수 인프라입니다.
2. **버전을 메타데이터 안이 아니라 런타임에 노출하세요**. 타입 지정 데이터 모듈에서 읽어 `v{VERSION}`을 표시하는 푸터는, 빌드 시점의 드리프트를 즉시 사용자에게 보이는 피드백으로 바꿉니다. `npm run build`를 실행하는 유지보수자는 모든 페이지에서 불일치를 발견하게 됩니다.
3. **릴리스를 교차 검사로 게이트하세요**. `package.json`의 버전을 읽고, `CHANGELOG.md` / `src/data/version.ts` / changelog 페이지에 같은 값이 있는지 grep하여, 하나라도 불일치하면 0이 아닌 코드로 종료하는 CI 단계를 두세요.
4. **태그를 붙이기 전에 읽기 전용 AI 2차 리뷰를 실행하세요**. 비용은 API 토큰으로 몇 센트이고, 이득은 사용자가 먼저 보기 전에 이 아이러니를 잡아내는 것입니다.

릴리스 프로세스는 프레임워크의 콘텐츠 표면이 AI에게 실시간으로 말하고 있는 것입니다. 동일한 규율로 다루세요.

### 7. 동일한 `@id`에 대한 중복 JSON-LD 엔티티를 피하세요

가장 흔한 silent failure: 레이아웃이 한 주소의 `Organization`을 출력하고, 페이지별 스니펫이 다른 주소의 `Organization`을 또 출력합니다. 둘 다 HTML에 남습니다. 크롤러는 둘 다 파싱합니다. 페이지의 신뢰 점수가 떨어집니다.

해결책: 각 엔티티에 프레임워크 수준에서 `@id`를 할당하고(`https://example.com/#org`, `#founder`, `#website`), 다른 모든 곳에서는 `@id`로만 참조하세요. 중복이 코드 리뷰에서 명백해집니다.

## 예시

**❌ 표면 간 드리프트:**

```markdown
# /ai/founder.md
- Publishing: Kindle author of 4 books
- Technical Writing: 39,000+ PV on Qiita
```

```astro
<!-- src/components/Profile.astro (홈페이지에 렌더링됨) -->
<p>Kindle 14冊・Qiita 80,000+ PV。</p>
```

```jsonld
// JSON-LD on /
{ "@type": "Person", "name": "Ken Imoto" /* 수치 없음 */ }
```

세 개의 표면, 세 개의 다른 이야기. `/ai/founder.md`를 인용하는 AI는 오래된 수치를 보고합니다. HTML을 인용하는 AI는 현재 수치를 보고합니다. JSON-LD는 모순 해결에 아무런 도움이 되지 않습니다.

**✅ 단일 출처:**

```typescript
// src/data/profile.ts — 정규
export const profile = {
  highlights: [
    'Kindle author: 14 books',
    'Qiita: 80,000+ PV',
  ],
};
```

```astro
<!-- 프로필 컴포넌트 -->
{profile.highlights.map(h => <li>{h}</li>)}
```

```typescript
// src/pages/founder.md.ts
return new Response(
  `# Founder\n\n${profile.highlights.map(h => `- ${h}`).join('\n')}`,
  { headers: { 'Content-Type': 'text/markdown' } }
);
```

하나의 값이 한 곳에 존재합니다. HTML 뷰, AI용 Markdown 엔드포인트, JSON-LD가 함께 진화합니다.

## 체크리스트

- [ ] 모든 사실 주장(숫자, 주소, 날짜, 카탈로그)에 대해 정규 출처 파일이 정확히 하나 지정되어 있는가
- [ ] AI 전용 표면(`llms.txt`, `/ai/*.md`, URL.md 엔드포인트)이 HTML과 같은 데이터에서 생성되며, 병행하여 손으로 유지보수되지 않는가
- [ ] 정규 호스트가 `<link rel="canonical">`, `og:url`, JSON-LD, 사이트맵, Markdown 표면에서 일관되는가
- [ ] 끝 슬래시 정책이 프레임워크 수준에서 설정되고 모든 내부 링크에 반영되는가
- [ ] 동일한 엔티티를 다른 값으로 기술하는 두 개의 JSON-LD 블록이 없는가; 엔티티가 페이지 간 참조에 안정적인 `@id`를 사용하는가
- [ ] CI가 핵심 지표(저서 수, PV 통계, 서비스 목록)에 대해 교차 파일 드리프트를 검사하는가
- [ ] 주기적인 2단계 감사(자체 리뷰 → 세컨드 오피니언 AI 리뷰)가 릴리스 간 드리프트를 포착하는가 — [LLMO 감사: 2단계 리뷰](/ko/guide/llmo-audit-two-pass-review/) 참조
