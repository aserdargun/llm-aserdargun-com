/** Collection versions are observer metadata, never tool-ranking inputs. */
export const datasetRelease = {
  "schemaVersion": 2,
  "release": "2026-10-27-content-audit",
  "collections": {
    "categories": {
      "schemaVersion": 2,
      "revision": "2026-09-21"
    },
    "solutions": {
      "schemaVersion": 2,
      "revision": "2026-10-27"
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
      "revision": "2026-10-27"
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
      "topic": "tensorrt-llm-v1.4.0rc1-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.4.0rc1",
      "checkedAt": "2026-10-22"
    },
    {
      "topic": "tensorrt-llm-v1.4.0rc0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/NVIDIA/TensorRT-LLM/releases/tag/v1.4.0rc0",
      "checkedAt": "2026-10-17"
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
      "topic": "exllamav3-v1.6.5-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.5",
      "checkedAt": "2026-10-27"
    },
    {
      "topic": "exllamav3-v1.6.4-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.4",
      "checkedAt": "2026-10-21"
    },
    {
      "topic": "exllamav3-v1.6.3-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.3",
      "checkedAt": "2026-10-18"
    },
    {
      "topic": "exllamav3-v1.6.2-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.2",
      "checkedAt": "2026-10-15"
    },
    {
      "topic": "exllamav3-v1.6.1-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/turboderp-org/exllamav3/releases/tag/v1.6.1",
      "checkedAt": "2026-10-13"
    },
    {
      "topic": "nvidia-dynamo-v1.5.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/ai-dynamo/dynamo/releases/tag/v1.5.0",
      "checkedAt": "2026-10-13"
    },
    {
      "topic": "vllm-v0.32.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/vllm-project/vllm/releases/tag/v0.32.0",
      "checkedAt": "2026-10-19"
    },
    {
      "topic": "sglang-v0.5.22-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/sgl-project/sglang/releases/tag/v0.5.22",
      "checkedAt": "2026-10-19"
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
    },
    {
      "topic": "llama-cpp-v0.7.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/ggml-org/llama.cpp/releases/tag/v0.7.0",
      "checkedAt": "2026-10-20"
    },
    {
      "topic": "nvidia-dynamo-v1.6.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/ai-dynamo/dynamo/releases/tag/v1.6.0",
      "checkedAt": "2026-10-23"
    },
    {
      "topic": "nvidia-dynamo-v1.5.1-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/ai-dynamo/dynamo/releases/tag/v1.5.1",
      "checkedAt": "2026-10-20"
    },
    {
      "topic": "llm-d-v1.0.0-release",
      "collections": [
        "solutions"
      ],
      "url": "https://github.com/llm-d/llm-d/releases/tag/v1.0.0",
      "checkedAt": "2026-10-20"
    }
  ],
  "note": "The 2026-10-27 pass re-fetched all 31 source-audit endpoints (every one again returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. One claim changed. ExLlamaV3 v1.6.5 (2026-10-25T17:35:35Z, stable) supersedes the v1.6.4 that the previous pass recorded as latest: it adds support for Nemotron-3.5-Super-VL with a fix for the NemotronH config parsing, support for the Gemma4 MTP model Gemma4AssistantForCausalLM, reduced VRAM overhead for prefill through cache quantization, lower-latency drafting with a hot/sparse vocabulary, faster AVX2 and AVX512-BW inference, faster model loading when offloading experts, and a fix for the tokenizer regression v1.6.4 introduced, which was making prompt caching fail sometimes. It is not a format change, EXL3 remains the weight format, and its notes do not restate the ROCm 10 / gfx1100-and-above preliminary bound, so that bound and the preliminary status stand unchanged. The solution description, strengths, limitations and extraSources are extended to cover the new release, the evidence pin moves from the v1.6.4 tag to the v1.6.5 tag with a checkedAt of 2026-10-27, and the solution's verifiedAt moves to the same day. Re-read against the same feeds and holding unchanged: vLLM v0.32.0 (2026-10-18T06:50:48Z) is still the latest published vLLM release because the repository's v0.32.1rc0 tag still has no release object behind it and therefore moves no published-release claim, SGLang v0.5.22 (2026-10-19T02:55:19Z) is still the latest SGLang release, llm-d v1.0.0 (2026-10-20T02:30:10Z) is still the latest llm-d release, KServe v0.21.0 and RamaLama v0.25.0 are still the latest releases of their projects, TensorRT-LLM v1.4.0rc1 (2026-10-22T01:38:13Z) is still a release candidate with no stable release following it, and NVIDIA Dynamo v1.6.0 (2026-10-22T22:31:45Z) is still the latest stable Dynamo release. The only tags above that Dynamo release remain the v1.6.0 development builds, the newest of which is v1.6.0-minimax-m3.1-flash-dev.1 (2026-10-24T00:27:14Z), which the previous pass already saw and recorded, so it moves no version claim. llama.cpp continues to publish a nightly build stream alongside its semver train: build tags ran through b11913 as of 2026-10-27T00:19:01Z, and the current semver release is still v0.7.0 (2026-10-15T17:13:19Z). Three solutions record no version in their own text and so move nothing: mlx-lm is at v0.32.2, the archived text-generation-inference repository still reports v3.3.7, and ollama is at v0.40.11, with v0.40.12-rc0 published after it as a release candidate that moves no stable version. No other solution description, strengths, limitations, extraSources or verifiedAt moved on this pass, and the evidence pins keep the checkedAt values the passes that recorded them set; only the endpoint-review date advances to 2026-10-27. The detailed history of the previous pass follows. The 2026-10-25 pass re-fetched all 31 source-audit endpoints (every one again returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. No claim changed. Re-read against the same feeds and holding unchanged: ExLlamaV3 v1.6.4 (2026-10-20T23:53:45Z) is still the latest ExLlamaV3 release, vLLM v0.32.0 (2026-10-18T06:50:48Z) is still the latest published vLLM release because the repository's v0.32.1rc0 tag still has no release object behind it and therefore moves no published-release claim, SGLang v0.5.22 (2026-10-19T02:55:19Z) is still the latest SGLang release, llm-d v1.0.0 (2026-10-20T02:30:10Z) is still the latest llm-d release, KServe v0.21.0 and RamaLama v0.25.0 are still the latest releases of their projects, TensorRT-LLM v1.4.0rc1 (2026-10-22T01:38:13Z) is still a release candidate with no stable release following it, and NVIDIA Dynamo v1.6.0 (2026-10-22T22:31:45Z) is still the latest stable Dynamo release. The only tags above that Dynamo release remain the v1.6.0 development builds, the newest of which is v1.6.0-minimax-m3.1-flash-dev.1 (2026-10-24T00:27:14Z), which the previous pass already saw and recorded, so it moves no version claim. llama.cpp continues to publish a nightly build stream alongside its semver train and the current semver release is still v0.7.0. Three solutions record no version in their own text and so move nothing: mlx-lm is at v0.32.2, the archived text-generation-inference repository still reports v3.3.7, and ollama is at v0.40.11. No solution description, strengths, limitations, extraSources or verifiedAt moved on this pass, and the evidence pins keep the checkedAt values the passes that recorded them set; only the endpoint-review date advances to 2026-10-25. The detailed history of the previous pass follows. The 2026-10-24 pass re-fetched all 31 source-audit endpoints (every one again returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. No claim changed. Re-read against the same feeds and holding unchanged: ExLlamaV3 v1.6.4 (2026-10-20T23:53:45Z) is still the latest ExLlamaV3 release, vLLM v0.32.0 (2026-10-18T06:50:48Z) is still the latest vLLM release, SGLang v0.5.22 (2026-10-19T02:55:19Z) is still the latest SGLang release, llm-d v1.0.0 (2026-10-20T02:30:10Z) is still the latest llm-d release, KServe v0.21.0 and RamaLama v0.25.0 are still the latest releases of their projects, TensorRT-LLM v1.4.0rc1 (2026-10-22T01:38:13Z) is still a release candidate with no stable release following it, and NVIDIA Dynamo v1.6.0 (2026-10-22T22:31:45Z) is still the latest stable Dynamo release. llama.cpp continues to publish a nightly build stream alongside its semver train: build tags ran through b11850 as of 2026-10-24T05:30:02Z, and the current semver release is still v0.7.0 (2026-10-15T17:13:19Z). The only new upstream tag is NVIDIA Dynamo v1.6.0-minimax-m3.1-flash-dev.1 (2026-10-24T00:27:14Z), an experimental snapshot build whose own release notes call it not recommended for production and not a QA-gated release, so it moves no version claim and no record changed because of it. No solution description, strengths, limitations, extraSources or verifiedAt moved on this pass, and the evidence pins keep the checkedAt values the passes that recorded them set; only the endpoint-review date advances to 2026-10-24. The detailed history of the previous pass follows. The 2026-10-23 pass re-fetched all 31 source-audit endpoints (every one again returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. One claim changed. NVIDIA Dynamo v1.6.0 (2026-10-22T22:31:45Z, stable, 654 merged PRs from 148 contributors) supersedes the v1.5.1 that the previous pass recorded as the latest stable release: it is no longer a prerelease, so the two 1.6 development builds the previous pass recorded as not moving the pinned stable version have been overtaken by a tagged release. Dynamo Router opens request intake to plugins with a request-classifier hook that can defer, reorder or steer a request, every request flows through the policy queue that orders requests by deadline, Dynamo Frontend, the standalone selection service and the Gateway API endpoint picker share one worker-selection core, and the scoring knobs are consolidated into `--router-policy-config`. On the Kubernetes path the LPX components bring LPU-backed inference to DynamoGraphDeployments, multinode components can take separate leader and worker pod templates, and Dynamo Snapshot backs active and standby engine failover; Dynamo Planner reconfigures endpoint floors and GPU budget bounds at runtime, and the engines move to SGLang v0.5.21, TensorRT-LLM v1.3.0rc29 and vLLM v0.31.0. The breaking changes are recorded rather than softened: Anthropic billing preambles are stripped by default unless disabled, the Router policy YAML takes precedence over the deprecated scoring flags, and the performance-model options are renamed from AIConfigurator to AISimulate (`--aic-*` -> `--ais-*`), so the retired `DYN_AIC_*` environment variables now fail at startup; the TensorRT-LLM AutoDeploy backend is removed with PyTorch as the only TensorRT-LLM backend, and the Router scoring flags are slated for removal in Dynamo v1.7.0. The solution description, strengths, limitations and extraSources are extended to cover them, the evidence pin moves from the v1.5.1 tag to the v1.6.0 tag with a checkedAt of 2026-10-23, and the solution's verifiedAt moves to the same day. Re-read against the same feeds and holding unchanged: ExLlamaV3 v1.6.4 (2026-10-20T23:53:45Z) is still the latest ExLlamaV3 release, vLLM v0.32.0 (2026-10-18T06:50:48Z) is still the latest vLLM release, SGLang v0.5.22 (2026-10-19T02:55:19Z) is still the latest SGLang release, llm-d v1.0.0 (2026-10-20T02:30:10Z) is still the latest llm-d release, KServe v0.21.0 and RamaLama v0.25.0 are still the latest releases of their projects, and TensorRT-LLM v1.4.0rc1 (2026-10-22T01:38:13Z) is still a release candidate with no stable release following it. llama.cpp continues to publish a nightly build stream alongside its semver train: build tags ran through b11829 as of 2026-10-22T23:43:43Z, and the current semver release is still v0.7.0 (2026-10-15T17:13:19Z). The detailed history of the previous pass follows. The 2026-10-22 pass re-fetched all 31 source-audit endpoints (every one returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. One claim changed. TensorRT-LLM v1.4.0rc1 (2026-10-22T01:38:13Z, release candidate) supersedes the v1.4.0rc0 recorded as latest: it keeps the two breaking changes v1.4.0rc0 introduced, removing the Python backend of KVCacheManagerV2 and migrating LlmRequest fields to Python, and adds three more of its own, defaulting to KV cache manager V2 and the Python KV cache transceiver, removing the unused LlmRequest fields and replacing the C++ ArrayView API with std::span. On model support it adds DeepSeek-V4.1-Flash, supports NVFP4 GLM-5.3-Flash checkpoints, adds Qwen3.8-Flash-Next NVFP4 as an experimental Modeling V2 target, supports LiLiCorr draft checkpoints in DFlash, and removes the automatic W4A16 fallback for Nemotron-H NVFP4 checkpoints on Hopper. On the API side it publishes serving configuration schemas, adds a KV cache lending API for transfer backends, exposes native KV event streaming and routing load, supports runtime sleep and wakeup through LLM and trtllm-serve including MiniMax-H3, unifies the compiled-artifact cache configuration through TRTLLM_CACHE_DIR, and makes the KV cache V2 pool rebalancing parameters configurable. On features it integrates the Mooncake connector with KV cache manager V2, fills the KV cache V2 host tier progressively, adds RoPE precision options for NVFP4 cold-page compression, honours per-request seeds in batched TorchSampler, adds ragged DSpark verification with a confidence-based policy and calibrated scoring, and adds deterministic FP32 GVR V2 top-K decoding. It is still a release candidate and no stable release has followed it, so the record remains a release candidate and not a stable release. Its known issues are recorded rather than omitted: disaggregated serving with the default Python KV cache transceiver may fail generation requests with a KV cache transfer error after streaming requests are cancelled, observed on A100, and the OpenAI JSON-schema serving example may return an unbounded response with Qwen3 models. The evidence pin moves from the v1.4.0rc0 tag to the v1.4.0rc1 tag with a checkedAt of 2026-10-22, and the solution verifiedAt moves to the same day. Re-read against the same feeds and holding unchanged: ExLlamaV3 v1.6.4 (2026-10-20T23:53:45Z) is still the latest ExLlamaV3 release, vLLM v0.32.0 (2026-10-18T06:50:48Z) is still the latest vLLM release, SGLang v0.5.22 (2026-10-19T02:55:19Z) is still the latest SGLang release, llm-d v1.0.0 (2026-10-20T02:30:10Z) is still the latest llm-d release, KServe v0.21.0 and RamaLama v0.25.0 are still the latest releases of their projects, and the latest stable NVIDIA Dynamo release remains v1.5.1 (2026-10-07T01:54:13Z) with the two 1.6 prereleases of 19 and 20 October still development builds rather than stable releases. llama.cpp continues to publish a nightly build stream alongside its semver train: build tags ran through b11804 as of 2026-10-22T01:26:20Z, and the current semver release is still v0.7.0 (2026-10-15T17:13:19Z). The detailed history of the previous pass follows. The 2026-10-21 pass re-fetched all 31 source-audit endpoints (every one returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. One claim changed. ExLlamaV3 v1.6.4 (2026-10-20T23:53:45Z, stable) supersedes the v1.6.3 the previous pass recorded as latest: the release adds support for Lfm2VlForConditionalGeneration and for Nemotron 3.5 Bolt as an extension of NemotronHForCausalLM, makes prefill and decode scheduling fairer for concurrent requests, fixes some TP and shared-memory issues, and fixes a context overrun when a request is requeued with drafting enabled. It is not a format change, EXL3 remains the weight format, and its notes do not restate the ROCm 10 / gfx1100-and-above preliminary bound that v1.6.0 introduced, so that bound and the preliminary status stand unchanged. The solution description, strengths, limitations and extraSources are extended to cover the new architectures and the scheduling fix, the evidence pin moves from the v1.6.3 tag to the v1.6.4 tag with a checkedAt of 2026-10-21, and the solution's verifiedAt moves to the same day. Two NVIDIA Dynamo prereleases published after the previous pass are recorded as prereleases and do not move the pinned stable version: v1.6.0-beam-1.0-501b-dev.1 (2026-10-19T23:39:54Z) and v1.6.0-muse-spark-open-dev.1 (2026-10-20T02:09:56Z) are development builds on the 1.6 line rather than a stable release, and the latest stable Dynamo release remains v1.5.1 (2026-10-07T01:54:13Z), which is the version this dataset claims. llama.cpp continues to publish a nightly build stream alongside its semver train: build tags ran through b11782 as of 2026-10-21T04:58:09Z, and the current semver release is still v0.7.0 (2026-10-15T17:13:19Z). Re-read against the same feeds and holding unchanged: vLLM v0.32.0 (2026-10-18T06:50:48Z) is still the latest vLLM release, SGLang v0.5.22 (2026-10-19T02:55:19Z) is still the latest SGLang release, llm-d v1.0.0 (2026-10-20T02:30:10Z) is still the latest llm-d release, TensorRT-LLM v1.4.0rc0 (2026-10-14T16:35:44Z) is still the latest release candidate and no stable release has followed it, KServe v0.21.0 is still the latest KServe release and RamaLama v0.25.0 is still the latest RamaLama release. The detailed history of the previous pass follows. The 2026-10-20 pass re-fetched all 31 source-audit endpoints (every one returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. Three claims changed, and the first of them corrects a claim the previous two passes recorded wrongly. llama.cpp does publish a semver release train: v0.7.0 (2026-10-15T17:13:19Z, stable) is the current release, following v0.6.0 (2026-10-05), v0.5.0 (2026-09-23), v0.4.1 (2026-09-14), v0.4.0 (2026-09-04) and v0.3.0 (2026-08-25), and each of them is a non-prerelease release carrying published notes. The 2026-10-18 and 2026-10-19 paragraphs below still describe llama.cpp as publishing build tags and no semver release, and that is wrong: the b-tag builds are an additional nightly stream rather than a replacement for the semver train. The version is therefore recorded now, the llama.cpp evidence pin moves to the v0.7.0 tag and the solution verifiedAt moves to this pass. v0.7.0 opens a GPU cache for MoE experts kept in host memory (--moe-cache-mib), which the release’s own measurement puts at up to 2.2x faster decode when experts are offloaded and which is now shared across multiple GPUs; it adds the LiliCorr speculative decoding technique and MTP for GLM5-Next, support for K2 Horizon in both dense and MoVA variants, Prism Bonsai 2 27B, EmbeddingGemma-2, the LiquidAI d1/d1-omni and vLLM decision 2/d3 decision models, pplx-decider, MiniCPM-V 4.7 and Nemotron Super 3.5 VL and Nemotron Bolt; the server layer is refactored around common_chat_session and formatted chat output becomes an array of parts instead of a single string; the server default port moves from 8080 to 9931 while the Docker images keep 8080 inside the container; the RPC server supports -sm tensor for tensor-parallel RPC on protocol v8; and ggml is updated to v0.27.0. NVIDIA Dynamo v1.5.1 (2026-10-07T01:54:13Z, a patch release on top of v1.5.0) supersedes the v1.5.0 the previous pass recorded. It fixes Dynamo Router overload recovery: a worker that rejected requests for lack of capacity stayed marked overloaded after the pressure ended, so clients kept receiving HTTP 529 from an idle worker, and overload hints raised on the request path now expire after one second. It also fixes min_tokens requests on SGLang decode workers started without a tokenizer, Qwen3-VL video routing across mixed workers, and reinforcement learning worker discovery on Kubernetes. Client-supplied multimodal input (inline data: URL size, remote media downloads, image dimensions and base64 audio) is bounded across the SGLang, TensorRT-LLM, vLLM and vLLM-Omni paths and all media fetching moves onto a single aiohttp client; the frontend runtime libraries are upgraded to fix Anthropic Messages API requests from Claude Code against strict chat templates, and ModelExpress moves to v0.6.0, PyNvVideoCodec is pinned at 2.2.3 and the in-tree FFmpeg build moves to 9.0.1. Its two breaking changes are recorded rather than softened: workers that fetch request media through an ambient HTTP proxy must now set DYN_MM_TRUST_EGRESS_PROXY=1, because the proxy resolves the destination outside Dynamo’s address check, while direct fetches and NO_PROXY hosts are unaffected; and local input_reference files passed to SGLang image and video generation workers must name the allowed directory through DYN_MM_LOCAL_PATH, where previously any local path was accepted. llm-d v1.0.0 (2026-10-20T02:30:10Z) is a new claim: the project had no recorded version and now reaches a stable 1.0. It adds priority- and fairness-aware flow control with controlled load shedding (a probabilistic admitter, program-aware fairness and turn-priority scoring) with the configuration consolidated under flowControl; router high availability with hot standby and safe rolling updates; DisaggregatedSet managing prefill and decode replicas as one logical unit with coordinated rollouts and lockstep upgrades; a router configuration API that graduates to v1; previous_response_id in the Responses API; a hardened EPP request path; and a DRA/DRANET topology-aware accelerator guide. Agent-aware serving arrives with a session-state-producer plugin and evolving session affinity that keep multi-turn conversations close to their cached context. The one deprecation is recorded as a deprecation and not as a removal: the ghcr.io/llm-d/llm-d-rocm container image builds are deprecated in favour of upstream vLLM images, and the project has cherry-picked ghcr.io/llm-d/vllm-openai-rocm:v0.32.0-rc.2 into its own registry for ROCm. Re-read against the same feeds and holding unchanged: vLLM v0.32.0 (2026-10-18T06:50:48Z) is still the latest vLLM release, SGLang v0.5.22 (2026-10-19T02:55:19Z) is still the latest SGLang release, ExLlamaV3 v1.6.3 (2026-10-17T11:48:30Z) is still the latest ExLlamaV3 release, TensorRT-LLM v1.4.0rc0 (2026-10-14T16:35:44Z) is still the latest release candidate and no stable release has followed it, KServe v0.21.0 (2026-09-25) is still the latest KServe release and RamaLama v0.25.0 (2026-09-25) is still the latest RamaLama release. The detailed history of the previous pass follows. The 2026-10-19 pass re-fetched all 31 source-audit endpoints (every one returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. Two claims changed. vLLM v0.32.0 (2026-10-18T06:50:48Z, 814 commits from 363 contributors) supersedes the v0.31.0 recorded by the previous pass: the new POST /v1/systemone endpoint answers choice, noul and score questions over a structured state and is served by default, and the new hf tool and reasoning parser reads the checkpoint's response_template so that models shipping one need no model-specific parser. On the memory side the NVFP4 KV cache now runs on SM8x and SM12x, on SM90 and on MiniMax-M3 sparse attention on SM100; on SM100 GLM-5.x now defaults to an FP8 KV cache, which the release's own benchmark reports as 2.3-5.5% more throughput at a 7-11% TTFT cost; on SM90 fp8_ds_mla gives GLM-5.3-Flash up to 31% more output throughput; and ROCm gains a 4-bit ultraquant_4bit KV cache at about twice the density of FP8. Model Runner V2 gains a GPU n-gram speculator with variable-length drafts, Elastic EP, pipeline parallelism with prefill context parallelism for MLA models, a stock torch.compile mode and the MRV2 default on ROCm; startup improves through vllm download-kernels, vllm preload --preload-autotune, a shared-memory tensor arena, local tokenizer snapshots and least-loaded API worker selection behind --api-server-count. Security fixes cover GHSA-4hhp-h66f-j5j7 chat template resource exhaustion, GHSA-q97c-p368-75c4 tokenizer max_token_id and GHSA-frvg-qw88-hww9 P2P ZMQ socket exhaustion, and CORS no longer allows every origin by default. The breaking changes are recorded rather than softened: Python 3.10 support was dropped so the minimum is 3.11, transformers>=5.16.1,<5.20.0 and tokenizers>=0.23.2 are required, the torch.compile sequence parallelism and AsyncTP passes were removed, cascade attention was removed with --disable-cascade-attn still parsing but only warning and scheduled for removal in v0.33.0, mamba_cache_mode=\\\"all\\\" was removed, max_tokens is an upper bound rather than a reservation taken from the context window, and the Responses API reasoning stream events were renamed. SGLang v0.5.22 (2026-10-19T02:55:19Z, 950 PRs from 245 contributors) supersedes the v0.5.21 recorded by the previous pass: DeepSeek-V4.1 gets up to 2.3x more throughput per GPU on H200 and now runs on AMD MI350X and MI355X with up to 1.9x throughput from DSpark; Qwen3.8-Flash-Next decodes 12% faster on B200 and GLM-5.3-Flash with DFlash 10% faster on B300; MiMo-V2.6-Pro gets 1.85x decode throughput with DFlash on B300; the new InstantTensor loader loads models 10x faster; PD disaggregation gets up to 27% more throughput and half the p95 TTFT on long-prompt workloads; HiSparse supports EAGLE and MTP with the KV cache in CPU memory; and GLM-5.2 and GLM-5.3 can combine decode context parallelism with MTP for up to 2.1x faster decoding on GLM-5.3. SGLang now runs on Apple Silicon Macs with the standard PyTorch backend alongside MLX, MiniMax-H3 and Qwen-Image 2.1 can run in ComfyUI with SGLang Diffusion, and a fix stops hybrid linear models from resuming from wrong mamba states when speculative decoding and structured output are used together. SGLang now requires Python 3.11 or newer. Re-read against the same feeds and holding unchanged: ExLlamaV3 v1.6.3 (2026-10-17T11:48:30Z) is still the latest ExLlamaV3 release, TensorRT-LLM v1.4.0rc0 (2026-10-14T16:35:44Z) is still the latest release candidate and no stable release has followed it, KServe v0.21.0 is still the latest KServe release and RamaLama v0.25.0 is still the latest RamaLama release. llama.cpp published build tags b11723 through b11727 through 2026-10-19T10:23:39Z and continues to publish no semver release, so no version is recorded for it. The detailed history of the previous pass follows. The 2026-10-18 pass re-read the upstream release feeds for the serving-layer and runtime projects and did not repeat the 31-endpoint source-audit sweep, so nothing is claimed here about endpoint reachability on this pass. One claim changed. ExLlamaV3 v1.6.3 (2026-10-17T11:48:30Z, stable) supersedes the v1.6.2 that the previous pass recorded as latest, and the change is narrow: the release adds support for BailingMoeV3ForCausalLM, that is Ling-3.0 and Ling-3.1, together with assorted bugfixes. It is not a format change, EXL3 remains the weight format, and its notes do not restate the ROCm 10 / gfx1100-and-above preliminary bound that v1.6.0 introduced, so that bound and the preliminary status stand unchanged. The solution description, strengths, limitations and extraSources are extended to cover the new model architecture, the evidence pin moves from the v1.6.2 tag to the v1.6.3 tag with a checkedAt of 2026-10-18, and the solution's verifiedAt moves to the same day. Re-read against the same feeds and holding unchanged: TensorRT-LLM v1.4.0rc0 (2026-10-14T16:35:44Z) is still the latest release candidate and no stable release has followed it, vLLM v0.31.0 (2026-10-05T06:44:55Z) is still the latest vLLM release and SGLang v0.5.21 (2026-10-02T01:09:04Z) is still the latest SGLang release. llama.cpp published build tags b11716, b11717 and b11718 through 2026-10-18T04:42:47Z and continues to publish no semver release, so no version is recorded for it; MITRE ATLAS data remains at v2026.09. The detailed history of the previous pass follows. The 2026-10-17 pass re-fetched all 31 source-audit endpoints (every one again returned HTTP 200) and re-read the upstream release feeds for the serving-layer and runtime projects. One claim changed. TensorRT-LLM v1.4.0rc0 (2026-10-14T16:35:44Z, release candidate) supersedes the v1.3.0rc29 recorded by the previous pass, and the supersession is one the previous pass left open: the 2026-10-15 pass re-read vLLM and SGLang and recorded them as holding, but did not re-state a TensorRT-LLM version of its own, so the newer release candidate stood recorded only in the older paragraph that still describes v1.3.0rc29 as having no successor. v1.4.0rc0 removes the Python backend of KVCacheManagerV2 and migrates LlmRequest fields to Python, both breaking, so the solution description and limitations are rewritten around those two changes rather than around the AutoDeploy and cpp_only removals that belonged to v1.3.0rc29. On model support it adds GLM-5.3-Flash, K-EXAONE-2, Qwen-Image-Layered, static FP8 Cosmos3 Nano and Super checkpoints, Nemotron Super 3.5 VL, NVFP4 KV cache support for MiniMax-M3 and the MiniMax H3 ref2va mode; on the API side it adds command-line configuration overrides, per-request speculative-decoding acceptance reporting, OpenAI-style errors when a request exceeds the context length, a per-model serving-extension registry and OpenEngine gRPC bindings shipped in the wheel. It also adds a Mooncake store pool with V2 scheduler preemption, sparse KV cache configuration with tier-aware locking and offload, and VisualGen sparse attention on PrimTS. Its known issues are recorded rather than omitted, because a release candidate that lists them is not a release to plan against: multi-GPU streaming or RPC executor workloads may hang during worker initialization when MPI worker pools are reused on H100; DeepSeek MLA models may crash with an illegal memory access when CUDA graphs are captured with BF16 BMM on SM120 and SM121 GPUs; GPT-OSS models may fail with attention data parallelism on SM120 when automatic communication selects NCCL EP for unsupported hidden sizes; Qwen3 models with tied embeddings may fail at model construction when attention data parallelism is enabled with TP greater than 1; and OpenTelemetry tracing may export additional FastAPI spans when FastAPI 0.142 or newer is installed. No stable release followed it, so the record remains a release candidate and not a stable release, and the TensorRT-LLM evidence pin moves from the v1.3.0rc29 tag to the v1.4.0rc0 tag with a checkedAt of 2026-10-17. Re-read against the same feeds and holding unchanged: ExLlamaV3 v1.6.2 (2026-10-14T19:54:36Z) is still the latest ExLlamaV3 release, vLLM v0.31.0 (2026-10-05T06:44:55Z) is still the latest vLLM release, SGLang v0.5.21 (2026-10-02T01:09:04Z) is still the latest SGLang release and KServe v0.21.0 is still the latest KServe release. The archived TGI repository still reports archived=true and MITRE ATLAS data remains at v2026.09. The detailed history of the previous pass follows. The 2026-10-15 pass re-fetched all 31 source-audit endpoints (every one returned HTTP 200 once a transient 429 on bentoml was retried; three recorded URLs resolve through a redirect to their documentation home, lmdeploy to lmdeploy.readthedocs.io/en/latest/, xinference to inference.readthedocs.io/en/latest/ and jan to www.jan.ai/docs, and those are the same destinations as recorded) and re-read the upstream release feeds for the serving-layer and runtime projects. One claim changed. ExLlamaV3 v1.6.2 (2026-10-14T19:54:36Z, stable) supersedes the v1.6.1 recorded by the previous pass: it reports faster CPU offloading, support for TP models with DFlash2 drafters, and less VRAM overhead for GDN/KDA/MLA layers, plus ROCm fixes and faster attention on gfx11*. Its notes do not restate the ROCm 10 / gfx1100-and-above preliminary bound from v1.6.0, so that limitation stands unchanged and ROCm support stays preliminary; it is not a format change, and EXL3 remains the weight format. Re-read against the same feeds and holding unchanged: vLLM v0.31.0 (2026-10-05T06:44:55Z) is still the latest vLLM release and SGLang v0.5.21 is still the latest SGLang release, so neither pinned version moved. The archived TGI repository still reports archived=true and MITRE ATLAS data remains at v2026.09. The detailed history of the previous pass follows. Two claims changed. ExLlamaV3 v1.6.1 (2026-10-10T20:22:36Z, stable) supersedes the v1.6.0 recorded by the previous pass: it narrows the inference side rather than widening the platform, with reduced (flat) VRAM overhead for GDN/KDA/Mamba drafting, support for recurrent draft models, DFlash switched to sliding attention, a new hybrid drafting mode combining a draft model with long-ngram, a workaround for a Triton issue that breaks kernel autotune on mixed-architecture setups, Turing (sm_75) and AVX2 optimizations, and many bugfixes. Its notes list further ROCm fixes and optimizations but do not restate the ROCm 10 / gfx1100-and-above preliminary bound from v1.6.0, so that limitation stands unchanged and ROCm support stays preliminary. NVIDIA Dynamo v1.5.0 (2026-09-21T20:21:52Z, 658 merged PRs from 123 contributors) is now readable and closes the evidence gap the 2026-10-09 pass preserved: Dynamo Router opens worker selection to custom scoring and picking policies and extends KV indexing to the Mooncake and disk tiers; on the Kubernetes path `nvidia.com/v1beta1` becomes the CRD storage version, the Go Endpoint Picker is removed in favour of the Rust EPP default, and Dynamo Snapshot moves to a standalone operator; TLS and mutual TLS cover the TCP and NATS transports; AIConfigurator becomes AISimulate and ships as its own package; and the engines move to SGLang v0.5.18, TensorRT-LLM v1.3.0rc25 and vLLM v0.28.0. KVBM is recorded as deprecated with removal targeted for v1.7.0, not as removed. Re-read against the same feeds and holding unchanged: vLLM v0.31.0 (2026-10-05T06:44:55Z, 717 commits from 307 contributors) is still the latest vLLM release, with the `vllm preload` weight-cache daemon, experimental CRIU `vllm snapshot create/restore`, Model Runner V2 draft-model speculative decoding and the LiLiCorr drafter, and the same recorded breaking changes (per-request `mm_processor_kwargs` and `media_io_kwargs` rejected without `--trust-request-mm-kwargs`, `tokenizer_mode=\\\"slow\\\"` removed, online `quantization=\\\"fp8\\\"` replaced by the `fp8_per_tensor` shorthand, `--enable-mamba-fine-grained-prefix-cache` renamed, `--enforce-eager` also disabling JIT kernel warmup). SGLang (v0.5.21), TensorRT-LLM (v1.3.0rc29, still a release candidate), RamaLama (v0.25.0) and KServe (v0.21.0) also have no newer release. The archived TGI repository was re-read through the GitHub API and still reports archived=true, so that lifecycle claim holds; MITRE ATLAS data remains at v2026.09. Several projects published releases after the previous pass that carry no version claim in this dataset, so nothing was stale to correct and no version was invented for them: Xinference v4.0.0 (2026-10-10), Open WebUI v0.12.0 (2026-10-10), Ollama v0.40.3 (2026-10-11) with v0.40.4-rc1 (2026-10-12), LiteLLM v1.105.0 (2026-10-11), WebLLM v0.2.86 (2026-10-11) and Jan v0.8.6 (2026-10-09). llama.cpp continues to publish build tags rather than semver releases, so no version is recorded for it. Individual solution dates remain authoritative; no inference benchmark was reproduced and no throughput or latency figure is claimed here - the figures quoted in the v0.31.0 description are the release notes own. The datasetRelease.evidence list and the 31-entry source audit cover different things and are not compared against each other."
} as const
