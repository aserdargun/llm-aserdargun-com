import { describe, expect, it } from 'vitest'
import { categories } from './categories'
import { datasetRelease } from './dataset-release'
import { lessons } from './lessons'
import { solutions } from './solutions'
import { sourceAudit } from './source-audit'
import { ATLAS_DATASET_REVIEWED_AT } from './atlas-meta'

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

    expect(bySlug('exllamav3')).toMatchObject({ projectStatus: 'active', lastVerified: '2026-10-21', modelFormats: ['EXL3'] })
    expect(bySlug('onnx-runtime-genai')).toMatchObject({ projectStatus: 'preview', lastVerified: '2026-09-04' })
    expect(bySlug('docker-model-runner')).toMatchObject({ projectStatus: 'active', lastVerified: '2026-09-04' })
    expect(bySlug('docker-model-runner').executionBackends).toEqual(expect.arrayContaining(['llama.cpp', 'vLLM', 'Diffusers']))
    expect(bySlug('docker-model-runner').modelFormats).toEqual(expect.arrayContaining(['GGUF', 'Safetensors', 'OCI artifact']))
    expect(bySlug('nvidia-dynamo').hardware).toEqual(expect.arrayContaining(['NVIDIA GPU', 'AMD GPU', 'Intel GPU']))
    expect(bySlug('llm-d')).toMatchObject({ projectStatus: 'active', lastVerified: '2026-10-20' })
    expect(bySlug('llm-d').executionBackends).toEqual(expect.arrayContaining(['vLLM', 'SGLang']))
  })

  it('records material vLLM v0.29.0 notes in both languages against the pinned release source', () => {
    const vllm = solutions.find((solution) => solution.slug === 'vllm')
    expect(vllm).toBeDefined()
    expect(vllm!.lastVerified).toBe('2026-10-19')
    expect(vllm!.sources[0]?.url).toBe('https://github.com/vllm-project/vllm/releases/tag/v0.29.0')
    expect(vllm!.sources.map((s) => s.url)).toEqual(expect.arrayContaining(['https://github.com/vllm-project/vllm/releases/tag/v0.30.0']))
    expect(vllm!.sources.every((s) => s.verifiedAt === '2026-10-19')).toBe(true)

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
    expect(datasetRelease.release).toBe('2026-10-24-content-audit')
    expect(datasetRelease.collections.solutions.revision).toBe('2026-10-24')
    expect(datasetRelease.collections.lessons.revision).toBe('2026-09-21')
    const vllmEvidence = datasetRelease.evidence.find((e) => e.topic === 'vllm-v0.29.0-release')
    expect(vllmEvidence).toBeDefined()
    expect(vllmEvidence!.url).toBe('https://github.com/vllm-project/vllm/releases/tag/v0.29.0')
    expect(vllmEvidence!.checkedAt).toBe('2026-09-18')
    expect(vllmEvidence!.collections).toEqual(expect.arrayContaining(['solutions', 'lessons']))
    // Each solution retains its own recorded verification date
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!
    expect(bySlug('exllamav3').lastVerified).toBe('2026-10-21')
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
    expect(sglang.lastVerified).toBe('2026-10-19')
    expect(sglang.sources.map((s) => s.url)).toEqual(expect.arrayContaining(['https://github.com/sgl-project/sglang/releases/tag/v0.5.21']))
    expect(sglang.description.en).toContain('v0.5.21')
    expect(sglang.description.en).toContain('Rust core')
    expect(sglang.description.en).toContain('/v1/decisions')
    expect(sglang.description.en).toContain('/v1/score')
    expect(sglang.description.tr).toContain('v0.5.21')
    expect(sglang.description.tr).toContain('Rust çekirdeğine')
    // Release-note performance figures must be framed as the project's own measurements
    expect(sglang.limitations.en.join(' ')).toContain('version-specific measurements')

    // TensorRT-LLM v1.4.0rc1 is a release candidate: breaking removals recorded, not hidden
    const tensorrt = bySlug('tensorrt-llm')
    expect(tensorrt.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.4.0rc1',
        'https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.4.0rc0',
      ]),
    )
    expect(tensorrt.description.en).toContain('release candidate')
    expect(tensorrt.description.en).toContain('KVCacheManagerV2')
    expect(tensorrt.description.tr).toContain('sürüm adayıdır')
    expect(tensorrt.limitations.en.join(' ')).toContain('release candidate')

    // The endpoint audit date advanced only because every endpoint was re-fetched on 2026-10-24
    expect(sourceAudit.checkedAt).toBe('2026-10-24')
    for (const topic of ['vllm-v0.30.0-release', 'sglang-v0.5.21-release']) {
      const entry = datasetRelease.evidence.find((e) => e.topic === topic)
      expect(entry).toBeDefined()
      expect(entry!.checkedAt).toBe('2026-10-03')
      expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
    }
    // TensorRT-LLM advanced on its own pass, so its evidence entry carries its own date
    const tensorrtEvidence = datasetRelease.evidence.find((e) => e.topic === 'tensorrt-llm-v1.4.0rc1-release')
    expect(tensorrtEvidence).toBeDefined()
    expect(tensorrtEvidence!.checkedAt).toBe('2026-10-22')
    expect(tensorrtEvidence!.url).toBe('https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.4.0rc1')
  })

  it('records the releases published after 2026-09-22 in both languages against their own release notes', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // ExLlamaV3 v1.6.0 (2026-10-07) supersedes the v1.5.4 the 2026-10-03 audit recorded
    const exllama = bySlug('exllamav3')
    expect(exllama.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.2',
        'https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.0',
        'https://github.com/turboderp-org/exllamav3/releases/tag/v1.5.4',
        'https://github.com/turboderp-org/exllamav3/releases/tag/v1.5.3',
      ]),
    )

    // ExLlamaV3 v1.6.3 (2026-10-17) supersedes v1.6.2; ROCm stays preliminary
    expect(exllama.description.en).toContain('v1.6.3')
    expect(exllama.description.tr).toContain('v1.6.3')
    expect(exllama.description.en).toContain('DFlash2')
    expect(exllama.description.en).toContain('BailingMoeV3ForCausalLM')
    expect(exllama.description.tr).toContain('BailingMoeV3ForCausalLM')
    const v163 = datasetRelease.evidence.find((e) => e.topic === 'exllamav3-v1.6.3-release')
    expect(v163).toBeDefined()
    expect(v163!.url).toBe('https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.3')
    expect(v163!.checkedAt).toBe('2026-10-18')
    expect(exllama.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining(['https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.3']),
    )
    expect(exllama.lastVerified).toBe('2026-10-21')
    const v162 = datasetRelease.evidence.find((e) => e.topic === 'exllamav3-v1.6.2-release')
    expect(v162).toBeDefined()
    expect(v162!.url).toBe('https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.2')
    expect(v162!.checkedAt).toBe('2026-10-15')
    for (const claim of ['KimiLinearForCausalLM', 'MiMoV2ForCausalLM', 'DFlash2', 'tensor paralel', 'EXL3', 'Transformers 5', 'token gömme nicemlemesi', 'MiMo-V2.6', 'v1.6.0', 'ROCm 10', 'gfx1100']) {
      expect(exllama.description.tr).toContain(claim)
    }
    for (const claim of ['KimiLinearForCausalLM', 'MiMoV2ForCausalLM', 'DFlash2', 'tensor-parallel', 'EXL3 remains the weight format', 'Transformers 5', 'backpropagation through wrapped EXL3 layers', 'token-embedding quantization', 'MiMo-V2.6', 'v1.6.0', 'preliminary ROCm support', 'gfx1100']) {
      expect(exllama.description.en).toContain(claim)
    }
    // The EXL3 weight format itself is unchanged across v1.5.4 and v1.6.0
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

    // vLLM v0.31.0 (2026-10-05) supersedes the v0.30.0 the 2026-10-03 audit recorded
    const vllm = bySlug('vllm')
    expect(vllm.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/vllm-project/vllm/releases/tag/v0.31.0',
        'https://github.com/vllm-project/vllm/releases/tag/v0.30.0',
      ]),
    )
    for (const claim of ['vllm preload', 'vllm snapshot create/restore', 'trust-request-mm-kwargs']) {
      expect(vllm.description.en).toContain(claim)
    }
    for (const claim of ['vllm preload', 'vllm snapshot create/restore', 'trust-request-mm-kwargs']) {
      expect(vllm.description.tr).toContain(claim)
    }
    // The multimodal kwargs gate is a breaking change, not a deprecation
    expect(vllm.limitations.en.join(' ')).toContain('per-request multimodal kwargs gate')
    expect(vllm.limitations.tr.join(' ')).toContain('istek başına çoklu ortam anahtarı kapısı')

    // Each release is pinned as evidence on the date its own audit found it
    for (const topic of ['exllamav3-v1.5.4-release', 'exllamav3-v1.5.3-release', 'ramalama-v0.25.0-release', 'kserve-v0.21.0-release']) {
      const entry = datasetRelease.evidence.find((e) => e.topic === topic)
      expect(entry).toBeDefined()
      expect(entry!.checkedAt).toBe('2026-10-03')
      expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
    }
    for (const topic of ['exllamav3-v1.6.0-release', 'vllm-v0.31.0-release']) {
      const entry = datasetRelease.evidence.find((e) => e.topic === topic)
      expect(entry).toBeDefined()
      expect(entry!.checkedAt).toBe('2026-10-09')
      expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
    }

    // The 2026-10-13 pass could finally read the Dynamo v1.5.0 notes, so the gap the
    // previous pass preserved is closed and the record is now verified against them.
    // The record moved on again on 2026-10-20, when v1.5.1 was read and recorded.
    expect(bySlug('nvidia-dynamo').lastVerified).toBe('2026-10-23')
    const dynamoEvidence = datasetRelease.evidence.find((e) => e.topic === 'nvidia-dynamo-v1.5.0-release')
    expect(dynamoEvidence).toBeDefined()
    expect(dynamoEvidence!.url).toBe('https://github.com/ai-dynamo/dynamo/releases/tag/v1.5.0')
    expect(dynamoEvidence!.checkedAt).toBe('2026-10-13')
    expect(datasetRelease.note).not.toContain('could not be read')
  })

  it('records the 2026-10-19 serving refresh against the v0.32.0 and v0.5.22 release notes', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // vLLM v0.32.0 (2026-10-18) supersedes the v0.31.0 recorded by the previous pass
    const vllm = bySlug('vllm')
    expect(vllm.lastVerified).toBe('2026-10-19')
    expect(vllm.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/vllm-project/vllm/releases/tag/v0.32.0',
        'https://github.com/vllm-project/vllm/releases/tag/v0.31.0',
        'https://github.com/vllm-project/vllm/releases/tag/v0.30.0',
        'https://github.com/vllm-project/vllm/releases/tag/v0.29.0',
      ]),
    )
    for (const claim of ['v0.32.0', 'POST /v1/systemone', 'response_template', 'ultraquant_4bit', 'fp8_ds_mla', 'vllm download-kernels', 'GHSA-4hhp-h66f-j5j7']) {
      expect(vllm.description.en).toContain(claim)
    }
    for (const claim of ['v0.32.0', 'POST /v1/systemone', 'response_template', 'ultraquant_4bit', 'fp8_ds_mla', 'vllm download-kernels', 'GHSA-4hhp-h66f-j5j7']) {
      expect(vllm.description.tr).toContain(claim)
    }
    // The Python 3.10 drop and the CORS restriction are breaking, and are recorded as such
    expect(vllm.limitations.en.join(' ')).toContain('Python 3.10 support was dropped')
    expect(vllm.limitations.tr.join(' ')).toContain('Python 3.10 desteği kalktı')
    // Release-note throughput figures stay framed as the project's own measurements
    expect(vllm.description.en).toContain('own benchmark')
    expect(vllm.description.tr).toContain('sürüm notlarındaki ölçümde')

    // SGLang v0.5.22 (2026-10-19) supersedes the v0.5.21 recorded by the previous pass
    const sglang = bySlug('sglang')
    expect(sglang.lastVerified).toBe('2026-10-19')
    expect(sglang.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/sgl-project/sglang/releases/tag/v0.5.22',
        'https://github.com/sgl-project/sglang/releases/tag/v0.5.21',
      ]),
    )
    for (const claim of ['v0.5.22', 'InstantTensor', 'Apple Silicon', 'MI355X', 'Python 3.11']) {
      expect(sglang.description.en).toContain(claim)
    }
    for (const claim of ['v0.5.22', 'InstantTensor', 'Apple Silicon', 'MI355X', 'Python 3.11']) {
      expect(sglang.description.tr).toContain(claim)
    }
    // The Python floor is a requirement, so it is stated as a limitation too
    expect(sglang.limitations.en.join(' ')).toContain('Python 3.11 or newer')
    expect(sglang.limitations.tr.join(' ')).toContain('Python 3.11')
    // The earlier v0.5.21 evidence stays pinned
    expect(sglang.description.en).toContain('v0.5.21')
    expect(sglang.description.tr).toContain('v0.5.21')

    // Each release is pinned as evidence on the date its own audit found it
    for (const topic of ['vllm-v0.32.0-release', 'sglang-v0.5.22-release']) {
      const entry = datasetRelease.evidence.find((e) => e.topic === topic)
      expect(entry).toBeDefined()
      expect(entry!.checkedAt).toBe('2026-10-19')
      expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
    }
    // The endpoint sweep was repeated on this pass, so the audit date advanced
    expect(sourceAudit.checkedAt).toBe('2026-10-24')
    expect(ATLAS_DATASET_REVIEWED_AT).toBe('2026-10-24')
  })

  it('records the 2026-10-20 pass against the llama.cpp v0.7.0, Dynamo v1.5.1 and llm-d v1.0.0 release notes', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // llama.cpp v0.7.0 (2026-10-15): the semver train the previous two passes denied
    const llamaCpp = bySlug('llama-cpp')
    expect(llamaCpp.lastVerified).toBe('2026-10-20')
    expect(llamaCpp.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/ggml-org/llama.cpp/releases/tag/v0.7.0',
        'https://github.com/ggml-org/llama.cpp',
      ]),
    )
    for (const claim of ['v0.7.0', '--moe-cache-mib', 'LiliCorr', 'common_chat_session', 'v0.27.0']) {
      expect(llamaCpp.description.en).toContain(claim)
    }
    for (const claim of ['v0.7.0', '--moe-cache-mib', 'LiliCorr', 'common_chat_session', 'v0.27.0']) {
      expect(llamaCpp.description.tr).toContain(claim)
    }
    // The default port move is a change a user has to know about, so it is a limitation
    expect(llamaCpp.limitations.en.join(' ')).toContain('9931')
    expect(llamaCpp.limitations.en.join(' ')).toContain('8080')
    expect(llamaCpp.limitations.tr.join(' ')).toContain('9931')
    expect(llamaCpp.limitations.tr.join(' ')).toContain('8080')

    // The 2026-10-20 paragraph must not repeat the withdrawn claim. The older
    // paragraphs stay in the note as history, so the guard is scoped to this
    // pass's own paragraph rather than to the whole note, and it targets the
    // withdrawn claim's consequence instead of the phrase it happened to use.
    // The paragraph index moves on as later passes prepend their own.
    const thisPass = datasetRelease.note.split('The detailed history of the previous pass follows.')[4]!
    expect(thisPass).not.toContain('so no version is recorded for it')
    expect(thisPass).toContain('does publish a semver release train')
    expect(thisPass).toContain('v0.7.0')

    // NVIDIA Dynamo v1.5.1 (2026-10-07): patch release on top of v1.5.0
    const dynamo = bySlug('nvidia-dynamo')
    expect(dynamo.lastVerified).toBe('2026-10-23')
    expect(dynamo.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/ai-dynamo/dynamo/releases/tag/v1.5.1',
        'https://github.com/ai-dynamo/dynamo/releases/tag/v1.5.0',
      ]),
    )
    for (const claim of ['v1.5.1', 'HTTP 529', 'min_tokens', 'aiohttp', 'DYN_MM_TRUST_EGRESS_PROXY', 'DYN_MM_LOCAL_PATH']) {
      expect(dynamo.description.en + dynamo.limitations.en.join(' ')).toContain(claim)
    }
    for (const claim of ['v1.5.1', 'HTTP 529', 'min_tokens', 'aiohttp', 'DYN_MM_TRUST_EGRESS_PROXY', 'DYN_MM_LOCAL_PATH']) {
      expect(dynamo.description.tr + dynamo.limitations.tr.join(' ')).toContain(claim)
    }
    // The two upgrade-breaking changes are recorded as breaking, not softened
    expect(dynamo.limitations.en.join(' ')).toContain('breaking changes')
    expect(dynamo.limitations.tr.join(' ')).toContain('kırıcı değişiklik')

    // llm-d v1.0.0 (2026-10-20): first stable release, previously recorded without a version
    const llmD = bySlug('llm-d')
    expect(llmD.lastVerified).toBe('2026-10-20')
    expect(llmD.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/llm-d/llm-d/releases/tag/v1.0.0',
        'https://llm-d.ai/',
      ]),
    )
    for (const claim of ['v1.0.0', 'flowControl', 'DisaggregatedSet', 'previous_response_id']) {
      expect(llmD.description.en).toContain(claim)
    }
    for (const claim of ['v1.0.0', 'flowControl', 'DisaggregatedSet', 'previous_response_id']) {
      expect(llmD.description.tr).toContain(claim)
    }
    // The ROCm image deprecation is recorded as a deprecation, not as a removal
    expect(llmD.limitations.en.join(' ')).toContain('ghcr.io/llm-d/llm-d-rocm')
    expect(llmD.limitations.tr.join(' ')).toContain('ghcr.io/llm-d/llm-d-rocm')

    // Each new release is pinned as evidence on the date this audit found it
    for (const topic of ['llama-cpp-v0.7.0-release', 'nvidia-dynamo-v1.5.1-release', 'llm-d-v1.0.0-release']) {
      const entry = datasetRelease.evidence.find((e) => e.topic === topic)
      expect(entry).toBeDefined()
      expect(entry!.checkedAt).toBe('2026-10-20')
      expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
    }
    // The endpoint sweep was repeated on this pass, so the audit date advanced
    expect(sourceAudit.checkedAt).toBe('2026-10-24')
    expect(ATLAS_DATASET_REVIEWED_AT).toBe('2026-10-24')
  })

  it('records the 2026-10-21 pass against the ExLlamaV3 v1.6.4 release notes', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // ExLlamaV3 v1.6.4 (2026-10-20T23:53:45Z) supersedes the v1.6.3 the
    // previous pass recorded as latest.
    const exllama = bySlug('exllamav3')
    expect(exllama.lastVerified).toBe('2026-10-21')
    expect(exllama.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.4',
        'https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.3',
      ]),
    )
    for (const claim of ['v1.6.4', 'Lfm2VlForConditionalGeneration', 'Nemotron 3.5 Bolt', 'prefill/decode']) {
      expect(exllama.description.en).toContain(claim)
    }
    for (const claim of ['v1.6.4', 'Lfm2VlForConditionalGeneration', 'Nemotron 3.5 Bolt']) {
      expect(exllama.description.tr).toContain(claim)
    }
    // The ROCm preliminary bound is not restated by v1.6.4, so the limitation
    // still names every release that left it alone, including this one.
    expect(exllama.limitations.en.join(' ')).toContain('v1.6.4')
    expect(exllama.limitations.tr.join(' ')).toContain('v1.6.4')
    // Every source carries the day the claim was verified
    expect(exllama.sources.every((s) => s.verifiedAt === '2026-10-21')).toBe(true)

    // The current pass paragraph records the Dynamo development builds as
    // prereleases that do not move the pinned stable version.
    const currentPass = datasetRelease.note.split('The detailed history of the previous pass follows.')[3]!
    expect(currentPass).not.toContain('so no version is recorded for it')
    expect(currentPass).toContain('v1.6.4')
    expect(currentPass).toContain('v1.6.0-muse-spark-open-dev.1')
    expect(currentPass).toContain('do not move the pinned stable version')
    expect(currentPass).toContain('v1.5.1')
    // The stable Dynamo claim itself did not move on that pass. It moved on the
    // 2026-10-23 pass, when v1.6.0 was published as a stable release.
    expect(bySlug('nvidia-dynamo').lastVerified).toBe('2026-10-23')
    expect(bySlug('llama-cpp').lastVerified).toBe('2026-10-20')

    // The new release is pinned as evidence on the date this audit found it
    const entry = datasetRelease.evidence.find((e) => e.topic === 'exllamav3-v1.6.4-release')
    expect(entry).toBeDefined()
    expect(entry!.url).toBe('https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.4')
    expect(entry!.checkedAt).toBe('2026-10-21')
    expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
  })

  it('records the 2026-10-22 pass against the TensorRT-LLM v1.4.0rc1 release notes', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // TensorRT-LLM v1.4.0rc1 (2026-10-22T01:38:13Z) supersedes the
    // v1.4.0rc0 the previous pass recorded as latest.
    const tensorrt = bySlug('tensorrt-llm')
    expect(tensorrt.lastVerified).toBe('2026-10-22')
    expect(tensorrt.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.4.0rc1',
        'https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.4.0rc0',
      ]),
    )
    for (const claim of ['v1.4.0rc1', 'DeepSeek-V4.1-Flash', 'Qwen3.8-Flash-Next NVFP4', 'LiLiCorr', 'std::span', 'TRTLLM_CACHE_DIR']) {
      expect(tensorrt.description.en).toContain(claim)
    }
    for (const claim of ['v1.4.0rc1', 'DeepSeek-V4.1-Flash', 'Qwen3.8-Flash-Next NVFP4', 'LiLiCorr', 'std::span', 'TRTLLM_CACHE_DIR']) {
      expect(tensorrt.description.tr).toContain(claim)
    }
    // It is still a release candidate, and the breaking changes are recorded as breaking
    expect(tensorrt.description.en).toContain('release candidate')
    expect(tensorrt.description.tr).toContain('sürüm adayıdır')
    expect(tensorrt.limitations.en.join(' ')).toContain('release candidate')
    expect(tensorrt.limitations.tr.join(' ')).toContain('sürüm adayıdır')
    // Every source carries the day the claim was verified
    expect(tensorrt.sources.every((s) => s.verifiedAt === '2026-10-22')).toBe(true)

    // The current pass paragraph records the release state of the day.
    const currentPass = datasetRelease.note.split('The detailed history of the previous pass follows.')[2]!
    expect(currentPass).not.toContain('so no version is recorded for it')
    expect(currentPass).toContain('v1.4.0rc1')
    expect(currentPass).toContain('v1.5.1')
    expect(currentPass).toContain('b11804')

    // The new release is pinned as evidence on the date this audit found it
    const entry = datasetRelease.evidence.find((e) => e.topic === 'tensorrt-llm-v1.4.0rc1-release')
    expect(entry).toBeDefined()
    expect(entry!.url).toBe('https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.4.0rc1')
    expect(entry!.checkedAt).toBe('2026-10-22')
    expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
  })

  it('records the 2026-10-23 pass against the NVIDIA Dynamo v1.6.0 release notes', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // NVIDIA Dynamo v1.6.0 (2026-10-22T22:31:45Z) is a stable release, so it
    // supersedes the v1.5.1 the previous pass recorded as the latest stable one.
    const dynamo = bySlug('nvidia-dynamo')
    expect(dynamo.lastVerified).toBe('2026-10-23')
    expect(dynamo.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://github.com/ai-dynamo/dynamo/releases/tag/v1.6.0',
        'https://github.com/ai-dynamo/dynamo/releases/tag/v1.5.1',
        'https://github.com/ai-dynamo/dynamo/releases/tag/v1.5.0',
      ]),
    )
    for (const claim of ['v1.6.0', 'request-classifier hook', '--router-policy-config', 'LPX', 'Dynamo Planner', 'thinking_token_budget']) {
      expect(dynamo.description.en).toContain(claim)
    }
    for (const claim of ['v1.6.0', 'istek-sınıflandırıcı', '--router-policy-config', 'LPX', 'Dynamo Planner', 'thinking_token_budget']) {
      expect(dynamo.description.tr).toContain(claim)
    }
    // The three breaking changes are recorded as breaking, not softened
    expect(dynamo.limitations.en.join(' ')).toContain('breaking changes')
    expect(dynamo.limitations.en.join(' ')).toContain('AutoDeploy')
    expect(dynamo.limitations.tr.join(' ')).toContain('kırıcı değişiklik')
    expect(dynamo.limitations.tr.join(' ')).toContain('AutoDeploy')
    // Every source carries the day the claim was verified
    expect(dynamo.sources.every((s) => s.verifiedAt === '2026-10-23')).toBe(true)

    // The current pass paragraph records the release state of the day.
    const currentPass = datasetRelease.note.split('The detailed history of the previous pass follows.')[1]!
    expect(currentPass).not.toContain('so no version is recorded for it')
    expect(currentPass).toContain('v1.6.0')
    expect(currentPass).toContain('v1.5.1')
    expect(currentPass).toContain('b11829')
    expect(currentPass).toContain('v1.4.0rc1')

    // The new release is pinned as evidence on the date this audit found it
    const entry = datasetRelease.evidence.find((e) => e.topic === 'nvidia-dynamo-v1.6.0-release')
    expect(entry).toBeDefined()
    expect(entry!.url).toBe('https://github.com/ai-dynamo/dynamo/releases/tag/v1.6.0')
    expect(entry!.checkedAt).toBe('2026-10-23')
    expect(entry!.collections).toEqual(expect.arrayContaining(['solutions']))
  })

  it('records the 2026-10-24 pass as a holding pass with no claim changed', () => {
    const bySlug = (slug: string) => solutions.find((solution) => solution.slug === slug)!

    // The pass re-read every release feed and moved no version claim, so every
    // solution keeps the verifiedAt the pass that recorded it set.
    expect(bySlug('tensorrt-llm').lastVerified).toBe('2026-10-22')
    expect(bySlug('nvidia-dynamo').lastVerified).toBe('2026-10-23')
    expect(bySlug('exllamav3').lastVerified).toBe('2026-10-21')
    expect(bySlug('llama-cpp').lastVerified).toBe('2026-10-20')
    expect(bySlug('vllm').lastVerified).toBe('2026-10-19')
    expect(bySlug('sglang').lastVerified).toBe('2026-10-19')

    // The current pass paragraph records the release state of the day.
    const currentPass = datasetRelease.note.split('The detailed history of the previous pass follows.')[0]!
    expect(currentPass).not.toContain('so no version is recorded for it')
    expect(currentPass).toContain('No claim changed.')
    expect(currentPass).toContain('v1.4.0rc1')
    expect(currentPass).toContain('v1.6.0')
    expect(currentPass).toContain('b11850')
    expect(currentPass).toContain('v0.7.0')
    // The Dynamo development build is named and explicitly excluded as a claim.
    expect(currentPass).toContain('v1.6.0-minimax-m3.1-flash-dev.1')
    expect(currentPass).toContain('not a QA-gated release')

    // Only the endpoint-review date advanced, and it advanced with it.
    expect(datasetRelease.release).toBe('2026-10-24-content-audit')
    expect(datasetRelease.collections.sourceAudit.revision).toBe('2026-10-24')
    expect(sourceAudit.checkedAt).toBe('2026-10-24')
    expect(ATLAS_DATASET_REVIEWED_AT).toBe('2026-10-24')
  })

})
