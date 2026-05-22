import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
// Pages URL: https://calebhk98.github.io/warframewebsite/
// Requires GitHub Pages enabled in Settings -> Pages -> Build and deployment -> "GitHub Actions".
export default defineConfig({
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Warframe Codex',
        short_name: 'Codex',
        description: 'Unofficial Warframe fan codex with builds, guides, and live worldstate',
        theme_color: '#0a0a0f',
        background_color: '#0a0a0f',
        display: 'standalone',
        start_url: '/warframewebsite/',
        scope: '/warframewebsite/',
        icons: [
          {
            src: '/warframewebsite/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: '/warframewebsite/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            src: '/warframewebsite/icon-maskable.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,xml,json}'],
        navigateFallback: '/warframewebsite/offline',
        navigateFallbackDenylist: [/^\/warframewebsite\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.warframestat\.us\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'worldstate-cache',
              expiration: {
                maxAgeSeconds: 300,
                maxEntries: 20,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  site: 'https://calebhk98.github.io',
  base: '/warframewebsite/',
});
