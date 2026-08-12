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
