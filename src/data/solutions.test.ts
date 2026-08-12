import { describe, expect, it } from 'vitest'
import { categories } from './categories'
import { solutions } from './solutions'

describe('curated atlas dataset', () => {
  it('contains the seven approved categories in order', () => {
    expect(categories.map(({ id }) => id)).toEqual(['INF', 'SRV', 'RUN', 'APP', 'DST', 'GTW', 'EDG'])
  })

  it('contains 31 unique solutions in the approved distribution', () => {
    expect(solutions).toHaveLength(31)
    expect(new Set(solutions.map(({ slug }) => slug)).size).toBe(31)
    expect(Object.fromEntries(categories.map(({ id }) => [id, solutions.filter((item) => item.primaryCategory === id).length]))).toEqual({ INF: 8, SRV: 7, RUN: 3, APP: 5, DST: 4, GTW: 2, EDG: 2 })
  })

  it('has bilingual editorial content, official sources, and release verification dates', () => {
    for (const solution of solutions) {
      expect(solution.summary.tr.length).toBeGreaterThan(20)
      expect(solution.summary.en.length).toBeGreaterThan(20)
      expect(solution.strengths.tr.length).toBeGreaterThan(0)
      expect(solution.limitations.en.length).toBeGreaterThan(0)
      expect(solution.sources.length).toBeGreaterThan(0)
      expect(solution.sources.every(({ url }) => url.startsWith('https://'))).toBe(true)
      expect(solution.lastVerified).toBe('2026-08-12')
    }
  })

  it('retains TGI as maintenance context', () => {
    expect(solutions.find(({ slug }) => slug === 'hugging-face-tgi')?.projectStatus).toBe('maintenance')
  })
})
