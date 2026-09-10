import type { CardProgress, ProgressState } from '@/types/learning'
import { addDays, grade, initialCardProgress, toIsoDay } from './sm2'
import { useCallback, useSyncExternalStore } from 'react'
import { z } from 'zod'

const STORAGE_KEY = 'atlas.learn.v1.progress'


const emptyState = (): ProgressState => ({
  schema: 1,
  cards: {},
  quizStats: { totalAnswered: 0, correctRate: 0, byTag: {} },
  streak: { current: 0, longest: 0, lastDay: '' },
  favorites: { concepts: [], solutions: [] },
  readConcepts: [],
  completedLessons: [],
})

const count = z.number().int().nonnegative().finite()
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const date = new Date(`${value}T12:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
})
const strings = z.array(z.string()).transform((items) => [...new Set(items)]).catch([])
const cardSchema = z.object({
  ef: z.number().finite().min(1.3), interval: count, due: day, reps: count, lapses: count,
  firstReviewed: day.optional(),
})
const progressSchema = z.object({
  schema: z.literal(1),
  cards: z.record(z.unknown()).catch({}).transform((cards) => Object.fromEntries(
    Object.entries(cards).flatMap(([id, value]) => {
      const parsed = cardSchema.safeParse(value)
      return parsed.success ? [[id, parsed.data]] : []
    }),
  )),
  quizStats: z.object({
    totalAnswered: count, correctRate: z.number().finite().min(0).max(1),
    byTag: z.record(z.object({ c: count, t: count }).refine(({ c, t }) => c <= t)),
  }).catch({ totalAnswered: 0, correctRate: 0, byTag: {} }),
  streak: z.object({ current: count, longest: count, lastDay: z.union([day, z.literal('')]) })
    .refine(({ current, longest }) => current <= longest)
    .catch({ current: 0, longest: 0, lastDay: '' }),
  favorites: z.object({ concepts: strings, solutions: strings }).catch({ concepts: [], solutions: [] }),
  readConcepts: strings,
  completedLessons: strings,
})

function parseProgress(raw: string | null): ProgressState {
  try {
    const parsed = progressSchema.safeParse(JSON.parse(raw ?? 'null'))
    return parsed.success ? parsed.data : emptyState()
  } catch { return emptyState() }
}

export function loadProgress(): ProgressState {
  try { return parseProgress(window.localStorage.getItem(STORAGE_KEY)) }
  catch { return emptyState() }
}

const CHANGE_EVENT = 'atlas-progress-change'
let cachedRaw: string | null | undefined
let cachedState = emptyState()
let memoryOnly = false

function getSnapshot(): ProgressState {
  if (memoryOnly) return cachedState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw !== cachedRaw) { cachedRaw = raw; cachedState = parseProgress(raw) }
  } catch { memoryOnly = true }
  return cachedState
}

export function saveProgress(state: ProgressState): void {
  cachedState = state
  cachedRaw = JSON.stringify(state)
  try { window.localStorage.setItem(STORAGE_KEY, cachedRaw) }
  catch { memoryOnly = true }
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function clearProgress(): void {
  saveProgress(emptyState())
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange()
  }
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onStorage)
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
    cards: { ...state.cards, [cardId]: { ...next, firstReviewed: prev.firstReviewed ?? toIsoDay(now) } },
  }
}

// ─── Streak helpers ─────────────────────────────────────────

export function bumpStreak(state: ProgressState, now: Date): ProgressState {
  const today = toIsoDay(now)
  if (state.streak.lastDay === today) return state
  const yesterday = toIsoDay(addDays(now, -1))
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

export function recordQuiz(state: ProgressState, tags: string | string[], correct: boolean): ProgressState {
  const byTag = { ...state.quizStats.byTag }
  for (const tag of new Set(typeof tags === 'string' ? [tags] : tags)) {
    const prevTag = byTag[tag] ?? { c: 0, t: 0 }
    byTag[tag] = { c: prevTag.c + (correct ? 1 : 0), t: prevTag.t + 1 }
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

export function useProgress() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const update = useCallback((mutator: (prev: ProgressState) => ProgressState) => {
    const previous = getSnapshot()
    const next = mutator(previous)
    if (next !== previous) saveProgress(bumpStreak(next, new Date()))
  }, [])
  return { state, update, clear: clearProgress, persistent: !memoryOnly }
}
