import { describe, expect, it } from 'vitest'
import { solutions } from '@/data/solutions'
import { filterSolutions, parseExploreState, serializeExploreState } from './filters'

describe('explore filters', () => {
  it('parses known URL dimensions and drops unknown dimensions', () => {
    const state = parseExploreState(new URLSearchParams('q=llama&category=INF&hardware=NVIDIA+GPU&nope=x'))
    expect(state).toMatchObject({ q: 'llama', category: ['INF'], hardware: ['NVIDIA GPU'] })
    expect(serializeExploreState(state).has('nope')).toBe(false)
  })

  it('uses OR within a dimension and AND across dimensions', () => {
    const result = filterSolutions(solutions, { ...parseExploreState(new URLSearchParams()), category: ['INF', 'SRV'], hardware: ['Apple Silicon'] }, 'en')
    expect(result.map(({ slug }) => slug)).toContain('llama-cpp')
    expect(result.every(({ primaryCategory }) => ['INF', 'SRV'].includes(primaryCategory))).toBe(true)
    expect(result.every(({ hardware }) => hardware.includes('Apple Silicon'))).toBe(true)
  })

  it('searches hardware and translated category names', () => {
    const state = parseExploreState(new URLSearchParams('q=Intel NPU'))
    expect(filterSolutions(solutions, state, 'en').map((s) => s.slug)).toContain('openvino-genai')
    expect(filterSolutions(solutions, { ...state, q: 'ağ geçitleri' }, 'tr').map((s) => s.slug)).toContain('litellm-proxy')
  })

  it('searches names and localized editorial content', () => {
    expect(filterSolutions(solutions, { ...parseExploreState(new URLSearchParams()), q: 'llama' }, 'en').some(({ slug }) => slug === 'llama-cpp')).toBe(true)
    expect(filterSolutions(solutions, { ...parseExploreState(new URLSearchParams()), q: 'çevrimdışı' }, 'tr').some(({ slug }) => slug === 'gpt4all')).toBe(true)
  })
})
