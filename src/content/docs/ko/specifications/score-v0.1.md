---
title: "LLMOFramework Score v0.1 — Draft Specification"
description: "LLMOFramework Score v0.1 Draft의 정식 정의: 5개 substrate 체크, 가중치, 채점 규칙, JSON 출력 schema. 참조 구현: llmo-checker."
pubDate: 2026-05-24
---

> **Status: Draft.** v0.1은 최초 공개 버전입니다. 가중치, 체크 목록, JSON 출력 shape이 v0.2에서 하위 호환 없이 바뀔 수 있습니다. JSON shape에 의존한다면 checker 버전을 핀으로 고정하세요.

LLMOFramework Score는 URL이 AI에 얼마나 잘 검색되는지를 단일 숫자(0–100)로 요약한 값입니다. v0.1 score는 **substrate 신호만 측정**합니다. 즉 AI 크롤러가 단일 HTTP fetch로 추출 가능한 정적 신호이며, JavaScript 실행, LLM 호출, retrieval 시뮬레이션은 하지 않습니다.

참조 구현은 OSS CLI [`llmo-checker`](https://github.com/open-llmo/llmo-checker)이며, Open LLMO Research Initiative가 관리합니다.

## 설계 원칙

1. **behavior보다 substrate가 먼저.** v0.1은 단일 HTTP fetch에서 AI 크롤러가 뽑을 수 있는 신호만 측정합니다. 행위 기반 신호(citation, retrieval stability, LLM 읽기)는 v0.2+로 미룹니다.
2. **재현 가능.** 모든 체크는 fetch한 HTML, robots.txt, llms.txt의 순수 함수입니다. 그 이상의 네트워크 호출 없음, AI 호출 없음, 시계 의존 동작 없음.
3. **반증 가능한 채점.** 각 체크는 자신의 채점 규칙을 공개합니다. 규칙에 동의하지 않으면 checker와 spec을 나란히 돌려서 어디서 어긋나는지 보일 수 있습니다.
4. **정직한 가중치.** v0.1 가중치는 저자가 설정한 디폴트이며 outcome 데이터에서 도출한 것이 아닙니다. v0.2에서는 [인용 상관 파일럿](/ko/experiments/dogfooding-our-own-sites/)으로 재캘리브레이션합니다.

## Score 구성

Score는 5개 체크의 가중 평균입니다:

| ID | 가중치 | 측정 내용 |
|---|---|---|
| `llms-txt` | 20 | `/llms.txt`의 존재와 구조 |
| `robots-ai` | 15 | `/robots.txt`에서 알려진 AI 크롤러에 대한 명시적 입장 |
| `canonical` | 15 | `<link rel="canonical">`의 정확성과 `hreflang` 대안 |
| `jsonld` | 20 | JSON-LD 구조화 데이터의 존재, parse 가능성, 인식된 schema.org `@type` |
| `meta` | 15 | `<title>`, `<meta name="description">`, OpenGraph, `<h1>`, `<html lang>` |

v0.1 총 가중치: **85**. Score는 가중 평균으로 0–100에 정규화됩니다.

### Score 대역

| 대역 | Score | 해석 |
|---|---|---|
| 초록 | 85–100 | AI retrieval에 잘 자리잡음 |
| 노랑 | 65–84 | 손볼 부분 있음 — 여러 신호가 빠지거나 약함 |
| 노랑 | 40–64 | 부족 — substrate에 큰 구멍 |
| 빨강 | 0–39 | 치명적 — 페이지가 AI 크롤러에 거의 보이지 않음 |

## 체크별 사양

### `llms-txt` (가중치 20)

**Fetch:** `GET {origin}/llms.txt`

**채점:**

| 조건 | Score 영향 |
|---|---|
| HTTP 404 또는 5xx | 0 |
| Body 비어 있음 | 10 |
| Body 비어 있지 않음 (base) | 60 |
| 최상위 `# Title` 줄 존재 | +15 |
| 적어도 하나의 `## Section` 헤딩 | +10 |
| `^- \[` 패턴의 링크 항목 ≥ 3 | +15 |
| 링크 항목 1–2 | +8 |
| 링크 항목 0 | +5 |

**Status:** 85 이상 `pass`, 60 이상 `warn`, 그 외 `fail`.

참조 spec: [llmstxt.org](https://llmstxt.org/).

### `robots-ai` (가중치 15)

**Fetch:** `GET {origin}/robots.txt`

**인식하는 AI user-agent (v0.1):** `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `CCBot`, `Google-Extended`, `PerplexityBot`, `Applebot-Extended`, `cohere-ai`.

**채점:**

| 조건 | Score 영향 |
|---|---|
| HTTP 404 | 60 (warn — 명시적 입장 권장) |
| HTTP 5xx | 0 |
| Body 파싱 가능 (base) | 70 |
| 인식되는 AI 봇 ≥ 3개 명시 | +20 |
| 인식되는 AI 봇 1–2개 명시 | +10 |
| 와일드카드 `User-agent: *` 그룹 존재 | +10 |

**Status:** 85 이상 `pass`, 60 이상 `warn`, 그 외 `fail`. Score는 100에서 클램프.

언급 자체가 카운트되며 규칙이 `Allow`인지 `Disallow`인지는 판정에 영향을 주지 않습니다. v0.1은 JSON 출력에 `disallowedBots`를 기록하지만 Disallow를 감점하지 않습니다 — AI 크롤러를 opt-out 하는 것도 유효한 입장입니다.

### `canonical` (가중치 15)

**소스:** fetch한 HTML.

**채점:**

| 조건 | Score 영향 |
|---|---|
| `<link rel="canonical">` 없음 | 0 (fail) |
| `href`가 유효한 URL 아님 | 20 (fail) |
| canonical이 다른 origin을 가리킴 | 60 (warn) |
| canonical이 같은 origin을 가리킴 (base) | 90 (pass) |
| `<link rel="alternate" hreflang>` 존재 | +10 |

**Status:** canonical이 존재하고 같은 origin이면 `pass`, cross-origin이면 `warn`, 그 외 `fail`. Score는 100에서 클램프.

Cross-origin canonical은 재게시 미러로 의도되기도 하지만, 디폴트로는 감점합니다. 설정 실수일 가능성이 더 높기 때문입니다.

### `jsonld` (가중치 20)

**소스:** fetch한 HTML 내의 모든 `<script type="application/ld+json">` 블록.

**인식하는 schema.org 엔티티 타입 (v0.1):** `Organization`, `Person`, `Article`, `BlogPosting`, `TechArticle`, `Book`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `HowTo`, `Product`, `SoftwareApplication`.

**채점:**

| 조건 | Score 영향 |
|---|---|
| JSON-LD 블록 없음 | 0 (fail) |
| 적어도 하나의 파싱 가능 블록 (base) | 50 |
| 인식되는 `@type`당 (최대 3개까지) | +12 각각 |
| `Organization` 또는 `Person` 존재 | +8 |
| 어떤 블록이라도 파싱 실패 | −20 |

checker는 `@graph` 배열을 재귀적으로 순회해 타입을 모읍니다.

**Status:** 85 이상 `pass`, 50 이상 `warn`, 그 외 `fail`. Score는 0–100에서 클램프.

### `meta` (가중치 15)

**소스:** fetch한 HTML의 `<head>`와 첫 `<body>`.

**채점:**

| 신호 | Score 영향 |
|---|---|
| `<title>` 길이 20–70 | +20 |
| `<title>` 존재하지만 20–70 밖 | +10 |
| `<meta name="description">` 길이 80–200 | +20 |
| description 존재하지만 80–200 밖 | +10 |
| OpenGraph `title` + `description` 모두 존재 | +20 |
| OpenGraph `type` 존재 | +10 |
| `<h1>` 정확히 한 개 | +20 |
| `<html lang>` 속성 존재 | +10 |

**Status:** 85 이상 `pass`, 60 이상 `warn`, 그 외 `fail`. Score는 100에서 클램프.

## JSON 출력 schema

CLI의 `--json` 출력과 프로그래밍 API는 다음을 반환합니다:

```typescript
interface CheckerReport {
  url: string;              // 해결된 입력 URL
  origin: string;           // 페이지의 URL.origin
  timestamp: string;        // ISO 8601
  checkerVersion: string;   // CLI의 semver
  scoreVersion: "0.1";      // 이 사양의 버전
  score: number;            // 가중 평균, 0-100
  checks: CheckResult[];
}

interface CheckResult {
  id: string;               // 안정된 체크 식별자 (예: "llms-txt")
  name: string;             // 사람이 읽기 좋은 표시 이름
  status: "pass" | "warn" | "fail" | "skip";
  score: number;            // 0-100
  weight: number;           // 전체 score에 대한 기여도
  details: Record<string, unknown>;  // 체크별 데이터
  notes: string[];          // 사람이 읽고 조치 가능한 노트
}
```

**v0.1에서의 안정성 보장:**

- 최상위 필드 이름(`url`, `origin`, `timestamp`, `checkerVersion`, `scoreVersion`, `score`, `checks`)은 모든 0.1.x 릴리스에서 안정
- 각 체크의 `id`, `weight`, 전체 `status`/`score` shape은 안정
- `details` shape은 0.1.x 내에서 **안정 보장 없음** — 패치 릴리스에서 필드가 추가될 수 있음
- `checks` 내의 `id` 집합은 0.1.x 내에서 안정 (v0.2 릴리스 없이는 새 체크 추가 안 함)

## 종료 코드 (CLI)

| 코드 | 의미 |
|---|---|
| 0 | Score ≥ 50 (최소선 통과) |
| 1 | Score < 50 (최소선 미달) |
| 2 | Fetch 오류 (네트워크, DNS, 비-2xx 응답) |

이렇게 하면 CLI를 CI smoke check로 쓸 수 있습니다 — 떨어진 사이트가 파이프라인을 떨어뜨립니다.

## 참조 구현

소스: [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker)

```bash
npx llmo-checker https://example.com
npx llmo-checker https://example.com --json
```

Node.js 20+ 필요.

참조 구현과 이 spec이 어긋나면, 의도상 spec이 옳고 구현이 고쳐져야 합니다 — [이슈를 올려 주세요](https://github.com/open-llmo/llmo-checker/issues).

## v0.1이 의도적으로 측정하지 않는 것

LLMO에 대해 타당한 관심사이지만 v0.1에 포함하지 않은 항목과 그 이유:

| 지표 | 미루는 이유 |
|---|---|
| Citation Visibility | AI 어시스턴트 탐색 필요. 순수 정적 체크 범위 밖. v0.2에서 옵션 opt-in 체크로 예정. |
| Chunk Readability | chunking 전략 선택 필요. v0.2에서는 문서화된 기본 chunker를 써서 재현성 확보. |
| Markdown Quality | Markdown 소스가 게시된 경우에만 적용. v0.2에서 `/index.md` 형식 endpoint 감지 예정. |
| 콘텐츠 품질 / 정확성 | 범위 밖. score는 substrate를 재지, 편집 품질을 재지 않습니다. |
| 시간에 따른 retrieval 안정성 | 종단 탐색 필요. URL별 Score가 아니라 Benchmark 프로젝트의 담당. |

## 버전 정책

Score 버전은 참조 구현 버전과 독립적입니다. Score v0.1은 `llmo-checker@0.1.x` (어느 patch든) 가 구현합니다. Score v0.2는 `llmo-checker@0.2.x`가 필요합니다.

Draft 단계에서는 score의 minor 버전(0.1 → 0.2) 사이의 호환성 깨짐을 전제하고 있습니다. 1.0 사양은 Phase 2 (Community)가 끝난 뒤에만 — 즉 인용 상관 파일럿의 outcome 데이터를 확보하고, 외부 구현이 존재하고, 가중치를 재캘리브레이션한 뒤에만 — 공개합니다.

## 기여

Spec 변경은 [llmo-guide repo](https://github.com/kenimo49/llmo-guide/issues)(이 사이트의 소스)의 이슈로 받습니다.

새 체크나 가중치 변경을 제안할 때:

1. 신호 이름과 무엇을 재는지 한 문장으로
2. 채점 규칙 (v0.2+가 아닌 한, 단일 HTTP fetch에서 결정론적으로 계산 가능해야 함)
3. 가중치의 근거 (논문, 공개 실험, 또는 Lighthouse 식의 논증)
4. 재현기 (제안 규칙 하에서 고득점이 나오는 URL과 저득점이 나오는 URL)

구현 변경은 [`open-llmo/llmo-checker`](https://github.com/open-llmo/llmo-checker) 쪽에서 받습니다.

## 감사의 말

Score의 구조는 [Lighthouse](https://developer.chrome.com/docs/lighthouse/)(Google)와 [llms.txt 제안](https://llmstxt.org/)(Jeremy Howard)의 영향을 강하게 받았습니다. 두 가지 모두 잘 설계되어 있고, 의견이 분명하고, 반증 가능합니다 — 우리가 보존하고자 한 속성들입니다.
