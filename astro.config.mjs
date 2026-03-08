import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://llmoframework.com',
  integrations: [
    starlight({
      title: 'LLMO Framework',
      description: 'The definitive guide to LLM Optimization — making your content discoverable by AI.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/kenimo49/llmo-guide' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'What is LLMO?', slug: 'guide/what-is-llmo' },
            { label: 'LLMO vs SEO vs AEO vs GEO', slug: 'guide/llmo-vs-seo-aeo-geo' },
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
          label: 'Research',
          items: [
            { label: 'Papers', slug: 'research/papers' },
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
