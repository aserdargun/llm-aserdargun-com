import type { Lesson } from '@/types/learning'

/**
 * Mini-dersler. Visual, step-by-step, runnable in your own environment.
 * Each step is small, scoped, and references related concepts and solutions.
 */
export const lessons: Lesson[] = [
  // ═══════════════════════════════════════════════════════════
  //  Ders 1 — Mac'te ilk LLM'ini çalıştır (starter, 8 dk)
  // ═══════════════════════════════════════════════════════════

  {
    slug: 'mac-first-llm',
    title: {
      tr: "Mac'te ilk LLM'ini çalıştır",
      en: 'Run your first LLM on Mac',
    },
    summary: {
      tr: "Apple Silicon'da 5 dakikada ilk modelini çalıştır.",
      en: 'Run your first model on Apple Silicon in 5 minutes.',
    },
    level: 'starter',
    durationMin: 8,
    steps: [
      {
        title: {
          tr: 'Ollama\'yı kur',
          en: 'Install Ollama',
        },
        body: {
          tr: 'Ollama, Apple Silicon için optimize edilmiş tek satırlık bir yerel LLM çalıştırıcısıdır. Resmi sayfadan macOS paketini indirip sürükleyerek kur; alternatif olarak Homebrew kullanabilirsin.',
          en: 'Ollama is a one-line local LLM runner optimized for Apple Silicon. Download the macOS package from the official site and drag it to Applications; or use Homebrew as an alternative.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# Homebrew ile Ollama kurulumu\nbrew install ollama\n\n# Kurulumu doğrula\nollama --version',
        },
      },
      {
        title: {
          tr: 'İlk modeli indir',
          en: 'Pull your first model',
        },
        body: {
          tr: '`ollama pull` komutu, modeli ~/.ollama/models altına indirir. 3B civarı küçük bir model (örn. llama3.2:3b) ile başlamak hızlıdır; 8B de M2+ cihazlarda rahat çalışır.',
          en: '`ollama pull` downloads the model under ~/.ollama/models. Starting with a small ~3B model (e.g. llama3.2:3b) is fast; 8B also runs well on M2+ devices.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# ~2 GB model indir ve doğrula\nollama pull llama3.2:3b\nollama list',
        },
      },
      {
        title: {
          tr: 'Terminalden sohbet başlat',
          en: 'Start a chat from the terminal',
        },
        body: {
          tr: '`ollama run` interaktif bir sohbet açar; çıkmak için /bye yaz. Bu, modelin metni tokenize edip yanıt ürettiği en basit deneyimdir; context window ve sampling gibi kavramları görmek için iyi bir başlangıçtır.',
          en: '`ollama run` opens an interactive chat; type /bye to quit. This is the simplest way to see the model tokenize text and generate a reply — a good starting point to observe context window and sampling in action.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# Sohbet başlat — tokenizasyon ve sampling gözlemlenebilir\nollama run llama3.2:3b',
        },
        tryIt: {
          label: {
            tr: "Ollama'nın model kütüphanesine göz at",
            en: 'Browse the Ollama model library',
          },
          href: 'https://ollama.com/library',
        },
      },
      {
        title: {
          tr: 'Yerel API\'yi aç',
          en: 'Open the local API',
        },
        body: {
          tr: 'Ollama, OpenAI uyumlu bir HTTP API açar (varsayılan: http://127.0.0.1:11434). Bu, kendi uygulamalarınızın aynı protokol üzerinden modele bağlanmasını sağlar; port değiştirmek için OLLAMA_HOST kullanılır.',
          en: 'Ollama exposes an OpenAI-compatible HTTP API (default: http://127.0.0.1:11434). Your apps can talk to the model over this protocol; change the port with OLLAMA_HOST.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# Arka planda API servisini başlat\nollama serve &\nsleep 2\n\n# Sağlık kontrolü\ncurl -s http://127.0.0.1:11434/api/tags | head',
        },
      },
      {
        title: {
          tr: 'OpenAI uyumlu uç noktayı test et',
          en: 'Test the OpenAI-compatible endpoint',
        },
        body: {
          tr: 'OpenAI uyumlu `/v1/chat/completions` uç noktası sayesinde mevcut OpenAI istemci kütüphanelerinizi base URL değiştirerek aynen kullanabilirsiniz. Sonraki adımda birden fazla modeli aynı anda yükleyip karşılaştıracağız.',
          en: 'Thanks to the OpenAI-compatible `/v1/chat/completions` endpoint, you can reuse your existing OpenAI client libraries by just changing the base URL. In the next step, you will load multiple models side by side and compare them.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# OpenAI uyumlu chat completion testi\ncurl -s http://127.0.0.1:11434/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "model": "llama3.2:3b",\n    "messages": [{"role": "user", "content": "Merhaba, kendini tanıt."}]\n  }\'',
        },
      },
    ],
    relatedConcepts: ['tokenization', 'context-window', 'prompt', 'openai-compatible-api'],
    relatedSolutions: ['ollama', 'lm-studio'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Ders 2 — Üretim API'si kur (vLLM + OpenAI uyumlu)
  // ═══════════════════════════════════════════════════════════

  {
    slug: 'production-api-vllm',
    title: {
      tr: 'Üretim API\'si kur (vLLM + OpenAI uyumlu)',
      en: 'Stand up a production API (vLLM + OpenAI-compatible)',
    },
    summary: {
      tr: "Yüksek eşzamanlılıkta OpenAI uyumlu bir LLM API'si dağıt.",
      en: 'Deploy an OpenAI-compatible LLM API at high concurrency.',
    },
    level: 'intermediate',
    durationMin: 15,
    steps: [
      {
        title: {
          tr: 'NVIDIA GPU + CUDA hazırlığı',
          en: 'Prepare NVIDIA GPU + CUDA',
        },
        body: {
          tr: 'vLLM için NVIDIA sürücüleri, CUDA toolkit ve Python 3.10+ gerekir. nvidia-smi ile GPU\'yu doğrulayın; en az 24 GB VRAM 7B/13B modelleri için idealdir.',
          en: 'vLLM needs NVIDIA drivers, the CUDA toolkit, and Python 3.10+. Verify with nvidia-smi; at least 24 GB VRAM is ideal for 7B/13B models.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# GPU ve CUDA kontrolü\nnvidia-smi\nnvcc --version  # veya sadece sürücü yeterliyse atla',
        },
        tryIt: {
          label: {
            tr: 'vLLM kurulum rehberi',
            en: 'vLLM installation guide',
          },
          href: 'https://docs.vllm.ai/en/latest/getting_started/installation.html',
        },
      },
      {
        title: {
          tr: 'vLLM\'i kur',
          en: 'Install vLLM',
        },
        body: {
          tr: 'pip ile vLLM\'i kur. Yeni sürümlerde torch ayrı bir adım gerektirebilir; vLLM 0.6+ ile birlikte OpenAI uyumlu sunum varsayılandır. Bu adımda continuous batching ve PagedAttention motorun içine hazır gelir.',
          en: 'Install vLLM via pip. Newer releases may need a separate torch step; vLLM 0.6+ ships OpenAI-compatible serving by default. Continuous batching and PagedAttention come built in.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# Sanal ortam ve vLLM kurulumu\npython3 -m venv vllm-venv && source vllm-venv/bin/activate\npip install --upgrade pip\npip install vllm',
        },
      },
      {
        title: {
          tr: 'vLLM sunucusunu başlat',
          en: 'Start the vLLM server',
        },
        body: {
          tr: '`vllm serve` komutu, OpenAI uyumlu bir HTTP sunucusu açar. KV cache ve batching ayarları otomatik yapılır; GPU sayısına göre --tensor-parallel-size değiştirilir. Sonraki adımda bu uç noktayı test edeceğiz.',
          en: '`vllm serve` opens an OpenAI-compatible HTTP server. KV cache and batching are configured automatically; set --tensor-parallel-size to your GPU count. In the next step we will hit this endpoint.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# Tek GPU ile 8B modeli serve et\nvllm serve <MODEL_NAME> \\\n  --host 0.0.0.0 --port 8000 \\\n  --max-model-len 8192 \\\n  --gpu-memory-utilization 0.90',
        },
      },
      {
        title: {
          tr: 'OpenAI uyumlu /v1/chat/completions testi',
          en: 'Test OpenAI-compatible /v1/chat/completions',
        },
        body: {
          tr: 'OpenAI Python SDK ile aynı kodu, sadece base URL değiştirerek kullanabilirsiniz. Bu, mevcut OpenAI entegrasyonlarınızın büyük değişiklik olmadan vLLM\'e geçmesini sağlar — provider migration\'ı en pratik hale getiren katman burasıdır.',
          en: 'You can reuse the same OpenAI Python SDK code, just by changing the base URL. This lets existing OpenAI integrations move to vLLM with almost no code change — this layer is what makes provider migration painless.',
        },
        codeBlock: {
          lang: 'python',
          code: '# pip install openai\nfrom openai import OpenAI\n\nclient = OpenAI(\n    base_url="http://127.0.0.1:8000/v1",\n    api_key="EMPTY",  # vLLM auth istemez\n)\n\nresp = client.chat.completions.create(\n    model="<MODEL_NAME>",\n    messages=[{"role": "user", "content": "Tek cümlede PagedAttention\'ı açıkla."}],\n)\nprint(resp.choices[0].message.content)',
        },
      },
      {
        title: {
          tr: 'Streaming yanıt',
          en: 'Streaming responses',
        },
        body: {
          tr: 'stream=True ile TTFT (Time To First Token) hissini kullanıcıya anında yansıtırsınız. vLLM, PagedAttention sayesinde decode aşamasında da yüksek token/s verir; streaming UX ile throughput arasında ödünleşim yoktur.',
          en: 'With stream=True, the user sees the TTFT (Time To First Token) almost immediately. Thanks to PagedAttention, vLLM also sustains a high tokens/s during decode; there is no real tradeoff between streaming UX and throughput.',
        },
        codeBlock: {
          lang: 'python',
          code: 'from openai import OpenAI\n\nclient = OpenAI(base_url="http://127.0.0.1:8000/v1", api_key="EMPTY")\n\nstream = client.chat.completions.create(\n    model="<MODEL_NAME>",\n    messages=[{"role": "user", "content": "Bana kısa bir hikaye anlat."}],\n    stream=True,\n)\nfor chunk in stream:\n    delta = chunk.choices[0].delta.content\n    if delta:\n        print(delta, end="", flush=True)',
        },
      },
      {
        title: {
          tr: 'Basit bir Nginx reverse proxy',
          en: 'A simple Nginx reverse proxy',
        },
        body: {
      tr: 'Reverse proxy, TLS sonlandırma, rate limiting ve /healthz yönlendirmesi ekler. Streaming (SSE) için `proxy_buffering off` ve uzun timeout\'lar şarttır; aksi halde token akışı takılır.',
          en: 'A reverse proxy adds TLS termination, rate limiting, and /healthz routing. For streaming (SSE) you must set `proxy_buffering off` and long timeouts; otherwise the token stream stalls.',
        },
        codeBlock: {
          lang: 'ts',
          code: '# /etc/nginx/conf.d/llm.conf\nserver {\n  listen 443 ssl http2;\n  server_name llm.example.com;\n\n  # SSL sertifikalarını buraya ekle\n  # ssl_certificate     ...;\n  # ssl_certificate_key ...;\n\n  location / {\n    proxy_pass         http://127.0.0.1:8000;\n    proxy_http_version 1.1;\n    proxy_set_header   Host $host;\n    proxy_set_header   Connection "";\n    proxy_buffering    off;       # streaming için kritik\n    proxy_read_timeout 600s;\n    proxy_send_timeout 600s;\n  }\n\n  location = /healthz {\n    proxy_pass http://127.0.0.1:8000/health;\n  }\n}',
        },
      },
    ],
    relatedConcepts: [
      'batching',
      'kv-cache',
      'paged-attention',
      'streaming',
      'openai-compatible-api',
    ],
    relatedSolutions: ['vllm', 'sglang', 'litellm-proxy'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Ders 3 — Bir modeli nicemle (Quantize a model)
  // ═══════════════════════════════════════════════════════════

  {
    slug: 'quantize-a-model',
    title: {
      tr: 'Bir modeli nicemle',
      en: 'Quantize a model',
    },
    summary: {
      tr: 'FP16 modeli GGUF veya AWQ formatına dönüştür; boyut/hız kazan, kaliteyi koru.',
      en: 'Convert an FP16 model to GGUF or AWQ; shrink size and speed up while keeping quality.',
    },
    level: 'intermediate',
    durationMin: 12,
    steps: [
      {
        title: {
          tr: 'Orijinal FP16 modeli seç',
          en: 'Pick the original FP16 model',
        },
        body: {
          tr: 'Nicelleme, eğitilmiş FP16 (veya BF16) ağırlıkları daha düşük bit genişliğine sıkıştırır. Hugging Face\'te çoğu yayın FP16/BF16 gelir; bu yüzden "source of truth" modeli budur. Quantization kalite üzerindeki etkiyi son adımda ölçeceğiz.',
          en: 'Quantization compresses trained FP16 (or BF16) weights to a lower bit width. Most Hugging Face releases ship in FP16/BF16, so that is your "source of truth". You will measure the quality impact in the last step.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# Örnek: Meta-Llama-3-8B-Instruct (FP16)\n# Kendi modelinizle <HF_MODEL_ID> değiştirin\npip install huggingface_hub\nhuggingface-cli download <HF_MODEL_ID> \\\n  --local-dir ./models/base-fp16 --local-dir-use-symlinks False',
        },
      },
      {
        title: {
          tr: 'Format seç: GGUF mi AWQ mu?',
          en: 'Choose a format: GGUF or AWQ?',
        },
        body: {
          tr: 'GGUF (llama.cpp) CPU ve Apple Metal dahil çok çeşitli donanımda çalışır; AWQ ise NVIDIA GPU\'da INT4 inference için optimize edilmiştir. Edge/CPU/Mac için GGUF, NVIDIA sunucu için AWQ tercih edilir.',
          en: 'GGUF (llama.cpp) runs on a wide range of hardware including CPU and Apple Metal; AWQ is optimized for INT4 inference on NVIDIA GPUs. Pick GGUF for edge/CPU/Mac, AWQ for NVIDIA servers.',
        },
      },
      {
        title: {
          tr: 'llama.cpp ile GGUF üret',
          en: 'Build GGUF with llama.cpp',
        },
        body: {
          tr: 'llama.cpp deposu, FP16 -> GGUF dönüşümü ve Q4_K_M / Q5_K_M gibi nicelleme seviyeleri sunar. Q4_K_M iyi bir hız/kalite dengesidir; Q8_0 neredeyse kayıpsızdır.',
          en: 'The llama.cpp repo ships FP16 to GGUF conversion plus quantization levels like Q4_K_M and Q5_K_M. Q4_K_M is a great speed/quality balance; Q8_0 is nearly lossless.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# llama.cpp klonla ve derle\ngit clone https://github.com/ggerganov/llama.cpp && cd llama.cpp\ncmake -B build && cmake --build build --config Release -j\n\n# FP16 -> GGUF (Q4_K_M nicelleme)\npython3 convert_hf_to_gguf.py ../models/base-fp16 \\\n  --outfile ../models/model-Q4_K_M.gguf --outtype q4_k_m',
        },
      },
      {
        title: {
          tr: 'AutoAWQ ile INT4 üret',
          en: 'Build INT4 with AutoAWQ',
        },
        body: {
          tr: 'AutoAWQ, kalibrasyon verisi üzerinde ağırlıkları INT4\'e sıkıştırır. Çıktı, vLLM veya TGI tarafından doğrudan yüklenebilir. Bu yöntem özellikle NVIDIA GPU sunumunda latency ve bellek tasarrufu sağlar.',
          en: 'AutoAWQ compresses weights to INT4 using calibration data. The output is loaded directly by vLLM or TGI. This method is especially good for latency and memory savings on NVIDIA GPU serving.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\npip install autoawq\n# INT4 AWQ üret — küçük bir kalibrasyon verisi gerekir\npython3 -c "\nfrom awq import AutoAWQForCausalLM\nfrom transformers import AutoTokenizer\n\nmodel_path = "./models/base-fp16"\nquant_path  = "./models/awq-int4"\n\nmodel = AutoAWQForCausalLM.from_pretrained(model_path)\ntok   = AutoTokenizer.from_pretrained(model_path)\n\nmodel.quantize(tok, quant_config={ "w_bit": 4, "q_group_size": 128, "version": "GEMM" })\nmodel.save_quantized(quant_path)\ntok.save_pretrained(quant_path)\n"',
        },
      },
      {
        title: {
          tr: 'Kalite kontrol: perplexity',
          en: 'Quality control: perplexity',
        },
        body: {
          tr: 'Perplexity (PPL) düşük = model dili daha iyi "tahmin ediyor" demektir. Wikitext gibi standart bir veri kümesinde FP16 ve nicellenmiş modelin PPL\'sini karşılaştırın; küçük artışlar (örn. <%3) çoğu kullanım için kabul edilebilirdir.',
          en: 'Lower perplexity (PPL) means the model predicts language better. Compare FP16 vs quantized PPL on a standard dataset like Wikitext; small increases (e.g. <3%) are acceptable for most use cases.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# llama.cpp üzerinden PPL ölçümü\n./build/bin/llama-perplexity \\\n  -m ../models/model-Q4_K_M.gguf \\\n  -f wikitext-2-raw/wiki.test.raw \\\n  -c 512 -b 512',
        },
      },
      {
        title: {
          tr: 'Boyut ve hız karşılaştırması',
          en: 'Compare size and speed',
        },
        body: {
          tr: 'Disk üzerindeki boyut ve tokens/s hızı, nicellemenin gerçek kazancını gösterir. INT4 tipik olarak belleği %75 azaltır, tokens/s\'yi 1.5-3x artırır; kalite ise iyi kalibrasyonla ihmal edilebilir düzeyde düşer.',
          en: 'On-disk size and tokens/s reveal the real win from quantization. INT4 typically cuts memory by 75% and raises tokens/s by 1.5-3x; with good calibration the quality drop is negligible.',
        },
      },
    ],
    relatedConcepts: ['quantization', 'fine-tuning', 'kv-cache'],
    relatedSolutions: ['llama-cpp', 'exllamav3', 'lmdeploy', 'tensorrt-llm'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Ders 4 — RAG pipeline'ını birleştir
  // ═══════════════════════════════════════════════════════════

  {
    slug: 'rag-pipeline',
    title: {
      tr: "RAG pipeline'ını birleştir",
      en: 'Wire up a RAG pipeline',
    },
    summary: {
      tr: 'Belgeleri parçala, embedle, getir, prompt ile birleştir ve cevap üret.',
      en: 'Chunk documents, embed, retrieve, combine with a prompt, and generate an answer.',
    },
    level: 'intermediate',
    durationMin: 18,
    steps: [
      {
        title: {
          tr: 'Belgeleri parçala',
          en: 'Chunk your documents',
        },
        body: {
          tr: 'Ham belgeler doğrudan LLM\'e verilemez; küçük, örtüşen parçalara (chunk) bölünür. 500-1000 token boyutu ve %10-20 örtüşme iyi bir başlangıçtır. Aşırı küçük parça anlamı, aşırı büyük parça retrieval kalitesini düşürür.',
          en: 'Raw documents cannot be fed straight to an LLM; split them into small, overlapping chunks. 500-1000 tokens with 10-20% overlap is a solid starting point. Chunks too small lose meaning; too big hurt retrieval quality.',
        },
        codeBlock: {
          lang: 'python',
          code: '# pip install langchain-text-splitters\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\n\nwith open("docs/product-handbook.md", "r", encoding="utf-8") as f:\n    text = f.read()\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=800, chunk_overlap=120,\n    separators=["\\n\\n", "\\n", ".", " "],\n)\nchunks = splitter.split_text(text)\nprint(f"{len(chunks)} parça üretildi")',
        },
      },
      {
        title: {
          tr: 'Embedding modeli seç',
          en: 'Pick an embedding model',
        },
        body: {
          tr: 'Embedding modeli, metin -> vektör dönüşümünü yapar. Türkçe için `intfloat/multilingual-e5-large` veya `bge-m3` iyi sonuç verir; İngilizce yoğun işlerde OpenAI `text-embedding-3-large` kullanılır. Modelin çıktı boyutu (örn. 1024) vector DB şemasını belirler.',
          en: 'The embedding model maps text to vectors. For Turkish, `intfloat/multilingual-e5-large` or `bge-m3` work well; for English-heavy workloads, OpenAI `text-embedding-3-large` is common. The model\'s output dim (e.g. 1024) fixes the vector DB schema.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\npip install sentence-transformers\n# multilingual-e5-large örnek\npython3 -c "from sentence_transformers import SentenceTransformer; \\\n  m = SentenceTransformer("intfloat/multilingual-e5-large"); \\\n  print(m.encode(["deneme"]).shape)"',
        },
      },
      {
        title: {
          tr: 'Vector DB seç ve parçaları yükle',
          en: 'Pick a vector DB and ingest chunks',
        },
        body: {
          tr: 'Chroma (yerel, prototip için), Qdrant ve Milvus (üretim), pgvector (Postgres\'le birlikte) en yaygın seçeneklerdir. HNSW/IVF indeksleri milyonlarca parçada O(log N) arama sağlar; flat arama ölçeklenmez.',
          en: 'Chroma (local, for prototypes), Qdrant and Milvus (production), pgvector (alongside Postgres) are the most common picks. HNSW/IVF indexes give O(log N) search on millions of chunks; flat search does not scale.',
        },
        codeBlock: {
          lang: 'python',
          code: '# pip install chromadb\nimport chromadb\nfrom chromadb.utils import embedding_functions\n\nclient = chromadb.PersistentClient(path="./vectorstore")\nemb = embedding_functions.SentenceTransformerEmbeddingFunction(\n    model_name="intfloat/multilingual-e5-large"\n)\ncol = client.get_or_create_collection(\n    name="kb", embedding_function=emb, metadata={"hnsw:space": "cosine"}\n)\n\n# chunks: List[str]  (önceki adımdan)\ncol.add(documents=chunks, ids=[f"c{i}" for i in range(len(chunks))])',
        },
      },
      {
        title: {
          tr: 'Retrieval: en iyi k parçayı getir',
          en: 'Retrieval: fetch the top-k chunks',
        },
        body: {
          tr: 'Kullanıcı sorusu embedding\'e çevrilir, vector DB\'de en yakın k parça getirilir. k=4-8 tipik bir başlangıçtır; metadata filtreleri (tarih, kaynak, etiket) retrieval precision\'ı ciddi artırır.',
          en: 'The user question is embedded, and the top-k closest chunks are fetched from the vector DB. k=4-8 is a typical start; metadata filters (date, source, tag) significantly boost precision.',
        },
        codeBlock: {
          lang: 'python',
          code: 'def retrieve(question: str, k: int = 5):\n    res = col.query(\n        query_texts=[question],\n        n_results=k,\n        where={"source": "product-handbook"},  # opsiyonel filtre\n    )\n    return res["documents"][0]\n\ncontext = retrieve("İade politikası nedir?")\nprint("\\n---\\n".join(context))',
        },
      },
      {
        title: {
          tr: 'System prompt + context birleştir',
          en: 'Combine system prompt with context',
        },
        body: {
          tr: 'İyi bir system prompt, modele "sadece verilen bağlamdan cevap ver, bilmediğinde \'bilmiyorum\' de" der. Bu, halüsinasyonu azaltır. Retrieved parçalar numaralı bir şekilde prompt\'a eklenir; kaynak referansı için kullanılır.',
          en: 'A solid system prompt tells the model: "answer only from the given context; if you do not know, say so". This cuts hallucinations. Retrieved chunks are added numbered so they can be cited as sources.',
        },
        codeBlock: {
          lang: 'python',
          code: 'SYSTEM = """Sen bir yardımcı asistansın. Yalnızca aşağıdaki bağlamdan cevap ver.\nEğer cevap bağlamda yoksa \'bilmiyorum\' de. Cevabını sonunda [1], [2] gibi kaynak numaraları ile destekle."""\n\ndef build_prompt(question: str, context_chunks):\n    ctx = "\\n\\n".join(f"[{i+1}] {c}" for i, c in enumerate(context_chunks))\n    return f"{SYSTEM}\\n\\nBağlam:\\n{ctx}\\n\\nSoru: {question}"',
        },
      },
      {
        title: {
          tr: 'LLM ile yanıt üret',
          en: 'Generate the answer with the LLM',
        },
        body: {
          tr: 'Bu adımda herhangi bir OpenAI uyumlu uç nokta (Ollama, vLLM, OpenAI, Anthropic) kullanılabilir. Sonraki adımda retrieval kalitesini ölçeceğiz — bu, RAG\'in darboğazıdır.',
          en: 'At this step, any OpenAI-compatible endpoint works (Ollama, vLLM, OpenAI, Anthropic). In the next step you will measure retrieval quality — that is the RAG bottleneck.',
        },
        codeBlock: {
          lang: 'python',
          code: 'from openai import OpenAI\n\nclient = OpenAI(base_url="http://127.0.0.1:11434/v1", api_key="EMPTY")\n\ndef answer(question: str) -> str:\n    chunks = retrieve(question, k=5)\n    prompt = build_prompt(question, chunks)\n    resp = client.chat.completions.create(\n        model="llama3.2:3b",\n        messages=[{"role": "user", "content": prompt}],\n        temperature=0,  # RAG için deterministik tercih edilir\n    )\n    return resp.choices[0].message.content\n\nprint(answer("İade politikası nedir?"))',
        },
      },
      {
        title: {
          tr: 'Değerlendir: retrieval + cevap kalitesi',
          en: 'Evaluate: retrieval + answer quality',
        },
        body: {
          tr: 'Değerlendirme iki katmanda yapılır: (1) retrieval — getirilen parçalar gerçekten doğru mu (Recall@k, MRR); (2) cevap — model getirilen bağlamdan doğru cevabı üretiyor mu (human eval veya LLM-as-judge). Bu ölçümler olmadan RAG iyileştirmeleri "hissiyat"tan ibaret kalır.',
          en: 'Evaluation has two layers: (1) retrieval — are the fetched chunks actually relevant (Recall@k, MRR); (2) answer — does the model produce a correct answer from the context (human eval or LLM-as-judge). Without these, RAG improvements stay at the "vibes" level.',
        },
        codeBlock: {
          lang: 'python',
          code: '# Basit bir Recall@k skoru\ndef recall_at_k(retrieved, gold_keywords, k=5):\n    top = " ".join(retrieved[:k]).lower()\n    hits = sum(kw.lower() in top for kw in gold_keywords)\n    return hits / len(gold_keywords)\n\n# gold_keywords: test setinden her soru için beklenen anahtar kelimeler\n# print(recall_at_k(retrieved_chunks, ["iade", "14 gün", "kargo"]))',
        },
      },
    ],
    relatedConcepts: ['rag', 'embedding', 'vector-db', 'prompt', 'system-prompt'],
    relatedSolutions: ['open-webui'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Ders 5 — Tarayıcıda LLM çalıştır (WebLLM)
  // ═══════════════════════════════════════════════════════════

  {
    slug: 'browser-llm-webllm',
    title: {
      tr: 'Tarayıcıda LLM çalıştır',
      en: 'Run an LLM in the browser',
    },
    summary: {
      tr: 'WebGPU ile kullanıcının tarayıcısında, sunucu olmadan küçük bir LLM çalıştır.',
      en: 'Run a small LLM in the user\'s browser via WebGPU, with no server.',
    },
    level: 'starter',
    durationMin: 10,
    steps: [
      {
        title: {
          tr: 'WebGPU tarayıcı desteğini kontrol et',
          en: 'Check WebGPU browser support',
        },
        body: {
          tr: 'WebGPU, modern Chrome/Edge\'in varsayılan desteğidir; Firefox ve Safari hâlâ geliştirme aşamasında. navigator.gpu mevcutsa GPU\'ya erişim açıktır; bu olmadan model sadece CPU\'da yavaş çalışır.',
          en: 'WebGPU is enabled by default in modern Chrome/Edge; Firefox and Safari are still maturing. If navigator.gpu is present, the GPU is reachable; without it, the model falls back to slow CPU inference.',
        },
        codeBlock: {
          lang: 'ts',
          code: '// Hızlı WebGPU desteği kontrolü\nconst ok = !!(navigator as any).gpu;\nconsole.log("WebGPU destekleniyor mu?", ok);\n\nif (ok) {\n  const adapter = await (navigator as any).gpu.requestAdapter();\n  console.log("Adapter:", adapter ? "OK" : "Yok");\n}',
        },
        tryIt: {
          label: {
            tr: 'Tarayıcında WebGPU durumunu gör',
            en: 'See WebGPU status in your browser',
          },
          href: 'https://webgpureport.org/',
        },
      },
      {
        title: {
          tr: 'WebLLM paketini ekle',
          en: 'Add the WebLLM package',
        },
        body: {
          tr: 'WebLLM, MLC LLM\'in TVM derleyici altyapısı üzerine kurulu tarayıcı SDK\'sıdır. npm veya CDN üzerinden eklenir. Model ağırlıkları tarayıcı önbelleğine indirilir, sonraki ziyaretlerde tekrar indirilmez.',
          en: 'WebLLM is the browser SDK built on MLC LLM\'s TVM compiler stack. It can be added via npm or a CDN. Model weights are cached by the browser, so subsequent visits skip the download.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# Vite/Webpack projesi için\nnpm i @mlc-ai/web-llm',
        },
      },
      {
        title: {
          tr: 'Model seç ve ilk yanıt',
          en: 'Choose a model and get the first reply',
        },
        body: {
          tr: 'Llama-3.2-1B veya Phi-3.5-mini gibi 1-4B modeller, çoğu laptop\'ta rahat çalışır. İlk çalıştırmada model indirilir; sonrasında önbellekten yüklenir. WebLLM OpenAI uyumlu bir API sunar.',
          en: '1-4B models like Llama-3.2-1B or Phi-3.5-mini run comfortably on most laptops. The first run downloads the model; later runs load it from cache. WebLLM exposes an OpenAI-compatible API.',
        },
        codeBlock: {
          lang: 'ts',
          code: 'import { CreateMLCEngine } from "@mlc-ai/web-llm";\n\nconst initProgressCallback = (p: any) => console.log("init:", p);\n\nconst engine = await CreateMLCEngine("Llama-3.2-1B-Instruct-q4f16_1-MLC", {\n  initProgressCallback,\n});\n\nconst reply = await engine.chat.completions.create({\n  messages: [{ role: "user", content: "Merhaba, kendini tanıt." }],\n});\nconsole.log(reply.choices[0].message.content);',
        },
      },
      {
        title: {
          tr: 'Streaming ile canlı yazım hissi',
          en: 'Streaming for a live typing feel',
        },
        body: {
          tr: '`stream: true` ile token\'lar geldikçe arayüzde gösterilir. context window, modelin tek oturumda tutabildiği toplam token\'dır; tarayıcıda bu genelde 4-8K civarındadır, bu yüzden uzun geçmişleri özetlemek gerekir.',
          en: 'With `stream: true` tokens appear in the UI as they arrive. The context window is the total tokens the model can keep in one session; in the browser it is usually 4-8K, so you should summarize long histories.',
        },
        codeBlock: {
          lang: 'ts',
          code: 'const stream = await engine.chat.completions.create({\n  stream: true,\n  messages: [{ role: "user", content: "Bana kısa bir hikaye anlat." }],\n});\n\nfor await (const chunk of stream) {\n  const delta = chunk.choices[0]?.delta?.content ?? "";\n  if (delta) document.body.append(delta);\n}',
        },
      },
    ],
    relatedConcepts: ['webgpu', 'embedding', 'context-window'],
    relatedSolutions: ['webllm', 'mlc-llm'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Ders 6 — GPU karşılaştırması: Apple Silicon vs NVIDIA vs NPU
  // ═══════════════════════════════════════════════════════════

  {
    slug: 'gpu-comparison',
    title: {
      tr: 'GPU karşılaştırması: Apple Silicon vs NVIDIA vs NPU',
      en: 'GPU comparison: Apple Silicon vs NVIDIA vs NPU',
    },
    summary: {
      tr: 'Üç ekosistemi tanı, kıyasla; senaryona göre doğru donanımı seç.',
      en: 'Get to know three ecosystems, compare them, and pick the right hardware for the job.',
    },
    level: 'starter',
    durationMin: 10,
    steps: [
      {
        title: {
          tr: 'Üç ekosistemi tanı',
          en: 'Meet the three ecosystems',
        },
        body: {
          tr: 'Apple Silicon (M1/M2/M3/M4) unified memory kullanır; CPU ve GPU aynı RAM havuzunu paylaşır, bu da büyük modelleri tek bir çipte çalıştırabilir. NVIDIA (CUDA) sunucu sınıfıdır; dünyanın en geniş LLM yazılım ekosistemi buradadır. NPU ise düşük güçlü, inference odaklı yardımcı işlemcidir; telefonlarda ve yeni nesil Intel/AMD CPU\'larda bulunur.',
          en: 'Apple Silicon (M1/M2/M3/M4) uses unified memory; CPU and GPU share the same RAM pool, letting large models run on a single chip. NVIDIA (CUDA) is server-class with the broadest LLM software ecosystem. NPU is a low-power, inference-focused accelerator found on phones and on newer Intel/AMD CPUs.',
        },
      },
      {
        title: {
          tr: 'Performans / Watt oranı',
          en: 'Performance per watt',
        },
        body: {
          tr: 'Apple Silicon, watt başına performansta öne çıkar; 70B+ modelleri sessizce sohbet hızında çalıştırabilir. NVIDIA H100/B200 ham throughput\'ta kazanır, ama veri merkezi gücü ve soğutma gerektirir. NPU, miliwatt seviyesinde çalışır; sadece 1-3B nicellenmiş modeller için uygundur.',
          en: 'Apple Silicon leads on performance per watt and can quietly run 70B+ models at chat speed. NVIDIA H100/B200 wins on raw throughput but needs data-center power and cooling. NPUs run at the milliwatt level; they only fit 1-3B quantized models.',
        },
      },
      {
        title: {
          tr: 'Yazılım ekosistemi',
          en: 'Software ecosystem',
        },
        body: {
          tr: 'NVIDIA tarafında vLLM, SGLang, TensorRT-LLM, TGI, ExLlamaV2/V3; Apple tarafında mlx-lm, llama.cpp Metal backend; NPU tarafında OpenVINO GenAI, ONNX Runtime GenAI, Core ML. Yeni bir motor denemeden önce donanımınızın destek listesini kontrol edin.',
          en: 'On NVIDIA: vLLM, SGLang, TensorRT-LLM, TGI, ExLlamaV2/V3. On Apple: mlx-lm, llama.cpp Metal backend. On NPU: OpenVINO GenAI, ONNX Runtime GenAI, Core ML. Before trying a new engine, check the support list for your hardware.',
        },
        codeBlock: {
          lang: 'bash',
          code: '#!/bin/bash\n# Hangi donanımda olduğunuzu anlamak için\nuname -a\nsysctl -n machdep.cpu.brand_string 2>/dev/null   # Apple\nnvidia-smi 2>/dev/null || echo "NVIDIA GPU yok"   # NVIDIA\nls /sys/class/ 2>/dev/null | grep -E "npu|dsp"     # NPU',
        },
      },
      {
        title: {
          tr: 'Maliyet',
          en: 'Cost',
        },
        body: {
          tr: 'Bir kere alınan Mac, geliştirici için en düşük toplam sahip olma maliyetini (TCO) sunar. NVIDIA H100 kiralama veya satın alma yüz binlerce dolar seviyesindedir; bulut API ise token başına ücretlendirilir. NPU genelde çipin içinde gelir, ayrı maliyet yoktur.',
          en: 'A one-time Mac purchase offers the lowest total cost of ownership (TCO) for a developer. NVIDIA H100 rental or purchase is in the hundreds of thousands of dollars; cloud APIs charge per token. NPU is usually built into the chip with no extra cost.',
        },
      },
      {
        title: {
          tr: 'Ne zaman hangisini seç',
          en: 'When to pick which',
        },
        body: {
          tr: 'Bireysel geliştirme ve küçük iş yükleri için Apple Silicon yeterlidir. Yüksek eşzamanlı üretim ve büyük modeller için NVIDIA. Mobil/edge veya ultra düşük güç senaryoları için NPU. Hibrit senaryolarda (ör. geliştirme Mac, üretim NVIDIA) OpenAI uyumlu API standardı geçişi kolaylaştırır.',
          en: 'For individual development and small workloads, Apple Silicon is enough. For high-concurrency production and large models, NVIDIA. For mobile/edge or ultra-low-power, NPU. In hybrid setups (e.g. dev on Mac, prod on NVIDIA), the OpenAI-compatible API standard makes the switch easy.',
        },
      },
      {
        title: {
          tr: 'Hibrit senaryolar',
          en: 'Hybrid scenarios',
        },
        body: {
          tr: 'Pratik bir akış: geliştirme sırasında mlx-lm veya llama.cpp (Mac) ile hızlı iterasyon; üretimde vLLM veya SGLang (NVIDIA) ile yüksek verim; mobil istemcide WebLLM veya ExecuTorch (NPU). Aynı GGUF/SafeTensors formatı ile birden fazla motor arasında geçiş yapılabilir.',
          en: 'A practical flow: iterate fast on a Mac with mlx-lm or llama.cpp during development; in production, serve at high throughput with vLLM or SGLang on NVIDIA; on mobile clients, run WebLLM or ExecuTorch on NPU. The same GGUF/SafeTensors format lets you hop between engines.',
        },
      },
    ],
    relatedConcepts: ['cuda', 'npu', 'apple-silicon', 'onnx', 'quantization'],
    relatedSolutions: ['mlx-lm', 'openvino-genai', 'onnx-runtime-genai', 'vllm', 'tensorrt-llm'],
  },
]
