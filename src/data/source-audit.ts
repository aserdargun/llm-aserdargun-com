/** Endpoint checks are observer metadata and must never affect matching. */
export const sourceAudit = {
  "schemaVersion": 1,
  "checkedAt": "2026-09-21",
  "scope": "Primary-source endpoint and overview review; not an exhaustive hardware, license or model-compatibility certification. Individual solution verification dates remain authoritative.",
  "entries": [
    {
      "solution": "tensorrt-llm",
      "url": "https://nvidia.github.io/TensorRT-LLM/legacy/tensorrt-backend-removal.html"
    },
    {
      "solution": "llama-cpp",
      "url": "https://github.com/ggml-org/llama.cpp"
    },
    {
      "solution": "mlx-lm",
      "url": "https://github.com/ml-explore/mlx-lm"
    },
    {
      "solution": "mlc-llm",
      "url": "https://llm.mlc.ai/"
    },
    {
      "solution": "lmdeploy",
      "url": "https://lmdeploy.readthedocs.io/"
    },
    {
      "solution": "exllamav3",
      "url": "https://github.com/turboderp-org/exllamav3"
    },
    {
      "solution": "openvino-genai",
      "url": "https://docs.openvino.ai/2026/openvino-workflow-generative/inference-with-genai.html"
    },
    {
      "solution": "onnx-runtime-genai",
      "url": "https://onnxruntime.ai/docs/genai/"
    },
    {
      "solution": "vllm",
      "url": "https://docs.vllm.ai/en/latest/"
    },
    {
      "solution": "sglang",
      "url": "https://docs.sglang.io/"
    },
    {
      "solution": "nvidia-triton",
      "url": "https://www.nvidia.com/en-us/ai/dynamo-triton/"
    },
    {
      "solution": "localai",
      "url": "https://localai.io/docs/overview/index.html"
    },
    {
      "solution": "xinference",
      "url": "https://inference.readthedocs.io/"
    },
    {
      "solution": "bentoml",
      "url": "https://docs.bentoml.org/en/latest/examples/vllm.html"
    },
    {
      "solution": "hugging-face-tgi",
      "url": "https://github.com/huggingface/text-generation-inference"
    },
    {
      "solution": "ollama",
      "url": "https://docs.ollama.com/quickstart"
    },
    {
      "solution": "docker-model-runner",
      "url": "https://docs.docker.com/ai/model-runner/"
    },
    {
      "solution": "ramalama",
      "url": "https://github.com/containers/ramalama"
    },
    {
      "solution": "lm-studio",
      "url": "https://lmstudio.ai/docs/app/offline"
    },
    {
      "solution": "jan",
      "url": "https://www.jan.ai/docs/"
    },
    {
      "solution": "gpt4all",
      "url": "https://docs.gpt4all.io/index.html"
    },
    {
      "solution": "anythingllm",
      "url": "https://docs.anythingllm.com/"
    },
    {
      "solution": "open-webui",
      "url": "https://docs.openwebui.com/"
    },
    {
      "solution": "nvidia-dynamo",
      "url": "https://docs.nvidia.com/dynamo/dev/"
    },
    {
      "solution": "ray-serve-llm",
      "url": "https://docs.ray.io/en/latest/serve/llm/index.html"
    },
    {
      "solution": "llm-d",
      "url": "https://llm-d.ai/"
    },
    {
      "solution": "kserve",
      "url": "https://kserve.github.io/website/docs/model-serving/generative-inference/llmisvc/llmisvc-overview"
    },
    {
      "solution": "litellm-proxy",
      "url": "https://docs.litellm.ai/docs/"
    },
    {
      "solution": "kong-ai-gateway",
      "url": "https://developer.konghq.com/ai-gateway/"
    },
    {
      "solution": "executorch",
      "url": "https://docs.pytorch.org/executorch/stable/index.html"
    },
    {
      "solution": "webllm",
      "url": "https://llm.mlc.ai/docs/deploy/webllm.html"
    }
  ]
} as const
