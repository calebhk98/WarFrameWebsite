import { test, expect } from '@playwright/test';

test.describe('compare builds widget', () => {
  test('selecting two builds renders two cards', async ({ page }) => {
    await page.goto('compare/');
    await expect(page.locator('h1').first()).toBeVisible();

    const selectA = page.locator('#select-a');
    const selectB = page.locator('#select-b');

    await selectA.selectOption({ index: 1 });
    await selectB.selectOption({ index: 2 });

    const grid = page.locator('#compare-grid');
    await expect(grid.locator('article')).toHaveCount(2, { timeout: 5_000 });
  });
});

test.describe('compare warframes widget', () => {
  test('selecting two warframes renders stat bars', async ({ page }) => {
    await page.goto('compare-warframes/');
    await expect(page.locator('h1').first()).toBeVisible();

    const selectA = page.locator('#select-a');
    const selectB = page.locator('#select-b');

    await selectA.selectOption({ value: 'ash' });
    await selectB.selectOption({ value: 'ash-prime' });

    const grid = page.locator('#compare-grid');
    await expect(grid.locator('article')).toHaveCount(2, { timeout: 5_000 });

    // Stat bars are div elements with a percentage width style inside each card
    const statBars = grid.locator('[role="presentation"]');
    await expect(statBars.first()).toBeVisible();
  });
});

test.describe('build calculator widget', () => {
  test('selecting a warframe updates computed stats', async ({ page }) => {
    await page.goto('build-calculator/');
    await expect(page.locator('h1').first()).toBeVisible();

    const hint = page.locator('#computed-hint');
    await expect(hint).toBeVisible();

    const frameSelect = page.locator('#frame-select');
    await frameSelect.selectOption({ value: 'ash' });

    await expect(hint).toBeHidden({ timeout: 5_000 });
    const computedStats = page.locator('#computed-stats');
    await expect(computedStats).toBeVisible();
    // Stats section should contain at least one stat row
    await expect(computedStats.locator('div').first()).toBeVisible();
  });

  test('adding a mod updates drain label', async ({ page }) => {
    await page.goto('build-calculator/');

    const frameSelect = page.locator('#frame-select');
    await frameSelect.selectOption({ value: 'ash' });

    const slot0 = page.locator('#slot-0');
    await slot0.selectOption({ index: 1 });

    // Drain label for slot 0 should now show text
    const drainLabel = page.locator('#slot-drain-0');
    await expect(drainLabel).not.toBeEmpty({ timeout: 5_000 });
  });
});

test.describe('helminth planner widget', () => {
  test('selecting two frames renders a result card', async ({ page }) => {
    await page.goto('helminth-planner/');
    await expect(page.locator('h1').first()).toBeVisible();

    const hint = page.locator('#planner-hint');
    await expect(hint).toBeVisible();

    await page.locator('#select-base').selectOption({ value: 'ash' });
    await page.locator('#select-subsume').selectOption({ value: 'ash-prime' });

    await expect(hint).toBeHidden({ timeout: 5_000 });
    const result = page.locator('#planner-result');
    await expect(result.locator('article').first()).toBeVisible();
  });
});
