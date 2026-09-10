import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { buildQueue, summarize } from './selectors'
import { bumpStreak, loadProgress, markRead, recordQuiz, reviewCard, useProgress } from './progress'
import { flashcards } from '@/data/flashcards'

const key = 'atlas.learn.v1.progress'
const now = new Date(2026, 8, 10, 12)
beforeEach(() => { localStorage.clear() })

describe('learning progress integrity', () => {
  it('recovers damaged fields while preserving valid progress', () => {
    localStorage.setItem(key, JSON.stringify({ schema: 1, cards: { broken: { due: '2026-02-31' } }, quizStats: null, favorites: {}, readConcepts: ['tokenization'], completedLessons: null }))
    const state = loadProgress()
    expect(state.readConcepts).toEqual(['tokenization'])
    expect(state.cards).toEqual({})
    expect(state.quizStats.totalAnswered).toBe(0)
    expect(state.favorites.solutions).toEqual([])
    expect(state.completedLessons).toEqual([])
  })

  it('handles a storage getter throwing before getItem can run', () => {
    const getter = vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => { throw new Error('disabled') })
    expect(() => loadProgress()).not.toThrow()
    getter.mockRestore()
  })

  it('counts a multi-tag question exactly once and updates every unique tag', () => {
    const state = recordQuiz(loadProgress(), ['core', 'memory', 'core'], true)
    expect(state.quizStats).toEqual({ totalAnswered: 1, correctRate: 1, byTag: { core: { c: 1, t: 1 }, memory: { c: 1, t: 1 } } })
    expect(recordQuiz(state, ['core'], false).quizStats.correctRate).toBe(0.5)
  })

  it('enforces the daily new-card limit across restarted sessions', () => {
    let state = loadProgress()
    for (const card of flashcards.slice(0, 10)) state = reviewCard(state, card.id, 5, now)
    expect(buildQueue(flashcards, state, now).new).toHaveLength(0)
    const tomorrow = new Date(2026, 8, 11, 12)
    expect(buildQueue(flashcards, state, tomorrow).new).toHaveLength(10)
    expect(buildQueue(flashcards, state, tomorrow).due).toHaveLength(10)
  })

  it('counts only due cards from the requested deck', () => {
    const state = reviewCard(loadProgress(), 'removed-card', 5, now)
    expect(buildQueue(flashcards, state, new Date(2026, 8, 12)).totalDue).toBe(0)
  })

  it('expires the displayed streak without losing the longest streak', () => {
    const state = bumpStreak(bumpStreak(loadProgress(), new Date(2026, 8, 9)), now)
    expect(summarize(state, 6, new Date(2026, 8, 11)).streakDays).toBe(2)
    expect(summarize(state, 6, new Date(2026, 8, 12)).streakDays).toBe(0)
    expect(summarize(state, 6, new Date(2026, 8, 12)).longestStreak).toBe(2)
  })

  it('synchronizes mounted consumers and persists before navigation', () => {
    const first = renderHook(() => useProgress())
    const second = renderHook(() => useProgress())
    act(() => first.result.current.update((state) => markRead(state, 'tokenization')))
    expect(second.result.current.state.readConcepts).toEqual(['tokenization'])
    expect(loadProgress().streak.current).toBe(1)
    act(() => second.result.current.update((state) => recordQuiz(state, ['core'], true)))
    expect(first.result.current.state.readConcepts).toEqual(['tokenization'])
    expect(first.result.current.state.quizStats.totalAnswered).toBe(1)
  })
})
