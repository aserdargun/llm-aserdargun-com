/** Collection versions are observer metadata, never tool-ranking inputs. */
export const datasetRelease = {
  "schemaVersion": 2,
  "release": "2026-09-21-content-audit",
  "collections": {
    "categories": {
      "schemaVersion": 2,
      "revision": "2026-09-21"
    },
    "solutions": {
      "schemaVersion": 2,
      "revision": "2026-09-21"
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
      "revision": "2026-09-21"
    },
    "portfolio": {
      "schemaVersion": 1,
      "revision": "2026-09-21"
    }
  },
  "evidence": [
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
    }
  ],
  "note": "All 31 primary-source endpoints reviewed; source-audit records endpoint scope. Targeted solution and bilingual learning corrections, explicit observer-only metadata, portfolio learning links and full static dataset export. Individual solution dates remain authoritative; no inference benchmarks or external release are claimed."
} as const
