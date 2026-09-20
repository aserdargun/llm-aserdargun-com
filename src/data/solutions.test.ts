import { describe, expect, it } from 'vitest'
import { categories } from './categories'
import { datasetRelease } from './dataset-release'
import { lessons } from './lessons'
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

  it('records material vLLM v0.29.0 notes in both languages against the pinned release source', () => {
    const vllm = solutions.find((solution) => solution.slug === 'vllm')
    expect(vllm).toBeDefined()
    expect(vllm!.lastVerified).toBe('2026-09-18')
    expect(vllm!.sources[0]?.url).toBe('https://github.com/vllm-project/vllm/releases/tag/v0.29.0')

    // Turkish material coverage
    const trConcat = `${vllm!.summary.tr} ${vllm!.description.tr} ${vllm!.limitations.tr.join(' ')}`
    expect(trConcat).toContain('Model Runner V2')
    expect(trConcat).toContain('v0.29.0')
    expect(trConcat).toContain('--max-num-queued-reqs')
    expect(trConcat).toContain('--max-num-queued-tokens')
    expect(trConcat).toContain('python -m vllm.entrypoints.openai.api_server')
    expect(trConcat).toContain('vllm serve')
    expect(trConcat).toContain('ROCm')
    // Universal "all hardware" claim must NOT appear
    expect(trConcat.toLowerCase()).not.toContain('tüm donanım desteklenir')

    // English material coverage
    const enConcat = `${vllm!.summary.en} ${vllm!.description.en} ${vllm!.limitations.en.join(' ')}`
    expect(enConcat).toContain('Model Runner V2')
    expect(enConcat).toContain('v0.29.0')
    expect(enConcat).toContain('--max-num-queued-reqs')
    expect(enConcat).toContain('--max-num-queued-tokens')
    expect(enConcat).toContain('python -m vllm.entrypoints.openai.api_server')
    expect(enConcat).toContain('vllm serve')
    expect(enConcat).toContain('ROCm')
    // Affirmative universal "all-hardware supported" claim must NOT appear in summary/description
    const enSummaryDesc = `${vllm!.summary.en} ${vllm!.description.en}`.toLowerCase()
    expect(enSummaryDesc).not.toContain('all-hardware supported')
    // Bounded hardware list is recorded in limitations
    const enLimitations = vllm!.limitations.en.join(' ')
    expect(enLimitations).toContain('CUDA')
    expect(enLimitations).toContain('ROCm')
    expect(enLimitations).toContain('CPU')
    expect(enLimitations).toContain('XPU')
    // Explicit denial of universal "all-hardware supported" claim is present
    expect(enLimitations.toLowerCase()).toContain('not a universal')
    expect(enLimitations).toContain('all-hardware supported')

    // Deprecation noted, NOT removal
    const enDesc = vllm!.description.en.toLowerCase()
    expect(enDesc).toContain('deprecated')
    expect(enDesc).toContain('not yet removed')
    const trDesc = vllm!.description.tr.toLowerCase()
    expect(trDesc).toContain('kullanım dışı')
    expect(trDesc).toContain('kaldırılmadı')
  })

  it('keeps the production-api-vllm lesson on vllm serve and adds v0.29.0 admission flags in both languages', () => {
    const lesson = lessons.find((l) => l.slug === 'production-api-vllm')
    expect(lesson).toBeDefined()
    const serveStep = lesson!.steps.find((s) => s.body.tr.includes('vllm serve') && s.body.en.includes('vllm serve'))
    expect(serveStep).toBeDefined()
    expect(serveStep!.body.tr).toContain('v0.29.0')
    expect(serveStep!.body.tr).toContain('--max-num-queued-reqs')
    expect(serveStep!.body.tr).toContain('--max-num-queued-tokens')
    expect(serveStep!.body.tr).toContain('python -m vllm.entrypoints.openai.api_server')
    expect(serveStep!.body.en).toContain('v0.29.0')
    expect(serveStep!.body.en).toContain('--max-num-queued-reqs')
    expect(serveStep!.body.en).toContain('--max-num-queued-tokens')
    expect(serveStep!.body.en).toContain('python -m vllm.entrypoints.openai.api_server')
    expect(serveStep!.codeBlock?.code ?? '').toContain('--max-num-queued-reqs')
    expect(serveStep!.codeBlock?.code ?? '').toContain('--max-num-queued-tokens')
  })

  it('stamps the dataset release for vLLM v0.29.0 and links the pinned evidence URL', () => {
    expect(datasetRelease.release).toBe('2026-09-18-vllm-v0.29.0')
    expect(datasetRelease.collections.solutions.revision).toBe('2026-09-18')
    expect(datasetRelease.collections.lessons.revision).toBe('2026-09-18')
    const vllmEvidence = datasetRelease.evidence.find((e) => e.topic === 'vllm-v0.29.0-release')
    expect(vllmEvidence).toBeDefined()
    expect(vllmEvidence!.url).toBe('https://github.com/vllm-project/vllm/releases/tag/v0.29.0')
    expect(vllmEvidence!.checkedAt).toBe('2026-09-18')
    expect(vllmEvidence!.collections).toEqual(expect.arrayContaining(['solutions', 'lessons']))
    // Other solution record verification dates are untouched
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!
    expect(bySlug('exllamav3').lastVerified).toBe('2026-09-04')
    expect(bySlug('hugging-face-tgi').lastVerified).toBe('2026-09-04')
  })
})
