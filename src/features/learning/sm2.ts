import type { CardProgress } from '@/types/learning'

/**
 * SM-2 spaced repetition algorithm (Piotr Wozniak, 1990).
 *
 * Quality scale 0-5:
 *  0 — total blackout
 *  1 — wrong, but the correct answer felt familiar
 *  2 — wrong, but easy to remember once shown
 *  3 — correct, with serious difficulty
 *  4 — correct, with hesitation
 *  5 — perfect recall
 *
 * Rules:
 *  - q < 3  → failure: reps = 0, interval = 1, lapses += 1
 *  - q >= 3 → success
 *      reps 0 → interval = 1
 *      reps 1 → interval = 6
 *      reps >= 2 → interval = round(interval * ef)
 *  - ef' = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 *  - ef clamped to a minimum of 1.3
 */
export const MIN_EF = 1.3
export const DEFAULT_EF = 2.5

export const initialCardProgress = (now: Date): CardProgress => ({
  ef: DEFAULT_EF,
  interval: 0,
  due: toIsoDay(now),
  reps: 0,
  lapses: 0,
})

export interface Grade {
  prev: CardProgress
  next: CardProgress
  /** ISO day (YYYY-MM-DD) when this card is next due. */
  nextDue: string
  /** True if the grade counts as a successful review (q >= 3). */
  success: boolean
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

export function toIsoDay(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY)
}

export function daysBetween(fromIsoDay: string, toIsoDay: string): number {
  const [fy, fm, fd] = fromIsoDay.split('-').map(Number)
  const [ty, tm, td] = toIsoDay.split('-').map(Number)
  const from = Date.UTC(fy, fm - 1, fd)
  const to = Date.UTC(ty, tm - 1, td)
  return Math.round((to - from) / MS_PER_DAY)
}

export function grade(prev: CardProgress, quality: number, now: Date): Grade {
  const q = Math.max(0, Math.min(5, Math.round(quality)))
  const success = q >= 3
  const efCandidate = prev.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const ef = Math.max(MIN_EF, efCandidate)
  let interval: number
  let reps: number
  let lapses = prev.lapses
  if (!success) {
    reps = 0
    interval = 1
    lapses += 1
  } else if (prev.reps === 0) {
    reps = 1
    interval = 1
  } else if (prev.reps === 1) {
    reps = 2
    interval = 6
  } else {
    reps = prev.reps + 1
    interval = Math.max(1, Math.round(prev.interval * ef))
  }
  const nextDue = toIsoDay(addDays(now, interval))
  const next: CardProgress = { ef, interval, due: nextDue, reps, lapses }
  return { prev, next, nextDue, success }
}

/** Returns true when the card is due (or overdue) on the given day. */
export function isDue(card: CardProgress, now: Date): boolean {
  return card.due <= toIsoDay(now)
}

/** Count of cards whose due day is on or before `now`. */
export function countDue(cards: CardProgress[], now: Date): number {
  const today = toIsoDay(now)
  let n = 0
  for (const c of cards) if (c.due <= today) n += 1
  return n
}
