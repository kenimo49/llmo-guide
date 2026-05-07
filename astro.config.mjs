import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://llmoframework.com',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'LLMO Framework',
      description: 'The definitive guide to LLM Optimization — making your content discoverable by AI.',
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
                description: 'The definitive guide to LLM Optimization — making your content discoverable by AI.',
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
          label: 'Getting Started',
          translations: { ja: 'はじめに', zh: '入门指南', ko: '시작하기', de: 'Erste Schritte', fr: 'Pour commencer', es: 'Primeros pasos', pt: 'Primeiros passos' },
          items: [
            { label: 'What is LLMO?', translations: { ja: 'LLMOとは？', zh: '什么是LLMO？', ko: 'LLMO란?', de: 'Was ist LLMO?', fr: "Qu'est-ce que le LLMO ?", es: '¿Qué es LLMO?', pt: 'O que é LLMO?' }, slug: 'guide/what-is-llmo' },
            { label: 'LLMO vs SEO vs AEO vs GEO', slug: 'guide/llmo-vs-seo-aeo-geo' },
            { label: 'How AI Finds Content', translations: { ja: 'AIがコンテンツを発見する仕組み', zh: 'AI如何发现内容', ko: 'AI가 콘텐츠를 발견하는 방법', de: 'Wie KI Inhalte findet', fr: "Comment l'IA découvre le contenu", es: 'Cómo la IA encuentra contenido', pt: 'Como a IA encontra conteúdo' }, slug: 'guide/how-ai-finds-content' },
            { label: 'Quickstart: 30 Minutes', translations: { ja: 'クイックスタート：30分で実装', zh: '快速入门：30分钟实现', ko: '빠른 시작: 30분 구현', de: 'Schnellstart: 30 Minuten', fr: 'Démarrage rapide : 30 minutes', es: 'Inicio rápido: 30 minutos', pt: 'Início rápido: 30 minutos' }, slug: 'guide/quickstart' },
            { label: 'FAQ', translations: { ja: 'FAQ', zh: '常见问题', ko: 'FAQ', de: 'FAQ', fr: 'FAQ', es: 'FAQ', pt: 'FAQ' }, slug: 'guide/faq' },
          ],
        },
        {
          label: 'The LLMO Framework',
          translations: { ja: 'LLMOフレームワーク', zh: 'LLMO框架', ko: 'LLMO 프레임워크', de: 'Das LLMO-Framework', fr: 'Le framework LLMO', es: 'El framework LLMO', pt: 'O framework LLMO' },
          items: [
            { label: 'Overview', translations: { ja: '概要', zh: '概述', ko: '개요', de: 'Überblick', fr: 'Vue d\'ensemble', es: 'Visión general', pt: 'Visão geral' }, slug: 'framework/overview' },
            { label: '1. Knowledge Clarity', translations: { ja: '1. ナレッジクラリティ', zh: '1. 知识清晰度', ko: '1. 지식 명확성', de: '1. Wissensklarheit', fr: '1. Clarté des connaissances', es: '1. Claridad del conocimiento', pt: '1. Clareza de conhecimento' }, slug: 'framework/knowledge-clarity' },
            { label: '2. Structural Formatting', translations: { ja: '2. 構造化フォーマット', zh: '2. 结构化格式', ko: '2. 구조화 포맷', de: '2. Strukturierte Formatierung', fr: '2. Formatage structuré', es: '2. Formato estructurado', pt: '2. Formatação estrutural' }, slug: 'framework/structural-formatting' },
            { label: '3. Retrieval Signals', translations: { ja: '3. 検索シグナル', zh: '3. 检索信号', ko: '3. 검색 신호', de: '3. Abrufsignale', fr: '3. Signaux de recherche', es: '3. Señales de recuperación', pt: '3. Sinais de recuperação' }, slug: 'framework/retrieval-signals' },
            { label: '4. Authority Signals', translations: { ja: '4. 権威性シグナル', zh: '4. 权威信号', ko: '4. 권위 신호', de: '4. Autoritätssignale', fr: "4. Signaux d'autorité", es: '4. Señales de autoridad', pt: '4. Sinais de autoridade' }, slug: 'framework/authority-signals' },
            { label: '5. Citation Signals', translations: { ja: '5. 引用シグナル', zh: '5. 引用信号', ko: '5. 인용 신호', de: '5. Zitiersignale', fr: '5. Signaux de citation', es: '5. Señales de citación', pt: '5. Sinais de citação' }, slug: 'framework/citation-signals' },
          ],
        },
        {
          label: 'Case Studies',
          translations: { ja: 'ケーススタディ', zh: '案例研究', ko: '사례 연구', de: 'Fallstudien', fr: 'Études de cas', es: 'Casos de estudio', pt: 'Estudos de caso' },
          items: [
            { label: 'LLMO in Practice', translations: { ja: 'LLMO実践事例', zh: 'LLMO实践案例', ko: 'LLMO 실전 사례', de: 'LLMO in der Praxis', fr: 'LLMO en pratique', es: 'LLMO en la práctica', pt: 'LLMO na prática' }, slug: 'case-studies' },
          ],
        },
        {
          label: 'Research',
          translations: { ja: 'リサーチ', zh: '研究', ko: '연구', de: 'Forschung', fr: 'Recherche', es: 'Investigación', pt: 'Pesquisa' },
          items: [
            { label: 'Papers & References', translations: { ja: '論文・参考文献', zh: '论文与参考文献', ko: '논문 및 참고문헌', de: 'Publikationen & Referenzen', fr: 'Articles & Références', es: 'Artículos y referencias', pt: 'Artigos e referências' }, slug: 'research/papers' },
            { label: 'GEO Paper Summary', translations: { ja: 'GEO論文の要約', zh: 'GEO论文摘要', ko: 'GEO 논문 요약', de: 'GEO-Paper Zusammenfassung', fr: 'Résumé de l\'article GEO', es: 'Resumen del artículo GEO', pt: 'Resumo do artigo GEO' }, slug: 'research/geo-paper-summary' },
            { label: 'Microsoft Guidelines', translations: { ja: 'Microsoftのガイドライン', zh: '微软指南', ko: 'Microsoft 가이드라인', de: 'Microsoft-Richtlinien', fr: 'Directives Microsoft', es: 'Directrices de Microsoft', pt: 'Diretrizes da Microsoft' }, slug: 'research/microsoft-guidelines' },
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
