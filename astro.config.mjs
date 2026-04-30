import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://llmoframework.com',
  integrations: [
    starlight({
      title: 'LLMO Framework',
      description: 'The definitive guide to LLM Optimization — making your content discoverable by AI.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        ja: { label: '日本語', lang: 'ja' },
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
            '@type': 'WebSite',
            name: 'LLMO Framework',
            url: 'https://llmoframework.com',
            description: 'The definitive guide to LLM Optimization — making your content discoverable by AI.',
            author: {
              '@type': 'Person',
              name: 'Ken Imoto',
              url: 'https://kenimoto.dev',
              jobTitle: 'AI Systems Engineer',
              sameAs: [
                'https://github.com/kenimo49',
                'https://www.linkedin.com/in/kenimo49',
                'https://x.com/kenimo49',
              ],
            },
            publisher: {
              '@type': 'Organization',
              name: 'Propel-Lab',
              url: 'https://propel-lab.co.jp',
            },
          }),
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          translations: { ja: 'はじめに' },
          items: [
            { label: 'What is LLMO?', translations: { ja: 'LLMOとは？' }, slug: 'guide/what-is-llmo' },
            { label: 'LLMO vs SEO vs AEO vs GEO', slug: 'guide/llmo-vs-seo-aeo-geo' },
            { label: 'How AI Finds Content', translations: { ja: 'AIがコンテンツを発見する仕組み' }, slug: 'guide/how-ai-finds-content' },
            { label: 'Quickstart: 30 Minutes', translations: { ja: 'クイックスタート：30分で実装' }, slug: 'guide/quickstart' },
          ],
        },
        {
          label: 'The LLMO Framework',
          translations: { ja: 'LLMOフレームワーク' },
          items: [
            { label: 'Overview', translations: { ja: '概要' }, slug: 'framework/overview' },
            { label: '1. Knowledge Clarity', translations: { ja: '1. ナレッジクラリティ' }, slug: 'framework/knowledge-clarity' },
            { label: '2. Structural Formatting', translations: { ja: '2. 構造化フォーマット' }, slug: 'framework/structural-formatting' },
            { label: '3. Retrieval Signals', translations: { ja: '3. 検索シグナル' }, slug: 'framework/retrieval-signals' },
            { label: '4. Authority Signals', translations: { ja: '4. 権威性シグナル' }, slug: 'framework/authority-signals' },
            { label: '5. Citation Signals', translations: { ja: '5. 引用シグナル' }, slug: 'framework/citation-signals' },
          ],
        },
        {
          label: 'Case Studies',
          translations: { ja: 'ケーススタディ' },
          items: [
            { label: 'LLMO in Practice', translations: { ja: 'LLMO実践事例' }, slug: 'case-studies' },
          ],
        },
        {
          label: 'Research',
          translations: { ja: 'リサーチ' },
          items: [
            { label: 'Papers & References', translations: { ja: '論文・参考文献' }, slug: 'research/papers' },
            { label: 'GEO Paper Summary', translations: { ja: 'GEO論文の要約' }, slug: 'research/geo-paper-summary' },
            { label: 'Microsoft Guidelines', translations: { ja: 'Microsoftのガイドライン' }, slug: 'research/microsoft-guidelines' },
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
