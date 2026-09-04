import { expect, test } from '@playwright/test'

test('mobile explore exposes filters without horizontal page overflow', async ({ page }) => {
  await page.goto('/tr/explore')
  await expect(page.getByRole('button', { name: /Filtreler/ })).toBeVisible()
  await page.getByRole('button', { name: /Filtreler/ }).click()
  const dialog = page.getByRole('dialog', { name: 'Filtreler' })
  await expect(dialog).toBeVisible()
  await expect(dialog).toBeFocused()
  await dialog.press('Escape')
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
  expect(switchBox!.width).toBeGreaterThanOrEqual(44)
  expect(switchBox!.height).toBeGreaterThanOrEqual(44)
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

test('mobile header controls expose 44px touch targets', async ({ page }) => {
  await page.goto('/tr')
  const controls = [
    page.getByRole('link', { name: 'LLM / ATLAS' }),
    page.getByRole('link', { name: 'Switch to English' }),
    page.getByRole('switch', { name: /temaya geç/ }),
    page.getByRole('button', { name: 'Menüyü aç veya kapat' }),
  ]

  for (const control of controls) {
    const box = await control.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(44)
    expect(box!.width).toBeGreaterThanOrEqual(44)
  }
})
