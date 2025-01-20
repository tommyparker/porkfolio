import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    client: z.union([
      z.string(),
      z.array(z.string())
    ]).optional(),
    artDirection: z.union([
      z.string(),
      z.array(z.string())
    ]).optional(),
    thumbnail: z.object({
      url: image(),
      alt: z.string(),
    }),
  }),
});

const postsCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    image: z.object({
      url: image(),
      alt: z.string(),
    }),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  posts: postsCollection,
};
