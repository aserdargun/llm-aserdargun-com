import { describe, expect, it } from 'vitest'
import { isStale } from './freshness'

describe('source freshness', () => {
  it('uses the current atlas review date when no reference is supplied', () => {
    expect(isStale('2026-02-13')).toBe(true)
  })

  it('becomes stale only after 180 full days', () => {
    expect(isStale('2026-02-13', '2026-08-12')).toBe(false)
    expect(isStale('2026-02-12', '2026-08-12')).toBe(true)
  })
})
