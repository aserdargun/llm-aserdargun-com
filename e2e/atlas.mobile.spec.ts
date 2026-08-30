import { expect, test } from '@playwright/test'

test('mobile explore exposes filters without horizontal page overflow', async ({ page }) => {
  await page.goto('/tr/explore')
  await expect(page.getByRole('button', { name: /Filtreler/ })).toBeVisible()
  await page.getByRole('button', { name: /Filtreler/ }).click()
  await expect(page.getByRole('dialog', { name: 'Filtreler' })).toBeVisible()
  await page.getByRole('dialog', { name: 'Filtreler' }).press('Escape')
  await expect(page.getByRole('dialog', { name: 'Filtreler' })).not.toBeVisible()
  await expect(page.getByRole('button', { name: /Filtreler/ })).toBeFocused()
  const overflow = await page.evaluate(() => ({
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
    offenders: [...document.querySelectorAll<HTMLElement>('body *')].map((element) => {
      const rect = element.getBoundingClientRect()
      return { tag: element.tagName, className: element.className, left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width), scrollWidth: element.scrollWidth }
    }).filter(({ left, right }) => left < -1 || right > document.documentElement.clientWidth + 1).slice(0, 10),
  }))
  expect(overflow, JSON.stringify(overflow, null, 2)).toMatchObject({ pageWidth: overflow.viewportWidth, offenders: [] })
})

test('mobile theme switch stays inside the header and changes the palette', async ({ page }) => {
  await page.goto('/tr')
  const header = page.getByRole('banner')
  const themeSwitch = page.getByRole('switch', { name: /temaya geç/ })
  await expect(themeSwitch).toBeVisible()

  const headerBox = await header.boundingBox()
  const switchBox = await themeSwitch.boundingBox()
  expect(headerBox).not.toBeNull()
  expect(switchBox).not.toBeNull()
  expect(switchBox!.width).toBeGreaterThanOrEqual(50)
  expect(switchBox!.height).toBeGreaterThanOrEqual(28)
  expect(switchBox!.x).toBeGreaterThanOrEqual(headerBox!.x)
  expect(switchBox!.x + switchBox!.width).toBeLessThanOrEqual(headerBox!.x + headerBox!.width)

  const initialTheme = await page.locator('html').getAttribute('data-theme')
  await themeSwitch.click()
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', initialTheme ?? '')

  await page.getByRole('button', { name: 'Menüyü aç veya kapat' }).click()
  const navBox = await page.getByRole('navigation', { name: 'Ana navigasyon' }).boundingBox()
  expect(navBox).not.toBeNull()
  expect(navBox!.width).toBeGreaterThanOrEqual(headerBox!.width - 1)
})
