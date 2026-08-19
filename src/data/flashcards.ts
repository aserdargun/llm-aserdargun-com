import type { Flashcard } from '@/types/learning'

/**
 * Flashcard deck for spaced repetition. Each card references a concept or
 * solution by slug; the renderer pulls localized front/back from these records.
 */
export const flashcards: Flashcard[] = [
  // ─── tokenization (2) ───────────────────────────────────────
  {
    id: 'concept:tokenization:1',
    source: 'concept',
    refSlug: 'tokenization',
    front: {
      tr: 'Tokenization (tokenleştirme) ne işe yarar?',
      en: 'What does tokenization do?',
    },
    back: {
      tr: 'Modelin işleyebilmesi için metni küçük parçalara (token) böler ve her parçaya bir sayı (ID) atar. Model bu sayılarla çalışır, harflerle değil.',
      en: 'It splits text into small pieces (tokens) and assigns each a numeric ID so the model can process it. Models work with numbers, not letters.',
    },
    hint: {
      tr: 'Modelin alfabe bilmediğini, sayılarla konuştuğunu hatırla.',
      en: 'Remember that the model does not know the alphabet — it talks in numbers.',
    },
    tags: ['tokenization', 'basics', 'preprocessing'],
  },
  {
    id: 'concept:tokenization:2',
    source: 'concept',
    refSlug: 'tokenization',
    front: {
      tr: 'Türkçe metinler neden tokenleştirmede dezavantajlı olabilir?',
      en: 'Why can Turkish text be disadvantaged in tokenization?',
    },
    back: {
      tr: 'Sondan eklemeli bir dil olduğu için aynı içerik genellikle İngilizce’den 2-3 kat daha fazla token üretir; bu da API maliyetini artırır ve context window’u hızla doldurur.',
      en: 'Because Turkish is an agglutinative language, the same content usually produces 2-3x more tokens than English; that raises API cost and fills the context window faster.',
    },
    tags: ['tokenization', 'multilingual', 'cost'],
  },

  // ─── context-window (2) ─────────────────────────────────────
  {
    id: 'concept:context-window:1',
    source: 'concept',
    refSlug: 'context-window',
    front: {
      tr: 'Context window (bağlam penceresi) nedir?',
      en: 'What is the context window?',
    },
    back: {
      tr: 'Modelin tek bir çağrıda işleyebildiği toplam token sayısıdır; hem girdi hem de çıktı bu sınıra dahildir. Aşılırsa model konuşmanın başını "unutur".',
      en: 'It is the total number of tokens a model can process in a single call; both input and output count toward it. If exceeded, the model "forgets" the beginning of the conversation.',
    },
    tags: ['context-window', 'memory', 'basics'],
  },
  {
    id: 'concept:context-window:2',
    source: 'concept',
    refSlug: 'context-window',
    front: {
      tr: 'Büyük context window iddialarına neden dikkatle yaklaşmalıyız?',
      en: 'Why should we be cautious about large context window claims?',
    },
    back: {
      tr: 'Çünkü "etkili" bağlam çoğu zaman nominal bağlamdan küçüktür; modeller "lost in the middle" etkisiyle ortadaki bilgiyi daha az hatırlar. Ayrıca KV cache belleği bağlamla doğrusal büyür, VRAM hızla dolar.',
      en: 'Because the "effective" context is usually smaller than the nominal one; the "lost in the middle" effect makes models recall middle information less. Also KV cache memory grows linearly with context, so VRAM fills up fast.',
    },
    hint: {
      tr: 'Sayfa ile sayfanın ortası arasındaki hatırlama farkını düşün.',
      en: 'Think of the recall difference between the start and the middle of a page.',
    },
    tags: ['context-window', 'limits', 'rag'],
  },

  // ─── attention (2) ──────────────────────────────────────────
  {
    id: 'concept:attention:1',
    source: 'concept',
    refSlug: 'attention',
    front: {
      tr: 'Self-attention mekanizmasında Q, K, V ne anlama gelir?',
      en: 'What do Q, K, V mean in the self-attention mechanism?',
    },
    back: {
      tr: 'Q (Query) "ne arıyorum?", K (Key) "neler sunuyorum?", V (Value) "bulunursa ne katkı sağlarım?" sorularını temsil eder. Dikkat skoru softmax(Q·Kᵀ / √d_k) · V formülüyle hesaplanır.',
      en: 'Q (Query) means "what am I looking for?", K (Key) "what do I offer?", V (Value) "what do I contribute if I’m found?". The attention score is computed with softmax(Q·Kᵀ / √d_k) · V.',
    },
    tags: ['attention', 'transformer', 'math'],
  },
  {
    id: 'concept:attention:2',
    source: 'concept',
    refSlug: 'attention',
    front: {
      tr: 'GQA (Grouped-Query Attention) ne kazandırır?',
      en: 'What does GQA (Grouped-Query Attention) bring?',
    },
    back: {
      tr: 'Multi-Head Attention ile Multi-Query Attention arasında bir uzlaşma sunar: K/V başlıklarını 4-8 gruba indirerek bellek tasarrufu sağlar, kaliteden ödün vermeden. Llama 2/3, Mistral ve Qwen2 bu yaklaşımı kullanır.',
      en: 'It strikes a balance between Multi-Head Attention and Multi-Query Attention: reduces K/V heads to 4-8 groups, saving memory without sacrificing quality. Llama 2/3, Mistral and Qwen2 use this approach.',
    },
    tags: ['attention', 'gqa', 'optimization'],
  },

  // ─── prompt (2) ─────────────────────────────────────────────
  {
    id: 'concept:prompt:1',
    source: 'concept',
    refSlug: 'prompt',
    front: {
      tr: 'İyi bir prompt’un dört temel bileşeni nedir?',
      en: 'What are the four basic components of a good prompt?',
    },
    back: {
      tr: '1) Rol/kişilik, 2) görev tanımı, 3) bağlam/veri, 4) format/kısıt. Netlik, kısıt ve örnek olmadan pahalı tokenlarla belirsiz cevap alırsın.',
      en: '1) Role/persona, 2) task definition, 3) context/data, 4) format/constraint. Without clarity, constraints, and examples you get an ambiguous answer paid for with expensive tokens.',
    },
    tags: ['prompt', 'basics', 'design'],
  },
  {
    id: 'concept:prompt:2',
    source: 'concept',
    refSlug: 'prompt',
    front: {
      tr: 'Few-shot prompting ile chain-of-thought arasındaki fark nedir?',
      en: 'What is the difference between few-shot prompting and chain-of-thought?',
    },
    back: {
      tr: 'Few-shot, modele 2-5 örnek vererek kalıbı öğretir. Chain-of-thought ise "adım adım düşün" diyerek muhakemeyi zorlar. İkisi birlikte (Few-shot CoT) daha güçlüdür.',
      en: 'Few-shot teaches the pattern by giving the model 2-5 examples. Chain-of-thought forces reasoning by saying "think step by step". Combining them (Few-shot CoT) is even stronger.',
    },
    tags: ['prompt', 'reasoning', 'techniques'],
  },

  // ─── embedding (2) ──────────────────────────────────────────
  {
    id: 'concept:embedding:1',
    source: 'concept',
    refSlug: 'embedding',
    front: {
      tr: 'Embedding vektörü ne işe yarar?',
      en: 'What is an embedding vector for?',
    },
    back: {
      tr: 'Metin/görsel/ses gibi verileri anlamca yakınlık koruyacak şekilde bir sayı vektörüne çevirir. RAG, semantik arama ve kümeleme için temel yapı taşıdır.',
      en: 'It converts text/image/audio into a numeric vector while preserving semantic closeness. It is the building block of RAG, semantic search and clustering.',
    },
    tags: ['embedding', 'rag', 'search'],
  },
  {
    id: 'concept:embedding:2',
    source: 'concept',
    refSlug: 'embedding',
    front: {
      tr: 'Farklı embedding modellerinin vektörleri neden karşılaştırılamaz?',
      en: 'Why can vectors from different embedding models not be compared?',
    },
    back: {
      tr: 'Her model kendi anlam uzayını öğrenir; "kral" vektörünün koordinatları modelden modele değişir. Farklı modellerin vektörleri aynı şekilde hizalanmamıştır, karıştırırsan anlamsız sonuç alırsın.',
      en: 'Each model learns its own semantic space; the coordinates of the "king" vector differ from model to model. Vectors from different models are not aligned the same way; mixing them yields meaningless results.',
    },
    hint: {
      tr: 'Aynı haritanın iki farklı projeksiyonunu üst üste koymayı düşün.',
      en: 'Think of overlaying two different projections of the same map.',
    },
    tags: ['embedding', 'models', 'migration'],
  },

  // ─── temperature (2) ────────────────────────────────────────
  {
    id: 'concept:temperature:1',
    source: 'concept',
    refSlug: 'temperature',
    front: {
      tr: 'Temperature=0 ne anlama gelir?',
      en: 'What does temperature=0 mean?',
    },
    back: {
      tr: 'Greedy decoding: model her zaman en yüksek olasılıklı token’ı seçer. Tutarlı ve tekrarlanabilir sonuç verir, kod ve veri çıkarma gibi deterministik görevler için idealdir.',
      en: 'Greedy decoding: the model always picks the highest-probability token. It gives consistent, reproducible output and is ideal for deterministic tasks like code and data extraction.',
    },
    tags: ['temperature', 'sampling', 'determinism'],
  },
  {
    id: 'concept:temperature:2',
    source: 'concept',
    refSlug: 'temperature',
    front: {
      tr: 'Temperature ile Top-p neden aynı anda değiştirilmemeli?',
      en: 'Why should temperature and Top-p not be changed at the same time?',
    },
    back: {
      tr: 'İkisi farklı yönlerden dağılımı etkiler; aynı anda değiştirmek ayarın hangi etki yarattığını anlaşılmaz kılar. Önce birini sabitleyip diğerini tune etmek daha kontrollü sonuç verir.',
      en: 'They affect the distribution from different angles; changing both at once makes it hard to tell what produced which effect. Fixing one and tuning the other gives more controlled results.',
    },
    tags: ['temperature', 'top-p', 'tuning'],
  },

  // ─── top-p (2) ──────────────────────────────────────────────
  {
    id: 'concept:top-p:1',
    source: 'concept',
    refSlug: 'top-p',
    front: {
      tr: 'Nucleus sampling (Top-p) nasıl çalışır?',
      en: 'How does nucleus sampling (Top-p) work?',
    },
    back: {
      tr: 'Olasılıkları büyükten küçüğe sıralar ve birikimli toplam p’ye ulaşana kadar olan tokenlardan örnekler. p=0.9 genellikle 5-15 aday bırakır; sabit Top-k’dan daha sağlıklıdır.',
      en: 'It sorts probabilities high to low and samples from tokens until the cumulative sum reaches p. p=0.9 usually leaves 5-15 candidates; it is healthier than a fixed Top-k.',
    },
    tags: ['top-p', 'sampling', 'nucleus'],
  },
  {
    id: 'concept:top-p:2',
    source: 'concept',
    refSlug: 'top-p',
    front: {
      tr: 'Structured output (JSON schema) üretirken hangi sampling ayarları zorunludur?',
      en: 'Which sampling settings are mandatory when producing structured output (JSON schema)?',
    },
    back: {
      tr: 'Temperature=0 ve Top-p=1. Aksi halde rastgelelik şemayı bozar; özellikle fonksiyon çağrılarında güvenilir JSON üretimi için deterministik sampling şarttır.',
      en: 'Temperature=0 and Top-p=1. Otherwise randomness breaks the schema; deterministic sampling is essential for reliable JSON, especially in function calling.',
    },
    tags: ['top-p', 'temperature', 'structured-output'],
  },

  // ─── system-prompt (2) ──────────────────────────────────────
  {
    id: 'concept:system-prompt:1',
    source: 'concept',
    refSlug: 'system-prompt',
    front: {
      tr: 'System prompt ile user prompt arasındaki fark nedir?',
      en: 'What is the difference between a system prompt and a user prompt?',
    },
    back: {
      tr: 'System prompt modelin kalıcı rolünü ve kurallarını tanımlar (operatör tarafından, kullanıcıya görünmez); user prompt ise her mesajda değişen kullanıcı girdisidir. OpenAI modelleri system mesajına daha yüksek ağırlık verir.',
      en: 'The system prompt defines the model’s persistent role and rules (set by the operator, invisible to the user); the user prompt is the user’s input that changes every message. OpenAI models weight system messages more heavily.',
    },
    tags: ['system-prompt', 'prompt', 'roles'],
  },
  {
    id: 'concept:system-prompt:2',
    source: 'concept',
    refSlug: 'system-prompt',
    front: {
      tr: 'Prompt injection saldırısına karşı ilk savunma katmanı nedir?',
      en: 'What is the first line of defense against prompt injection attacks?',
    },
    back: {
      tr: 'Kullanıcı içeriğini <data>...</data> gibi açık sınırlayıcılarla izole etmek, system prompt’a sıkı JSON-schema kısıtı koymak ve kullanıcı talimatlarına asla güvenmemek. Saldırıyı tamamen engellemek zor olduğundan uygulama katmanında doğrulama da şarttır.',
      en: 'Isolate user content with explicit delimiters like <data>...</data>, put strict JSON-schema constraints in the system prompt, and never trust user instructions. Because full prevention is hard, application-layer validation is also required.',
    },
    tags: ['system-prompt', 'security', 'injection'],
  },

  // ─── kv-cache (2) ───────────────────────────────────────────
  {
    id: 'concept:kv-cache:1',
    source: 'concept',
    refSlug: 'kv-cache',
    front: {
      tr: 'KV cache neden üretim çıkarımında kritik bir bileşendir?',
      en: 'Why is KV cache a critical component in production inference?',
    },
    back: {
      tr: 'Her yeni token üretiminde önceki tüm tokenların Key/Value vektörlerini yeniden hesaplamaktan kurtarır. Bu, decode hızını 5-10x artırır; olmadan etkili inference neredeyse imkansız olur.',
      en: 'It avoids recomputing the Key/Value vectors of all previous tokens at each new generation step. This boosts decode speed 5-10x; without it, effective inference would be nearly impossible.',
    },
    tags: ['kv-cache', 'optimization', 'memory'],
  },
  {
    id: 'concept:kv-cache:2',
    source: 'concept',
    refSlug: 'kv-cache',
    front: {
      tr: 'GPU belleğinin en büyük tüketicisi çoğu zaman hangisidir?',
      en: 'What is usually the biggest consumer of GPU memory?',
    },
    back: {
      tr: 'Uzun bağlamla çalışan çok sayıda eşzamanlı istek için ayrılan KV cache. Model ağırlıkları sabitken, KV cache context ile doğrusal büyür — 128K bağlamda tek bir istek bile gigabyte’larca yer kaplayabilir.',
      en: 'The KV cache allocated for many concurrent requests with long context. Model weights are fixed, but KV cache grows linearly with context — even a single request at 128K context can occupy gigabytes.',
    },
    hint: {
      tr: 'Model ağırlıkları sabit ama context her istekle büyür — hangisi daha çok şişer?',
      en: 'Model weights are fixed but context grows per request — which one balloons?',
    },
    tags: ['kv-cache', 'gpu', 'memory'],
  },

  // ─── batching (2) ───────────────────────────────────────────
  {
    id: 'concept:batching:1',
    source: 'concept',
    refSlug: 'batching',
    front: {
      tr: 'Continuous batching (iteration-level) neden devrim niteliğindedir?',
      en: 'Why is continuous (iteration-level) batching a revolution?',
    },
    back: {
      tr: 'Her decoding iteration’ında biten istekleri gruptan çıkarır, yenilerini ekler. Kısa istekler uzun olanları beklemediği için verim 2-4x artar; vLLM bu yaklaşımı varsayılan yapan ilk motordur.',
      en: 'It removes finished requests from the group at each decoding iteration and adds new ones. Short requests no longer wait for long ones, lifting throughput 2-4x; vLLM was the first engine to make this the default.',
    },
    tags: ['batching', 'vllm', 'throughput'],
  },
  {
    id: 'concept:batching:2',
    source: 'concept',
    refSlug: 'batching',
    front: {
      tr: 'SGLang RadixAttention hangi durumda en büyük hız kazancını sağlar?',
      en: 'When does SGLang RadixAttention give the biggest speedup?',
    },
    back: {
      tr: 'Farklı istekler aynı prefix’i paylaştığında (system prompt, örnekler, ortak belge). Paylaşılan kısım için ayrı ayrı prefill yapılmaz, 2-5x hız kazancı sağlanır.',
      en: 'When different requests share the same prefix (system prompt, examples, shared document). The shared portion is not pre-filled separately, giving 2-5x speedup.',
    },
    tags: ['batching', 'radixattention', 'sglang'],
  },

  // ─── streaming (2) ──────────────────────────────────────────
  {
    id: 'concept:streaming:1',
    source: 'concept',
    refSlug: 'streaming',
    front: {
      tr: 'Üretimde en kritik iki kullanıcı deneyimi metriği nedir?',
      en: 'What are the two most critical user experience metrics in production?',
    },
    back: {
      tr: 'TTFT (Time To First Token — ilk token gelene kadar geçen süre) ve TPOT (Time Per Output Token — sonraki tokenlar arası süre). TTFT için tipik hedef p95 < 500 ms, TPOT için 30-80 ms.',
      en: 'TTFT (Time To First Token — time until the first token arrives) and TPOT (Time Per Output Token — time between subsequent tokens). Typical targets are p95 TTFT < 500 ms and TPOT 30-80 ms.',
    },
    tags: ['streaming', 'latency', 'sla'],
  },
  {
    id: 'concept:streaming:2',
    source: 'concept',
    refSlug: 'streaming',
    front: {
      tr: 'İstemci bağlantıyı kopardığında sunucu ne yapmalı?',
      en: 'What should the server do when the client disconnects?',
    },
    back: {
      tr: 'Decode’u hemen durdurmalı; aksi halde boşa GPU döngüsü harcanır ve KV cache şişer. Bu, özellikle uzun çıktılarda önemli bir maliyet kontrolüdür.',
      en: 'Stop decoding immediately; otherwise GPU cycles are wasted and KV cache balloons. This is an important cost control, especially for long outputs.',
    },
    tags: ['streaming', 'cancellation', 'cost'],
  },

  // ─── paged-attention (2) ─────────────────────────────────────
  {
    id: 'concept:paged-attention:1',
    source: 'concept',
    refSlug: 'paged-attention',
    front: {
      tr: 'PagedAttention, KV cache yönetiminde neyi çözer?',
      en: 'What does PagedAttention solve in KV cache management?',
    },
    back: {
      tr: 'Bellek parçalanmasını ortadan kaldırır ve kullanımı neredeyse %100’e çıkarır. Geleneksel pre-allocation stratejisinin yarattığı israfı, işletim sistemlerindeki "sanal bellek + sayfa tablosu" modelini ödünç alarak çözer.',
      en: 'It eliminates memory fragmentation and pushes utilization close to 100%. It solves the waste of traditional pre-allocation by borrowing the "virtual memory + page table" model from operating systems.',
    },
    tags: ['paged-attention', 'vllm', 'memory'],
  },
  {
    id: 'concept:paged-attention:2',
    source: 'concept',
    refSlug: 'paged-attention',
    front: {
      tr: 'PagedAttention’ın beam search ve parallel sampling’deki ek faydası nedir?',
      en: 'What extra benefit does PagedAttention give in beam search and parallel sampling?',
    },
    back: {
      tr: 'Copy-on-write sayesinde aynı prompt’tan birden çok çıktı üretildiğinde prefill sayfaları paylaşılır; her output kendi decode sayfalarını ayrıca tutar. Bu, N adet output için belleği N kat artırmaktan kurtarır.',
      en: 'With copy-on-write, when producing multiple outputs from the same prompt, the prefill pages are shared; each output keeps its own decode pages. This avoids multiplying memory by N for N outputs.',
    },
    tags: ['paged-attention', 'copy-on-write', 'beam-search'],
  },

  // ─── speculative-decoding (2) ───────────────────────────────
  {
    id: 'concept:speculative-decoding:1',
    source: 'concept',
    refSlug: 'speculative-decoding',
    front: {
      tr: 'Speculative decoding’in matematiksel garantisi nedir?',
      en: 'What is the mathematical guarantee of speculative decoding?',
    },
    back: {
      tr: 'Sonuç dağılımı hedef modelin dağılımıyla aynı kalır — yani kalite korunur, sadece hız kazanılır. Kabul edilen tokenlar hedef modelin "kabul ettiği" örneklerdir.',
      en: 'The output distribution stays the same as the target model’s — quality is preserved, only speed improves. Accepted tokens are the ones the target model "accepts" as samples.',
    },
    tags: ['speculative-decoding', 'quality', 'speed'],
  },
  {
    id: 'concept:speculative-decoding:2',
    source: 'concept',
    refSlug: 'speculative-decoding',
    front: {
      tr: 'Speculative decoding hangi durumda hız avantajı kaybeder?',
      en: 'When does speculative decoding lose its speed advantage?',
    },
    back: {
      tr: 'Kabul oranı %50’nin altına düştüğünde. Taslak modelin dağılımı hedef modele uymuyorsa, çoğu tahmin reddedilir ve forward pass israf olur. Bu yüzden taslak model ≈ %5-10 büyüklükte ve benzer dağılımda olmalı.',
      en: 'When the acceptance rate drops below 50%. If the draft model’s distribution does not match the target, most predictions are rejected and the forward pass is wasted. That is why the draft should be about 5-10% the size with a similar distribution.',
    },
    tags: ['speculative-decoding', 'acceptance-rate', 'tuning'],
  },

  // ─── prefill-decode (2) ─────────────────────────────────────
  {
    id: 'concept:prefill-decode:1',
    source: 'concept',
    refSlug: 'prefill-decode',
    front: {
      tr: 'Prefill ve decode neden farklı GPU yükü oluşturur?',
      en: 'Why do prefill and decode create different GPU loads?',
    },
    back: {
      tr: 'Prefill tüm prompt’u paralel işler, compute-bound çalışır ve yüksek FLOPS kullanır. Decode tek tek token üretir, memory-bandwidth-bound çalışır çünkü KV cache’ten okuma baskındır.',
      en: 'Prefill processes the whole prompt in parallel, runs compute-bound and uses high FLOPS. Decode generates one token at a time, runs memory-bandwidth-bound because KV cache reads dominate.',
    },
    tags: ['prefill-decode', 'gpu', 'workload'],
  },
  {
    id: 'concept:prefill-decode:2',
    source: 'concept',
    refSlug: 'prefill-decode',
    front: {
      tr: 'Disaggregated serving (örn. NVIDIA Dynamo) neden gereklidir?',
      en: 'Why is disaggregated serving (e.g. NVIDIA Dynamo) necessary?',
    },
    back: {
      tr: 'Çünkü aynı GPU’da aynı anda çalışan prefill ve decode birbirini yavaşlatır. Ayrı donanımlara bölünce her faz kendi profili için en uygun GPU’da çalışır; 1.5-2x toplam verim artışı sağlanır.',
      en: 'Because prefill and decode running on the same GPU at the same time slow each other down. Splitting them lets each phase run on the GPU best suited to its profile, yielding 1.5-2x total throughput gain.',
    },
    tags: ['prefill-decode', 'disaggregated', 'scaling'],
  },

  // ─── quantization (2) ───────────────────────────────────────
  {
    id: 'concept:quantization:1',
    source: 'concept',
    refSlug: 'quantization',
    front: {
      tr: 'INT4 nicemleme FP16’ya göre ne kazandırır, ne kaybettirir?',
      en: 'What does INT4 quantization gain and lose compared to FP16?',
    },
    back: {
      tr: 'Belleği %75 azaltır (4 bit / 16 bit) ve çıkarımı hızlandırır; ama hassasiyet düşer, dikkatli olmayan uygulamada perplexity 1-3 puan artabilir. AWQ gibi yöntemler bu kaybı büyük ölçüde azaltır.',
      en: 'It cuts memory by 75% (4 bit / 16 bit) and speeds up inference; but precision drops, and careless application can increase perplexity by 1-3 points. Methods like AWQ reduce this loss significantly.',
    },
    tags: ['quantization', 'int4', 'tradeoff'],
  },
  {
    id: 'concept:quantization:2',
    source: 'concept',
    refSlug: 'quantization',
    front: {
      tr: 'PTQ ve QAT arasındaki temel fark nedir?',
      en: 'What is the core difference between PTQ and QAT?',
    },
    back: {
      tr: 'PTQ (Post-Training Quantization) eğitim sonrası uygulanır, hızlıdır ama kalite biraz düşer. QAT (Quantization-Aware Training) eğitim sırasında nicemlemeyi simüle eder; kalite daha iyi ama eğitim maliyeti yüksektir.',
      en: 'PTQ (Post-Training Quantization) is applied after training, fast but with some quality loss. QAT (Quantization-Aware Training) simulates quantization during training; quality is better but training cost is high.',
    },
    tags: ['quantization', 'ptq', 'qat'],
  },

  // ─── Solution cards (62) ─────────────────────────────────────
  // ─── tensorrt-llm (2) ────────────────────────────────────────
  {
    id: 'solution:tensorrt-llm:1',
    source: 'solution',
    refSlug: 'tensorrt-llm',
    front: {
      tr: 'TensorRT-LLM mimaride hangi rolü oynar?',
      en: 'What role does TensorRT-LLM play in the architecture?',
    },
    back: {
      tr: 'Model tanımlarını NVIDIA TensorRT çekirdeklerine yaklaştıran, nicemleme ve çoklu GPU seçenekleri sunan derleyici ve çalışma zamanı. vLLM/SGLang gibi motorlardan farklı olarak düşük seviye optimizasyon yapar.',
      en: 'A compiler and runtime that brings model definitions close to NVIDIA TensorRT kernels, with quantization and multi-GPU options. Unlike vLLM/SGLang it does low-level optimization.',
    },
    tags: ['tensorrt-llm', 'inference', 'nvidia'],
  },
  {
    id: 'solution:tensorrt-llm:2',
    source: 'solution',
    refSlug: 'tensorrt-llm',
    front: {
      tr: 'TensorRT-LLM hangi durumda en iyi seçimdir, ne zaman kaçınılmalıdır?',
      en: 'When is TensorRT-LLM the best choice, and when should you avoid it?',
    },
    back: {
      tr: 'NVIDIA GPU üzerinde uzman ekiplerin üretim çıkarımı için idealdir. Tek başına sohbet arayüzü veya sağlayıcılar arası ağ geçidi olarak kullanılmaz; kurulum ve model hazırlama maliyeti yüksektir.',
      en: 'Ideal for production inference by specialist teams on NVIDIA GPU. It is not a chat UI or provider gateway on its own; setup and model-preparation cost is high.',
    },
    hint: {
      tr: 'NVIDIA\'ya sıkı bağlılık, model motoru mu arayüz mü?',
      en: 'Tight coupling to NVIDIA — is it an engine or a UI?',
    },
    tags: ['tensorrt-llm', 'production', 'gpu'],
  },

  // ─── llama-cpp (2) ───────────────────────────────────────────
  {
    id: 'solution:llama-cpp:1',
    source: 'solution',
    refSlug: 'llama-cpp',
    front: {
      tr: 'llama.cpp ne tür bir çözümdür?',
      en: 'What kind of solution is llama.cpp?',
    },
    back: {
      tr: 'GGUF modellerini CPU ve geniş bir GPU arka ucu yelpazesinde (CUDA, Metal, Vulkan, SYCL) yerel olarak çalıştıran taşınabilir C/C++ motoru. Az bağımlılıkla birçok platformda çalışır.',
      en: 'A portable C/C++ engine that runs GGUF models locally across CPUs and a wide range of GPU backends (CUDA, Metal, Vulkan, SYCL). Runs on many platforms with few dependencies.',
    },
    tags: ['llama-cpp', 'inference', 'portable'],
  },
  {
    id: 'solution:llama-cpp:2',
    source: 'solution',
    refSlug: 'llama-cpp',
    front: {
      tr: 'llama.cpp hangi senaryo için en uygundur?',
      en: 'Which scenario is llama.cpp best suited for?',
    },
    back: {
      tr: 'Yerel, çevrimdışı ve kaynak kısıtlı çıkarım için idealdir. Dağıtık kontrol düzlemi değildir; model dönüşümü ve ince ayar uzmanlık isteyebilir.',
      en: 'Ideal for local, offline, and resource-constrained inference. Not a distributed control plane; model conversion and tuning may require expertise.',
    },
    hint: {
      tr: 'Birçok donanımı destekleyen taşınabilir motor.',
      en: 'Portable engine supporting many hardware targets.',
    },
    tags: ['llama-cpp', 'local', 'cpu'],
  },

  // ─── mlx-lm (2) ──────────────────────────────────────────────
  {
    id: 'solution:mlx-lm:1',
    source: 'solution',
    refSlug: 'mlx-lm',
    front: {
      tr: 'MLX-LM neden Apple Silicon için özelleşmiştir?',
      en: 'Why is MLX-LM specialized for Apple Silicon?',
    },
    back: {
      tr: 'Apple\'ın MLX framework\'ünü kullanarak birleşik bellek mimarisinden yararlanır; model yükleme, nicemleme, üretim ve LoRA akışlarını Mac\'te sadeleştirir. NVIDIA odaklı veri merkezi sunucusu değildir.',
      en: 'It uses Apple\'s MLX framework to exploit unified memory; simplifies model loading, quantization, generation, and LoRA workflows on Mac. Not an NVIDIA-focused data-center server.',
    },
    tags: ['mlx-lm', 'apple-silicon', 'inference'],
  },
  {
    id: 'solution:mlx-lm:2',
    source: 'solution',
    refSlug: 'mlx-lm',
    front: {
      tr: 'MLX-LM\'i hangi durumda tercih edersiniz, ne zaman seçmezsiniz?',
      en: 'When do you pick MLX-LM, and when do you avoid it?',
    },
    back: {
      tr: 'Mac üzerinde araştırma, prototipleme ve kişisel kullanım için idealdir. Apple donanımı dışında çalışmaz; veri merkezi ölçekli deployment için uygun değildir.',
      en: 'Ideal for research, prototyping, and personal use on Mac. Does not run outside Apple hardware; not suitable for data-center-scale deployment.',
    },
    tags: ['mlx-lm', 'mac', 'local'],
  },

  // ─── mlc-llm (2) ─────────────────────────────────────────────
  {
    id: 'solution:mlc-llm:1',
    source: 'solution',
    refSlug: 'mlc-llm',
    front: {
      tr: 'MLC LLM diğer motorlardan nasıl ayrılır?',
      en: 'How does MLC LLM differ from other engines?',
    },
    back: {
      tr: 'TVM tabanlı derleme yığını ile CUDA, Vulkan, Metal ve WebGPU gibi farklı hedeflerde taşınabilir yürütme sağlar. Aynı modeli birçok cihaz sınıfına taşımak için idealdir.',
      en: 'Uses a TVM-based compilation stack for portable execution across CUDA, Vulkan, Metal, WebGPU, etc. Ideal for taking the same model across many device classes.',
    },
    tags: ['mlc-llm', 'compiler', 'cross-platform'],
  },
  {
    id: 'solution:mlc-llm:2',
    source: 'solution',
    refSlug: 'mlc-llm',
    front: {
      tr: 'MLC LLM hangi senaryoda en uygun seçimdir?',
      en: 'Which scenario is MLC LLM best for?',
    },
    back: {
      tr: 'Bir model ailesini farklı cihaz sınıflarına (tarayıcı, mobil, GPU) taşımak isteyen ekipler için idealdir. Kutudan çıktığı haliyle kurumsal ağ geçidi değildir.',
      en: 'Ideal for teams wanting to ship one model family across device classes (browser, mobile, GPU). Not an out-of-the-box enterprise gateway.',
    },
    tags: ['mlc-llm', 'mobile', 'webgpu'],
  },

  // ─── lmdeploy (2) ────────────────────────────────────────────
  {
    id: 'solution:lmdeploy:1',
    source: 'solution',
    refSlug: 'lmdeploy',
    front: {
      tr: 'LMDeploy hangi katmanları birleştirir?',
      en: 'Which layers does LMDeploy combine?',
    },
    back: {
      tr: 'Model sıkıştırma, TurboMind çıkarım motoru ve servis dağıtımını birleştirir. NVIDIA GPU odaklıdır; AWQ nicemleme ve OpenAI uyumlu servis sağlar.',
      en: 'Combines model compression, the TurboMind inference engine, and serving. NVIDIA-GPU focused; provides AWQ quantization and OpenAI-compatible serving.',
    },
    tags: ['lmdeploy', 'serving', 'turbomind'],
  },
  {
    id: 'solution:lmdeploy:2',
    source: 'solution',
    refSlug: 'lmdeploy',
    front: {
      tr: 'LMDeploy hangi ekipler için en uygundur?',
      en: 'Which teams is LMDeploy best for?',
    },
    back: {
      tr: 'Model sıkıştırma ile üretim servisini birlikte isteyen ekipler için idealdir. En güçlü yolu NVIDIA GPU odaklıdır; Apple/CPU için uygun değildir.',
      en: 'Ideal for teams wanting model compression and production serving together. Its strongest path is NVIDIA-GPU-centric; not a fit for Apple/CPU.',
    },
    hint: {
      tr: 'Motor + servis bir arada.',
      en: 'Engine + serving in one.',
    },
    tags: ['lmdeploy', 'production', 'quantization'],
  },

  // ─── exllamav3 (2) ───────────────────────────────────────────
  {
    id: 'solution:exllamav3:1',
    source: 'solution',
    refSlug: 'exllamav3',
    front: {
      tr: 'ExLlamaV3 hangi kullanım senaryosuna odaklanır?',
      en: 'Which use case does ExLlamaV3 focus on?',
    },
    back: {
      tr: 'Tüketici sınıfı NVIDIA GPU\'larda düşük bitli (EXL2/EXL3) nicemlenmiş LLM çıkarımı için optimize edilmiş deneysel bir motordur. Tek kullanıcı/yerel GPU senaryolarında hız arar.',
      en: 'An experimental engine optimized for low-bit (EXL2/EXL3) quantized LLM inference on consumer NVIDIA GPUs. Targets single-user / local GPU workloads.',
    },
    tags: ['exllamav3', 'quantization', 'consumer-gpu'],
  },
  {
    id: 'solution:exllamav3:2',
    source: 'solution',
    refSlug: 'exllamav3',
    front: {
      tr: 'ExLlamaV3\'ü ne zaman seçersiniz, ne zaman seçmezsiniz?',
      en: 'When do you pick ExLlamaV3, and when do you avoid it?',
    },
    back: {
      tr: 'NVIDIA masaüstü GPU\'sunda nicemlenmiş modeller için idealdir. Dar donanım ve format kapsamı nedeniyle genel amaçlı çok sağlayıcılı sunum için uygun değildir; hızlı değişen deneysel projedir.',
      en: 'Ideal for quantized models on NVIDIA desktop GPUs. Narrow hardware/format scope makes it unsuitable for general multi-provider serving; it is a fast-moving experimental project.',
    },
    tags: ['exllamav3', 'local', 'experimental'],
  },

  // ─── openvino-genai (2) ──────────────────────────────────────
  {
    id: 'solution:openvino-genai:1',
    source: 'solution',
    refSlug: 'openvino-genai',
    front: {
      tr: 'OpenVINO GenAI hangi donanım portföyünü hedefler?',
      en: 'Which hardware portfolio does OpenVINO GenAI target?',
    },
    back: {
      tr: 'Intel CPU, GPU ve NPU hedeflerinde üretken yapay zekâ çıkarımı için OpenVINO boru hatlarını sunar. Cihazlar arası çalışma seçenekleriyle Intel optimizasyonlarından yararlanır.',
      en: 'Provides OpenVINO pipelines for generative AI inference on Intel CPU, GPU, and NPU. Leverages Intel hardware optimizations with cross-device execution options.',
    },
    tags: ['openvino-genai', 'intel', 'npu'],
  },
  {
    id: 'solution:openvino-genai:2',
    source: 'solution',
    refSlug: 'openvino-genai',
    front: {
      tr: 'OpenVINO GenAI hangi senaryo için idealdir?',
      en: 'Which scenario is OpenVINO GenAI ideal for?',
    },
    back: {
      tr: 'Intel tabanlı istemci, uç ve sunucu dağıtımları için idealdir. NVIDIA CUDA için birincil optimizasyon yolu değildir; en yüksek değer Intel ekosisteminde ortaya çıkar.',
      en: 'Ideal for Intel-based client, edge, and server deployments. Not the primary optimization path for NVIDIA CUDA; highest value comes inside the Intel ecosystem.',
    },
    tags: ['openvino-genai', 'edge', 'intel'],
  },

  // ─── onnx-runtime-genai (2) ──────────────────────────────────
  {
    id: 'solution:onnx-runtime-genai:1',
    source: 'solution',
    refSlug: 'onnx-runtime-genai',
    front: {
      tr: 'ONNX Runtime GenAI ne tür bir çalışma zamanıdır?',
      en: 'What kind of runtime is ONNX Runtime GenAI?',
    },
    back: {
      tr: 'ONNX modelleri için üretken yapay zekâ döngüsünü (token üretimi, örnekleme, KV önbellek yönetimi) donanım yürütme sağlayıcılarıyla (CUDA, DirectML, OpenVINO) birleştirir.',
      en: 'Combines the generative AI loop (token generation, sampling, KV cache management) for ONNX models with hardware execution providers (CUDA, DirectML, OpenVINO).',
    },
    tags: ['onnx-runtime-genai', 'onnx', 'cross-platform'],
  },
  {
    id: 'solution:onnx-runtime-genai:2',
    source: 'solution',
    refSlug: 'onnx-runtime-genai',
    front: {
      tr: 'ONNX Runtime GenAI ne zaman doğru seçimdir?',
      en: 'When is ONNX Runtime GenAI the right choice?',
    },
    back: {
      tr: 'ONNX standardını kullanan çok platformlu uygulamalar için idealdir. Tek başına yönetilen üretim kontrol düzlemi değildir; model dönüştürme ve destek kapsamı kontrol edilmelidir.',
      en: 'Ideal for cross-platform applications standardized on ONNX. Not a managed production control plane on its own; model conversion and support scope must be checked.',
    },
    tags: ['onnx-runtime-genai', 'application', 'edge'],
  },

  // ─── vllm (2) ────────────────────────────────────────────────
  {
    id: 'solution:vllm:1',
    source: 'solution',
    refSlug: 'vllm',
    front: {
      tr: 'vLLM LLM sunumunda hangi yenilikle öne çıkar?',
      en: 'What innovation does vLLM highlight in LLM serving?',
    },
    back: {
      tr: 'PagedAttention ve continuous batching ile yüksek eşzamanlı LLM sunumu sağlayan açık kaynaklı sunucu. OpenAI uyumlu API, geniş model desteği ve dağıtık çalışma yolları sunar.',
      en: 'An open-source server for high-concurrency LLM serving with PagedAttention and continuous batching. Provides OpenAI-compatible API, broad model support, and distributed paths.',
    },
    tags: ['vllm', 'serving', 'paged-attention'],
  },
  {
    id: 'solution:vllm:2',
    source: 'solution',
    refSlug: 'vllm',
    front: {
      tr: 'vLLM ne zaman en iyi seçimdir, ne zaman değildir?',
      en: 'When is vLLM the best choice, and when not?',
    },
    back: {
      tr: 'Açık kaynak modellerle üretim API hizmeti için güçlü varsayılandır. Grafik masaüstü istemcisi veya sağlayıcılar arası ağ geçidi olarak kullanılmaz; en iyi ayarlar iş yüküne göre ölçülmelidir.',
      en: 'A strong default for production API services with open models. Not a graphical desktop client or cross-provider gateway; best settings must be measured per workload.',
    },
    hint: {
      tr: 'PagedAttention, continuous batching.',
      en: 'PagedAttention, continuous batching.',
    },
    tags: ['vllm', 'production', 'open-source'],
  },

  // ─── sglang (2) ──────────────────────────────────────────────
  {
    id: 'solution:sglang:1',
    source: 'solution',
    refSlug: 'sglang',
    front: {
      tr: 'SGLang hangi özelliklerle öne çıkar?',
      en: 'What features set SGLang apart?',
    },
    back: {
      tr: 'Yapılandırılmış üretim, RadixAttention önbelleği ve dağıtık sunumu birleştiren hızlı LLM servis çerçevesi. Karmaşık üretim akışları için optimize edilmiştir.',
      en: 'A fast LLM serving framework combining structured generation, RadixAttention cache, and distributed serving. Optimized for complex generation flows.',
    },
    tags: ['sglang', 'serving', 'radix-cache'],
  },
  {
    id: 'solution:sglang:2',
    source: 'solution',
    refSlug: 'sglang',
    front: {
      tr: 'SGLang hangi senaryo için idealdir?',
      en: 'Which scenario is SGLang ideal for?',
    },
    back: {
      tr: 'Yapılandırılmış çıktı, ajan ve karmaşık çok aşamalı üretim akışları için idealdir. Son kullanıcı masaüstü uygulaması değildir; hızlı gelişen yüzeyi operasyonel takip ister.',
      en: 'Ideal for structured output, agents, and complex multi-stage generation flows. Not an end-user desktop app; its fast-moving surface needs operational tracking.',
    },
    tags: ['sglang', 'structured', 'agents'],
  },

  // ─── nvidia-triton (2) ───────────────────────────────────────
  {
    id: 'solution:nvidia-triton:1',
    source: 'solution',
    refSlug: 'nvidia-triton',
    front: {
      tr: 'NVIDIA Triton Inference Server ne tür bir sunucudur?',
      en: 'What kind of server is NVIDIA Triton Inference Server?',
    },
    back: {
      tr: 'Birden çok model çerçevesini (TensorRT-LLM, PyTorch, ONNX) ortak HTTP/gRPC servis katmanında çalıştıran genel amaçlı çıkarım sunucusu. LLM\'e özel bir runtime değil, orkestrasyon kabuğudur.',
      en: 'A general-purpose inference server running multiple model frameworks (TensorRT-LLM, PyTorch, ONNX) behind common HTTP/gRPC. Not an LLM-specific runtime; a server and orchestration shell.',
    },
    tags: ['nvidia-triton', 'serving', 'multi-framework'],
  },
  {
    id: 'solution:nvidia-triton:2',
    source: 'solution',
    refSlug: 'nvidia-triton',
    front: {
      tr: 'Triton ne zaman doğru seçimdir?',
      en: 'When is Triton the right choice?',
    },
    back: {
      tr: 'Aynı platformda farklı AI model türlerini (LLM, vision, speech) sunmak için idealdir. Konfigürasyon ve model deposu operasyonu karmaşık olabilir; saf bir LLM runtime\'ı değildir.',
      en: 'Ideal for serving different AI model types (LLM, vision, speech) on one platform. Config and model-repository operations can be complex; not a pure LLM runtime.',
    },
    tags: ['nvidia-triton', 'production', 'multi-model'],
  },

  // ─── localai (2) ─────────────────────────────────────────────
  {
    id: 'solution:localai:1',
    source: 'solution',
    refSlug: 'localai',
    front: {
      tr: 'LocalAI hangi sorunu çözer?',
      en: 'What problem does LocalAI solve?',
    },
    back: {
      tr: 'Farklı yerel çıkarım arka uçlarını (llama.cpp, vLLM, Transformers) OpenAI uyumlu API arkasında birleştiren kendi kendine barındırılan sunucu. LLM, görsel ve ses iş yüklerini yönlendirir.',
      en: 'A self-hosted server unifying multiple local inference backends (llama.cpp, vLLM, Transformers) behind an OpenAI-compatible API. Routes LLM, image, and audio workloads.',
    },
    tags: ['localai', 'gateway', 'self-hosted'],
  },
  {
    id: 'solution:localai:2',
    source: 'solution',
    refSlug: 'localai',
    front: {
      tr: 'LocalAI hangi durumda en uygundur?',
      en: 'When is LocalAI the best fit?',
    },
    back: {
      tr: 'Tek bir OpenAI uyumlu API ile farklı yerel motorları denemek isteyen ekipler için idealdir. Davranış seçilen arka uca göre değişir; tüm backend\'lerde aynı performans garantisi yoktur.',
      en: 'Ideal for teams wanting to try multiple local engines behind one OpenAI-compatible API. Behavior varies by selected backend; no uniform performance guarantee across backends.',
    },
    tags: ['localai', 'flexibility', 'api'],
  },

  // ─── xinference (2) ──────────────────────────────────────────
  {
    id: 'solution:xinference:1',
    source: 'solution',
    refSlug: 'xinference',
    front: {
      tr: 'Xinference platform olarak hangi modelleri kapsar?',
      en: 'Which models does Xinference cover as a platform?',
    },
    back: {
      tr: 'LLM, embedding, rerank, görüntü ve ses modellerini ortak servis API\'leriyle çalıştıran platform. Yerel ve dağıtık kurulumda model yaşam döngüsünü ve OpenAI uyumlu uç noktaları sağlar.',
      en: 'A platform serving LLM, embedding, reranking, image, and audio models through common service APIs. Provides model lifecycle and OpenAI-compatible endpoints in local or distributed setups.',
    },
    tags: ['xinference', 'serving', 'multi-model'],
  },
  {
    id: 'solution:xinference:2',
    source: 'solution',
    refSlug: 'xinference',
    front: {
      tr: 'Xinference ne zaman tercih edilir?',
      en: 'When is Xinference the right pick?',
    },
    back: {
      tr: 'Birden çok üretken AI model türünü tek platformda işletmek isteyen ekipler için idealdir. Tek bir donanıma özel en düşük seviyeli çekirdek motor değildir.',
      en: 'Ideal for teams operating several generative-AI model types on one platform. Not a low-level kernel engine specialized for one hardware target.',
    },
    tags: ['xinference', 'platform', 'multi-model'],
  },

  // ─── bentoml (2) ─────────────────────────────────────────────
  {
    id: 'solution:bentoml:1',
    source: 'solution',
    refSlug: 'bentoml',
    front: {
      tr: 'BentoML hangi katmanda yer alır?',
      en: 'Where does BentoML sit in the stack?',
    },
    back: {
      tr: 'Model kodunu ölçeklenebilir API servislerine paketlemek için Python çerçevesi. vLLM gibi motorları iş mantığı, bağımlılıklar, API şemaları ve dağıtım yapılandırmasıyla birleştirir.',
      en: 'A Python framework for packaging model code as scalable API services. Combines engines such as vLLM with business logic, dependencies, API schemas, and deployment configuration.',
    },
    tags: ['bentoml', 'framework', 'packaging'],
  },
  {
    id: 'solution:bentoml:2',
    source: 'solution',
    refSlug: 'bentoml',
    front: {
      tr: 'BentoML ne zaman doğru seçimdir?',
      en: 'When is BentoML the right choice?',
    },
    back: {
      tr: 'Özel Python mantığı içeren üretim model servisleri için idealdir. LLM token üretimini kendi başına yapan çekirdek motor değildir; performans seçilen motora bağlıdır.',
      en: 'Ideal for production model services with custom Python logic. Not the core engine that generates LLM tokens itself; performance depends on the chosen engine.',
    },
    tags: ['bentoml', 'application', 'production'],
  },

  // ─── hugging-face-tgi (2) ────────────────────────────────────
  {
    id: 'solution:hugging-face-tgi:1',
    source: 'solution',
    refSlug: 'hugging-face-tgi',
    front: {
      tr: 'Hugging Face TGI şu anda hangi konumdadır?',
      en: 'Where does Hugging Face TGI stand today?',
    },
    back: {
      tr: 'Tensor parallelism, streaming ve üretim sunumunu yaygınlaştıran eski bir proje; şu anda bakım kipinde tutulur. Yeni dağıtımlar için varsayılan öneri değildir; mevcut kurulumları anlamak için listelenir.',
      en: 'An older project that popularized tensor parallelism, streaming, and production serving; now in maintenance mode. Not the default recommendation for new deployments; listed for ecosystem context.',
    },
    tags: ['hugging-face-tgi', 'serving', 'maintenance'],
  },
  {
    id: 'solution:hugging-face-tgi:2',
    source: 'solution',
    refSlug: 'hugging-face-tgi',
    front: {
      tr: 'Hugging Face TGI ne zaman kullanılır?',
      en: 'When should you use Hugging Face TGI?',
    },
    back: {
      tr: 'Mevcut TGI kurulumlarını anlamak ve sürdürmek için idealdir. Yeni projeler için varsayılan öneri değildir; yeni özellik geliştirmesi beklenmemelidir.',
      en: 'Ideal for understanding and maintaining existing TGI deployments. Not the default recommendation for new projects; new feature development should not be expected.',
    },
    hint: {
      tr: 'Bakım kipinde.',
      en: 'Maintenance mode.',
    },
    tags: ['hugging-face-tgi', 'legacy', 'maintenance'],
  },

  // ─── ollama (2) ──────────────────────────────────────────────
  {
    id: 'solution:ollama:1',
    source: 'solution',
    refSlug: 'ollama',
    front: {
      tr: 'Ollama hangi kullanıcı deneyimini hedefler?',
      en: 'Which user experience does Ollama target?',
    },
    back: {
      tr: 'Modelleri tek komutla indirip yerel API ve sohbet akışıyla çalıştıran popüler model yöneticisi. Model paketleme, sürümleme, yerel depolama ve arka plan servis yaşam döngüsünü sade bir CLI/API\'de birleştirir.',
      en: 'A popular model manager that downloads and runs models via a single command and a local API/chat flow. Combines packaging, versioning, local storage, and background service lifecycle in a simple CLI/API.',
    },
    tags: ['ollama', 'runner', 'local'],
  },
  {
    id: 'solution:ollama:2',
    source: 'solution',
    refSlug: 'ollama',
    front: {
      tr: 'Ollama hangi senaryo için uygundur, üretim için yeterli midir?',
      en: 'Which scenario fits Ollama, and is it production-ready?',
    },
    back: {
      tr: 'Yerel geliştirme, prototipleme ve kişisel kullanım için idealdir. Yüksek ölçekli dağıtık üretim sunumunun doğrudan yerine geçmez; düşük seviye motor ayarları sınırlıdır.',
      en: 'Ideal for local development, prototyping, and personal use. Not a direct replacement for high-scale distributed production serving; lower-level engine tuning is limited.',
    },
    tags: ['ollama', 'local', 'prototyping'],
  },

  // ─── docker-model-runner (2) ─────────────────────────────────
  {
    id: 'solution:docker-model-runner:1',
    source: 'solution',
    refSlug: 'docker-model-runner',
    front: {
      tr: 'Docker Model Runner ne sunar?',
      en: 'What does Docker Model Runner offer?',
    },
    back: {
      tr: 'Yerel AI modellerini Docker iş akışları ve OCI paketleriyle çalıştıran Docker bileşeni. Model çekme, donanım hızlandırma ve OpenAI uyumlu uç noktaları geliştiricinin mevcut Docker deneyimine taşır.',
      en: 'A Docker component that runs local AI models through Docker workflows and OCI packages. Brings model pulls, hardware acceleration, and OpenAI-compatible endpoints into the existing Docker developer workflow.',
    },
    tags: ['docker-model-runner', 'docker', 'local'],
  },
  {
    id: 'solution:docker-model-runner:2',
    source: 'solution',
    refSlug: 'docker-model-runner',
    front: {
      tr: 'Docker Model Runner ne zaman tercih edilir?',
      en: 'When is Docker Model Runner the right pick?',
    },
    back: {
      tr: 'Docker kullanan ekiplerin yerel AI geliştirmesi için idealdir. Tek başına çok düğümlü Kubernetes çıkarım platformu değildir; platform ve sürüm desteği hızla gelişmektedir.',
      en: 'Ideal for local AI development by teams already using Docker. Not a multi-node Kubernetes inference platform on its own; platform and version support are evolving quickly.',
    },
    tags: ['docker-model-runner', 'docker', 'dev'],
  },

  // ─── ramalama (2) ────────────────────────────────────────────
  {
    id: 'solution:ramalama:1',
    source: 'solution',
    refSlug: 'ramalama',
    front: {
      tr: 'RamaLama hangi farklılaşmayı sunar?',
      en: 'What differentiation does RamaLama offer?',
    },
    back: {
      tr: 'AI modellerini donanıma uygun rootless container\'larda çekip çalıştıran açık kaynaklı geliştirici aracı. Podman veya Docker ile uygun hızlandırılmış görüntüyü seçer; birden çok model kaydını yönetir.',
      en: 'An open-source developer tool that pulls and runs AI models in hardware-aware rootless containers. Uses Podman or Docker to select an accelerated image; manages multiple model registries with container-like commands.',
    },
    tags: ['ramalama', 'containers', 'rootless'],
  },
  {
    id: 'solution:ramalama:2',
    source: 'solution',
    refSlug: 'ramalama',
    front: {
      tr: 'RamaLama hangi ekipler için uygundur?',
      en: 'Which teams is RamaLama a good fit for?',
    },
    back: {
      tr: 'Container güvenliği ve taşınabilirliği isteyen yerel ekipler için idealdir. Tam kurumsal küme kontrol düzlemi değildir; container çalışma zamanı bağımlılığı vardır.',
      en: 'Ideal for local teams wanting container isolation and portability. Not a full enterprise cluster control plane; container-runtime dependency.',
    },
    tags: ['ramalama', 'security', 'local'],
  },

  // ─── lm-studio (2) ───────────────────────────────────────────
  {
    id: 'solution:lm-studio:1',
    source: 'solution',
    refSlug: 'lm-studio',
    front: {
      tr: 'LM Studio hangi kullanıcı kitlesini hedefler?',
      en: 'Which audience does LM Studio target?',
    },
    back: {
      tr: 'Yerel modelleri keşfetmek, sohbet etmek ve geliştirici API\'si açmak için masaüstü çalışma alanı. Grafik model kataloğu, sohbet/playground, donanım ayarları ve OpenAI uyumlu yerel sunucuyu birleştirir.',
      en: 'A desktop workspace for discovering local models, chatting, and exposing a developer API. Combines a graphical model catalog, chat/playground, hardware controls, and an OpenAI-compatible local server.',
    },
    tags: ['lm-studio', 'desktop', 'local'],
  },
  {
    id: 'solution:lm-studio:2',
    source: 'solution',
    refSlug: 'lm-studio',
    front: {
      tr: 'LM Studio üretim ortamı için uygun mudur?',
      en: 'Is LM Studio suitable for production environments?',
    },
    back: {
      tr: 'Mac/Windows/Linux üzerinde model keşfi ve yerel geliştirme için idealdir. Çok düğümlü üretim sunucusu veya açık kaynak çekirdek motor değildir; kapalı kaynaklı ürün bileşenleri içerir.',
      en: 'Ideal for model discovery and local development on Mac/Windows/Linux. Not a multi-node production server or open-source core engine; contains proprietary product components.',
    },
    tags: ['lm-studio', 'desktop', 'no-production'],
  },

  // ─── jan (2) ─────────────────────────────────────────────────
  {
    id: 'solution:jan:1',
    source: 'solution',
    refSlug: 'jan',
    front: {
      tr: 'Jan hangi özellikleri birleştirir?',
      en: 'Which features does Jan combine?',
    },
    back: {
      tr: 'Yerel ve uzaktaki modeller için açık kaynaklı masaüstü sohbet ve geliştirici çalışma alanı. Yerel model çalıştırma, uzantılar ve OpenAI uyumlu API ile kontrol edilebilir bir masaüstü deneyimi sunar.',
      en: 'An open-source desktop chat and developer workspace for local and remote models. Provides local execution, extensions, and an OpenAI-compatible API in a controllable desktop experience.',
    },
    tags: ['jan', 'desktop', 'open-source'],
  },
  {
    id: 'solution:jan:2',
    source: 'solution',
    refSlug: 'jan',
    front: {
      tr: 'Jan ne zaman tercih edilir?',
      en: 'When is Jan the right pick?',
    },
    back: {
      tr: 'Açık kaynaklı, genişletilebilir yerel asistan deneyimi isteyen kullanıcılar için idealdir. Büyük ölçekli küme sunumu için ana kontrol düzlemi değildir; motor performansı seçilen arka uca bağlıdır.',
      en: 'Ideal for users wanting an open, extensible local assistant experience. Not the primary control plane for large-scale cluster serving; engine performance depends on the selected backend.',
    },
    tags: ['jan', 'open-source', 'desktop'],
  },

  // ─── gpt4all (2) ─────────────────────────────────────────────
  {
    id: 'solution:gpt4all:1',
    source: 'solution',
    refSlug: 'gpt4all',
    front: {
      tr: 'GPT4All hangi kullanım senaryosunu hedefler?',
      en: 'Which use case does GPT4All target?',
    },
    back: {
      tr: 'Tüketici cihazlarında çevrimdışı sohbet ve yerel belge kullanımı sunan masaüstü LLM uygulaması. Kolay model indirme, LocalDocs ve yerel API ile veri gizliliği odaklı kişisel kullanım sağlar.',
      en: 'A desktop LLM application for offline chat and local-document use on consumer devices. Easy model downloads, LocalDocs, and a local API for privacy-oriented personal use.',
    },
    tags: ['gpt4all', 'desktop', 'offline'],
  },
  {
    id: 'solution:gpt4all:2',
    source: 'solution',
    refSlug: 'gpt4all',
    front: {
      tr: 'GPT4All üretim API\'si için uygun mudur?',
      en: 'Is GPT4All suitable as a production API?',
    },
    back: {
      tr: 'Kişisel çevrimdışı sohbet ve yerel dokümanlar için idealdir. Yüksek eşzamanlı kurumsal model sunucusu değildir; üretim API ve ölçekleme yetenekleri sınırlıdır.',
      en: 'Ideal for personal offline chat and local documents. Not a high-concurrency enterprise model server; production API and scaling capabilities are limited.',
    },
    tags: ['gpt4all', 'offline', 'privacy'],
  },

  // ─── anythingllm (2) ─────────────────────────────────────────
  {
    id: 'solution:anythingllm:1',
    source: 'solution',
    refSlug: 'anythingllm',
    front: {
      tr: 'AnythingLLM hangi katmanda durur?',
      en: 'Where does AnythingLLM sit in the stack?',
    },
    back: {
      tr: 'Belgeler, RAG çalışma alanları, ajanlar ve çoklu model sağlayıcılarını birleştiren masaüstü/web uygulaması. Yerel veya bulut modellerini vektör veritabanları ve takım/çalışma alanı akışlarıyla son kullanıcı deneyimine dönüştürür.',
      en: 'A desktop and web application combining documents, RAG workspaces, agents, and multiple model providers. Turns local or cloud models into an end-user experience with vector DBs and workspace flows.',
    },
    tags: ['anythingllm', 'app', 'rag'],
  },
  {
    id: 'solution:anythingllm:2',
    source: 'solution',
    refSlug: 'anythingllm',
    front: {
      tr: 'AnythingLLM ne zaman tercih edilir?',
      en: 'When is AnythingLLM the right pick?',
    },
    back: {
      tr: 'Belge tabanlı ekip asistanları ve hızlı RAG prototipleri için idealdir. Model ağırlıklarını optimize eden çekirdek çıkarım motoru değildir; alt katman motorunun performansını değiştirmez.',
      en: 'Ideal for document-based team assistants and rapid RAG prototypes. Not a core inference engine that optimizes model weights; does not change the underlying engine performance.',
    },
    tags: ['anythingllm', 'rag', 'team'],
  },

  // ─── open-webui (2) ──────────────────────────────────────────
  {
    id: 'solution:open-webui:1',
    source: 'solution',
    refSlug: 'open-webui',
    front: {
      tr: 'Open WebUI hangi rolü üstlenir?',
      en: 'Which role does Open WebUI take?',
    },
    back: {
      tr: 'Ollama ve OpenAI uyumlu sunucular için zengin, kendi kendine barındırılan web çalışma alanı. Sohbet, model seçimi, bilgi tabanı, araçlar ve kullanıcı yönetimini mevcut model sunucularının üzerine ekler.',
      en: 'A rich self-hosted web workspace for Ollama and OpenAI-compatible servers. Adds chat, model selection, knowledge, tools, and user management on top of existing model servers.',
    },
    tags: ['open-webui', 'ui', 'self-hosted'],
  },
  {
    id: 'solution:open-webui:2',
    source: 'solution',
    refSlug: 'open-webui',
    front: {
      tr: 'Open WebUI doğrudan inference motoru mudur?',
      en: 'Is Open WebUI itself an inference engine?',
    },
    back: {
      tr: 'Mevcut model API\'lerinin üstünde ekip sohbet arayüzü için idealdir. Token üreten çıkarım motoru değildir; altta bir model sunucusu gerekir. Güvenli üretim için kullanıcı ve eklenti yüzeyi yönetilmelidir.',
      en: 'Ideal as a team chat UI over existing model APIs. Not the token-generating engine; it requires an underlying model server. User and plugin surfaces need management for secure production.',
    },
    tags: ['open-webui', 'frontend', 'ui'],
  },

  // ─── nvidia-dynamo (2) ───────────────────────────────────────
  {
    id: 'solution:nvidia-dynamo:1',
    source: 'solution',
    refSlug: 'nvidia-dynamo',
    front: {
      tr: 'NVIDIA Dynamo hangi mimari sorunu çözer?',
      en: 'Which architectural problem does NVIDIA Dynamo solve?',
    },
    back: {
      tr: 'Çok düğümlü üretken AI çıkarımını ayrıştırmak ve ölçeklemek için NVIDIA\'nın açık kaynaklı dağıtık çalışma zamanı. Akıllı yönlendirme, KV önbellek yönetimi ve prefill/decode ayrıştırmasını koordine eder.',
      en: 'NVIDIA\'s open-source distributed runtime for disaggregating and scaling multi-node generative-AI inference. Coordinates smart routing, KV cache management, and prefill/decode disaggregation.',
    },
    tags: ['nvidia-dynamo', 'distributed', 'disaggregated'],
  },
  {
    id: 'solution:nvidia-dynamo:2',
    source: 'solution',
    refSlug: 'nvidia-dynamo',
    front: {
      tr: 'NVIDIA Dynamo hangi senaryo için uygundur?',
      en: 'Which scenario fits NVIDIA Dynamo?',
    },
    back: {
      tr: 'Çok düğümlü yüksek ölçekli GPU kümeleri için idealdir. En güçlü entegrasyon NVIDIA ekosistemindedir; tek dizüstünde en basit yerel model çalıştırıcı değildir.',
      en: 'Ideal for high-scale multi-node GPU clusters. Strongest integration is within the NVIDIA ecosystem; not the simplest local model runner for one laptop.',
    },
    tags: ['nvidia-dynamo', 'cluster', 'scale'],
  },

  // ─── ray-serve-llm (2) ───────────────────────────────────────
  {
    id: 'solution:ray-serve-llm:1',
    source: 'solution',
    refSlug: 'ray-serve-llm',
    front: {
      tr: 'Ray Serve LLM hangi katmanda konumlanır?',
      en: 'Where does Ray Serve LLM sit in the stack?',
    },
    back: {
      tr: 'Ray Serve üzerinde LLM dağıtımı, çoğaltma, otomatik ölçekleme ve çoklu model kompozisyonu. Python tabanlı dağıtık uygulama modeliyle vLLM gibi motorları ölçeklenebilir servis grafikleri içinde çalıştırır.',
      en: 'LLM deployment, replication, autoscaling, and multi-model composition on Ray Serve. Runs engines such as vLLM in scalable service graphs using a Python-based distributed application model.',
    },
    tags: ['ray-serve-llm', 'serving', 'python'],
  },
  {
    id: 'solution:ray-serve-llm:2',
    source: 'solution',
    refSlug: 'ray-serve-llm',
    front: {
      tr: 'Ray Serve LLM ne zaman doğru seçimdir?',
      en: 'When is Ray Serve LLM the right choice?',
    },
    back: {
      tr: 'LLM\'i daha geniş dağıtık Python uygulamalarıyla birleştirmek isteyen ekipler için idealdir. Düşük seviyeli token üretim motoru değildir; Ray kümesi işletme karmaşıklığı vardır.',
      en: 'Ideal for teams combining LLMs with broader distributed Python applications. Not a low-level token-generation engine itself; Ray cluster operational complexity.',
    },
    tags: ['ray-serve-llm', 'python', 'scale'],
  },

  // ─── llm-d (2) ───────────────────────────────────────────────
  {
    id: 'solution:llm-d:1',
    source: 'solution',
    refSlug: 'llm-d',
    front: {
      tr: 'llm-d projesinin amacı nedir?',
      en: 'What is the goal of the llm-d project?',
    },
    back: {
      tr: 'Kubernetes üzerinde yüksek ölçekli dağıtık LLM çıkarımı için açık, bileşen tabanlı servis projesi. vLLM, Kubernetes Gateway API, akıllı yönlendirme ve KV/prefill-decode bileşenlerini açık bir mimaride birleştirir.',
      en: 'An open, component-based project for high-scale distributed LLM inference on Kubernetes. Combines vLLM, Kubernetes Gateway API, smart routing, and KV/prefill-decode components in an open architecture.',
    },
    tags: ['llm-d', 'kubernetes', 'distributed'],
  },
  {
    id: 'solution:llm-d:2',
    source: 'solution',
    refSlug: 'llm-d',
    front: {
      tr: 'llm-d hangi ekipler için uygundur?',
      en: 'Which teams is llm-d a good fit for?',
    },
    back: {
      tr: 'Kubernetes üzerinde açık dağıtık LLM yığını kuran platform ekipleri için idealdir. Erken aşamadadır; API ve operasyon kalıpları değişebilir. Yerel masaüstü deneyimi değildir.',
      en: 'Ideal for platform teams building an open distributed LLM stack on Kubernetes. Early-stage; APIs and operational patterns may change. Not a local desktop experience.',
    },
    tags: ['llm-d', 'kubernetes', 'preview'],
  },

  // ─── kserve (2) ──────────────────────────────────────────────
  {
    id: 'solution:kserve:1',
    source: 'solution',
    refSlug: 'kserve',
    front: {
      tr: 'KServe hangi platformda standartlaştırma sağlar?',
      en: 'Where does KServe provide standardization?',
    },
    back: {
      tr: 'Kubernetes üzerinde tahmine dayalı ve üretken modeller için standartlaştırılmış model sunum platformu. LLMInferenceService ile motor, yönlendirici ve dağıtım ayrıntılarını Kubernetes kaynakları ve otomatik ölçeklemeyle yönetir.',
      en: 'A standardized model-serving platform for predictive and generative models on Kubernetes. Uses LLMInferenceService to manage engines, routers, and deployment details with Kubernetes resources and autoscaling.',
    },
    tags: ['kserve', 'kubernetes', 'serving'],
  },
  {
    id: 'solution:kserve:2',
    source: 'solution',
    refSlug: 'kserve',
    front: {
      tr: 'KServe hangi senaryo için uygundur?',
      en: 'Which scenario fits KServe?',
    },
    back: {
      tr: 'Kubernetes üzerinde ortak model servis platformu için idealdir. Kubernetes olmadan hafif yerel çalışma zamanı değildir; platform işletme yükü vardır.',
      en: 'Ideal for a shared model-serving platform on Kubernetes. Not a lightweight local runtime without Kubernetes; platform operational overhead.',
    },
    tags: ['kserve', 'kubernetes', 'platform'],
  },

  // ─── litellm-proxy (2) ───────────────────────────────────────
  {
    id: 'solution:litellm-proxy:1',
    source: 'solution',
    refSlug: 'litellm-proxy',
    front: {
      tr: 'LiteLLM Proxy hangi problemi çözer?',
      en: 'Which problem does LiteLLM Proxy solve?',
    },
    back: {
      tr: 'Yüzlerce LLM sağlayıcısını OpenAI uyumlu API, yönlendirme, fallback ve bütçe politikalarıyla birleştiren ağ geçidi. Kimlik, maliyet, kota, gözlemlenebilirlik ve hata devri sağlar.',
      en: 'A gateway unifying hundreds of LLM providers with OpenAI-compatible API, routing, fallback, and budget policies. Provides identity, cost, quotas, observability, and failover.',
    },
    tags: ['litellm-proxy', 'gateway', 'providers'],
  },
  {
    id: 'solution:litellm-proxy:2',
    source: 'solution',
    refSlug: 'litellm-proxy',
    front: {
      tr: 'LiteLLM Proxy ne zaman tercih edilir?',
      en: 'When is LiteLLM Proxy the right pick?',
    },
    back: {
      tr: 'Birden çok bulut/yerel model API\'sini yöneten ekipler için idealdir. Model ağırlıklarını doğrudan çalıştırmaz; ek ağ katmanı ve yönetişim yüzeyi ekler.',
      en: 'Ideal for teams managing multiple cloud and local model APIs. Does not directly execute model weights; adds an extra network and governance layer.',
    },
    tags: ['litellm-proxy', 'governance', 'routing'],
  },

  // ─── kong-ai-gateway (2) ─────────────────────────────────────
  {
    id: 'solution:kong-ai-gateway:1',
    source: 'solution',
    refSlug: 'kong-ai-gateway',
    front: {
      tr: 'Kong AI Gateway hangi kurumsal ihtiyaca cevap verir?',
      en: 'Which enterprise need does Kong AI Gateway address?',
    },
    back: {
      tr: 'Kong\'un API ağ geçidi yeteneklerini LLM yönlendirme, istem güvenliği ve gözlemlenebilirlikle genişleten ürün katmanı. Mevcut API yönetimi pratiklerine model sağlayıcı soyutlama, politika eklentileri ve trafik yönetimi ekler.',
      en: 'A product layer extending Kong API-gateway capabilities with LLM routing, prompt security, and observability. Adds model-provider abstraction, policy plugins, and traffic management to API-management practices.',
    },
    tags: ['kong-ai-gateway', 'api-gateway', 'security'],
  },
  {
    id: 'solution:kong-ai-gateway:2',
    source: 'solution',
    refSlug: 'kong-ai-gateway',
    front: {
      tr: 'Kong AI Gateway ne zaman tercih edilir?',
      en: 'When is Kong AI Gateway the right pick?',
    },
    back: {
      tr: 'Kong kullanan kurumlarda merkezi LLM API yönetişimi için idealdir. Model çalıştıran çıkarım sunucusu değildir; bazı yetenekler ticari sürüme bağlı olabilir.',
      en: 'Ideal for central LLM API governance in organizations using Kong. Not an inference server that runs models; some capabilities may depend on commercial editions.',
    },
    tags: ['kong-ai-gateway', 'enterprise', 'gateway'],
  },

  // ─── executorch (2) ──────────────────────────────────────────
  {
    id: 'solution:executorch:1',
    source: 'solution',
    refSlug: 'executorch',
    front: {
      tr: 'ExecuTorch hangi platformu hedefler?',
      en: 'Which platform does ExecuTorch target?',
    },
    back: {
      tr: 'PyTorch modellerini mobil, gömülü ve uç cihazlarda çalıştırmak için cihaz üzeri çıkarım çalışma zamanı. Model dışa aktarma, hafif çalışma zamanı ve platforma özgü hızlandırıcı arka uçlarını uygulama paketine taşır.',
      en: 'An on-device inference runtime for running PyTorch models on mobile, embedded, and edge devices. Brings model export, a lightweight runtime, and platform-specific accelerator backends into the application package.',
    },
    tags: ['executorch', 'mobile', 'edge'],
  },
  {
    id: 'solution:executorch:2',
    source: 'solution',
    refSlug: 'executorch',
    front: {
      tr: 'ExecuTorch hangi senaryo için uygundur?',
      en: 'Which scenario fits ExecuTorch?',
    },
    back: {
      tr: 'Mobil uygulama ve gömülü cihaz içine model gömmek için idealdir. Merkezi çok kullanıcılı LLM API sunucusu değildir; model ve operatör desteği hedefe göre doğrulanmalıdır.',
      en: 'Ideal for embedding models inside mobile apps and embedded devices. Not a centralized multi-user LLM API server; model and operator support must be validated per target.',
    },
    tags: ['executorch', 'mobile', 'embedded'],
  },

  // ─── webllm (2) ──────────────────────────────────────────────
  {
    id: 'solution:webllm:1',
    source: 'solution',
    refSlug: 'webllm',
    front: {
      tr: 'WebLLM hangi benzersiz dağıtım modeli sunar?',
      en: 'Which unique deployment model does WebLLM offer?',
    },
    back: {
      tr: 'LLM çıkarımını WebGPU ile doğrudan tarayıcıda çalıştıran JavaScript çalışma zamanı. Model indirme/önbellekleme, worker desteği ve OpenAI benzeri API ile sunucusuz web deneyimleri oluşturur.',
      en: 'A JavaScript runtime that runs LLM inference directly in the browser via WebGPU. Enables serverless web experiences with model download/cache, workers, and an OpenAI-like API.',
    },
    tags: ['webllm', 'browser', 'webgpu'],
  },
  {
    id: 'solution:webllm:2',
    source: 'solution',
    refSlug: 'webllm',
    front: {
      tr: 'WebLLM hangi senaryo için uygundur?',
      en: 'Which scenario fits WebLLM?',
    },
    back: {
      tr: 'Sunucusuz web demoları ve istemci tarafı AI özellikleri için idealdir. Merkezi yüksek eşzamanlı veri merkezi sunucusu değildir; WebGPU ve istemci belleği/donanımıyla sınırlıdır, ilk model indirme maliyeti vardır.',
      en: 'Ideal for serverless web demos and client-side AI features. Not a centralized high-concurrency data-center server; limited by WebGPU and client hardware, with first-model download cost.',
    },
    tags: ['webllm', 'browser', 'privacy'],
  },
]
