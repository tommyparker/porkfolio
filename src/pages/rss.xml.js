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
      dc: 'http://purl.org/dc/elements/1.1/',
      atom: 'http://www.w3.org/2005/Atom'
    },
    stylesheet: '/styles.xsl',
    items: await Promise.all(
      allPosts.map(async (post) => {
        const { Content } = await post.render();
        const renderedContent = await marked.parse(post.body);
        
        // Make image URLs absolute
        const absoluteContent = renderedContent.replace(
          /src="\/images\//g,
          `src="${context.site}images/`
        );
        
        const sanitizedContent = sanitizeHtml(absoluteContent, {
          allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
          allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt', 'title']
          }
        });
        
        // Ensure description comes before content:encoded by using customData
        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description || '',
          link: `/posts/${post.slug}/`,
          customData: `<content:encoded><![CDATA[${sanitizedContent}]]></content:encoded>`
        };
      })
    ),
    customData: `
      <language>en-us</language>
      <atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />
    `,
  });
}