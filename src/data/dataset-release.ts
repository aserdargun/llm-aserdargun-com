/** Collection versions are observer metadata, never tool-ranking inputs. */
export const datasetRelease = {
  "schemaVersion": 2,
  "release": "2026-10-09-content-audit",
  "collections": {
    "categories": {
      "schemaVersion": 2,
      "revision": "2026-09-21"
    },
    "solutions": {
      "schemaVersion": 2,
      "revision": "2026-10-09"
    },
    "concepts": {
      "schemaVersion": 3,
      "revision": "2026-09-21"
    },
    "flashcards": {
      "schemaVersion": 3,
      "revision": "2026-09-21"
    },
    "quizzes": {
      "schemaVersion": 3,
      "revision": "2026-09-21"
    },
    "lessons": {
      "schemaVersion": 2,
      "revision": "2026-09-21"
    },
    "sourceAudit": {
      "schemaVersion": 1,
      "revision": "2026-10-03"
    },
    "portfolio": {
      "schemaVersion": 1,
      "revision": "2026-09-21"
    }
  },
  "evidence": [
    { "topic": "vllm-v0.29.0-release", "collections": ["solutions", "lessons"], "url": "https://github.com/vllm-project/vllm/releases/tag/v0.29.0", "checkedAt": "2026-09-18" },
    {
      "topic": "tokenization",
      "collections": [
        "concepts",
        "flashcards"
      ],
      "url": "https://github.com/google/sentencepiece",
      "checkedAt": "2026-09-10"
    },
    {
      "topic": "kv-cache-and-attention",
      "collections": [
        "concepts",
        "flashcards",
        "quizzes"
      ],
      "url": "https://huggingface.co/docs/transformers/main/cache_explanation",
      "checkedAt": "2026-09-10"
    },
    {
      "topic": "temperature-and-reproducibility",
      "collections": [
        "concepts",
        "flashcards",
        "quizzes"
      ],
      "url": "https://docs.vllm.ai/en/latest/usage/reproducibility/",
      "checkedAt": "2026-09-10"
    },
    {
      "topic": "prompt-injection-boundaries",
      "collections": [
        "concepts",
        "flashcards"
      ],
      "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
      "checkedAt": "2026-09-10"
    },
    {
      "topic": "runtime-architecture",
      "collections": [
        "solutions",
        "flashcards",
        "quizzes"
      ],
      "url": "https://nvidia.github.io/TensorRT-LLM/legacy/tensorrt-backend-removal.html",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "exl3-format",
      "collections": [
        "solutions",
        "flashcards",
        "quizzes"
      ],
      "url": "https://github.com/turboderp-org/exllamav3",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "desktop-and-web-workspaces",
      "collections": [
        "categories"
      ],
      "url": "https://docs.openwebui.com/",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "kv-context-memory",
      "collections": [
        "concepts",
        "flashcards",
        "quizzes",
        "lessons"
      ],
      "url": "https://huggingface.co/docs/transformers/main/cache_explanation",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "long-context-evaluation",
      "collections": [
        "concepts",
        "flashcards",
        "quizzes"
      ],
      "url": "https://arxiv.org/abs/2307.03172",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "paged-kv-storage",
      "collections": [
        "concepts",
        "flashcards",
        "quizzes"
      ],
      "url": "https://arxiv.org/abs/2309.06180",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "speculative-distribution",
      "collections": [
        "flashcards",
        "quizzes"
      ],
      "url": "https://arxiv.org/abs/2211.17192",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "nucleus-sampling",
      "collections": [
        "concepts",
        "quizzes"
      ],
      "url": "https://arxiv.org/abs/1904.09751",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "preference-optimization",
      "collections": [
        "concepts",
        "quizzes"
      ],
      "url": "https://arxiv.org/abs/2305.18290",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "prompting-evaluation",
      "collections": [
        "concepts",
        "flashcards"
      ],
      "url": "https://arxiv.org/abs/2201.11903",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "prompt-and-tool-boundaries",
      "collections": [
        "concepts",
        "flashcards",
        "quizzes",
        "lessons"
      ],
      "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "cuda-hardware-boundary",
      "collections": [
        "concepts"
      ],
      "url": "https://docs.nvidia.com/cuda/cuda-programming-guide/",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "lora-serving",
      "collections": [
        "concepts"
      ],
      "url": "https://docs.vllm.ai/en/latest/features/lora/",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "vector-index-tradeoffs",
      "collections": [
        "concepts",
        "quizzes",
        "lessons"
      ],
      "url": "https://github.com/pgvector/pgvector",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "embedding-contract",
      "collections": [
        "concepts",
        "lessons"
      ],
      "url": "https://huggingface.co/intfloat/multilingual-e5-large",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "rag-storage",
      "collections": [
        "lessons"
      ],
      "url": "https://docs.trychroma.com/docs/embeddings/embedding-functions",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "model-download-cli",
      "collections": [
        "lessons"
      ],
      "url": "https://huggingface.co/docs/huggingface_hub/guides/cli",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "gguf-conversion-quantization",
      "collections": [
        "lessons",
        "quizzes",
        "flashcards"
      ],
      "url": "https://raw.githubusercontent.com/ggml-org/llama.cpp/master/tools/quantize/README.md",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "autoawq-archive",
      "collections": [
        "lessons"
      ],
      "url": "https://github.com/casper-hansen/AutoAWQ",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "local-service-startup",
      "collections": [
        "lessons"
      ],
      "url": "https://docs.ollama.com/faq",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "serving-compatibility-and-capacity",
      "collections": [
        "concepts",
        "quizzes",
        "lessons"
      ],
      "url": "https://docs.vllm.ai/en/latest/",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "browser-capacity",
      "collections": [
        "lessons"
      ],
      "url": "https://llm.mlc.ai/docs/deploy/webllm.html",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "portfolio-learning-routes",
      "collections": [
        "portfolio"
      ],
      "url": "https://aserdargun.com/",
      "checkedAt": "2026-09-21"
    },
    {
      "topic": "vllm-v0.30.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/vllm-project/vllm/releases/tag/v0.30.0",
      "checkedAt": "2026-10-03"
    },
    {
      "topic": "sglang-v0.5.21-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/sgl-project/sglang/releases/tag/v0.5.21",
      "checkedAt": "2026-10-03"
    },
    {
      "topic": "tensorrt-llm-v1.3.0rc29-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.3.0rc29",
      "checkedAt": "2026-10-03"
    },
    {
      "topic": "exllamav3-v1.6.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.0",
      "checkedAt": "2026-10-09"
    },
    {
      "topic": "vllm-v0.31.0-release",
      "collections": [
        "solutions",
        "lessons"
      ],
      "url": "https://github.com/vllm-project/vllm/releases/tag/v0.31.0",
      "checkedAt": "2026-10-09"
    },
    {
      "topic": "exllamav3-v1.5.4-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/turboderp-org/exllamav3/releases/tag/v1.5.4",
      "checkedAt": "2026-10-03"
    },
    {
      "topic": "exllamav3-v1.5.3-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/turboderp-org/exllamav3/releases/tag/v1.5.3",
      "checkedAt": "2026-10-03"
    },
    {
      "topic": "ramalama-v0.25.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/containers/ramalama/releases/tag/v0.25.0",
      "checkedAt": "2026-10-03"
    },
    {
      "topic": "kserve-v0.21.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/kserve/kserve/releases/tag/v0.21.0",
      "checkedAt": "2026-10-03"
    }
  ],
  "note": "The 2026-10-09 pass re-checked the upstream release feeds for the serving-layer projects and found two releases published after the previous 2026-10-03 audit. ExLlamaV3 v1.6.0 (2026-10-07T17:08:24Z) opens the engine to AMD: preliminary ROCm support for ROCm 10 on gfx1100 and above only, faster offloading for AVX2 CPUs, smarter CPU core allocation and pinning by default, reduced system-memory overhead, and fixes for the GLM4 and Qwen3-VL vision towers. That is platform and memory work, not a weight-format change; EXL3 remains the format. vLLM v0.31.0 (2026-10-05T06:44:55Z, 717 commits from 307 contributors) adds restart-cost, speculative-decoding and large-scale-serving directions: the new `vllm preload` CLI starts a weight-cache daemon that keeps post-quantized weights resident in GPU memory across engine restarts, experimental `vllm snapshot create/restore` uses CRIU to restore an initialized TP1 engine, Model Runner V2 gains draft-model speculative decoding, custom logits processors and the LiLiCorr drafter, and DeepSeek-V4.1-Flash runs FlashMLA mega attention with the V4.1 NVFP4 compressed KV cache as the SM100 default alongside the MoonEP and DeepEPv2 backends. Its breaking changes are recorded as such: per-request `mm_processor_kwargs` and `media_io_kwargs` are rejected without `--trust-request-mm-kwargs`, `tokenizer_mode=\"slow\"` was removed, online `quantization=\"fp8\"` was replaced by the `fp8_per_tensor` shorthand, `--enable-mamba-fine-grained-prefix-cache` was renamed, and `--enforce-eager` now also disables JIT kernel warmup. SGLang (v0.5.21), TensorRT-LLM (v1.3.0rc29, still a release candidate), RamaLama (v0.25.0) and KServe (v0.21.0) have no newer release, and their recorded claims were re-read against those same release notes and hold unchanged. MITRE ATLAS data remains at v2026.09. Lifecycle and license claims were re-checked against each upstream repository; none changed and no project was newly archived. Individual solution dates remain authoritative; no inference benchmark was reproduced and no throughput or latency figure is claimed here — the figures quoted in the v0.31.0 description are the release notes' own. The NVIDIA Dynamo v1.5.0 release notes could not be read (upstream API rate limit) and remain recorded as unconfirmed, so that record was still left untouched."
} as const
