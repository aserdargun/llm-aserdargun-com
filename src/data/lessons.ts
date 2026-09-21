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
        "title": {
          "tr": "Ollama'yı kur",
          "en": "Install Ollama"
        },
        "body": {
          "tr": "Resmî macOS uygulamasını kurup açın veya Homebrew CLI yolunu kullanın. CLI kurulumundan sonra model indirmeden önce ayrı terminalde `ollama serve` çalıştırın. Uygulama servisi zaten başlattıysa ikinci bir servis açmayın.",
          "en": "Install and open the official macOS app, or use the Homebrew CLI path. With the CLI installation, run `ollama serve` in a separate terminal before downloading a model. If the app already started the service, reuse it."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "brew install ollama\nollama --version\n\n# CLI installation: keep this terminal open.\n# Skip if the Ollama app is already serving.\nollama serve"
        }
      },
      {
        "title": {
          "tr": "İlk modeli indir",
          "en": "Pull your first model"
        },
        "body": {
          "tr": "`ollama pull` komutu, modeli ~/.ollama/models altına indirir. 3B civarı küçük bir model (örn. llama3.2:3b) ile başlamak hızlıdır; 8B de M2+ cihazlarda rahat çalışır.",
          "en": "`ollama pull` downloads the model under ~/.ollama/models. Start with a small model such as llama3.2:3b, then measure memory use and generation speed on your own device before scaling up."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "#!/bin/bash\n# Modeli indir ve yerel kaydı doğrula\nollama pull llama3.2:3b\nollama list"
        }
      },
      {
        "title": {
          "tr": "Terminalden sohbet başlat",
          "en": "Start a chat from the terminal"
        },
        "body": {
          "tr": "`ollama run` interaktif bir sohbet açar; çıkmak için /bye yaz. Bu, modelin metni tokenize edip yanıt ürettiği en basit deneyimdir; context window ve sampling gibi kavramları görmek için iyi bir başlangıçtır.",
          "en": "`ollama run` opens an interactive chat; type /bye to quit. This is the simplest way to see the model tokenize text and generate a reply — a good starting point to observe context window and sampling in action."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "#!/bin/bash\n# Sohbet başlat — tokenizasyon ve sampling gözlemlenebilir\nollama run llama3.2:3b"
        },
        "tryIt": {
          "label": {
            "tr": "Ollama'nın model kütüphanesine göz at",
            "en": "Browse the Ollama model library"
          },
          "href": "https://ollama.com/library"
        }
      },
      {
        "title": {
          "tr": "Yerel API'yi aç",
          "en": "Open the local API"
        },
        "body": {
          "tr": "İlk adımda başlatılan servis varsayılan olarak 127.0.0.1:11434 üzerinde dinler. Yeni terminalden sağlığı kontrol edin. `OLLAMA_HOST` dinleme adresini değiştirir; dış erişim açılacaksa kimlik doğrulama ve ağ politikası ayrıca tasarlanmalıdır.",
          "en": "The service started in step one listens on 127.0.0.1:11434 by default. Check it from another terminal. OLLAMA_HOST changes its bind address; external access needs separate authentication and network policy."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "curl --fail --silent --show-error http://127.0.0.1:11434/api/tags"
        }
      },
      {
        "title": {
          "tr": "OpenAI uyumlu uç noktayı test et",
          "en": "Test the OpenAI-compatible endpoint"
        },
        "body": {
          "tr": "Bu örnek yerel OpenAI uyumlu sohbet uç noktasını dener. İstemciyi taşırken model adı, kimlik doğrulama ve desteklenen parametreler kontrol edilir. İleri özelliklerin tüm sağlayıcılarda eşdeğer olduğu varsayılmaz.",
          "en": "This example tests the local OpenAI-compatible chat endpoint. When migrating a client, check model names, authentication and supported parameters. Advanced features are not assumed equivalent across providers."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "#!/bin/bash\n# OpenAI uyumlu chat completion testi\ncurl -s http://127.0.0.1:11434/v1/chat/completions \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"model\": \"llama3.2:3b\",\n    \"messages\": [{\"role\": \"user\", \"content\": \"Merhaba, kendini tanıt.\"}]\n  }'"
        }
      }
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
        "title": {
          "tr": "NVIDIA GPU + CUDA hazırlığı",
          "en": "Prepare NVIDIA GPU + CUDA"
        },
        "body": {
          "tr": "Bu ders NVIDIA/Linux yolunu örnekler; vLLM’in başka donanım yolları da vardır. Kullanacağınız sürümün Python, sürücü, PyTorch ve CUDA gereksinimlerini kontrol edin. Hazır wheel için yerel CUDA derleyicisi her zaman gerekli değildir. Belleği ağırlık, KV, bağlam ve eşzamanlılıkla hesaplayın.",
          "en": "This lesson illustrates the NVIDIA/Linux path; vLLM also has other hardware paths. Check Python, driver, PyTorch and CUDA requirements for the chosen release. Prebuilt wheels do not always need a local CUDA compiler. Budget weights, KV, context and concurrency together."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "nvidia-smi\npython3 --version"
        },
        "tryIt": {
          "label": {
            "tr": "vLLM kurulum rehberi",
            "en": "vLLM installation guide"
          },
          "href": "https://docs.vllm.ai/en/latest/getting_started/installation.html"
        }
      },
      {
        "title": {
          "tr": "vLLM'i kur",
          "en": "Install vLLM"
        },
        "body": {
          "tr": "vLLM'i desteklenen Python, PyTorch ve hızlandırıcı kombinasyonuyla kur. Paket ve donanım matrisi sürümle değişebildiği için komutu çalıştırmadan önce güncel kurulum sayfasını kontrol et. Sunucu continuous batching ve sayfalı KV önbelleği gibi üretim odaklı mekanizmaları yönetir.",
          "en": "Install vLLM with a supported Python, PyTorch, and accelerator combination. Package and hardware matrices change by release, so check the current installation page before running the command. The server manages production-oriented mechanisms such as continuous batching and paged KV cache."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "#!/bin/bash\n# Sanal ortam ve vLLM kurulumu\npython3 -m venv vllm-venv && source vllm-venv/bin/activate\npip install --upgrade pip\npip install vllm"
        }
      },
      {
        "title": {
          "tr": "vLLM sunucusunu başlat",
          "en": "Start the vLLM server"
        },
        "body": {
          "tr": "Önce yerel tek GPU denemesi yapın. `<MODEL_NAME>` yerine erişebildiğiniz ve belleğe sığan bir model kimliği yazın. 8192 token ve %90 bellek kullanımı örnek ayarlardır. 127.0.0.1 yalnızca yerelden erişilir; üretim için kimlik doğrulama, TLS, kota ve yük testi ekleyin.",
          "en": "Start with a local single-GPU trial. Replace <MODEL_NAME> with an accessible model that fits memory. The 8192-token and 90% memory settings are illustrative. Binding to 127.0.0.1 limits access to the local machine; production needs authentication, TLS, quotas and load testing."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "vllm serve <MODEL_NAME> \\\n  --host 127.0.0.1 --port 8000 \\\n  --max-model-len 8192 \\\n  --gpu-memory-utilization 0.90"
        }
      },
      {
        "title": {
          "tr": "OpenAI uyumlu /v1/chat/completions testi",
          "en": "Test OpenAI-compatible /v1/chat/completions"
        },
        "body": {
          "tr": "Temel sohbet çağrısı uyumlu istemciyle yapılabilir. Buradaki EMPTY değeri yalnızca anahtar doğrulaması açılmamış yerel örnek içindir; vLLM API anahtarı denetimini destekler. Üretim sunucusunun kimlik doğrulamasını ve özellik uyumunu ayrıca test edin.",
          "en": "A compatible client can make basic chat calls. EMPTY is only for this local example without key checks; vLLM supports API-key validation. Test production authentication and feature compatibility separately."
        },
        "codeBlock": {
          "lang": "python",
          "code": "# pip install openai\nfrom openai import OpenAI\n\nclient = OpenAI(\n    base_url=\"http://127.0.0.1:8000/v1\",\n    api_key=\"EMPTY\",  # Local example without API-key validation\n)\n\nresp = client.chat.completions.create(\n    model=\"<MODEL_NAME>\",\n    messages=[{\"role\": \"user\", \"content\": \"Tek cümlede PagedAttention'ı açıkla.\"}],\n)\nprint(resp.choices[0].message.content)"
        }
      },
      {
        "title": {
          "tr": "Streaming yanıt",
          "en": "Streaming responses"
        },
        "body": {
          "tr": "Streaming parçaları geldikçe gösterir; ilk token gecikmesini veya toplam hızı garanti etmez. Kuyruk, ağ, prefill ve batching TTFT/ITL dağılımlarını etkiler. Gecikme ve verim dengesini hedef yükte ölçün.",
          "en": "Streaming displays chunks as they arrive; it guarantees neither low first-token latency nor total throughput. Queueing, network, prefill and batching affect TTFT/ITL distributions. Measure the latency-throughput trade-off at the target load."
        },
        "codeBlock": {
          "lang": "python",
          "code": "from openai import OpenAI\n\nclient = OpenAI(base_url=\"http://127.0.0.1:8000/v1\", api_key=\"EMPTY\")\n\nstream = client.chat.completions.create(\n    model=\"<MODEL_NAME>\",\n    messages=[{\"role\": \"user\", \"content\": \"Bana kısa bir hikaye anlat.\"}],\n    stream=True,\n)\nfor chunk in stream:\n    if not chunk.choices:\n        continue\n    delta = chunk.choices[0].delta.content\n    if delta:\n        print(delta, end=\"\", flush=True)"
        }
      },
      {
        "title": {
          "tr": "Basit bir Nginx reverse proxy",
          "en": "A simple Nginx reverse proxy"
        },
        "body": {
          "tr": "Bu Nginx parçası yalnızca streaming proxy iskeletidir; çalışır üretim yapılandırması değildir. Sertifika yolları, kimlik doğrulama ve rate-limit yapılandırmasını ekleyin. `proxy_buffering off` SSE parçalarının tamponda beklemesini azaltır; zaman aşımı değerlerini iş yüküne göre seçin.",
          "en": "This Nginx fragment is a streaming proxy skeleton, not a ready production configuration. Add certificate paths, authentication and rate-limit configuration. proxy_buffering off reduces buffering of SSE chunks; choose timeouts for the workload."
        },
        "codeBlock": {
          "lang": "ts",
          "code": "# /etc/nginx/conf.d/llm.conf\nserver {\n  listen 443 ssl http2;\n  server_name llm.example.com;\n\n  # SSL sertifikalarını buraya ekle\n  # ssl_certificate     ...;\n  # ssl_certificate_key ...;\n\n  location / {\n    proxy_pass         http://127.0.0.1:8000;\n    proxy_http_version 1.1;\n    proxy_set_header   Host $host;\n    proxy_set_header   Connection \"\";\n    proxy_buffering    off;       # streaming için kritik\n    proxy_read_timeout 600s;\n    proxy_send_timeout 600s;\n  }\n\n  location = /healthz {\n    proxy_pass http://127.0.0.1:8000/health;\n  }\n}"
        }
      }
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
        "title": {
          "tr": "Orijinal FP16 modeli seç",
          "en": "Pick the original FP16 model"
        },
        "body": {
          "tr": "Kaynak modelin ağırlık veri tipini model kartından doğrulayın ve model revizyonunu sabitleyin. Aşağıdaki şablonda HF_MODEL_ID ve HF_REVISION yerine erişim hakkınız olan model ile commit/revizyonunu girin; kapalı erişimli modeller ayrıca giriş gerektirebilir.",
          "en": "Verify source-weight precision in the model card and pin its revision. Replace HF_MODEL_ID and HF_REVISION below with an accessible model and commit/revision; gated models may require authentication."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "pip install huggingface_hub\nhf download <HF_MODEL_ID> --revision <HF_REVISION> \\\n  --local-dir ./models/base-fp16"
        }
      },
      {
        "title": {
          "tr": "Format seç: GGUF mi AWQ mu?",
          "en": "Choose a format: GGUF or AWQ?"
        },
        "body": {
          "tr": "GGUF bir model saklama biçimidir; AWQ ise nicemleme yöntemidir. GGUF içindeki nicemleme türünü veya AWQ çıktısını hedef motor ve donanımın destek matrisiyle eşleştirin. Biçim adı tek başına hız veya kalite kanıtı değildir.",
          "en": "GGUF is a model storage format; AWQ is a quantization method. Match the quantization type inside GGUF or the AWQ output to the target engine and hardware support matrix. A format name alone does not prove speed or quality."
        }
      },
      {
        "title": {
          "tr": "llama.cpp ile GGUF üret",
          "en": "Build GGUF with llama.cpp"
        },
        "body": {
          "tr": "Dönüştürme ve nicemleme ayrı adımlardır: önce FP16 GGUF üretin, sonra llama-quantize ile Q4_K_M deneyin. Aşağıdaki komutlar önceki adımla aynı ana dizinden başlar. llama.cpp revizyonunu deney kaydında tutun; destek ve kalite model bazında doğrulanır.",
          "en": "Conversion and quantization are separate steps: first create FP16 GGUF, then try Q4_K_M with llama-quantize. These commands start in the same parent directory as the preceding step. Record the llama.cpp revision in the experiment; validate support and quality per model."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "git clone https://github.com/ggml-org/llama.cpp\ncd llama.cpp\ngit rev-parse HEAD\npython3 -m pip install -r requirements.txt\ncmake -B build\ncmake --build build --config Release -j\npython3 convert_hf_to_gguf.py ../models/base-fp16 \\\n  --outfile ../models/model-f16.gguf --outtype f16\n./build/bin/llama-quantize ../models/model-f16.gguf \\\n  ../models/model-Q4_K_M.gguf Q4_K_M"
        }
      },
      {
        "title": {
          "tr": "AWQ için güncel araç yolunu kontrol et",
          "en": "Check the current tooling path for AWQ"
        },
        "body": {
          "tr": "AutoAWQ deposu arşivlendi ve bakım dışı olduğunu bildiriyor. Yeni bir kurulumda eski pip tarifini varsayılan kabul etmeyin. Projenin işaret ettiği llm-compressor örneklerinden hedef modelinize uygun tarifi seçin; kalibrasyon verisi, çıktı biçimi ve motor sürümünü birlikte sabitleyin.",
          "en": "The AutoAWQ repository is archived and states that maintenance has ended. Do not treat the old pip recipe as a default for new installations. Use the linked llm-compressor examples to select a recipe for your model; pin calibration data, output format and serving release together."
        },
        "codeBlock": {
          "lang": "text",
          "code": "AWQ checklist: model architecture + calibration data + output format\n+ quantizer revision + target serving release + quality evaluation"
        },
        "tryIt": {
          "label": {
            "tr": "llm-compressor örneklerini aç",
            "en": "Open llm-compressor examples"
          },
          "href": "https://github.com/vllm-project/llm-compressor/tree/main/examples"
        }
      },
      {
        "title": {
          "tr": "Kalite kontrol: perplexity",
          "en": "Quality control: perplexity"
        },
        "body": {
          "tr": "Perplexity karşılaştırmasını aynı metin, tokenizer ve bağlam ayarlarıyla yapın. `<EVAL_TEXT_PATH>` yerine izinli değerlendirme dosyanızı yazın. Komut önceki adımdaki llama.cpp dizininde çalışır; FP16 modelle aynı testi tekrarlayın. Gerçek görev kalitesini ayrıca ölçün.",
          "en": "Compare perplexity using identical text, tokenizer and context settings. Replace <EVAL_TEXT_PATH> with your permitted evaluation file. Run from the llama.cpp directory used earlier, then repeat with the FP16 model. Evaluate real-task quality separately."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "./build/bin/llama-perplexity \\\n  -m ../models/model-Q4_K_M.gguf \\\n  -f <EVAL_TEXT_PATH> -c 512 -b 512"
        }
      },
      {
        "title": {
          "tr": "Boyut ve hız karşılaştırması",
          "en": "Compare size and speed"
        },
        "body": {
          "tr": "Disk boyutu, tepe bellek kullanımı, token/s ve görev kalitesi birlikte ölçüldüğünde nicemlemenin gerçek kazancı görülür. INT4 ham ağırlık belleğini azaltır; hız ve kalite etkisi model, yöntem ve çekirdeğe göre değişir.",
          "en": "Quantization’s real impact appears only when on-disk size, peak memory, tokens per second, and task quality are measured together. INT4 reduces raw weight memory; speed and quality effects vary by model, method, and kernel."
        }
      }
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
        "title": {
          "tr": "Belgeleri parçala",
          "en": "Chunk your documents"
        },
        "body": {
          "tr": "Belgeyi anlamlı erişim parçalarına ayırın. Bu örnekte chunk_size=800 ve chunk_overlap=120 karakterdir, token değildir. Değerler örnektir; belge yapısı, tokenizer, model sınırı ve erişim değerlendirmesine göre seçilir. Python adımlarını aynı dosyada veya oturumda sırayla çalıştırın.",
          "en": "Split documents into meaningful retrieval units. Here chunk_size=800 and chunk_overlap=120 are characters, not tokens. These are illustrative values chosen against document structure, tokenizer, model limits and retrieval evaluation. Run the Python steps in order in one file or session."
        },
        "codeBlock": {
          "lang": "python",
          "code": "# pip install langchain-text-splitters\nfrom langchain_text_splitters import RecursiveCharacterTextSplitter\n\nwith open(\"docs/product-handbook.md\", \"r\", encoding=\"utf-8\") as f:\n    text = f.read()\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=800, chunk_overlap=120,\n    separators=[\"\\n\\n\", \"\\n\", \".\", \" \"],\n)\nchunks = splitter.split_text(text)\nprint(f\"{len(chunks)} parça üretildi\")"
        }
      },
      {
        "title": {
          "tr": "Embedding modeli seç",
          "en": "Pick an embedding model"
        },
        "body": {
          "tr": "Bu örnek multilingual-e5-large kullanır; kalite üstünlüğü iddiası değildir. Model kartı sorgulara query:, belgelere passage: öneki eklenmesini ister. Sonraki adımlarda aynı modeli ve normalize edilmiş embedding vektörlerini kullanın. İndirilen model revizyonunu deney kaydınıza ekleyin.",
          "en": "This example uses multilingual-e5-large without claiming superior quality. Its model card requires query: prefixes for queries and passage: prefixes for documents. Reuse the same model and normalized embeddings below. Record the downloaded model revision in the experiment."
        },
        "codeBlock": {
          "lang": "python",
          "code": "# pip install sentence-transformers\nfrom sentence_transformers import SentenceTransformer\nencoder = SentenceTransformer(\"intfloat/multilingual-e5-large\")\nprint(encoder.encode([\"query: deneme\"], normalize_embeddings=True).shape)"
        }
      },
      {
        "title": {
          "tr": "Vector DB seç ve parçaları yükle",
          "en": "Pick a vector DB and ingest chunks"
        },
        "body": {
          "tr": "Örnek yerel Chroma deposuna parçaları, normalize vektörleri ve source metadata alanını birlikte yazar. ANN indekslerinin hız/recall dengesi veri ve ayarlara bağlıdır; her indeks için O(log N) garantisi yoktur. Tekrar çalıştırmada upsert aynı kimlikleri günceller. Model değişirse yeni koleksiyon ve yeniden embedding gerekir.",
          "en": "This example stores chunks, normalized vectors and source metadata in local Chroma. ANN speed/recall trade-offs depend on data and settings; not every index guarantees O(log N). Upsert updates the same IDs on repeated runs. Changing the model requires a new collection and re-embedding."
        },
        "codeBlock": {
          "lang": "python",
          "code": "# pip install chromadb\nimport chromadb\nclient = chromadb.PersistentClient(path=\"./vectorstore\")\ncol = client.get_or_create_collection(name=\"kb-e5-v1\", embedding_function=None)\nvectors = encoder.encode(\n    [\"passage: \" + chunk for chunk in chunks], normalize_embeddings=True\n).tolist()\ncol.upsert(\n    documents=chunks, embeddings=vectors,\n    ids=[f\"c{i}\" for i in range(len(chunks))],\n    metadatas=[{\"source\": \"product-handbook\"} for _ in chunks],\n)"
        }
      },
      {
        "title": {
          "tr": "Retrieval: en iyi k parçayı getir",
          "en": "Retrieval: fetch the top-k chunks"
        },
        "body": {
          "tr": "Sorguyu query: önekiyle aynı modelde gömün. Örnekte k=5 bir başlangıç varsayımıdır; source filtresi önceki adımda yazılan metadata alanını kullanır. Top-k ve filtreleri hedef sorgu kümesinde doğrulayın.",
          "en": "Embed the query with the query: prefix using the same model. Here k=5 is an initial assumption; the source filter uses metadata written in the previous step. Evaluate top-k and filters on the target query set."
        },
        "codeBlock": {
          "lang": "python",
          "code": "def retrieve(question: str, k: int = 5):\n    count = col.count()\n    if count == 0:\n        return []\n    vector = encoder.encode(\n        [\"query: \" + question], normalize_embeddings=True\n    ).tolist()\n    result = col.query(\n        query_embeddings=vector, n_results=min(k, count),\n        where={\"source\": \"product-handbook\"},\n    )\n    return result[\"documents\"][0]\n\ncontext = retrieve(\"İade politikası nedir?\")\nprint(\"\\n---\\n\".join(context))"
        }
      },
      {
        "title": {
          "tr": "System prompt + context birleştir",
          "en": "Combine system prompt with context"
        },
        "body": {
          "tr": "İstemde yanıtın hangi belge parçalarına dayandığını gösterin ve eksik bilgi durumunu belirtin. Erişilen belgeler güvenilmeyen veridir; içlerindeki talimatlar araç yetkisi vermez. Kaynak numaraları gerçek dayanak açısından denetlenmelidir; istem tek başına doğruluk veya güvenlik sınırı değildir.",
          "en": "Make supporting document chunks and missing-information behavior explicit in the prompt. Retrieved documents are untrusted data; instructions inside them do not grant tool permissions. Verify that citation numbers actually support the answer; prompting alone is not a correctness or security boundary."
        },
        "codeBlock": {
          "lang": "python",
          "code": "SYSTEM = \"\"\"Sen bir yardımcı asistansın. Yalnızca aşağıdaki bağlamdan cevap ver.\nEğer cevap bağlamda yoksa 'bilmiyorum' de. Cevabını sonunda [1], [2] gibi kaynak numaraları ile destekle.\"\"\"\n\ndef build_prompt(question: str, context_chunks):\n    ctx = \"\\n\\n\".join(f\"[{i+1}] {c}\" for i, c in enumerate(context_chunks))\n    return f\"{SYSTEM}\\n\\nBağlam:\\n{ctx}\\n\\nSoru: {question}\""
        }
      },
      {
        "title": {
          "tr": "LLM ile yanıt üret",
          "en": "Generate the answer with the LLM"
        },
        "body": {
          "tr": "Örnek, ilk dersteki yerel Ollama servisini ve indirilmiş llama3.2:3b modelini kullanır. Başka sağlayıcıya geçerken uç nokta ve özellik uyumunu kontrol edin. temperature=0 tek başına aynı çıktı veya doğru yanıt garantisi değildir.",
          "en": "This example uses the local Ollama service and downloaded llama3.2:3b model from the first lesson. Check endpoint and feature compatibility before switching providers. temperature=0 alone guarantees neither identical output nor correctness."
        },
        "codeBlock": {
          "lang": "python",
          "code": "from openai import OpenAI\n\nclient = OpenAI(base_url=\"http://127.0.0.1:11434/v1\", api_key=\"EMPTY\")\n\ndef answer(question: str) -> str:\n    chunks = retrieve(question, k=5)\n    prompt = build_prompt(question, chunks)\n    resp = client.chat.completions.create(\n        model=\"llama3.2:3b\",\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n        temperature=0,  # Lower randomness; not a determinism guarantee\n    )\n    return resp.choices[0].message.content\n\nprint(answer(\"İade politikası nedir?\"))"
        }
      },
      {
        "title": {
          "tr": "Değerlendir: retrieval + cevap kalitesi",
          "en": "Evaluate: retrieval + answer quality"
        },
        "body": {
          "tr": "Erişim için insan etiketli ilgili parça kimlikleriyle Recall@k ölçün; anahtar kelime bulunma oranı aynı metrik değildir. Yanıt doğruluğu, kaynak desteği ve yanıt vermeme davranışını ayrıca değerlendirin. Kod öğretici bir hesap örneğidir; burada kullanılan kimlikler sentetiktir.",
          "en": "Measure retrieval Recall@k against human-labeled relevant chunk IDs; keyword hit rate is a different metric. Evaluate answer correctness, grounding and abstention separately. The code is an educational calculation using synthetic IDs."
        },
        "codeBlock": {
          "lang": "python",
          "code": "def recall_at_k(retrieved_ids, relevant_ids, k=5):\n    if k <= 0:\n        raise ValueError(\"k must be positive\")\n    relevant = set(relevant_ids)\n    if not relevant:\n        raise ValueError(\"Provide labeled relevant chunk IDs\")\n    return len(set(retrieved_ids[:k]) & relevant) / len(relevant)\n\n# Synthetic IDs: 1 of 2 relevant chunks retrieved => 0.5\nprint(recall_at_k([\"c2\", \"c8\"], [\"c2\", \"c4\"], k=2))"
        }
      }
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
        "title": {
          "tr": "WebGPU tarayıcı desteğini kontrol et",
          "en": "Check WebGPU browser support"
        },
        "body": {
          "tr": "WebGPU desteği tarayıcı, işletim sistemi, güvenli bağlam ve donanım sürücüsüne göre değişir. `navigator.gpu` ilk yetenek sinyalidir; ardından `requestAdapter()` sonucunu ve gereken sınırları kontrol et. WebGPU yoksa geri dönüş davranışı kullandığın kütüphaneye bağlıdır.",
          "en": "WebGPU support varies by browser, operating system, secure context, and hardware driver. `navigator.gpu` is the first capability signal; then check `requestAdapter()` and required limits. Without WebGPU, fallback behavior depends on the library you use."
        },
        "codeBlock": {
          "lang": "ts",
          "code": "// Hızlı WebGPU desteği kontrolü\nconst ok = !!(navigator as any).gpu;\nconsole.log(\"WebGPU destekleniyor mu?\", ok);\n\nif (ok) {\n  const adapter = await (navigator as any).gpu.requestAdapter();\n  console.log(\"Adapter:\", adapter ? \"OK\" : \"Yok\");\n}"
        },
        "tryIt": {
          "label": {
            "tr": "Tarayıcında WebGPU durumunu gör",
            "en": "See WebGPU status in your browser"
          },
          "href": "https://webgpureport.org/"
        }
      },
      {
        "title": {
          "tr": "WebLLM paketini ekle",
          "en": "Add the WebLLM package"
        },
        "body": {
          "tr": "WebLLM, MLC LLM üzerine kurulu tarayıcı SDK’sıdır. npm ile eklenebilir. Model önbelleği tekrar indirmeyi azaltabilir; kota, tarayıcı temizliği ve sürüm değişiklikleri yeniden indirmeyi gerektirebilir.",
          "en": "WebLLM is a browser SDK built on MLC LLM and can be added with npm. Model caching may avoid repeat downloads; quotas, browser eviction and version changes can require another download."
        },
        "codeBlock": {
          "lang": "bash",
          "code": "#!/bin/bash\n# Vite/Webpack projesi için\nnpm i @mlc-ai/web-llm"
        }
      },
      {
        "title": {
          "tr": "Model seç ve ilk yanıt",
          "en": "Choose a model and get the first reply"
        },
        "body": {
          "tr": "Kurulu WebLLM sürümünün model listesinde bulunan küçük bir model seçin. Aşağıdaki kimlik örnektir; kullanılabilirlik, GPU belleği, bağlam ve cihaz limitleri doğrulanmalıdır. İlk açılış model indirme ve shader derleme süresi içerir; çevrimdışı kullanım ayrıca denenmelidir.",
          "en": "Choose a small model listed by the installed WebLLM release. The ID below is illustrative; validate availability, GPU memory, context and device limits. First launch includes model download and shader compilation; test offline use separately."
        },
        "codeBlock": {
          "lang": "ts",
          "code": "import { CreateMLCEngine } from \"@mlc-ai/web-llm\";\n\nconst initProgressCallback = (p: any) => console.log(\"init:\", p);\n\nconst engine = await CreateMLCEngine(\"Llama-3.2-1B-Instruct-q4f16_1-MLC\", {\n  initProgressCallback,\n});\n\nconst reply = await engine.chat.completions.create({\n  messages: [{ role: \"user\", content: \"Merhaba, kendini tanıt.\" }],\n});\nconsole.log(reply.choices[0].message.content);"
        }
      },
      {
        "title": {
          "tr": "Streaming ile canlı yazım hissi",
          "en": "Streaming for a live typing feel"
        },
        "body": {
          "tr": "stream: true ile parçalar geldikçe gösterilir. Bağlam kapasitesi model, yapılandırma ve tarayıcı belleğine bağlıdır; evrensel bir 4–8K sınırı yoktur. Uzun geçmişler için token bütçesini izleyin ve kesme veya özetlemeyi uygulamada açıkça yönetin.",
          "en": "With stream: true, chunks appear as they arrive. Context capacity depends on the model, configuration and browser memory; there is no universal 4–8K limit. Track token budgets and manage truncation or summarization explicitly in the application."
        },
        "codeBlock": {
          "lang": "ts",
          "code": "const stream = await engine.chat.completions.create({\n  stream: true,\n  messages: [{ role: \"user\", content: \"Bana kısa bir hikaye anlat.\" }],\n});\n\nfor await (const chunk of stream) {\n  const delta = chunk.choices[0]?.delta?.content ?? \"\";\n  if (delta) document.body.append(delta);\n}"
        }
      }
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
          tr: 'Apple Silicon birleşik belleği CPU ve GPU arasında paylaşır. NVIDIA GPU\'lar CUDA tabanlı geniş bir çıkarım ekosistemi ve istemci ile veri merkezi sınıfı seçenekler sunar. NPU\'lar ise desteklenen operatör ve model yollarında düşük güçte çıkarıma odaklanır. Gerçek kapasite çip, bellek, yazılım sürümü ve model biçimine bağlıdır.',
          en: 'Apple Silicon shares unified memory between CPU and GPU. NVIDIA GPUs offer a broad CUDA inference ecosystem across client and data-center parts. NPUs focus on low-power inference for supported operator and model paths. Actual capacity depends on the chip, memory, software release, and model format.',
        },
      },
      {
        title: {
          tr: 'Performans / Watt oranı',
          en: 'Performance per watt',
        },
        body: {
          tr: 'Watt başına performans tek bir sıralama değildir. Modelin sığıp sığmaması, bellek bant genişliği, batch, bağlam ve çalışma zamanı sonucu değiştirir. Apple Silicon yerel ve sessiz geliştirmede, NVIDIA GPU\'lar desteklenen yüksek eşzamanlı işlerde, NPU\'lar ise uygun düşük güç yollarında avantaj sağlayabilir; hepsi aynı model ve görevle ölçülmelidir.',
          en: 'Performance per watt is not one universal ranking. Model fit, memory bandwidth, batch, context, and runtime all change the result. Apple Silicon can suit quiet local development, NVIDIA GPUs can suit supported high-concurrency workloads, and NPUs can suit compatible low-power paths; compare them with the same model and task.',
        },
      },
      {
        title: {
          tr: 'Yazılım ekosistemi',
          en: 'Software ecosystem',
        },
        body: {
          tr: 'NVIDIA tarafında vLLM, SGLang, TensorRT-LLM ve ExLlamaV3; Apple tarafında MLX-LM ile llama.cpp Metal arka ucu; NPU tarafında OpenVINO GenAI ve ONNX Runtime GenAI öne çıkar. Yeni bir motor denemeden önce model, sürüm ve donanım destek matrisini birlikte kontrol edin.',
          en: 'Prominent paths include vLLM, SGLang, TensorRT-LLM, and ExLlamaV3 on NVIDIA; MLX-LM and llama.cpp\'s Metal backend on Apple; and OpenVINO GenAI or ONNX Runtime GenAI for selected NPU paths. Check the combined model, release, and hardware support matrix before adopting an engine.',
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
          tr: 'Toplam sahip olma maliyetine donanım, enerji, bakım, ekip zamanı, kullanım oranı ve bulut fiyatı birlikte girer. Zaten sahip olunan istemci donanımı geliştirmede ekonomik olabilir; yüksek kullanımda ayrılmış hızlandırıcı, dalgalı kullanımda kiralama veya API daha uygun olabilir. Fiyatlar ve kapasite varsayımları karar anında yeniden hesaplanmalıdır.',
          en: 'Total cost of ownership combines hardware, energy, maintenance, staff time, utilization, and cloud pricing. Existing client hardware may be economical for development; dedicated accelerators can fit high utilization, while rental or APIs can fit bursty demand. Recalculate prices and capacity assumptions at decision time.',
        },
      },
      {
        title: {
          tr: 'Ne zaman hangisini seç',
          en: 'When to pick which',
        },
        body: {
          tr: 'Seçimi modelin bellek gereksinimi, hedef gecikme ve eşzamanlılık, güç bütçesi, veri yerleşimi ve desteklenen araç zinciriyle yap. Apple Silicon, NVIDIA GPU veya NPU bu koşullara göre aday olabilir. Hibrit akışlarda OpenAI uyumlu bir API temel çağrıları ortaklaştırabilir; gelişmiş özelliklerin uyumluluğu yine test edilmelidir.',
          en: 'Choose from model memory, latency and concurrency targets, power budget, data location, and the supported toolchain. Apple Silicon, NVIDIA GPUs, or NPUs may fit different points. In hybrid flows, an OpenAI-compatible API can unify basic calls, while advanced-feature compatibility still needs testing.',
        },
      },
      {
        title: {
          tr: 'Hibrit senaryolar',
          en: 'Hybrid scenarios',
        },
        body: {
          tr: 'Örnek bir hibrit akışta Mac üzerinde MLX-LM veya llama.cpp ile geliştirme, sunucuda vLLM ya da SGLang ile sunum, istemcide WebLLM veya ExecuTorch ile cihaz üzeri çıkarım denenebilir. Motorlar aynı model biçimini ve nicemleme şemasını desteklemeyebilir; dönüşüm, tokenizer ve çıktı tutarlılığı ayrı ayrı doğrulanmalıdır.',
          en: 'One hybrid flow might develop with MLX-LM or llama.cpp on a Mac, serve with vLLM or SGLang on a server, and test on-device inference with WebLLM or ExecuTorch. Engines may not share the same model format or quantization scheme, so conversion, tokenizer behavior, and output consistency must be verified separately.',
        },
      },
    ],
    relatedConcepts: ['cuda', 'npu', 'apple-silicon', 'onnx', 'quantization'],
    relatedSolutions: ['mlx-lm', 'openvino-genai', 'onnx-runtime-genai', 'vllm', 'tensorrt-llm'],
  },
]
