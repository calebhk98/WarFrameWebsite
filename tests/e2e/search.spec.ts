import { test, expect } from '@playwright/test';

test.describe('pagefind search', () => {
  test('typing in search box shows results for saryn', async ({ page }) => {
    await page.goto('.');

    // Pagefind UI mounts an input with class pagefind-ui__search-input inside
    // the #pagefind-search container. The script loads asynchronously via a
    // dynamically injected <script> tag in Header.astro.
    const searchInput = page.locator('#pagefind-search .pagefind-ui__search-input');

    // Wait for the Pagefind script to initialise (it loads async on DOMContentLoaded)
    await expect(searchInput).toBeVisible({ timeout: 15_000 });

    await searchInput.fill('saryn');

    // Pagefind renders result links inside a list; wait for at least one
    const resultLinks = page.locator('#pagefind-search .pagefind-ui__result-link');
    await expect(resultLinks.first()).toBeVisible({ timeout: 10_000 });

    const count = await resultLinks.count();
    expect(count, 'search should return at least one result for "saryn"').toBeGreaterThan(0);
  });
});
