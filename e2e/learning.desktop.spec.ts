import { expect, test } from '@playwright/test'

test('card session records ten reviews and enforces the daily limit on restart', async ({ page }) => {
  await page.goto('/en/learn/flashcards')
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  for (let i = 0; i < 10; i++) {
    await page.getByRole('button', { name: 'Show answer', exact: true }).last().click()
    await page.getByRole('button', { name: 'Easy', exact: true }).click()
  }
  await expect(page.getByText('10 cards reviewed.')).toBeVisible()
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('atlas.learn.v1.progress')!))
  expect(Object.keys(state.cards)).toHaveLength(10)
  expect(state.streak.current).toBe(1)
  await page.getByRole('button', { name: 'Restart', exact: true }).click()
  await expect(page.getByText('Nothing due today.')).toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  await expect(page.getByText('Nothing due today.')).toBeVisible()
})

test('a five-question quiz records five answers across all topic tags', async ({ page }) => {
  await page.goto('/en/learn/quiz')
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  for (let i = 0; i < 5; i++) {
    await page.locator('.quiz-option').first().click()
    await page.getByRole('button', { name: 'Next', exact: true }).click()
  }
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('atlas.learn.v1.progress')!))
  expect(state.quizStats.totalAnswered).toBe(5)
  expect(state.streak.current).toBe(1)
  await expect(page.locator('.quiz-score')).toContainText('/ 5')
})

test('damaged stored progress recovers and disabled storage still allows learning', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('atlas.learn.v1.progress', JSON.stringify({ schema: 1, cards: null, quizStats: null, favorites: null })))
  await page.goto('/en/learn')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.learn-progress')).toBeVisible()
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage disabled') } }))
  await page.goto('/en/learn/flashcards')
  await page.getByRole('button', { name: 'Start', exact: true }).click()
  await page.getByRole('button', { name: 'Show answer', exact: true }).last().click()
  await page.getByRole('button', { name: 'Easy', exact: true }).click()
  await expect(page.locator('.flashcards-page__meta')).toContainText('2 / 10')
  await expect(page.getByRole('status')).toContainText('Your browser cannot save progress')
})

test('copy denial reports the failure without claiming success', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('denied') } } }))
  await page.goto('/en/compare?compare=llama-cpp,ollama')
  await page.getByRole('button', { name: 'Copy shareable link' }).click()
  await expect(page.getByRole('status')).toContainText('Could not copy')
  await expect(page.getByRole('button', { name: 'Link copied' })).toHaveCount(0)
})

test('card view exposes the comparison limit and missing lessons have a recovery page', async ({ page }) => {
  await page.goto('/en/explore?view=card&compare=llama-cpp,ollama,vllm,mlc-llm')
  await expect(page.getByRole('checkbox', { name: 'Compare SGLang', exact: true })).toBeDisabled()
  await page.goto('/en/learn/lessons/missing')
  await expect(page.getByRole('heading', { name: 'This layer is not on the map.' })).toBeVisible()
})

test('a failed page download keeps navigation and offers a retry', async ({ page }) => {
  await page.route('**/*QuizPage*', (route) => route.abort())
  await page.goto('/en/learn/quiz')
  await expect(page.getByRole('heading', { name: 'Could not open this page' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible()
  await page.getByRole('link', { name: 'LLM / ATLAS' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Not one market')
})

test('concept keyboard navigation and lesson completion persist across locale changes', async ({ page }) => {
  await page.goto('/en/learn/concepts/tokenization')
  await page.getByRole('tab', { name: 'Plain language' }).focus()
  await page.keyboard.press('End')
  await expect(page.getByRole('tab', { name: 'Advanced', exact: true })).toHaveAttribute('aria-selected', 'true')
  await page.getByRole('button', { name: 'Mark as read' }).click()
  await expect(page.getByRole('button', { name: 'Read', exact: true })).toBeVisible()
  await page.goto('/en/learn/lessons/mac-first-llm')
  await expect(page.locator('.lesson-stepper')).toBeVisible()
  for (let step = 0; step < 10; step++) {
    const next = page.getByRole('button', { name: 'Next', exact: true })
    if (!await next.count()) break
    await next.click()
  }
  await page.getByRole('button', { name: 'Done', exact: true }).click()
  await page.getByRole('link', { name: 'Türkçeye geç' }).click()
  await expect(page.getByRole('button', { name: 'Tamam', exact: true })).toBeVisible()
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('atlas.learn.v1.progress')!))
  expect(state.readConcepts).toContain('tokenization')
  expect(state.completedLessons).toEqual(['mac-first-llm'])
})
