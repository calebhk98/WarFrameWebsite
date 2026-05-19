import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
// Pages URL: https://calebhk98.github.io/warframewebsite/
// Requires GitHub Pages enabled in Settings -> Pages -> Build and deployment -> "GitHub Actions".
export default defineConfig({
  integrations: [mdx(), tailwind()],
  site: 'https://calebhk98.github.io',
  base: '/warframewebsite/',
});
