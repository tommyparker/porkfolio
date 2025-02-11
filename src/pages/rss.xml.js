import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
  const allPosts = await getCollection('posts');
  return rss({
    title: 'Drawn',
    description: 'A place for news from my studio, covering project and job updates, showing tidbits from behind the scenes, sharing inspiration from other places and people, and posting the occasional piece of writing.',
    site: context.site,
    items: await Promise.all(
      allPosts.map(async (post) => {
        const { Content } = await post.render();
        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link: `/posts/${post.slug}/`,
          content: sanitizeHtml(Content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
          }),
        };
      })
    ),
  });
}