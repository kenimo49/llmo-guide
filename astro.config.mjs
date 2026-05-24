import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://llmoframework.com',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'LLMO Framework',
      description: 'Open LLMO Research Initiative — researching AI retrieval, grounding visibility, and LLM-native web architecture. Founded and maintained by Ken Imoto.',
      defaultLocale: 'root',
      // URL slugs intentionally use ISO-639-1 (e.g. /pt/) while hreflang uses
      // the more specific BCP-47 region tag (e.g. pt-BR). Starlight emits
      // <link rel="alternate" hreflang="pt-BR" href=".../pt/"> from these
      // values — URL convention and hreflang are independent per Google's
      // i18n guidance.
      locales: {
        root: { label: 'English', lang: 'en' },
        ja: { label: '日本語', lang: 'ja' },
        zh: { label: '中文', lang: 'zh-CN' },
        ko: { label: '한국어', lang: 'ko' },
        de: { label: 'Deutsch', lang: 'de' },
        fr: { label: 'Français', lang: 'fr' },
        es: { label: 'Español', lang: 'es' },
        pt: { label: 'Português', lang: 'pt-BR' },
      },
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/Head.astro',
        Footer: './src/components/Footer.astro',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/kenimo49/llmo-guide' },
      ],
      head: [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://llmoframework.com/#website',
                name: 'LLMO Framework',
                alternateName: 'LLMO',
                url: 'https://llmoframework.com',
                description: 'Open LLMO Research Initiative — researching AI retrieval, grounding visibility, and LLM-native web architecture. Founded and maintained by Ken Imoto.',
                inLanguage: ['en', 'ja', 'zh-CN', 'ko', 'de', 'fr', 'es', 'pt-BR'],
                license: 'https://opensource.org/licenses/MIT',
                publisher: { '@id': 'https://propel-lab.co.jp/#organization' },
                author: { '@id': 'https://kenimoto.dev/#person' },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: 'https://llmoframework.com/?q={search_term_string}',
                  },
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'Organization',
                '@id': 'https://propel-lab.co.jp/#organization',
                name: 'Propel-Lab',
                legalName: 'Propel-Lab Inc.',
                url: 'https://propel-lab.co.jp',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://llmoframework.com/og-image.png',
                  width: 1200,
                  height: 630,
                },
                foundingDate: '2024',
                founder: { '@id': 'https://kenimoto.dev/#person' },
                sameAs: [
                  'https://github.com/kenimo49',
                  'https://propel-lab.co.jp',
                ],
                knowsAbout: [
                  'Large Language Model Optimization',
                  'Generative Engine Optimization',
                  'Answer Engine Optimization',
                  'Search Engine Optimization',
                  'AI Systems Engineering',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'editorial',
                  url: 'https://github.com/kenimo49/llmo-guide/issues',
                },
              },
              {
                '@type': 'Person',
                '@id': 'https://kenimoto.dev/#person',
                name: 'Ken Imoto',
                givenName: 'Ken',
                familyName: 'Imoto',
                url: 'https://kenimoto.dev',
                jobTitle: 'AI Systems Engineer',
                worksFor: { '@id': 'https://propel-lab.co.jp/#organization' },
                knowsAbout: [
                  'Large Language Model Optimization',
                  'Generative Engine Optimization',
                  'Multi-agent systems',
                  'Prompt engineering',
                ],
                sameAs: [
                  'https://github.com/kenimo49',
                  'https://www.linkedin.com/in/kenimo49',
                  'https://x.com/kenimo49',
                  'https://zenn.dev/kenimo49',
                  'https://qiita.com/kenimo49',
                  'https://dev.to/kenimo49',
                  'https://www.amazon.co.jp/stores/author/B0GQNPRCGF',
                ],
              },
            ],
          }),
        },
      ],
      sidebar: [
        {
          label: 'Open LLMO Research Initiative',
          items: [
            { label: 'About the Initiative', translations: { ja: 'このイニシアティブについて', 'zh-CN': '关于本倡议', ko: '이 이니셔티브 소개', de: 'Über die Initiative', fr: "À propos de l'initiative", es: 'Acerca de la iniciativa', 'pt-BR': 'Sobre a iniciativa' }, slug: 'about' },
            { label: 'Research Areas', translations: { ja: 'リサーチ領域', 'zh-CN': '研究领域', ko: '연구 영역', de: 'Forschungsbereiche', fr: 'Domaines de recherche', es: 'Áreas de investigación', 'pt-BR': 'Áreas de pesquisa' }, slug: 'research-areas' },
            { label: 'Experimental Projects', translations: { ja: '実験プロジェクト', 'zh-CN': '实验性项目', ko: '실험 프로젝트', de: 'Experimentelle Projekte', fr: 'Projets expérimentaux', es: 'Proyectos experimentales', 'pt-BR': 'Projetos experimentais' }, slug: 'experimental-projects' },
          ],
        },
        {
          label: 'Specifications',
          translations: { ja: '仕様', 'zh-CN': '规范', ko: '사양', de: 'Spezifikationen', fr: 'Spécifications', es: 'Especificaciones', 'pt-BR': 'Especificações' },
          items: [
            { label: 'Score v0.1 Draft', slug: 'specifications/score-v01' },
          ],
        },
        {
          label: 'Experiments',
          translations: { ja: '実験ログ', 'zh-CN': '实验日志', ko: '실험 로그', de: 'Experimente', fr: 'Expériences', es: 'Experimentos', 'pt-BR': 'Experimentos' },
          items: [
            { label: 'Dogfooding our own sites', translations: { ja: '自社サイトのdogfooding', 'zh-CN': '自家站点 dogfooding', ko: '자사 사이트 도그푸딩', de: 'Dogfooding eigener Sites', fr: 'Dogfooding de nos sites', es: 'Dogfooding de nuestros sitios', 'pt-BR': 'Dogfooding dos nossos sites' }, slug: 'experiments/dogfooding-our-own-sites' },
            { label: 'External baseline panel', translations: { ja: '外部ベースラインパネル', 'zh-CN': '外部基线面板', ko: '외부 베이스라인 패널', de: 'Externes Baseline-Panel', fr: 'Panel de baseline externe', es: 'Panel de baseline externo', 'pt-BR': 'Painel de baseline externa' }, slug: 'experiments/external-baseline-panel' },
          ],
        },
        {
          label: 'Getting Started',
          translations: { ja: 'はじめに', 'zh-CN': '入门指南', ko: '시작하기', de: 'Erste Schritte', fr: 'Pour commencer', es: 'Primeros pasos', 'pt-BR': 'Primeiros passos' },
          items: [
            { label: 'What is LLMO?', translations: { ja: 'LLMOとは？', 'zh-CN': '什么是LLMO？', ko: 'LLMO란?', de: 'Was ist LLMO?', fr: "Qu'est-ce que le LLMO ?", es: '¿Qué es LLMO?', 'pt-BR': 'O que é LLMO?' }, slug: 'guide/what-is-llmo' },
            { label: 'LLMO vs SEO vs AEO vs GEO', slug: 'guide/llmo-vs-seo-aeo-geo' },
            { label: 'How AI Finds Content', translations: { ja: 'AIがコンテンツを発見する仕組み', 'zh-CN': 'AI如何发现内容', ko: 'AI가 콘텐츠를 발견하는 방법', de: 'Wie KI Inhalte findet', fr: "Comment l'IA découvre le contenu", es: 'Cómo la IA encuentra contenido', 'pt-BR': 'Como a IA encontra conteúdo' }, slug: 'guide/how-ai-finds-content' },
            { label: 'Quickstart: 30 Minutes', translations: { ja: 'クイックスタート：30分で実装', 'zh-CN': '快速入门：30分钟实现', ko: '빠른 시작: 30분 구현', de: 'Schnellstart: 30 Minuten', fr: 'Démarrage rapide : 30 minutes', es: 'Inicio rápido: 30 minutos', 'pt-BR': 'Início rápido: 30 minutos' }, slug: 'guide/quickstart' },
            { label: 'FAQ', translations: { ja: 'よくある質問', 'zh-CN': '常见问题', ko: '자주 묻는 질문', de: 'Häufige Fragen', fr: 'Foire aux questions', es: 'Preguntas frecuentes', 'pt-BR': 'Perguntas frequentes' }, slug: 'guide/faq' },
          ],
        },
        {
          label: 'The LLMO Framework',
          translations: { ja: 'LLMOフレームワーク', 'zh-CN': 'LLMO框架', ko: 'LLMO 프레임워크', de: 'Das LLMO-Framework', fr: 'Le framework LLMO', es: 'El framework LLMO', 'pt-BR': 'O framework LLMO' },
          items: [
            { label: 'Overview', translations: { ja: '概要', 'zh-CN': '概述', ko: '개요', de: 'Überblick', fr: 'Vue d\'ensemble', es: 'Visión general', 'pt-BR': 'Visão geral' }, slug: 'framework/overview' },
            { label: '1. Knowledge Clarity', translations: { ja: '1. ナレッジクラリティ', 'zh-CN': '1. 知识清晰度', ko: '1. 지식 명확성', de: '1. Wissensklarheit', fr: '1. Clarté des connaissances', es: '1. Claridad del conocimiento', 'pt-BR': '1. Clareza de conhecimento' }, slug: 'framework/knowledge-clarity' },
            { label: '2. Structural Formatting', translations: { ja: '2. 構造化フォーマット', 'zh-CN': '2. 结构化格式', ko: '2. 구조화 포맷', de: '2. Strukturierte Formatierung', fr: '2. Formatage structuré', es: '2. Formato estructurado', 'pt-BR': '2. Formatação estrutural' }, slug: 'framework/structural-formatting' },
            { label: '3. Retrieval Signals', translations: { ja: '3. 検索シグナル', 'zh-CN': '3. 检索信号', ko: '3. 검색 신호', de: '3. Abrufsignale', fr: '3. Signaux de recherche', es: '3. Señales de recuperación', 'pt-BR': '3. Sinais de recuperação' }, slug: 'framework/retrieval-signals' },
            { label: '4. Authority Signals', translations: { ja: '4. 権威性シグナル', 'zh-CN': '4. 权威信号', ko: '4. 권위 신호', de: '4. Autoritätssignale', fr: "4. Signaux d'autorité", es: '4. Señales de autoridad', 'pt-BR': '4. Sinais de autoridade' }, slug: 'framework/authority-signals' },
            { label: '5. Citation Signals', translations: { ja: '5. 引用シグナル', 'zh-CN': '5. 引用信号', ko: '5. 인용 신호', de: '5. Zitiersignale', fr: '5. Signaux de citation', es: '5. Señales de citación', 'pt-BR': '5. Sinais de citação' }, slug: 'framework/citation-signals' },
            { label: '6. Coherence Signals', translations: { ja: '6. 整合性シグナル', 'zh-CN': '6. 一致性信号', ko: '6. 일관성 신호', de: '6. Kohärenzsignale', fr: '6. Signaux de cohérence', es: '6. Señales de coherencia', 'pt-BR': '6. Sinais de coerência' }, slug: 'framework/coherence-signals' },
          ],
        },
        {
          label: 'Auditing',
          translations: { ja: '監査', 'zh-CN': '审计', ko: '감사', de: 'Audit', fr: 'Audit', es: 'Auditoría', 'pt-BR': 'Auditoria' },
          items: [
            { label: 'Two-Pass Review', translations: { ja: '二段レビュー', 'zh-CN': '两段审查', ko: '2단계 검토', de: 'Zwei-Pass-Review', fr: 'Revue en deux passes', es: 'Revisión en dos pases', 'pt-BR': 'Revisão em duas passagens' }, slug: 'guide/llmo-audit-two-pass-review' },
          ],
        },
        {
          label: 'Case Studies',
          translations: { ja: 'ケーススタディ', 'zh-CN': '案例研究', ko: '사례 연구', de: 'Fallstudien', fr: 'Études de cas', es: 'Casos de estudio', 'pt-BR': 'Estudos de caso' },
          items: [
            { label: 'LLMO in Practice', translations: { ja: 'LLMO実践事例', 'zh-CN': 'LLMO实践案例', ko: 'LLMO 실전 사례', de: 'LLMO in der Praxis', fr: 'LLMO en pratique', es: 'LLMO en la práctica', 'pt-BR': 'LLMO na prática' }, slug: 'case-studies' },
            { label: 'Self-Audit: 20 Findings', translations: { ja: '自社監査: 20件の発見', 'zh-CN': '自审计：20项发现', ko: '자가 감사: 20건의 발견', de: 'Selbst-Audit: 20 Befunde', fr: 'Auto-audit : 20 constats', es: 'Auto-auditoría: 20 hallazgos', 'pt-BR': 'Auto-auditoria: 20 achados' }, slug: 'case-studies/propel-lab-self-audit' },
            { label: 'When the Author Violates the Framework', translations: { ja: 'フレームワーク作者がフレームワークを破ったとき', 'zh-CN': '当作者违反了自己的框架', ko: '저자가 프레임워크를 어겼을 때', de: 'Wenn der Autor das eigene Framework bricht', fr: "Quand l'auteur enfreint le framework", es: 'Cuando el autor viola su propio framework', 'pt-BR': 'Quando o autor viola o próprio framework' }, slug: 'case-studies/llmo-framework-self-audit' },
          ],
        },
        {
          label: 'Research',
          translations: { ja: 'リサーチ', 'zh-CN': '研究', ko: '연구', de: 'Forschung', fr: 'Recherche', es: 'Investigación', 'pt-BR': 'Pesquisa' },
          items: [
            { label: 'Papers & References', translations: { ja: '論文・参考文献', 'zh-CN': '论文与参考文献', ko: '논문 및 참고문헌', de: 'Publikationen & Referenzen', fr: 'Articles & Références', es: 'Artículos y referencias', 'pt-BR': 'Artigos e referências' }, slug: 'research/papers' },
            { label: 'GEO Paper Summary', translations: { ja: 'GEO論文の要約', 'zh-CN': 'GEO论文摘要', ko: 'GEO 논문 요약', de: 'GEO-Paper Zusammenfassung', fr: 'Résumé de l\'article GEO', es: 'Resumen del artículo GEO', 'pt-BR': 'Resumo do artigo GEO' }, slug: 'research/geo-paper-summary' },
            { label: 'Microsoft Guidelines', translations: { ja: 'Microsoftのガイドライン', 'zh-CN': '微软指南', ko: 'Microsoft 가이드라인', de: 'Microsoft-Richtlinien', fr: 'Directives Microsoft', es: 'Directrices de Microsoft', 'pt-BR': 'Diretrizes da Microsoft' }, slug: 'research/microsoft-guidelines' },
          ],
        },
        {
          label: 'About',
          translations: { ja: 'このサイトについて', 'zh-CN': '关于', ko: '소개', de: 'Über', fr: 'À propos', es: 'Acerca de', 'pt-BR': 'Sobre' },
          items: [
            { label: 'Changelog', translations: { ja: '変更履歴', 'zh-CN': '更新日志', ko: '변경 이력', de: 'Änderungsprotokoll', fr: 'Journal des modifications', es: 'Registro de cambios', 'pt-BR': 'Registro de alterações' }, slug: 'changelog' },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/kenimo49/llmo-guide/edit/main/',
      },
      lastUpdated: true,
    }),
  ],
});
