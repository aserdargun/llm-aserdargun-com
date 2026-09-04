import { describe, expect, it } from 'vitest'
import { categories } from './categories'
import { solutions } from './solutions'

describe('curated atlas dataset', () => {
  it('contains the seven approved categories in order', () => {
    expect(categories.map(({ id }) => id)).toEqual(['INF', 'SRV', 'RUN', 'APP', 'DST', 'GTW', 'EDG'])
  })

  it('contains 31 unique solutions in the approved distribution', () => {
    expect(solutions).toHaveLength(31)
    expect(new Set(solutions.map(({ slug }) => slug)).size).toBe(31)
    expect(Object.fromEntries(categories.map(({ id }) => [id, solutions.filter((item) => item.primaryCategory === id).length]))).toEqual({ INF: 8, SRV: 7, RUN: 3, APP: 5, DST: 4, GTW: 2, EDG: 2 })
  })

  it('has bilingual editorial content, official sources, and honest verification dates', () => {
    for (const solution of solutions) {
      expect(solution.summary.tr.length).toBeGreaterThan(20)
      expect(solution.summary.en.length).toBeGreaterThan(20)
      expect(solution.strengths.tr.length).toBeGreaterThan(0)
      expect(solution.limitations.en.length).toBeGreaterThan(0)
      expect(solution.sources.length).toBeGreaterThan(0)
      expect(solution.sources.every(({ url }) => url.startsWith('https://'))).toBe(true)
      expect(Date.parse(solution.lastVerified)).not.toBeNaN()
      expect(solution.sources.every(({ verifiedAt }) => verifiedAt === solution.lastVerified)).toBe(true)
    }
  })

  it('marks the archived TGI repository as historical context', () => {
    const tgi = solutions.find(({ slug }) => slug === 'hugging-face-tgi')
    expect(tgi?.projectStatus).toBe('archived')
    expect(tgi?.lastVerified).toBe('2026-09-04')
  })

  it('tracks current lifecycle and compatibility for fast-moving records', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    expect(bySlug('exllamav3')).toMatchObject({ projectStatus: 'active', lastVerified: '2026-09-04' })
    expect(bySlug('onnx-runtime-genai')).toMatchObject({ projectStatus: 'preview', lastVerified: '2026-09-04' })
    expect(bySlug('docker-model-runner')).toMatchObject({ projectStatus: 'active', lastVerified: '2026-09-04' })
    expect(bySlug('docker-model-runner').executionBackends).toEqual(expect.arrayContaining(['llama.cpp', 'vLLM', 'Diffusers']))
    expect(bySlug('docker-model-runner').modelFormats).toEqual(expect.arrayContaining(['GGUF', 'Safetensors', 'OCI artifact']))
    expect(bySlug('nvidia-dynamo').hardware).toEqual(expect.arrayContaining(['NVIDIA GPU', 'AMD GPU', 'Intel GPU']))
    expect(bySlug('llm-d')).toMatchObject({ projectStatus: 'active', lastVerified: '2026-09-04' })
    expect(bySlug('llm-d').executionBackends).toEqual(expect.arrayContaining(['vLLM', 'SGLang']))
  })
})
