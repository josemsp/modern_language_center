// En src/content/config.js
import { defineCollection, z } from 'astro:content';

const headerCollection = defineCollection({
  type: 'data',
  schema: z.object({
    header: z.array(
      z.object({
        label: z.string(),
        type: z.enum(['image', 'select', 'a', 'button']),
        image: z.string().optional(),
        url: z.string().optional(),
        options: z.array(
          z.object({
            title: z.string(),
            url: z.string()
          })
        ).optional()
      })
    )
  })
});

export const collections = {
  'header': headerCollection
};