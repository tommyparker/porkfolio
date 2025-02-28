import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import svgr from 'vite-plugin-svgr';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://porkfolio.vercel.app',
  plugins: [svgr()],
  integrations: [tailwind(), preact(), mdx({
    components: {
      'img': 'src/components/MdxImage.astro',
    }
  }), sitemap()],
});