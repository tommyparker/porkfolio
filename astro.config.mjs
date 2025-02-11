import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr()],
  vite: {
    ssr: {
      noExternal: ['sanitize-html'],
      external: ['markdown-it']
    }
  },
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind(), preact(), mdx({
    components: {
      'img': 'src/components/MdxImage.astro',
    }
  })],
});