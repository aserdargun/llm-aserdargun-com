/** Collection versions are observer metadata, never tool-ranking inputs. */
export const datasetRelease = {
  "schemaVersion": 2,
  "release": "2026-10-03-content-audit",
  "collections": {
    "categories": {
      "schemaVersion": 2,
      "revision": "2026-09-21"
    },
    "solutions": {
      "schemaVersion": 2,
      "revision": "2026-10-03"
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
  "note": "All 31 primary-source endpoints (31 source-audit entries, 36 solution sources) were re-fetched and resolved on 2026-10-03; every endpoint returned a live document. Upstream release feeds were re-checked for the serving-layer projects and three published releases after the previous 2026-10-02 check: ExLlamaV3 v1.5.3 (2026-09-27, with v1.5.2 and v1.5.1 also after 2026-09-21), RamaLama v0.25.0 (2026-09-25) and KServe v0.21.0 (2026-09-25). vLLM (v0.30.0), SGLang (v0.5.21) and TensorRT-LLM (v1.3.0rc29, still a release candidate) have no newer release, and their recorded claims were re-read against those same release notes and hold unchanged. Lifecycle and license claims were re-checked against each upstream repository; none changed and no project was newly archived. Individual solution dates remain authoritative; no inference benchmarks or external release are claimed. The NVIDIA Dynamo v1.5.0 release notes could not be read (upstream API rate limit) and are recorded as unconfirmed, so that record was left untouched."
} as const
