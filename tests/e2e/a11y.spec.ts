import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const TOP_PAGES = [
  { path: '.', label: 'home' },
  { path: 'warframes/', label: 'warframes list' },
  { path: 'warframes/ash/', label: 'warframe detail: ash' },
  { path: 'weapons/', label: 'weapons list' },
  { path: 'builds/', label: 'builds list' },
];

for (const pg of TOP_PAGES) {
  test(`a11y: skip link present on ${pg.label}`, async ({ page }) => {
    await page.goto(pg.path);

    // Every page using Base layout has a skip-to-content link
    const skipLink = page.locator('a[href="#main"]').first();
    await expect(skipLink, `skip link on ${pg.label}`).toBeAttached();
  });

  test(`a11y: axe passes on ${pg.label}`, async ({ page }) => {
    await page.goto(pg.path);

    const results = await new AxeBuilder({ page })
      .disableRules([
        // color-contrast: dark theme needs full design review; tracked separately
        'color-contrast',
        // label-title-only: Pagefind UI (third-party) renders its search input
        // with only a title attribute; cannot fix without patching the library
        'label-title-only',
      ])
      .analyze();

    expect(
      results.violations,
      `axe violations on ${pg.label}: ${JSON.stringify(results.violations.map((v) => v.id))}`,
    ).toHaveLength(0);
  });
}
