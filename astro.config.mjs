import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr()],
  integrations: [tailwind(), react(), mdx({
    components: {
      'img': 'src/components/MdxImage.astro',
    }
  })],
});