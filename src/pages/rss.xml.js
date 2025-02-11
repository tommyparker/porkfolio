import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

export async function GET(context) {
  const allPosts = await getCollection('posts');
  return rss({
    title: 'Drawn',
    description: 'A place for news from my studio, covering project and job updates, showing tidbits from behind the scenes, sharing inspiration from other places and people, and posting the occasional piece of writing.',
    site: context.site,
    xmlns: {
      content: 'http://purl.org/rss/1.0/modules/content/',
      dc: 'http://purl.org/dc/elements/1.1/'
    },
    items: await Promise.all(
      allPosts.map(async (post) => {
        const { Content } = await post.render();
        const renderedContent = await marked.parse(post.body);
        const sanitizedContent = sanitizeHtml(renderedContent, {
          allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt', 'title']
          }
        });
        
        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description || '',
          link: `/posts/${post.slug}/`,
          content: sanitizedContent
        };
      })
    ),
    customData: `<language>en-us</language>`,
  });
}