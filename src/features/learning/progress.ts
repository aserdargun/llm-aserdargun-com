import type { CardProgress, ProgressState } from '@/types/learning'
import { grade, initialCardProgress, toIsoDay } from './sm2'

const STORAGE_KEY = 'atlas.learn.v1.progress'
const DAY_MS = 24 * 60 * 60 * 1000

const emptyState = (): ProgressState => ({
  schema: 1,
  cards: {},
  quizStats: { totalAnswered: 0, correctRate: 0, byTag: {} },
  streak: { current: 0, longest: 0, lastDay: '' },
  favorites: { concepts: [], solutions: [] },
  readConcepts: [],
  completedLessons: [],
})

export function loadProgress(): ProgressState {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return emptyState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    if (parsed.schema !== 1) return emptyState()
    return { ...emptyState(), ...parsed } as ProgressState
  } catch {
    return emptyState()
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage may be full or disabled; silently skip rather than crash UX.
  }
}

export function clearProgress(): void {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

// ─── Card helpers ───────────────────────────────────────────

export function ensureCard(state: ProgressState, cardId: string, now: Date): CardProgress {
  const existing = state.cards[cardId]
  if (existing) return existing
  const init = initialCardProgress(now)
  return init
}

export function reviewCard(state: ProgressState, cardId: string, quality: number, now: Date): ProgressState {
  const prev = ensureCard(state, cardId, now)
  const { next } = grade(prev, quality, now)
  return {
    ...state,
    cards: { ...state.cards, [cardId]: next },
  }
}

// ─── Streak helpers ─────────────────────────────────────────

export function bumpStreak(state: ProgressState, now: Date): ProgressState {
  const today = toIsoDay(now)
  if (state.streak.lastDay === today) return state
  const yesterday = toIsoDay(new Date(now.getTime() - DAY_MS))
  const current = state.streak.lastDay === yesterday ? state.streak.current + 1 : 1
  return {
    ...state,
    streak: {
      current,
      longest: Math.max(state.streak.longest, current),
      lastDay: today,
    },
  }
}

// ─── Quiz helpers ───────────────────────────────────────────

export function recordQuiz(state: ProgressState, tag: string, correct: boolean): ProgressState {
  const prevTag = state.quizStats.byTag[tag] ?? { c: 0, t: 0 }
  const byTag = {
    ...state.quizStats.byTag,
    [tag]: { c: prevTag.c + (correct ? 1 : 0), t: prevTag.t + 1 },
  }
  const totalAnswered = state.quizStats.totalAnswered + 1
  const totalCorrect = state.quizStats.correctRate * state.quizStats.totalAnswered + (correct ? 1 : 0)
  return {
    ...state,
    quizStats: {
      totalAnswered,
      correctRate: totalCorrect / totalAnswered,
      byTag,
    },
  }
}

// ─── Favorites / Read / Completed ───────────────────────────

export function toggleFavorite(state: ProgressState, kind: 'concepts' | 'solutions', slug: string): ProgressState {
  const list = state.favorites[kind]
  const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]
  return { ...state, favorites: { ...state.favorites, [kind]: next } }
}

export function markRead(state: ProgressState, slug: string): ProgressState {
  if (state.readConcepts.includes(slug)) return state
  return { ...state, readConcepts: [...state.readConcepts, slug] }
}

export function markLessonDone(state: ProgressState, slug: string): ProgressState {
  if (state.completedLessons.includes(slug)) return state
  return { ...state, completedLessons: [...state.completedLessons, slug] }
}

// ─── React hook ─────────────────────────────────────────────

import { useCallback, useEffect, useState } from 'react'

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => loadProgress())
  useEffect(() => {
    saveProgress(state)
  }, [state])
  const update = useCallback((mutator: (prev: ProgressState) => ProgressState) => {
    setState((prev) => mutator(prev))
  }, [])
  return { state, setState, update, clear: () => setState(emptyState()) }
}
