---
title: "LLMO Score v0.1 도그푸딩: 우리 자신의 6개 사이트에 Checker를 돌려봤다"
description: "공개한 llmo-checker CLI를 운영 중인 6개 사이트에 돌렸다. 모두 90 이상. 더 흥미로운 결과는 공개 직전에 거둬들인 다른 버전 쪽이다."
pubDate: 2026-05-24
---

Open LLMO Research Initiative의 첫 **Public Experiment Log**입니다.

방금 [`llmo-checker`](https://github.com/open-llmo/llmo-checker)를 공개했습니다. URL이 AI에 얼마나 잘 검색되는지 측정하는 Lighthouse 스타일 CLI(v0.1 Draft)입니다. 이걸로 가장 먼저 한 일은 우리가 운영하는 모든 사이트에 돌려보는 것이었습니다.

정정 후의 결과 헤드라인: **우리가 소유한 여섯 개 사이트 모두 90 이상**. 이 실험에서 더 useful한 artifact는 그 *정정*의 경위 쪽 — 아래에 자세히 적습니다.

## 방법

- 도구: `npx llmo-checker <url>` v0.1.0
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
| `propel-lab.co.jp` | 운영 연구소 공식 사이트 | **94** | well-grounded | `<meta name="description">` 47자(권장 80–200) |
| `legacydram.com` | 위스키 × 엔지니어 미디어 | **93** | well-grounded | JSON-LD 부분적(`Organization`/`Person` 없음) |
| `mypcrig.com` | PC 빌드 큐레이션 | **90** | well-grounded | `hreflang` 없음(단일 언어 사이트라 괜찮음) + JSON-LD 부분적 |
| `kaoriq.com` | 향수 이커머스 | **90** | well-grounded | robots.txt에 AI 봇 명시 규칙 없음 |

중앙값 93, 최저 90. well-grounded 대역 아래로 떨어진 사이트는 없습니다.

이건 우리가 공개 직전까지 적고 있던 표보다 훨씬 덜 드라마틱한 표입니다.

## 이 실험은 거의 다른 이야기가 될 뻔했다

이 글의 첫 초안에는 다른 헤드라인이 있었습니다: **"우리 자신의 법인 공식 사이트가 29 / 100, 테스트 중 최악."** 새 측정 프로젝트에 신용을 더해주는 종류의 self-critical 보고처럼 보였습니다.

이야기는 이렇게 흘렀습니다. `propel-lab.com`을 측정해 29 / 100, critical 대역. 루트에 curl을 걸었더니 HTML 한 줄이 돌아왔습니다:

```bash
$ curl -s https://propel-lab.com/
<!DOCTYPE html><html><head><script>window.onload=function(){window.location.href="/lander"}</script></head></html>
```

`window.location.href`로 `/lander`로 보내는 리다이렉트. 우리가 아는 모든 AI 크롤러에 invisible. 이어서 `/lander` 자체에 checker를 돌리니 **31 / 100**, 역시 critical. 두 층 모두 실패. 깔끔한 도덕 이야기가 잡혔습니다 — LLMO에 집중한 연구소의 법인 `.com`이, 자기가 설파하는 substrate 테스트를 통과하지 못한다는 이야기.

거의 그대로 공개될 뻔했습니다.

## 무엇이 멈춰 세웠나

발행 전에 그 리다이렉트 도착지의 HTML을 한 번 더 curl 해 봤더니, 세 가지 시그니처가 튀어나왔습니다:

```html
<script>window.LANDER_SYSTEM="PW"</script>
<script src="https://www.google.com/adsense/domains/caf.js"></script>
<script src="https://img1.wsimg.com/parking-lander/static/js/main.be9a3b28.js"></script>
```

이건 **도메인 파킹 페이지**의 지문입니다 — `wsimg.com/parking-lander`는 서드파티가 호스팅하는 파킹 템플릿이고, Google AdSense for Domains와 같이 서빙됩니다. 이 페이지는 파킹 비즈니스로 돌아가는 거지, 법인 사이트가 아닙니다.

`propel-lab.com`은 우리 소유가 아닙니다. 한 번도 아니었습니다. 법인 사이트는 `propel-lab.co.jp`이고, 점수는 **94 / 100** — well-grounded, 표에서 세 번째입니다.

우리가 잡았다고 생각한 도덕 이야기는, 다른 누군가가 파킹해 둔 도메인에 대한 이야기였습니다.

## 왜 이 경위를 log에 남기는가

발행 직전에 이런 near-miss를 잡았을 때 자연스러운 유혹은, 초안을 조용히 고쳐서 사건의 기록 없이 무난하고 솔직한 버전을 내보내는 것입니다. 우리는 그렇게 하지 않습니다. 세 가지 이유:

1. **near-miss를 숨기는 LLMO 이니셔티브는 나쁜 점수를 숨기는 이니셔티브와 같습니다.** falsifiability를 원칙으로 내건 이상, 그 falsification의 흔적을 남겨야 일관됩니다.
2. **파킹 도메인 패턴 자체가 valid한 substrate failure 사례입니다.** 브랜딩용으로 `.com`을 등록하고 거기에 진짜 사이트를 올리지 않은 사람은 모두, `propel-lab.com` 모양의 substrate를 AI 크롤러에 출고하고 있습니다. 누구의 도메인이었든 이 insight는 같습니다.
3. **도그푸딩의 결과는 90+ 일색의 데이터셋이었습니다.** 우리가 바랐던 증거로는 too clean. 자기 작품을 측정해서 최저가 90이라면, 알게 되는 것은 "나는 내 기준대로 일관되게 사이트를 만든다"뿐 — "그 기준이 무언가를 예측한다"는 아닙니다.

본질적 질문 — "LLMO Score는 실제 AI 인용 행동을 예측하는가?" — 은 전부 통과한 여섯 사이트 self-audit으로는 답이 안 됩니다. 외부 baseline 패널과 인용 상관 파일럿이 필요합니다. 이게 다음 두 Experiment Log입니다.

## 그래도 우리 자신의 사이트에서 바꿀 것

파킹 도메인 이야기를 빼더라도, 표에는 작게 손볼 만한 것이 있습니다:

1. **`propel-lab.co.jp`의 description** — 현재 47자, 권장 80–200. 포트폴리오 내 다른 법인 사이트 description과 같은 길이로 확장
2. **`mypcrig.com`과 `kaoriq.com`의 JSON-LD 커버리지 개선** — 둘 다 `jsonld`에서 82 / 100. 관련 타입(`Product`, `Person`, `Article`) 중 일부만 발행하고 있어서임
3. **`kaoriq.com`의 robots.txt에 AI 봇 정책 명시** — 현재 중립. GPTBot / ClaudeBot / Google-Extended에 대해 명시적 opt-in
4. **`llmoframework.com`과 `kenimoto.dev`의 `/llms.txt`에 링크 리스트 추가** — 현재는 prose만 있고 링크 섹션이 없음. 두 사이트 모두 `llms-txt` 가중치의 작은 부분을 잃고 있음

이게 끝나면 재측정한 점수와 함께 후속 Experiment Log를 공개하겠습니다. delta가 있든 없든 정직하게 적습니다.

## 예상 못 한 채로 배운 것

가장 또렷한 교훈은 substrate에 대한 게 아닙니다. narrative discipline에 대한 것입니다.

`propel-lab.com`의 점수가 29로 돌아온 순간, 첫 동작은 그 숫자를 둘러싸고 이야기를 짜는 것이었습니다. 이야기는 tight하고, 통념을 거스르고, 잘 공유될 만한 종류의 글이 되었을 겁니다. 그 숫자가 이야기를 가능하게 했습니다.

`propel-lab.com`을 우리가 소유한다는 사실은 확인 없이 전제되었습니다. 좋은 narrative가 있을 때 이런 전제는 강화됩니다 — 그 구멍을 인정하면 글 전체가 무너지기 때문에. 우리는 그걸 우연히 잡았습니다. 전제를 의심해서가 아니라, 추가 발견을 찾으려고 HTML의 다른 부분에 curl을 한 번 더 걸어 봤다가 잡혔습니다.

가치 제안이 **"AI substrate가 어떻게 보이는지 가정하기 전에 측정하라"**인 프로젝트가, **"무엇인지 가정하기 전에 도메인 소유권을 측정하지 않은"** 글을 거의 발행할 뻔했다는 건, 정확한 의미에서 부끄러운 일입니다.

## 이 실험의 한계

- v0.1은 substrate만 측정합니다. 어떤 사이트가 substrate에서 95점을 받아도, 콘텐츠 자체가 재미없거나, 이미 알려진 사실과 모순되거나, 권위가 더 높은 출처와 중복된다는 이유로 AI 인용이 0이 될 수 있습니다. Citation Visibility는 v0.2를 위해 예약해 둡니다.
- 점수 가중치(`llms-txt` 20, `robots-ai` 15, `canonical` 15, `jsonld` 20, `meta` 15)는 저자가 정한 디폴트이며, outcome 데이터에서 도출된 것이 아닙니다. 합리적인 디폴트이지 검증된 값이 아닙니다. Phase 2에서 인용 outcome 데이터를 모으면서 재캘리브레이션할 예정입니다.
- 홈페이지만 측정했습니다. 각 사이트의 기사 페이지는 점수가 다를 수 있습니다.
- 데이터셋은 우리가 우리 기준으로 직접 쓴 여섯 사이트입니다. 이 기준이 일반화되는지에 대해서는 아무것도 말해주지 않습니다.

## 이 실험 재현법

```bash
npx llmo-checker@0.1.0 https://llmoframework.com/
npx llmo-checker@0.1.0 https://kenimoto.dev/
npx llmo-checker@0.1.0 https://propel-lab.co.jp/
npx llmo-checker@0.1.0 https://legacydram.com/
npx llmo-checker@0.1.0 https://mypcrig.com/
npx llmo-checker@0.1.0 https://kaoriq.com/
```

기계 가독 출력은 `--json`을 붙입니다. 버전은 `@0.1.0`으로 고정하세요. JSON 형식은 v0.2에서 바뀔 수 있습니다.

파킹 도메인 탐지를 재현하려면 추가로:

```bash
npx llmo-checker@0.1.0 https://propel-lab.com/
npx llmo-checker@0.1.0 https://propel-lab.com/lander
curl -s https://propel-lab.com/lander | head -1
```

처음 둘은 critical 점수를 돌려줍니다. 세 번째는 HTML에서 `LANDER_SYSTEM` / `parking-lander` / `adsense/domains` 마커를 떠올려줍니다.

## 다음 일

이건 Public Experiment Log 시리즈의 첫 회입니다. 다음에 돌릴 예정인 두 가지:

- **외부 베이스라인 패널** — 트래픽 높은 기술 사이트(문서 포털, 개발자 블로그, 제품 마케팅 사이트) 수십 개에 점수를 매기고 분포를 공개합니다. "보통"이 어떻게 생겼는지를 캘리브레이션합니다 — 이 self-audit 하나만으로는 만들 수 없는 비교입니다.
- **인용 상관 파일럿** — 약 50개 URL에 대해 LLMO Score와 실제 AI 인용율(ChatGPT, Claude, Perplexity 탐색)을 비교합니다. 점수가 주장하는 outcome을 실제로 예측하는지에 대한 첫 본격 테스트입니다.

전체 로드맵은 [Experimental Projects](/ko/experimental-projects/)에 있고, v0.1 점수 가중치 정의는 [Score v0.1 Draft Specification](/ko/specifications/score-v01/)에 있습니다.
