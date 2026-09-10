import type { Flashcard, ProgressState } from '@/types/learning'
import { daysBetween, isDue, toIsoDay } from './sm2'

/** Group cards into "due today", "new", and "upcoming". */
export interface CardQueue {
  due: Flashcard[]
  new: Flashcard[]
  upcoming: Flashcard[]
  totalDue: number
  totalNew: number
}

export function buildQueue(
  allCards: Flashcard[],
  state: ProgressState,
  now: Date,
  options: { newPerDay?: number } = {},
): CardQueue {
  const newPerDay = options.newPerDay ?? 10
  const due: Flashcard[] = []
  const fresh: Flashcard[] = []
  const upcoming: Flashcard[] = []
  for (const card of allCards) {
    const progress = state.cards[card.id]
    if (!progress) {
      fresh.push(card)
    } else if (isDue(progress, now)) {
      due.push(card)
    } else {
      upcoming.push(card)
    }
  }
  // Sort due by overdue length (most overdue first).
  due.sort((a, b) => (state.cards[a.id].due < state.cards[b.id].due ? -1 : 1))
  // Cap new cards per day.
  const introducedToday = Object.values(state.cards).filter((card) => card.firstReviewed === toIsoDay(now)).length
  const newCards = fresh.slice(0, Math.max(0, newPerDay - introducedToday))
  return {
    due,
    new: newCards,
    upcoming,
    totalDue: due.length,
    totalNew: fresh.length,
  }
}

/** Map of "due counts" per tag, used by tag-level progress. */
export function tagStrength(state: ProgressState, allCards: Flashcard[]): Record<string, { c: number; t: number }> {
  // For learning signal we use quiz stats when present; fall back to card counts.
  const out: Record<string, { c: number; t: number }> = { ...state.quizStats.byTag }
  for (const card of allCards) {
    for (const tag of card.tags) {
      if (!out[tag]) out[tag] = { c: 0, t: 0 }
    }
  }
  return out
}

/** Quick achievement helpers (used by hub page). */
export interface Achievements {
  cardsReviewed: number
  conceptsRead: number
  lessonsCompleted: number
  quizzesAnswered: number
  streakDays: number
  longestStreak: number
  hasAnyActivity: boolean
}

export function summarize(state: ProgressState, totalLessons: number, now = new Date()): Achievements {
  const cardsReviewed = Object.keys(state.cards).length
  const conceptsRead = state.readConcepts.length
  const lessonsCompleted = state.completedLessons.length
  const quizzesAnswered = state.quizStats.totalAnswered
  const hasAnyActivity = cardsReviewed + conceptsRead + lessonsCompleted + quizzesAnswered > 0
  void totalLessons
  return {
    cardsReviewed,
    conceptsRead,
    lessonsCompleted,
    quizzesAnswered,
    streakDays: state.streak.lastDay && daysBetween(state.streak.lastDay, toIsoDay(now)) >= 0 && daysBetween(state.streak.lastDay, toIsoDay(now)) <= 1 ? state.streak.current : 0,
    longestStreak: state.streak.longest,
    hasAnyActivity,
  }
}
