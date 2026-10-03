import { describe, expect, it } from 'vitest'
import { categories } from './categories'
import { datasetRelease } from './dataset-release'
import { lessons } from './lessons'
import { solutions } from './solutions'
import { sourceAudit } from './source-audit'

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

    expect(bySlug('exllamav3')).toMatchObject({ projectStatus: 'active', lastVerified: '2026-10-03', modelFormats: ['EXL3'] })
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
    expect(vllm!.lastVerified).toBe('2026-10-03')
    expect(vllm!.sources[0]?.url).toBe('https://github.com/vllm-project/vllm/releases/tag/v0.29.0')
    expect(vllm!.sources.map((s) => s.url)).toEqual(expect.arrayContaining(['https://github.com/vllm-project/vllm/releases/tag/v0.30.0']))
    expect(vllm!.sources.every((s) => s.verifiedAt === '2026-10-03')).toBe(true)

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

  it('retains pinned vLLM release evidence in the current content audit', () => {
    expect(datasetRelease.release).toBe('2026-10-03-content-audit')
    expect(datasetRelease.collections.solutions.revision).toBe('2026-10-03')
    expect(datasetRelease.collections.lessons.revision).toBe('2026-09-21')
    const vllmEvidence = datasetRelease.evidence.find((e) => e.topic === 'vllm-v0.29.0-release')
    expect(vllmEvidence).toBeDefined()
    expect(vllmEvidence!.url).toBe('https://github.com/vllm-project/vllm/releases/tag/v0.29.0')
    expect(vllmEvidence!.checkedAt).toBe('2026-09-18')
    expect(vllmEvidence!.collections).toEqual(expect.arrayContaining(['solutions', 'lessons']))
    // Each solution retains its own recorded verification date
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!
    expect(bySlug('exllamav3').lastVerified).toBe('2026-10-03')
    expect(bySlug('hugging-face-tgi').lastVerified).toBe('2026-09-04')
  })

  it('records the 2026-10-03 post-audit serving refresh against primary release sources', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // vLLM v0.30.0 (2026-09-22): scale-out opt-in flag, removal of items deprecated in 0.29, NVFP4
    const vllm = bySlug('vllm')
    const vllmEn = `${vllm.description.en} ${vllm.limitations.en.join(' ')}`
    expect(vllmEn).toContain('v0.30.0')
    expect(vllmEn).toContain('--enable-scale-out')
    expect(vllmEn).toContain('VLLM_ENABLE_SCALE_OUT_ENDPOINTS')
    expect(vllmEn).toContain('vllm serve --grpc')
    expect(vllmEn).toContain('NVFP4')
    expect(vllmEn).toContain('g_idx')
    const vllmTr = `${vllm.description.tr} ${vllm.limitations.tr.join(' ')}`
    expect(vllmTr).toContain('v0.30.0')
    expect(vllmTr).toContain('--enable-scale-out')
    expect(vllmTr).toContain('g_idx')

    // SGLang v0.5.21 (2026-10-02): Rust-core default prefix cache, decisions/score endpoints
    const sglang = bySlug('sglang')
    expect(sglang.lastVerified).toBe('2026-10-03')
    expect(sglang.sources.map((s) => s.url)).toEqual(expect.arrayContaining(['https://github.com/sgl-project/sglang/releases/tag/v0.5.21']))
    expect(sglang.description.en).toContain('v0.5.21')
    expect(sglang.description.en).toContain('Rust core')
    expect(sglang.description.en).toContain('/v1/decisions')
    expect(sglang.description.en).toContain('/v1/score')
    expect(sglang.description.tr).toContain('v0.5.21')
    expect(sglang.description.tr).toContain('Rust çekirdeğine')
    // Release-note performance figures must be framed as the project's own measurements
    expect(sglang.limitations.en.join(' ')).toContain('version-specific measurements')

    // TensorRT-LLM v1.3.0rc29 is a release candidate: breaking removals recorded, not hidden
    const tensorrt = bySlug('tensorrt-llm')
    expect(tensorrt.sources.map((s) => s.url)).toEqual(expect.arrayContaining(['https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.3.0rc29']))
    expect(tensorrt.description.en).toContain('release candidate')
    expect(tensorrt.description.en).toContain('AutoDeploy')
    expect(tensorrt.description.tr).toContain('sürüm adayıdır')
    expect(tensorrt.limitations.en.join(' ')).toContain('release candidate')

    // The endpoint audit date advanced only because every endpoint was re-fetched on 2026-10-03
    expect(sourceAudit.checkedAt).toBe('2026-10-03')
    for (const topic of ['vllm-v0.30.0-release', 'sglang-v0.5.21-release', 'tensorrt-llm-v1.3.0rc29-release']) {
      const entry = datasetRelease.evidence.find((e) => e.topic === topic)
      expect(entry).toBeDefined()
      expect(entry!.checkedAt).toBe('2026-10-03')
      expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
    }
  })

  it('records the three releases published after 2026-09-22 in both languages against their own release notes', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // ExLlamaV3 v1.5.3 (2026-09-27), with v1.5.2/v1.5.1 also after 2026-09-21
    const exllama = bySlug('exllamav3')
    expect(exllama.sources.map((s) => s.url)).toEqual(expect.arrayContaining(['https://github.com/turboderp-org/exllamav3/releases/tag/v1.5.3']))
    for (const claim of ['KimiLinearForCausalLM', 'MiMoV2ForCausalLM', 'DFlash2', 'tensor paralel', 'EXL3']) {
      expect(exllama.description.tr).toContain(claim)
    }
    for (const claim of ['KimiLinearForCausalLM', 'MiMoV2ForCausalLM', 'DFlash2', 'tensor-parallel', 'EXL3 remains the weight format']) {
      expect(exllama.description.en).toContain(claim)
    }
    // The EXL3 weight format itself is unchanged
    expect(exllama.modelFormats).toEqual(['EXL3'])

    // RamaLama v0.25.0 (2026-09-25): serve binds to loopback by default
    const ramalama = bySlug('ramalama')
    expect(ramalama.sources.map((s) => s.url)).toEqual(expect.arrayContaining(['https://github.com/containers/ramalama/releases/tag/v0.25.0']))
    expect(ramalama.description.en).toContain('v0.25.0')
    expect(ramalama.description.en).toContain('loopback by default')
    expect(ramalama.description.en).toContain('without removing it')
    expect(ramalama.description.tr).toContain('v0.25.0')
    expect(ramalama.description.tr).toContain('loopback')
    expect(ramalama.description.tr).toContain('kaldırmadan')
    // Deprecation must not be recorded as a removal
    expect(ramalama.limitations.en.join(' ')).toContain('not yet removed')
    expect(ramalama.limitations.tr.join(' ')).toContain('henüz kaldırılmadı')

    // KServe v0.21.0 (2026-09-25): CRD management restructured, LLMISVC group fix
    const kserve = bySlug('kserve')
    expect(kserve.sources.map((s) => s.url)).toEqual(expect.arrayContaining(['https://github.com/kserve/kserve/releases/tag/v0.21.0']))
    expect(kserve.description.en).toContain('v0.21.0')
    expect(kserve.description.en).toContain('CRD management')
    expect(kserve.description.tr).toContain('v0.21.0')
    expect(kserve.description.tr).toContain('CRD')

    // Each new release is pinned as evidence on the current audit date
    for (const topic of ['exllamav3-v1.5.3-release', 'ramalama-v0.25.0-release', 'kserve-v0.21.0-release']) {
      const entry = datasetRelease.evidence.find((e) => e.topic === topic)
      expect(entry).toBeDefined()
      expect(entry!.checkedAt).toBe('2026-10-03')
      expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
    }

    // The unreadable Dynamo v1.5.0 notes must not be recorded as verified
    expect(bySlug('nvidia-dynamo').lastVerified).toBe('2026-09-04')
    expect(datasetRelease.note).toContain('could not be read')
  })
})
