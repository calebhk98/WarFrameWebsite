import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E89E3B',
          purple: '#5B3A8A',
          black: '#0A0A0F',
          cream: '#E8DEC8',
        },
        surface: {
          1: '#111118',
          2: '#1a1a24',
          3: '#242430',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [typography],
};

export default config;
