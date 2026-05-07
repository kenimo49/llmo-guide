# LLMO 프레임워크 — 5개 핵심 컴포넌트

## 개요

LLMO 프레임워크는 AI 시스템이 콘텐츠를 발견하도록 만드는 구조적 접근법을 제공합니다. 5개 컴포넌트가 협력해 AI 발견성을 극대화합니다.

## 1. 지식 명확성

**목표**: 콘텐츠가 사실적으로 명확하고 모호하지 않게 한다.

- 명료한 서술문으로 작성
- 사실을 직접 진술 (모호한 표현 회피)
- 용어를 일관되게 사용
- 도메인 전문 용어를 명시적으로 정의
- 사용자가 물을 만한 구체적 질문 중심으로 구성

## 2. 구조화 포맷

**목표**: 콘텐츠를 기계 가독적으로 만든다.

- 시맨틱 HTML 헤딩(H1 → H2 → H3) 사용
- JSON-LD 구조화 데이터(Schema.org) 임베드
- Q&A에 FAQPage 스키마
- 구조화 정보에 리스트와 테이블 사용
- /ai/ 디렉토리에 LLM용 Markdown 배치

**주요 스키마**: Organization, Person, Product, Service, Book, FAQPage, WebSite, TechArticle

## 3. 검색 신호

**목표**: AI 시스템이 콘텐츠를 찾고 접근하도록 돕는다.

- **llms.txt**: 사이트 루트의 LLM 개요 파일
- **/ai/ 디렉토리**: AI 소비 전용 Markdown 파일
- **robots.txt**: AI 크롤러 (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) 명시 허용
- **Sitemap**: XML 사이트맵
- **상호 링크**: llms.txt, /ai/, 메인 콘텐츠 간 연결

## 4. 권위 신호

**목표**: LLM이 인식하는 신뢰성을 구축한다.

- 다중 플랫폼 발신 (개인 사이트, LinkedIn, Qiita, Zenn, DEV.to)
- 책 출판과 저자 활동 유지 (Amazon, Zenn Books)
- GitHub 오픈소스 기여
- 다른 출처에서의 인용 획득
- 플랫폼 간 일관된 정체성 (같은 이름·약력·주제)

## 5. 인용 신호

**목표**: LLM이 인용하고 싶어하는 콘텐츠를 만든다.

- 원본 데이터·통계·측정값 포함
- 구체적 숫자와 날짜 제공
- 비교 테이블·프레임워크 작성
- 특정 주제의 결정판 가이드 작성
- 연구 논문 발표 (arXiv, 학술 컨퍼런스)

## 구현 체크리스트

- [ ] 사이트 루트에 llms.txt
- [ ] /ai/ 디렉토리에 Markdown 파일
- [ ] robots.txt에서 AI 봇 허용
- [ ] 모든 페이지에 JSON-LD 스키마
- [ ] Q&A에 FAQ 스키마
- [ ] Sitemap.xml
- [ ] 일관된 정체성으로 크로스 플랫폼
- [ ] 콘텐츠에 원본 데이터·통계
- [ ] 명료하고 서술적인 문체

## 더 알아보기

- 풀 가이드: https://llmoframework.com/ko/
- 책: https://zenn.dev/kenimo49/books/llmo-ai-search-optimization
- 저자: https://kenimoto.dev
