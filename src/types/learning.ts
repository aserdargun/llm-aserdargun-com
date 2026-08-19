import type { LocalizedText } from './atlas'

// ─────────────────────────────────────────────────────────────
//  Kavram Sözlüğü
// ─────────────────────────────────────────────────────────────

export type ConceptCategory = 'core' | 'serving' | 'optimization' | 'hardware' | 'app'

/** A single concept with three readability levels and an SVG visual key. */
export interface Concept {
  slug: string
  name: LocalizedText
  /** 1-sentence summary shown in lists and tooltips. */
  short: LocalizedText
  /** Beginner: daily language, metaphor, no jargon. */
  beginner: LocalizedText
  /** Intermediate: technical detail, why it exists, where it appears. */
  intermediate: LocalizedText
  /** Advanced: deeper mechanics, tradeoffs, references. */
  advanced: LocalizedText
  /** SVG visual key; the renderer maps this to an inline component. */
  visual:
    | 'token-grid'
    | 'kv-cache'
    | 'pipeline'
    | 'quantize'
    | 'attention'
    | 'context-window'
    | 'embedding'
    | 'gpu-mesh'
    | 'batching'
    | 'tree'
  relatedConcepts: string[]
  relatedSolutions: string[]
  category: ConceptCategory
}

// ─────────────────────────────────────────────────────────────
//  Flashcard (Spaced Repetition)
// ─────────────────────────────────────────────────────────────

export interface Flashcard {
  id: string
  source: 'concept' | 'solution'
  refSlug: string
  front: LocalizedText
  back: LocalizedText
  hint?: LocalizedText
  tags: string[]
}

// ─────────────────────────────────────────────────────────────
//  Quiz
// ─────────────────────────────────────────────────────────────

export interface QuizMcq {
  id: string
  kind: 'mcq'
  prompt: LocalizedText
  options: LocalizedText[]
  /** 0-based index of the correct option. */
  correct: number
  explain: LocalizedText
  tags: string[]
}

export interface QuizTrueFalse {
  id: string
  kind: 'truefalse'
  prompt: LocalizedText
  correct: boolean
  explain: LocalizedText
  tags: string[]
}

export interface QuizMatch {
  id: string
  kind: 'match'
  prompt: LocalizedText
  pairs: { left: LocalizedText; right: LocalizedText }[]
  tags: string[]
}

export type QuizQuestion = QuizMcq | QuizTrueFalse | QuizMatch

// ─────────────────────────────────────────────────────────────
//  Lesson (Mini-ders)
// ─────────────────────────────────────────────────────────────

export interface LessonStep {
  title: LocalizedText
  body: LocalizedText
  visual?: 'token-grid' | 'pipeline' | 'quantize' | 'gpu-mesh' | 'batching' | 'tree' | 'attention' | 'context-window' | 'embedding' | 'kv-cache'
  codeBlock?: { lang: string; code: string }
  tryIt?: { label: LocalizedText; href: string }
}

export interface Lesson {
  slug: string
  title: LocalizedText
  summary: LocalizedText
  level: 'starter' | 'intermediate'
  durationMin: number
  steps: LessonStep[]
  relatedConcepts: string[]
  relatedSolutions: string[]
}

// ─────────────────────────────────────────────────────────────
//  Progress (localStorage state)
// ─────────────────────────────────────────────────────────────

export interface CardProgress {
  ef: number
  interval: number
  due: string
  reps: number
  lapses: number
}

export interface TagStat {
  c: number
  t: number
}

export interface ProgressState {
  schema: 1
  cards: Record<string, CardProgress>
  quizStats: {
    totalAnswered: number
    correctRate: number
    byTag: Record<string, TagStat>
  }
  streak: {
    current: number
    longest: number
    lastDay: string
  }
  favorites: {
    concepts: string[]
    solutions: string[]
  }
  readConcepts: string[]
  completedLessons: string[]
}
