import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://llmoframework.com',
  integrations: [
    starlight({
      title: 'LLMO Framework',
      description: 'The definitive guide to LLM Optimization — making your content discoverable by AI.',
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
          items: [
            { label: 'What is LLMO?', slug: 'guide/what-is-llmo' },
            { label: 'LLMO vs SEO vs AEO vs GEO', slug: 'guide/llmo-vs-seo-aeo-geo' },
            { label: 'How AI Finds Content', slug: 'guide/how-ai-finds-content' },
            { label: 'Quickstart: 30 Minutes', slug: 'guide/quickstart' },
          ],
        },
        {
          label: 'The LLMO Framework',
          items: [
            { label: 'Overview', slug: 'framework/overview' },
            { label: '1. Knowledge Clarity', slug: 'framework/knowledge-clarity' },
            { label: '2. Structural Formatting', slug: 'framework/structural-formatting' },
            { label: '3. Retrieval Signals', slug: 'framework/retrieval-signals' },
            { label: '4. Authority Signals', slug: 'framework/authority-signals' },
            { label: '5. Citation Signals', slug: 'framework/citation-signals' },
          ],
        },
        {
          label: 'Case Studies',
          items: [
            { label: 'LLMO in Practice', slug: 'case-studies' },
          ],
        },
        {
          label: 'Research',
          items: [
            { label: 'Papers & References', slug: 'research/papers' },
            { label: 'GEO Paper Summary', slug: 'research/geo-paper-summary' },
            { label: 'Microsoft Guidelines', slug: 'research/microsoft-guidelines' },
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
