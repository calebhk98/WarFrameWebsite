import { test, expect, type Locator } from '@playwright/test';

const VIEWPORT = { width: 1280, height: 720 };

// The <time> element on worldstate shows a build-time timestamp.  Masking it
// keeps the baseline stable across rebuilds.
const TIME_SELECTOR = 'time';

interface PageSpec {
  path: string;
  name: string;
  maskSelectors?: string[];
}

const PAGES: PageSpec[] = [
  { path: '.', name: 'home' },
  { path: 'warframes/', name: 'warframes-list' },
  { path: 'warframes/saryn-prime/', name: 'warframe-detail-saryn-prime' },
  {
    path: 'worldstate/',
    name: 'worldstate',
    maskSelectors: [TIME_SELECTOR],
  },
  { path: 'compare/', name: 'compare' },
  { path: 'compare-warframes/', name: 'compare-warframes' },
  { path: 'build-calculator/', name: 'build-calculator' },
  { path: 'helminth-planner/', name: 'helminth-planner' },
  { path: 'damage-types/', name: 'damage-types' },
  { path: 'riven-planner/', name: 'riven-planner' },
  { path: 'star-chart/', name: 'star-chart' },
  { path: 'tier-list/', name: 'tier-list' },
];

async function buildMasks(page: import('@playwright/test').Page, selectors: string[]): Promise<Locator[]> {
  const results: Locator[] = [];
  for (const sel of selectors) {
    const located = await page.locator(sel).all();
    for (const loc of located) {
      results.push(loc);
    }
  }
  return results;
}

for (const spec of PAGES) {
  test(`visual: ${spec.name}`, async ({ page }) => {
    await page.setViewportSize(VIEWPORT);

    await page.goto(spec.path);
    await page.waitForLoadState('networkidle');

    // Ensure the primary heading is visible before snapping.
    await expect(page.locator('h1').first()).toBeVisible();

    const mask = await buildMasks(page, spec.maskSelectors ?? []);

    // Relaxed thresholds for cross-environment cloud CI tolerance.
    // Cloud Chromium rendering varies in font rasterization and anti-aliasing;
    // these settings allow legitimate visual matches across CI and local environments.
    await expect(page).toHaveScreenshot(`${spec.name}.png`, {
      fullPage: true,
      threshold: 0.4,
      maxDiffPixels: 3000,
      mask,
    });
  });
}
