---
title: "LLMO Score v0.1 도그푸딩: 우리 자신의 6개 사이트에 Checker를 돌려봤다"
description: "방금 공개한 llmo-checker CLI를 운영 중인 6개 사이트에 돌렸다. LLMOFramework을 운영하는 연구소의 공식 사이트도 포함되어 있다. 공식 사이트 점수는 29 / 100."
pubDate: 2026-05-24
---

Open LLMO Research Initiative의 첫 **Public Experiment Log**입니다.

방금 [`llmo-checker`](https://github.com/open-llmo/llmo-checker)를 공개했습니다. URL이 AI에게 얼마나 잘 검색되는지 측정하는 Lighthouse 스타일 CLI(v0.1 Draft)입니다. 이걸로 가장 먼저 한 일은, 우리가 운영하는 모든 사이트에 돌려보는 것이었습니다. 이 이니셔티브를 운영하는 연구소의 공식 사이트까지 포함해서요.

결과의 헤드라인: **우리 자신의 공식 사이트가 29 / 100을 기록**했습니다. 그 사이트가 참조로 삼아야 할 소비자 대상 사이트들 모두보다 낮았습니다.

## 방법

- 도구: `npx llmo-checker <url>` v0.1.0 (commit `1db47ea`)
- 날짜: 2026-05-24
- 사이트: 우리가 보유하거나 운영하는 6개 자산
- 점수: 5개 정적 체크의 가중 평균 — `llms-txt`(가중치 20), `robots-ai`(15), `canonical`(15), `jsonld`(20), `meta`(15)
- 점수대: 85+ well-grounded · 65–84 needs work · 40–64 poor · 0–39 critical

모든 체크는 순수 HTTP fetch와 HTML 파싱입니다. v0.1에는 AI 인용 시뮬레이션이 없습니다. 점수는 AI 크롤러가 실제로 볼 수 있는 **substrate(기반)**만을 측정합니다.

## 결과

| 사이트 | 역할 | 점수 | 대역 | 가장 약한 체크 |
|---|---|---|---|---|
| `llmoframework.com` | 이 이니셔티브의 사이트 | **96** | well-grounded | `llms-txt`에 링크 리스트 없음(가벼움) |
| `kenimoto.dev` | 저자 개인 사이트 | **96** | well-grounded | 위와 동일 |
| `legacydram.com` | 위스키 × 엔지니어 미디어 | **93** | well-grounded | JSON-LD 부분적(`Organization`/`Person` 없음) |
| `mypcrig.com` | PC 빌드 큐레이션 | **90** | well-grounded | `hreflang` 없음(단일 언어 사이트라 괜찮음) + JSON-LD 부분적 |
| `kaoriq.com` | 향수 이커머스 | **90** | well-grounded | robots.txt에 AI 봇 명시 규칙 없음 |
| **`propel-lab.com`** | **운영 연구소 공식 사이트** | **29** | **critical** | 거의 전부 |

`propel-lab.com`은 이 이니셔티브 자체를 운영하는 연구소의 공식 사이트입니다. 우리가 출하하는 모든 소비자 대상 제품 사이트보다 점수가 낮았습니다.

## 공식 사이트가 왜 실패했는가

루트를 curl 하면 사연이 다 드러납니다:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

`propel-lab.com`의 루트는 **HTML 한 줄**입니다. `window.location.href` 리다이렉트가 브라우저에서 실행되어 방문자를 `/lander`로 보냅니다.

크롬을 쓰는 사람한테는 문제 없습니다. 하지만 우리가 아는 모든 AI 크롤러에게는 보이지 않습니다. GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot, Applebot-Extended 중 어느 것도 fetch 시점에 JavaScript를 실행하지 않습니다. 위의 raw HTML을 보고 거기서 멈춥니다.

그래서 루트 URL(대부분의 AI 시스템이 가장 먼저 탐색하는 URL)에서 checker가 발견한 것은:

- `<title>` 없음
- `<meta name="description">` 없음
- OpenGraph 없음
- `<h1>` 요소 0개
- `<html lang>` 없음
- JSON-LD 없음
- `<link rel="canonical">` 없음

이어서 checker를 **리다이렉트 대상**인 `https://propel-lab.com/lander`에 돌렸습니다. **31 / 100**, 역시 critical이었습니다. 대상 페이지에는 콘텐츠가 있지만 canonical도, JSON-LD도 없고, 메타데이터도 약합니다.

두 층 다 실패입니다.

## 이게 무슨 뜻인가

흔한 패턴이 있습니다. 공식 사이트에 "splash → landing" 구조를 띄우고, 구글이 JS를 잘 처리해 줄 거라고 가정하고, JS 없는 크롤러 입장에서 페이지가 어떻게 보이는지는 한 번도 확인하지 않는 것. 이 가정은 구글 검색에 대해서는 대체로 맞았습니다. **2026년의 AI 크롤러에 대해서는 대체로 틀립니다.**

우리 사례에서는, *LLMO에 집중한 연구소*의 공식 사이트가 정확히 이 함정에 빠져 있었습니다. 우리는 substrate를 들여다보게 강제하는 도구를 만들었기 때문에 잡아냈습니다. 도구가 없었다면, 사람용 UX가 깔끔해 보인다는 이유로 모든 게 괜찮다고 계속 가정했을 것입니다.

이것이 바로 checker를 OSS로 공개하는 의의 그 자체입니다. substrate의 틈은 측정하기 전까지 보이지 않습니다.

## 우리가 바꿀 것

이 실험의 결과로 공개 백로그에 추가하는 항목:

1. **`propel-lab.com/`을 서버 사이드 리다이렉트로 교체** — JS 리다이렉트를 301로 바꾸거나 landing 콘텐츠를 루트에서 직접 렌더링
2. **`/lander`에 canonical + JSON-LD `Organization` + OG 메타데이터 추가** — 단독 점수를 31에서 85+로
3. **checker를 smoke step으로 자동화** — 우리 자체 deploy 파이프라인에 감사를 끼워 넣어, 앞으로의 회귀가 즉시 떠오르게
4. **`mypcrig.com`과 `kaoriq.com`의 JSON-LD 커버리지 개선** — 둘 다 `jsonld`에서 82 / 100에 머물러 있는 것은, 관련 타입(`Product`, `Person`, `Article`) 중 일부만 발행하고 있어서임
5. **`kaoriq.com`의 robots.txt에 AI 봇 정책 명시** — 지금은 중립. GPTBot / ClaudeBot / Google-Extended에 대해 명시적으로 opt-in할 방침

이게 끝나면 재측정한 점수와 함께 후속 Experiment Log를 공개하겠습니다. delta가 있든 없든 정직하게 적습니다.

## 나쁜 점수를 왜 공표하는가

측정 도구를 출하하면, 자연스럽게 그것을 주로 경쟁사에 쓰고 싶다는 충동이 생깁니다. 우리는 의도적으로 반대로 합니다. `llmo-checker`의 첫 공개 데이터셋은 **우리 자신의 자산**, 그중에서도 가장 나쁜 점수를 받은 것까지 포함합니다.

이유는 둘:

1. **점수는 반증 가능해야 합니다.** 우리가 보유한 것에 대해 실패 점수를 한 번도 공개하지 않는다면, 외부에서 이 채점이 정직하다고 믿을 이유가 없습니다.
2. **이 이니셔티브의 신뢰는 artifact에서 오지 framing에서 오지 않습니다.** 자기 공식 사이트를 29 / 100으로 공개하는 연구소가, 매니페스토를 내놓고 자체 평가 100 / 100을 내놓는 연구소보다 더 신뢰받습니다.

## 이 실험의 한계

- v0.1은 substrate만 측정합니다. 어떤 사이트가 substrate에서 95점을 받아도, 콘텐츠 자체가 재미없거나, 이미 알려진 사실과 모순되거나, 권위가 더 높은 출처와 중복된다는 이유로 AI 인용이 0이 될 수 있습니다. Citation Visibility는 v0.2를 위해 예약해 둡니다.
- 점수 가중치(`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15)는 저자가 정한 디폴트이며, outcome 데이터에서 도출된 것이 아닙니다. 합리적인 디폴트이지 검증된 값이 아닙니다. Phase 2에서 인용 outcome 데이터를 모으면서 재캘리브레이션할 예정입니다.
- 홈페이지만 측정했습니다. 각 사이트의 기사 페이지는 점수가 다를 수 있습니다.

## 이 실험 재현법

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
```

기계 가독 출력은 `--json`을 붙입니다. 버전은 `@0.1.0`으로 고정하세요. JSON 형식은 v0.2에서 바뀔 수 있습니다.

## 다음 일

이건 Public Experiment Log 시리즈의 첫 회입니다. 다음에 돌릴 예정인 두 가지:

- **외부 베이스라인 패널** — 트래픽 높은 기술 사이트(문서 포털, 개발자 블로그, 제품 마케팅 사이트) 수십 개에 점수를 매기고 분포를 공개합니다. "보통"이 어떻게 생겼는지를 캘리브레이션합니다.
- **인용 상관 파일럿** — 약 50개 URL에 대해 LLMO Score와 실제 AI 인용율(ChatGPT, Claude, Perplexity 탐색)을 비교합니다. 점수가 주장하는 outcome을 실제로 예측하는지에 대한 첫 본격 테스트입니다.

전체 로드맵은 [Experimental Projects](/ko/experimental-projects/)에 있고, v0.1 점수 가중치 정의는 [Score v0.1 Draft Specification](/ko/specifications/score-v01/)에 있습니다.
