---
title: "Public Experiment Log #2: 외부 베이스라인 패널"
description: "고트래픽 기술 사이트 39개를 llmo-checker@0.1.0으로 측정해 \"보통\"이 어떻게 생겼는지 캘리브레이션했습니다. 중앙값은 61. 가장 큰 문서 포털 중 셋이 40 미만입니다."
---

첫 Public Experiment Log에서는 우리가 소유한 여섯 사이트를 측정했습니다. 여섯 곳 모두 90 이상. 그 글은 무언가의 증거로 삼기에는 너무 깨끗하다는 점을 정직하게 인정했습니다. 이번 글은 그 첫 log가 줄 수 없었던 캘리브레이션입니다 — 우리가 소유하지 않은 고트래픽 기술 사이트 39개의 패널을, 같은 도구로, 같은 날에 측정했습니다.

헤드라인은 따분하면서 불편합니다. 따분한 쪽: 중앙값 61, 표준편차 19.5 — "good"보다 한참 아래에 중심을 둔, 정상적으로 보이는 분포. 불편한 쪽: 현대 웹에서 가장 많이 방문되는 문서 포털 셋 — `rust-lang.org`, `tailwindcss.com`, `djangoproject.com` — 이 40 미만입니다.

## 방법

40개 URL 패널을 세 카테고리에 걸쳐 선정했습니다: 개발자용 문서(20), 제품 마케팅 사이트(12), 엔지니어링 블로그(6). 별도의 "AI 제공자 docs" sanity-check 짝으로 두 개(`docs.anthropic.com`, `platform.openai.com/docs/`)를 추가했습니다. 선정은 측정 run 전에 끝냈고, score를 보고 URL을 추가하거나 빼지 않았습니다.

40개 URL을 `llmo-checker@0.1.0`로 단일 배치 run에서 측정했고, 요청 사이에 1초 delay를 두었습니다. URL 하나(`platform.openai.com/docs/`)가 parse error를 돌려줘 제외했고, **n = 39**가 남았습니다.

모든 요청에 동일한 User-Agent(`llmo-checker/0.1.0`)를 사용했습니다 — 우리 권장 사항을 읽은 AI 크롤러가 보낼 것과 같은 형태입니다. 재시도한 사이트는 없습니다. 첫 측정값을 그대로 채택했습니다.

## 결과

| 통계량 | 값 |
|---|---|
| n | 39 |
| Mean | 58.8 |
| Median | 61 |
| Stdev | 19.5 |
| Q1 / Q3 | 45 / 69 |
| Min / Max | 23 / 94 |

### Score 분포 (10점 버킷)

```
 20-29  ███         3
 30-39  ████        4
 40-49  █████████   9
 50-59  ██          2
 60-69  ████████████ 12
 70-79  █           1
 80-89  █████       5
 90-99  ███         3
```

분포는 대체로 이중 봉우리 모양입니다: 한 무리는 40–49(기계 가독성이 약한 초중반 티어 사이트), 더 큰 무리는 60–69(대부분은 갖춰져 있지만 `jsonld` 또는 `llms.txt`가 빠진 중간 티어 사이트)입니다.

### Top 5

| # | 사이트 | Score |
|---|---|---|
| 1 | `supabase.com` | 94 |
| 2 | `redis.io` | 93 |
| 2 | `www.cloudflare.com` | 93 |
| 4 | `stripe.com` | 89 |
| 5 | `docs.docker.com` | 84 |

### Bottom 5

| # | 사이트 | Score |
|---|---|---|
| 39 | `www.rust-lang.org` | 23 |
| 38 | `tailwindcss.com` | 25 |
| 37 | `www.djangoproject.com` | 26 |
| 36 | `www.postgresql.org` | 32 |
| 35 | `golang.org` | 37 |

### 카테고리별

| 카테고리 | n | Median | Mean | Range |
|---|---|---|---|---|
| 제품 마케팅 | 12 | 68.5 | 74.8 | 58–94 |
| 개발자 블로그 | 6 | 65.0 | 65.3 | 44–80 |
| 문서 | 20 | 45.5 | 48.0 | 23–93 |

### 체크별 중앙값

| Check | Median | Mean | Range |
|---|---|---|---|
| `llms-txt` | 90 | 54.9 | 0–100 |
| `robots-ai` | 80 | 78.7 | 60–100 |
| `canonical` | 90 | 67.9 | 0–100 |
| `jsonld` | **0** | 26.1 | 0–94 |
| `meta` | 80 | 78.5 | 0–100 |

## 무엇이 의외였나

**문서 사이트가 가장 약한 카테고리.** 미리 물었다면 우리는 거꾸로 답했을 예측입니다. 우리 자신도 데이터가 들어오기 전까지의 디폴트 가정은 docs 포털이 *가장 강한* 카테고리일 것이라는 쪽이었습니다 — 사람에게도 검색 엔진에게도 오랫동안 큐레이션된 권위 있는 출처였기 때문입니다. 데이터는 정반대입니다: 문서 중앙값(45.5)은 제품 마케팅 중앙값(68.5)보다 20점 이상 낮습니다. 문서 포털은 널리 사랑받고, 성숙하고, 사람을 위해 잘 만들어져 있지만, 평균적으로 같은 팀이 기계 가독 표면에는 투자하지 않았습니다.

**schema.org의 바닥은 매우 낮다.** 패널의 `jsonld` 중앙값은 **0**입니다. 이 잘 알려진 기술 사이트의 절반 이상이 인식 가능한 JSON-LD `@type`을 하나도 내보내지 않습니다. mean(26)은 소수의 잘 계측된 사이트(대부분 제품 마케팅)에 의해 끌어올려진 값입니다. `jsonld` score 0이 그 사이트가 망가졌다는 뜻은 아닙니다 — AI 크롤러가 인용을 ground 할 entity graph 표면이 없다는 뜻입니다.

**`llms.txt`는 점진적이지 않고 이중 봉우리.** 중앙값은 90이지만 mean은 54.9입니다. 사이트는 spec 준수 `/llms.txt`에 투자했거나(깔끔한 90대와 100), 아예 파일이 없거나(0) 둘 중 하나입니다. 중간에 앉은 사이트는 거의 없습니다. 0 → 90+로 가는 비용이 다단계 마이그레이션이 아니라 파일 하나의 commit이라는 뜻입니다.

**최하위 셋은 누구나 아는 이름.** `rust-lang.org`(23), `tailwindcss.com`(25), `djangoproject.com`(26)은 전체 패널에서 가장 낮은 점수입니다. 동시에 어떤 합리적인 트래픽 추정으로 봐도 웹에서 가장 많이 방문되는 개발자 URL에 속합니다. score는 트래픽, 브랜드 인지도, 콘텐츠 품질을 재는 게 아닙니다. AI 크롤러가 페이지 메타데이터에서 인용을 ground 할 수 있는지 그 하나의 축을 잴 뿐이고, 그 축에서 이 셋은 바닥에 있습니다.

**`Cloudflare` 패밀리는 세 URL에서 93 / 64 / 44.** `www.cloudflare.com`(93)이 제품 페이지 정점, `www.cloudflare.com/blog/`(64)가 블로그 인덱스, `blog.cloudflare.com`(44)이 블로그의 서브도메인 프런트엔드입니다. 같은 엔지니어링 조직, 세 다른 표면, 50점 차. 멀티 사이트 조직은 이런 식으로 들쭉날쭉한 경우가 많고, 우리 포트폴리오도 그랬습니다(v1.5.1 Experiment Log가 90–99 vs 96 vs 94의 우리 자신의 spread를 이미 기록했습니다).

## 우리가 소유한 사이트는 어디에 있나

첫 Experiment Log는 우리 소유 사이트 여섯을 93–99로 측정했습니다. 단독으로는 불편할 만큼 높아 보였습니다. 이제 맥락이 생겼습니다:

| 사이트 | Score | 패널 백분위(근사) |
|---|---|---|
| `llmoframework.com` | 99 | > 99th |
| `kenimoto.dev` | 99 | > 99th |
| `kaoriq.com` | 96 | > 95th |
| `propel-lab.co.jp` | 96 | > 95th |
| `mypcrig.com` | 93 | > 90th (`supabase.com`과 `redis.io`와 동률) |
| `legacydram.com` | — | (이번 run에서는 재측정하지 않음) |

39개 사이트 고트래픽 기술 패널의 정점에 우리 소유 사이트가 자리 잡고 있습니다. 우리 콘텐츠가 `rust-lang.org`나 `stripe.com`의 콘텐츠보다 낫다는 뜻으로 받아들이지 않습니다. score가 겨냥하는 다섯 가지 기계적 체크를 우리가 측정하고 고쳐 왔다는 뜻이고, 자기 손으로 만든 도구가 쉽게 만들어 줘야 할 일이 바로 그런 일입니다.

이게 첫 log에 빠져 있던 캘리브레이션입니다. 우리가 앉아 있는 90+ 무리는 정상이 아닙니다. 기계 가독 표면을 특정해 최적화하기로 결정한 사이트들의 무리이고, 이 패널에서는 그 결정이 정점의 작은 그룹과 40–69 띠의 긴 꼬리를 갈라놓습니다.

## 이것이 아직 증명하지 못하는 것

score는 내부적으로 일관됩니다(Experiment Log #1 update가 fix가 spec 예측대로 delta를 만들어내는 것을 확인했습니다). score에는 이제 비교할 외부 패널도 생겼습니다. 그러나 이 두 사실 어느 쪽도 "score가 높으면 AI 인용율이 더 높아진다"를 증명한 것과 같지 않습니다.

그건 여전히 Experiment Log #3(인용 상관 파일럿)의 일입니다. score 전 범위를 가로지르는 50개 URL — 이 패널의 bottom 5와 top 5 일부를 포함 — 에 대해 LLMO Score와 실제 AI 인용율(Perplexity API + ChatGPT search + Claude web tool)을 비교할 예정입니다. score가 실제라면, 이 패널의 bottom 5는 같은 출처가 신뢰할 만한 쿼리에 대해 top 5보다 눈에 띄게 덜 인용되어야 합니다.

이 update의 정직한 버전: score는 측정 도구가 통과해야 할 세 시험 중 둘을 통과했습니다. 내부적으로 일관되고(v1.5.2 update), 신뢰할 만한 외부 패널에 대해 평탄하지 않은 분포를 만들어냅니다(이 log). 세 번째 시험 — 주장한 outcome을 실제로 예측하는가 — 이 프로젝트를 계속할 가치가 있는지 결정하는 시험입니다.

## 한계

패널은 작고(n = 39) 영어권입니다. 일본어, 중국어, 독일어, 프랑스어 사이트는 run에 들어가 있지 않습니다 — 첫 패널의 초점을 좁히기 위한 의도적 선택이지만, 언어 간 캘리브레이션에는 분명한 제약입니다.

카테고리 분할이 균등하지 않습니다: 문서 20, 제품 마케팅 12, 개발자 블로그 6. 이 때문에 카테고리별 중앙값은 방향성은 있어도 통계적으로 단단하지 않습니다(특히 n = 6의 개발자 블로그).

선정은 측정 run 전에 우리가 직접 했습니다. "약한 사이트를 cherry-pick 했다"는 반론을 최소화하기 위해 잘 알려진 고트래픽 기술 URL을 선호했지만, 선정 편향이 없다고 단언할 수는 없습니다. raw URL 리스트는 이 글과 함께 commit 했습니다(`experiments/external-baseline-2026-05/urls.txt`). 패널을 재현하거나 확장하는 데 쓸 수 있습니다.

`platform.openai.com/docs/`는 checker가 parse 가능한 JSON을 돌려주지 않아 제외했습니다. survivorship bias 한 점이 생긴 셈입니다. AI 제공자 docs 비교는 한 점(`docs.anthropic.com`은 64)보다 두 점일 때 더 흥미로웠을 겁니다.

## 이 실험 재현법

```bash
git clone https://github.com/open-llmo/llmo-checker
cd llmo-checker
npm install && npm run build

# URL 리스트와 run 스크립트 가져오기
cd experiments/external-baseline-2026-05
cat urls.txt          # 40 URLs
bash run-measurements.sh   # results/*.json 생성
python3 analyze.py    # 위 요약 출력
```

raw `results/*.json` 파일은 commit 되어 있습니다. 같은 URL에 `llmo-checker@0.1.0`을 돌리면 이 글의 점수와 ±1 이내로 들어와야 합니다(사이트는 run 사이에 바뀌고, `<meta>` 태그 하나로도 `meta`는 10점 움직일 수 있습니다).

## 다음 일

로드맵은 Experiment Log #1 마무리에서 변하지 않았습니다:

- **Experiment Log #3 — 인용 상관 파일럿.** score 범위를 가로지르는 50개 URL에 대해 Perplexity / ChatGPT / Claude를 같은 쿼리 세트로 찔러, LLMO Score와 인용율의 상관을 계산합니다. 이게 진짜 검증입니다: score는 주장하는 outcome을 실제로 예측하는가?
- **v0.2 score 가중치.** 인용 상관 데이터가 예상대로 나오면, 체크별 가중치를 관측된 상관을 최대화하도록 재튜닝합니다. 그렇지 않으면 spec은 훨씬 더 흥미로운 후속 글을 얻게 됩니다.

전체 로드맵은 [Experimental Projects](/ko/experimental-projects/)에 있고, v0.1 score 가중치 정의는 [Score v0.1 Draft Specification](/ko/specifications/score-v01/)에 있습니다.
