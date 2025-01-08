import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import preact from '@astrojs/preact';

import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr()],
  integrations: [tailwind(), preact()],
  
});