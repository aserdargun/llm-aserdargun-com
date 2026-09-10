import { describe, expect, it } from 'vitest'
import { concepts } from '@/data/concepts'
import { flashcards } from '@/data/flashcards'
import { quizzes } from '@/data/quizzes'
import { lessons } from '@/data/lessons'
import { solutions } from '@/data/solutions'
import { learningDataSchema } from './learning-schema'
const dataset = { concepts, flashcards, quizzes, lessons, solutionSlugs: solutions.map((s) => s.slug) }
describe('learning content contract', () => {
  it('validates all bilingual records and cross-references', () => { expect(learningDataSchema.safeParse(dataset).success).toBe(true) })
  it('rejects broken card references and duplicate identities', () => {
    const bad = { ...dataset, flashcards: [{ ...flashcards[0], refSlug: 'missing' }, flashcards[0]] }
    const result = learningDataSchema.safeParse(bad)
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error.issues).toHaveLength(2)
  })
  it('rejects an answer index that cannot be selected', () => {
    const mcq = quizzes.find((q) => q.kind === 'mcq')!
    expect(learningDataSchema.safeParse({ ...dataset, quizzes: [{ ...mcq, correct: 999 }] }).success).toBe(false)
  })
})
