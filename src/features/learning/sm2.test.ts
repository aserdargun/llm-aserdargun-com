import { describe, expect, it } from 'vitest'
import { addDays, countDue, daysBetween, grade, initialCardProgress, isDue, MIN_EF, toIsoDay } from './sm2'

const today = new Date('2026-08-19T12:00:00Z')

describe('sm2 helpers', () => {
  it('formats ISO day correctly', () => {
    expect(toIsoDay(new Date('2026-01-05T10:00:00Z'))).toBe('2026-01-05')
  })

  it('adds days across month boundary', () => {
    const next = addDays(new Date('2026-01-30T00:00:00Z'), 5)
    expect(toIsoDay(next)).toBe('2026-02-04')
  })

  it('counts whole days between two ISO days', () => {
    expect(daysBetween('2026-08-19', '2026-08-26')).toBe(7)
    expect(daysBetween('2026-08-19', '2026-08-12')).toBe(-7)
  })
})

describe('sm2 grading', () => {
  it('starts with default ef 2.5 and zero reps', () => {
    const init = initialCardProgress(today)
    expect(init.ef).toBe(2.5)
    expect(init.reps).toBe(0)
    expect(init.interval).toBe(0)
    expect(init.due).toBe('2026-08-19')
  })

  it('first success: reps 0 -> 1, interval 1', () => {
    const init = initialCardProgress(today)
    const r = grade(init, 4, today)
    expect(r.success).toBe(true)
    expect(r.next.reps).toBe(1)
    expect(r.next.interval).toBe(1)
    expect(r.nextDue).toBe('2026-08-20')
  })

  it('second success: reps 1 -> 2, interval 6', () => {
    const init = initialCardProgress(today)
    const first = grade(init, 5, today)
    const second = grade(first.next, 5, addDays(today, 1))
    expect(second.next.reps).toBe(2)
    expect(second.next.interval).toBe(6)
    expect(second.nextDue).toBe('2026-08-26')
  })

  it('third success: interval grows by ef (ef increases slightly with q=5)', () => {
    const init = initialCardProgress(today)
    const a = grade(init, 5, today)
    const b = grade(a.next, 5, addDays(today, 1))
    const c = grade(b.next, 5, addDays(today, 6))
    expect(c.next.reps).toBe(3)
    // Each q=5 raises ef by 0.1 (2.5 -> 2.6 -> 2.7 -> 2.8), 6 * 2.8 = 16.8 -> 17
    expect(c.next.interval).toBe(17)
  })

  it('failure resets reps and interval, increments lapses', () => {
    const init = initialCardProgress(today)
    const a = grade(init, 5, today)
    const b = grade(a.next, 5, addDays(today, 1))
    const failed = grade(b.next, 1, addDays(today, 6))
    expect(failed.success).toBe(false)
    expect(failed.next.reps).toBe(0)
    expect(failed.next.interval).toBe(1)
    expect(failed.next.lapses).toBe(1)
  })

  it('ef is clamped to 1.3', () => {
    let card = initialCardProgress(today)
    for (let i = 0; i < 6; i += 1) {
      card = grade(card, 0, addDays(today, i)).next
    }
    expect(card.ef).toBe(MIN_EF)
  })

  it('due flag becomes true on or after the due day', () => {
    // Use noon UTC to avoid local-timezone midnight crossing in tests.
    const start = new Date('2026-08-01T12:00:00Z')
    const init = initialCardProgress(start)
    const future = grade(init, 5, start)
    expect(future.next.due).toBe('2026-08-02')
    // Same day, before due: card not due yet.
    expect(isDue(future.next, new Date('2026-08-01T18:00:00Z'))).toBe(false)
    // On the due day: due.
    expect(isDue(future.next, new Date('2026-08-02T12:00:00Z'))).toBe(true)
    // After due: still due (overdue).
    expect(isDue(future.next, new Date('2026-08-03T12:00:00Z'))).toBe(true)
  })

  it('countDue tallies only cards due today or earlier', () => {
    const today = new Date('2026-08-19T00:00:00Z')
    const cards = [
      { ...initialCardProgress(today), due: '2026-08-18' },
      { ...initialCardProgress(today), due: '2026-08-19' },
      { ...initialCardProgress(today), due: '2026-08-25' },
      { ...initialCardProgress(today), due: '2026-09-01' },
    ]
    expect(countDue(cards, today)).toBe(2)
  })
})
