import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Optional creation date for Article JSON-LD's datePublished.
				// dateModified is filled from git mtime via Starlight's lastUpdated.
				pubDate: z.coerce.date().optional(),
			}),
		}),
	}),
};
