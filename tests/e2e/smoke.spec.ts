import { test, expect, type Page } from '@playwright/test';

interface RouteSpec {
  path: string;
  label: string;
}

const CRITICAL_ROUTES: RouteSpec[] = [
  { path: '.', label: 'home' },
  { path: 'warframes/', label: 'warframes list' },
  { path: 'warframes/ash/', label: 'warframe detail: ash' },
  { path: 'warframes/saryn-prime/', label: 'warframe detail: saryn-prime' },
  { path: 'weapons/', label: 'weapons list' },
  { path: 'weapons/kuva-bramma/', label: 'weapon detail: kuva-bramma' },
  { path: 'arcanes/', label: 'arcanes list' },
  { path: 'arcanes/arcane-energize/', label: 'arcane detail: arcane-energize' },
  { path: 'mods/', label: 'mods list' },
  { path: 'missions/', label: 'missions list' },
  { path: 'builds/', label: 'builds list' },
  { path: 'guides/', label: 'guides list' },
  { path: 'companions/', label: 'companions list' },
  { path: 'companions/carrier-prime/', label: 'companion detail: carrier-prime' },
  { path: 'focus/', label: 'focus list' },
  { path: 'focus/madurai/', label: 'focus detail: madurai' },
  { path: 'amps/', label: 'amps list' },
  { path: 'liches/', label: 'liches list' },
  { path: 'archwings/', label: 'archwings list' },
  { path: 'worldstate/', label: 'worldstate' },
  { path: 'tier-list/', label: 'tier list' },
  { path: 'beginner/', label: 'beginner hub' },
  { path: 'whats-new/', label: "what's new" },
  { path: 'damage-types/', label: 'damage types' },
];

async function assertPageOk(page: Page, path: string): Promise<void> {
  const response = await page.goto(path);
  expect(response?.status(), `HTTP status for ${path}`).toBe(200);
  const h1 = page.locator('h1').first();
  await expect(h1, `h1 present on ${path}`).toBeVisible();
}

for (const route of CRITICAL_ROUTES) {
  test(`smoke: ${route.label} (${route.path})`, async ({ page }) => {
    await assertPageOk(page, route.path);
  });
}
