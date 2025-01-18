import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    client: z.string().optional(),
    artDirection: z.string().optional(),
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
    author: z.string(),
    image: z.object({
      url: image(),
      alt: z.string(),
    }),
  }),
});

export const collections = {
  projects: projectsCollection,
  posts: postsCollection,
};
