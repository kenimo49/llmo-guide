---
title: "Open LLMO Research Initiative 소개"
description: "Open LLMO Research Initiative의 미션, 연구 원칙, Founder, Phase 로드맵."
pubDate: 2026-05-24
---

**Open LLMO Research Initiative**는 AI 컨텍스트에서 오픈 웹의 retrieval, citation, grounding을 다루는 독립 연구 이니셔티브이다. 명세, 벤치마크, 오픈소스 도구를 주요 산출물로 공개한다.

## 미션

AI 네이티브 retrieval, grounding visibility, LLM 지향 정보 아키텍처를 연구하고, 재현 가능한 지표와 명세를 공개한다.

### 연구 영역

| 영역 | 범위 |
|------|------|
| AI Citation Analysis | LLM이 콘텐츠를 인용하는 조건과 빈도 분석 |
| Grounding Visibility | AI가 무엇을 근거로 답변하는지 가시화하는 방법 |
| LLM Retrieval Optimization | LLM 검색 계층에 대한 문서 최적화 |
| AI-native Documentation | LLM이 잘 다루는 문서 포맷 연구 |
| Agent-oriented Information Architecture | AI 에이전트가 조작하기 쉬운 정보 구조 |

## 왜 이 Initiative인가

LLMO / AEO / GEO 영역은 빠르게 확장되고 있지만, 세 가지 토대가 빠져 있다.

- **재현 가능한 측정이 없다** — SEO의 Lighthouse나 PageSpeed Insights에 해당하는 공개 도구가 존재하지 않는다
- **공유된 어휘나 범위가 없다** — 각 업체가 독자적 정의를 발표해 영역이 파편화됐다
- **공개 실험 데이터가 적다** — 상업 SEO 도구가 중심이고 연구 레이어가 얇다

본 Initiative는 이 세 가지 공백을 메우기 위해 세워졌다. 목표는 Lighthouse가 SEO에서 한 역할을 LLMO에서 수행하는 것 — 방법론을 공개하고, 도구를 제공하며, 그 위에 커뮤니티가 쌓아 올릴 수 있도록 한다.

## 연구 원칙

| 원칙 | 의미 |
|------|------|
| Reproducibility first | 모든 지표는 계산식과 OSS checker 코드를 동봉한다 |
| Draft over Standard | 명세는 "Draft / Experimental / Proposal v0.1"로 공개해 수정 가능성을 유지한다 |
| Open Source first | 도구는 OSS 라이선스, 데이터는 CC BY, 명세는 MIT로 공개한다 |
| Solo-honest | 1인 운영임을 명시하고, 컨소시엄으로 위장하지 않는다 |

## Founder

[Ken Imoto](https://kenimoto.dev). LLMO와 harness engineering에 관한 복수의 서적을 Zenn과 Amazon Kindle에 출판. Propel-Lab Inc. 창립자 겸 CEO. 복수의 자체 프레임워크와 llmoframework.com의 구현·운영 담당.

주요 공개물:

- 서적: [전체 도서 목록 (kenimoto.dev/books, 영어)](https://kenimoto.dev/books/)
  - LLMO 시리즈 (Kindle / Zenn Book, 일본어·영어·포르투갈어·스페인어)
  - Harness engineering 시리즈 (Kindle / Zenn Book)
- Web: [kenimoto.dev](https://kenimoto.dev) / [propel-lab.co.jp](https://propel-lab.co.jp)
- Amazon Author Page: [Ken Imoto on Amazon](https://www.amazon.co.jp/stores/author/B0GQNPRCGF)
- Zenn: [zenn.dev/kenimo49](https://zenn.dev/kenimo49)
- OSS: [github.com/kenimo49](https://github.com/kenimo49)

## Phase 로드맵

본 Initiative는 단계적으로 성숙시킨다. 각 Phase는 다음 Phase의 전제조건이 된다.

| Phase | 범위 | 상태 |
|-------|------|------|
| Phase 0 | 연구 framing, Mission 공개, 최초 Experiment Log | 진행 중 |
| Phase 1 | 재현성 — OSS CLI (llmo-checker), Score v0.1 Draft, 데이터셋 공개 | 계획 |
| Phase 2 | 커뮤니티 — contributors, 외부 레퍼런스, 피드백 채널 | 계획 |
| Phase 3 | 표준화 — 정식 명세, Compatible 인증 배지, Working Group 결성 | 계획 |

표준화는 가장 마지막에 둔다. 성숙한 OSS, 벤치마크, 구현이 뒷받침되지 않으면 인증도 명세도 신뢰를 얻을 수 없다.

## 기여하기

| 방법 | 링크 |
|------|------|
| Issue / 버그 리포트 | [github.com/kenimo49/llmo-guide/issues](https://github.com/kenimo49/llmo-guide/issues) |
| Pull Request | [github.com/kenimo49/llmo-guide](https://github.com/kenimo49/llmo-guide) |

## 라이선스

본 사이트와 모든 draft spec은 [MIT License](https://opensource.org/licenses/MIT) 아래 공개한다.
