import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { updates } from '../data/updates';

export function GET(context: APIContext) {
  const base = import.meta.env.BASE_URL ?? '/';
  const whatsNewUrl = new URL(`${base}whats-new`, context.site).href;

  const items = updates
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((entry) => ({
      title: `${entry.updateNumber}: ${entry.title}`,
      pubDate: new Date(entry.date),
      link: whatsNewUrl,
      description: entry.summary,
    }));

  return rss({
    title: 'Warframe Codex - Updates',
    description: 'A chronological record of major Warframe updates and new content releases.',
    site: context.site ?? 'https://calebhk98.github.io',
    items,
    customData: '<language>en-us</language>',
  });
}
