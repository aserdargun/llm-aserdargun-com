import type { QuizQuestion } from '@/types/learning'

/**
 * Quiz bank. MCQ, true/false, and matching questions, all tagged so the
 * learner can drill by concept family or by decision skill.
 */
export const quizzes: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════
  //  Kavram Eşleştirme (20) — "Bu cümle hangi kavramı tanımlar?"
  // ═══════════════════════════════════════════════════════════

  {
    id: 'quiz:concept:tokenization:1',
    kind: 'mcq',
    prompt: {
      tr: 'Modelin metni işleyebilmesi için onu küçük sayısal parçalara bölme işlemine ne ad verilir?',
      en: 'What is the name of the process that splits text into small numerical pieces so a model can process it?',
    },
    options: [
      { tr: 'Tokenization', en: 'Tokenization' },
      { tr: 'Embedding', en: 'Embedding' },
      { tr: 'Attention', en: 'Attention' },
      { tr: 'Sampling', en: 'Sampling' },
    ],
    correct: 0,
    explain: {
      tr: 'Tokenization, metni token adı verilen küçük parçalara böler ve her birine bir sayı (ID) atar; model bu sayılarla çalışır, harflerle değil.',
      en: 'Tokenization splits text into small pieces (tokens) and assigns each a numeric ID; the model works with those numbers, not with letters.',
    },
    tags: ['tokenization', 'concept', 'basics'],
  },
  {
    id: 'quiz:concept:context-window:1',
    kind: 'mcq',
    prompt: {
      tr: 'Bir LLM\'in tek bir çağrıda işleyebildiği token sayısı sınırına ne denir?',
      en: 'What is the maximum number of tokens a model can process in a single call called?',
    },
    options: [
      { tr: 'Context window', en: 'Context window' },
      { tr: 'Attention span', en: 'Attention span' },
      { tr: 'Memory budget', en: 'Memory budget' },
      { tr: 'Token ceiling', en: 'Token ceiling' },
    ],
    correct: 0,
    explain: {
      tr: 'Context window (bağlam penceresi), modelin hem girdi hem çıktı için tek seferde görebildiği toplam token sayısıdır; aşılırsa model bağlamın başını unutur.',
      en: 'The context window is the total number of tokens a model can see in a single call (input + output); exceeding it makes the model "forget" the beginning.',
    },
    tags: ['context-window', 'concept', 'memory'],
  },
  {
    id: 'quiz:concept:attention:1',
    kind: 'mcq',
    prompt: {
      tr: 'Self-attention mekanizmasında her token için oluşturulan Q, K, V ne anlama gelir?',
      en: 'What do Q, K, V stand for in the self-attention mechanism?',
    },
    options: [
      { tr: 'Quality, Kernel, Value', en: 'Quality, Kernel, Value' },
      { tr: 'Quick, Knowledge, Vector', en: 'Quick, Knowledge, Vector' },
      { tr: 'Query, Key, Value', en: 'Query, Key, Value' },
      { tr: 'Quantity, Knowledge, Verbosity', en: 'Quantity, Knowledge, Verbosity' },
    ],
    correct: 2,
    explain: {
      tr: 'Q (Query) "ne arıyorum?", K (Key) "neler sunuyorum?", V (Value) "bulunursa ne katkı sağlarım?" sorularını temsil eder; dikkat skoru softmax(Q·Kᵀ / √d_k) · V formülüyle hesaplanır.',
      en: 'Q (Query) means "what am I looking for?", K (Key) "what do I offer?", V (Value) "what do I contribute if I\'m found?"; the attention score is softmax(Q·Kᵀ / √d_k) · V.',
    },
    tags: ['attention', 'concept', 'transformer'],
  },
  {
    id: 'quiz:concept:prompt:1',
    kind: 'mcq',
    prompt: {
      tr: 'İyi bir prompt\'un dört temel bileşeni hangisidir?',
      en: 'What are the four basic components of a good prompt?',
    },
    options: [
      { tr: 'Rol, görev, bağlam, format', en: 'Role, task, context, format' },
      { tr: 'Plan, analiz, sonuç, özet', en: 'Plan, analysis, result, summary' },
      { tr: 'Giriş, gelişme, sonuç, ek', en: 'Introduction, body, conclusion, appendix' },
      { tr: 'Soru, kaynak, cevap, kanıt', en: 'Question, source, answer, proof' },
    ],
    correct: 0,
    explain: {
      tr: 'İyi bir prompt; rol/kişilik, görev tanımı, bağlam/veri ve format/kısıttan oluşur. Bu dört bileşen olmadan pahalı tokenlarla belirsiz cevap alırsın.',
      en: 'A good prompt has role/persona, task definition, context/data, and format/constraint. Without these, you get an ambiguous answer paid for with expensive tokens.',
    },
    tags: ['prompt', 'concept', 'design'],
  },
  {
    id: 'quiz:concept:embedding:1',
    kind: 'mcq',
    prompt: {
      tr: 'Metni anlamca yakınlık koruyacak şekilde bir sayı vektörüne çevirme işlemine ne denir?',
      en: 'What is the process of converting text into a numeric vector that preserves semantic closeness called?',
    },
    options: [
      { tr: 'Tokenization', en: 'Tokenization' },
      { tr: 'Encoding', en: 'Encoding' },
      { tr: 'Embedding', en: 'Embedding' },
      { tr: 'Quantization', en: 'Quantization' },
    ],
    correct: 2,
    explain: {
      tr: 'Embedding, metin/görsel/ses\'i yoğun bir sayı vektörüne çevirir; anlamca yakın şeyler vektör uzayında da yakın olur. RAG, semantik arama ve kümeleme için temel yapı taşıdır.',
      en: 'Embedding converts text/image/audio into a dense numeric vector; semantically close things end up close in vector space. It is the building block of RAG, semantic search, and clustering.',
    },
    tags: ['embedding', 'concept', 'rag'],
  },
  {
    id: 'quiz:concept:temperature:1',
    kind: 'mcq',
    prompt: {
      tr: 'Temperature=0.0 sampling ayarı ne anlama gelir?',
      en: 'What does a Temperature=0.0 sampling setting mean?',
    },
    options: [
      { tr: 'Tamamen rastgele cevap üretir', en: 'Fully random output' },
      { tr: 'Greedy decoding: her zaman en yüksek olasılıklı token seçilir', en: 'Greedy decoding: always picks the highest-probability token' },
      { tr: 'Yüksek çeşitlilikte yaratıcı çıktı verir', en: 'High-diversity creative output' },
      { tr: 'Cevap üretmez, hata döner', en: 'Produces no output, returns an error' },
    ],
    correct: 1,
    explain: {
      tr: 'T=0.0 greedy decoding\'dir; model her zaman en yüksek olasılıklı token\'ı seçer. Tutarlı ve tekrarlanabilir sonuç verir, kod ve veri çıkarma gibi deterministik görevler için idealdir.',
      en: 'T=0.0 is greedy decoding: the model always picks the highest-probability token. It gives consistent, reproducible output, ideal for deterministic tasks like code and data extraction.',
    },
    tags: ['temperature', 'concept', 'sampling'],
  },
  {
    id: 'quiz:concept:top-p:1',
    kind: 'mcq',
    prompt: {
      tr: 'Nucleus sampling (Top-p) nasıl çalışır?',
      en: 'How does nucleus sampling (Top-p) work?',
    },
    options: [
      { tr: 'İlk K token\'ı seçer', en: 'Picks the first K tokens' },
      { tr: 'Rastgele N token seçer', en: 'Picks N random tokens' },
      { tr: 'Olasılık kütlesinin en üstteki p kadarını alıp oradan örnekler', en: 'Takes the top tokens whose probabilities sum to p, samples from them' },
      { tr: 'Her zaman en yüksek olasılıklı token\'ı seçer', en: 'Always picks the highest-probability token' },
    ],
    correct: 2,
    explain: {
      tr: 'Top-p, olasılıkları büyükten küçüğe sıralar ve birikimli toplam p\'ye ulaşana kadar olan tokenlardan örnekler. p=0.9 genellikle 5-15 aday bırakır; sabit Top-k\'dan daha sağlıklıdır.',
      en: 'Top-p sorts probabilities high-to-low and samples from tokens until the cumulative sum reaches p. p=0.9 usually leaves 5-15 candidates; it is healthier than a fixed Top-k.',
    },
    tags: ['top-p', 'concept', 'sampling'],
  },
  {
    id: 'quiz:concept:system-prompt:1',
    kind: 'mcq',
    prompt: {
      tr: 'Sistem istemi (system prompt) hangi amaçla kullanılır?',
      en: 'What is the system prompt used for?',
    },
    options: [
      { tr: 'Modelin rolünü, kurallarını ve çıktı formatını kalıcı olarak tanımlamak', en: 'To define the model\'s persistent role, rules, and output format' },
      { tr: 'Kullanıcının her mesajını ayrı ayrı sarmalamak', en: 'To wrap each user message separately' },
      { tr: 'Modeli hızlandırmak', en: 'To speed up the model' },
      { tr: 'GPU bellek kullanımını azaltmak', en: 'To reduce GPU memory usage' },
    ],
    correct: 0,
    explain: {
      tr: 'System prompt, modelin persona\'sını, kısıtlamalarını ve araç çağrı izinlerini tanımlar. OpenAI modelleri system mesajına daha yüksek ağırlık verir; talimatı oraya koymak user mesajına koymaktan daha etkilidir.',
      en: 'The system prompt defines the model\'s persona, constraints, and tool-calling permissions. OpenAI models weight system messages more heavily, so instructions there are more effective than in the user message.',
    },
    tags: ['system-prompt', 'concept', 'roles'],
  },
  {
    id: 'quiz:concept:kv-cache:1',
    kind: 'mcq',
    prompt: {
      tr: 'Üretim çıkarımında her yeni token için önceki tüm tokenların Key/Value vektörlerini saklayan yapı nedir?',
      en: 'What is the structure that stores the Key/Value vectors of all previous tokens for each new token in production inference?',
    },
    options: [
      { tr: 'Attention buffer', en: 'Attention buffer' },
      { tr: 'KV cache', en: 'KV cache' },
      { tr: 'Context store', en: 'Context store' },
      { tr: 'Token reservoir', en: 'Token reservoir' },
    ],
    correct: 1,
    explain: {
      tr: 'KV cache, katmanların geçmiş K/V tensörlerini saklayarak her decode adımında geçmiş dikkati yeniden hesaplamayı önler. Uzun bağlam ve yüksek eşzamanlılıkta önemli bir GPU belleği tüketicisidir.',
      en: 'KV cache stores past K/V tensors for each layer, avoiding recomputation of prior attention at every decode step. It becomes a major GPU-memory consumer with long contexts and high concurrency.',
    },
    tags: ['kv-cache', 'concept', 'optimization'],
  },
  {
    id: 'quiz:concept:batching:1',
    kind: 'mcq',
    prompt: {
      tr: 'vLLM\'in temel yeniliği olan continuous batching\'in en büyük avantajı nedir?',
      en: 'What is the main advantage of vLLM\'s innovation: continuous batching?',
    },
    options: [
      { tr: 'Tüm istekler eşit uzunlukta olur', en: 'All requests become the same length' },
      { tr: 'Kısa istekler uzun olanları beklemez', en: 'Short requests do not wait for long ones' },
      { tr: 'Bellek tüketimi sıfırlanır', en: 'Memory consumption drops to zero' },
      { tr: 'GPU\'ya gerek kalmaz', en: 'No GPU is required' },
    ],
    correct: 1,
    explain: {
      tr: 'Continuous batching, her decode iterasyonunda biten istekleri gruptan çıkarıp yenilerini ekler. Kısa isteklerin uzun olanları beklemesini azaltır; gerçek kazanım trafik ve SLO ile ölçülür.',
      en: 'Continuous batching removes finished requests and admits new ones at each decode iteration. It reduces the time short requests wait for long ones; actual gains depend on traffic and SLO.',
    },
    tags: ['batching', 'concept', 'vllm'],
  },
  {
    id: 'quiz:concept:streaming:1',
    kind: 'mcq',
    prompt: {
      tr: 'ChatGPT\'de cevabın "yazılıyormuş gibi" görünmesini sağlayan mekanizma nedir?',
      en: 'Which mechanism makes ChatGPT answers appear as if they are being typed?',
    },
    options: [
      { tr: 'Caching', en: 'Caching' },
      { tr: 'Streaming', en: 'Streaming' },
      { tr: 'Batching', en: 'Batching' },
      { tr: 'Preloading', en: 'Preloading' },
    ],
    correct: 1,
    explain: {
      tr: 'Streaming, modelin cevabı token token istemciye (SSE veya HTTP chunked) yollamasıdır. TTFT (ilk token süresi) ve TPOT (token başına süre) kullanıcı deneyimini belirleyen iki temel metriktir.',
      en: 'Streaming sends the model\'s answer token by token via SSE or HTTP chunked. TTFT (Time To First Token) and TPOT (Time Per Output Token) are the two key UX metrics.',
    },
    tags: ['streaming', 'concept', 'latency'],
  },
  {
    id: 'quiz:concept:paged-attention:1',
    kind: 'mcq',
    prompt: {
      tr: 'vLLM\'in buluşu PagedAttention, KV cache yönetiminde neyi çözer?',
      en: 'What does vLLM\'s PagedAttention solve in KV cache management?',
    },
    options: [
      { tr: 'Şifreleme', en: 'Encryption' },
      { tr: 'Sıkıştırma', en: 'Compression' },
      { tr: 'Bellek parçalanması', en: 'Memory fragmentation' },
      { tr: 'Model yükleme', en: 'Model loading' },
    ],
    correct: 2,
    explain: {
      tr: 'PagedAttention, işletim sistemlerindeki "sanal bellek + sayfa tablosu" modelinden esinlenerek sabit büyük ön ayırmanın yarattığı parçalanma ve israfı azaltır.',
      en: 'PagedAttention borrows the virtual-memory and page-table model from operating systems to reduce fragmentation and waste caused by large fixed preallocations.',
    },
    tags: ['paged-attention', 'concept', 'memory'],
  },
  {
    id: 'quiz:concept:speculative-decoding:1',
    kind: 'mcq',
    prompt: {
      tr: 'Speculative decoding\'in matematiksel garantisi nedir?',
      en: 'What is the mathematical guarantee of speculative decoding?',
    },
    options: [
      { tr: 'Aynı dağılımdan örnekleme yapılmış gibi sonuç verir; kalite korunur', en: 'Output looks like sampling from the same distribution; quality is preserved' },
      { tr: 'Model otomatik olarak küçülür', en: 'The model automatically shrinks' },
      { tr: 'Bellek yarıya düşer', en: 'Memory is halved' },
      { tr: 'Eğitim ihtiyacı tamamen kalkar', en: 'No training is needed' },
    ],
    correct: 0,
    explain: {
      tr: 'Speculative decoding, hedef modelin dağılımından örnekleme yapılmış gibi sonuç verir; yani sonuç kalitesi korunur, sadece hız kazanılır. Kabul edilen tokenlar hedef modelin "kabul ettiği" örneklerdir.',
      en: 'Speculative decoding produces output that looks like sampling from the target model\'s distribution; output quality is preserved, only speed improves. Accepted tokens are the ones the target model "accepts" as samples.',
    },
    tags: ['speculative-decoding', 'concept', 'quality'],
  },
  {
    id: 'quiz:concept:prefill-decode:1',
    kind: 'mcq',
    prompt: {
      tr: 'Disaggregated serving (örn. NVIDIA Dynamo) neden gereklidir?',
      en: 'Why is disaggregated serving (e.g. NVIDIA Dynamo) necessary?',
    },
    options: [
      { tr: 'Prefill ve decode aynı GPU\'da farklı yük profilleri yaratır ve birbirini yavaşlatır', en: 'Prefill and decode have different load profiles and slow each other down on the same GPU' },
      { tr: 'Model boyutunu azaltmak için', en: 'To reduce model size' },
      { tr: 'GPU markasını değiştirmek için', en: 'To switch GPU brands' },
      { tr: 'Model indirmeyi hızlandırmak için', en: 'To speed up model download' },
    ],
    correct: 0,
    explain: {
      tr: 'Prefill ile decode farklı hesaplama profillerine sahiptir ve aynı havuzda gecikme etkileşimi yaratabilir. Ayrı çalışan havuzları bağımsız ölçekleme sağlar; gerçek kazanç iş yükü ve KV aktarım maliyetiyle ölçülür.',
      en: 'Prefill and decode have different compute profiles and can interfere with latency in one pool. Separate worker pools enable independent scaling; actual gains depend on workload and KV-transfer cost.',
    },
    tags: ['prefill-decode', 'concept', 'scaling'],
  },
  {
    id: 'quiz:concept:quantization:1',
    kind: 'mcq',
    prompt: {
      tr: 'INT4 nicemleme FP16\'ya göre ne kazandırır?',
      en: 'What does INT4 quantization gain compared to FP16?',
    },
    options: [
      { tr: 'Ham ağırlık belleğini azaltır; hız ve kalite etkisi ölçülmelidir', en: 'Reduces raw weight memory; speed and quality effects must be measured' },
      { tr: 'Belleği iki kat artırır', en: 'Doubles memory usage' },
      { tr: 'Eğitim süresini uzatır', en: 'Lengthens training time' },
      { tr: 'Model daha doğru olur', en: 'Makes the model more accurate' },
    ],
    correct: 0,
    explain: {
      tr: 'Ağırlıkları 16 bitten 4 bite indirmek ham ağırlık belleğini teorik olarak dörtte bire düşürür. Gerçek bellek, hız ve kalite etkisi meta veri, çekirdek, model ve kalibrasyona göre ölçülmelidir.',
      en: 'Moving weights from 16 to 4 bits theoretically reduces raw weight memory to one quarter. Real memory, speed, and quality effects depend on metadata, kernel, model, and calibration.',
    },
    tags: ['quantization', 'concept', 'int4'],
  },
  {
    id: 'quiz:concept:distillation:1',
    kind: 'mcq',
    prompt: {
      tr: 'Distillation\'da "öğretmen" ve "öğrenci" modelleri nasıl çalışır?',
      en: 'How do the "teacher" and "student" models work in distillation?',
    },
    options: [
      { tr: 'İkisi aynı anda eğitilir ve çıktıları karşılaştırılır', en: 'Both are trained simultaneously and outputs are compared' },
      { tr: 'Büyük öğretmen modelin bilgisi küçük öğrenci modele aktarılır', en: 'A large teacher model\'s knowledge is transferred to a smaller student model' },
      { tr: 'Küçük öğrenci, büyük öğretmeni eğitir', en: 'The small student trains the large teacher' },
      { tr: 'Aynı modelin iki kopyası birbirini eğitir', en: 'Two copies of the same model train each other' },
    ],
    correct: 1,
    explain: {
      tr: 'Distillation, büyük öğretmen modelin "soft label" (olasılık dağılımı) ve ara katman bilgisini küçük öğrenci modele aktarır. Öğrenci, öğretmenin bilgi kalitesinin çoğunu çok daha az parametreyle taşır.',
      en: 'Distillation transfers a large teacher\'s "soft labels" (probability distribution) and hidden-state information to a smaller student. The student retains most of the teacher\'s quality at a fraction of the size.',
    },
    tags: ['distillation', 'concept', 'optimization'],
  },
  {
    id: 'quiz:concept:lora:1',
    kind: 'mcq',
    prompt: {
      tr: 'LoRA\'nın temel fikri nedir?',
      en: 'What is the core idea of LoRA?',
    },
    options: [
      { tr: 'Modeli sıfırdan eğitmek', en: 'Train the model from scratch' },
      { tr: 'Orijinal ağırlıklara küçük düşük ranklı adaptör matrisi eklemek', en: 'Add small low-rank adapter matrices to the original weights' },
      { tr: 'Belleği sıfırlamak', en: 'Reset memory' },
      { tr: 'Modeli silmek', en: 'Delete the model' },
    ],
    correct: 1,
    explain: {
      tr: 'LoRA, ΔW = A·B (r≪d) biçiminde düşük ranklı adaptörler ekler ve temel ağırlıkları dondurur. Eğitilebilir parametre sayısını azaltır; bellek ile süre kazancı model, rank, optimizasyon ve donanıma bağlıdır.',
      en: 'LoRA adds low-rank adapters as ΔW = A·B with r≪d while freezing base weights. It reduces trainable parameter count; memory and time savings depend on model, rank, optimizer, and hardware.',
    },
    tags: ['lora', 'concept', 'fine-tuning'],
  },
  {
    id: 'quiz:concept:rlhf:1',
    kind: 'mcq',
    prompt: {
      tr: 'RLHF (İnsan Geri Bildirimiyle Pekiştirmeli Öğrenme) hangi adımlardan oluşur?',
      en: 'Which steps does RLHF (RL from Human Feedback) consist of?',
    },
    options: [
      { tr: 'SFT → Reward Model → PPO/DPO', en: 'SFT → Reward Model → PPO/DPO' },
      { tr: 'Tokenize → Embed → Decode', en: 'Tokenize → Embed → Decode' },
      { tr: 'Prefill → Decode → Stream', en: 'Prefill → Decode → Stream' },
      { tr: 'Eğitim → Doğrulama → Test', en: 'Train → Validate → Test' },
    ],
    correct: 0,
    explain: {
      tr: 'RLHF; önce SFT (insan yazılı iyi cevaplarla supervised fine-tuning), sonra insan tercihlerinden ödül modeli eğitimi, sonra pekiştirmeli güncelleme (PPO veya DPO) adımlarından oluşur.',
      en: 'RLHF has three steps: SFT (supervised fine-tuning on human-written good answers), reward model trained on human preference pairs, and a PPO or DPO reinforcement update.',
    },
    tags: ['rlhf', 'concept', 'training'],
  },
  {
    id: 'quiz:concept:rag:1',
    kind: 'mcq',
    prompt: {
      tr: 'RAG (Retrieval-Augmented Generation) ne anlama gelir?',
      en: 'What does RAG (Retrieval-Augmented Generation) mean?',
    },
    options: [
      { tr: 'Modelin cevap üretirken dış bir bilgi kaynağından ilgili bilgi çekip kullanması', en: 'The model pulls relevant information from an external source while generating an answer' },
      { tr: 'Modelin sadece kendi ağırlıklarından cevap üretmesi', en: 'The model answers only from its own weights' },
      { tr: 'Bir resim üretme yöntemi', en: 'An image generation method' },
      { tr: 'Veri tabanı sorgulama dili', en: 'A database query language' },
    ],
    correct: 0,
    explain: {
      tr: 'RAG, modelin cevap üretirken bir bilgi bankasından (dokümanlar, vektör DB) ilgili parçaları çekip prompt\'a eklemesidir. Halüsinasyonu azaltır ve modele güncel/dış bilgi verir.',
      en: 'RAG has the model pull relevant chunks from a knowledge base (documents, vector DB) and inject them into the prompt while generating. It reduces hallucination and brings fresh/external knowledge.',
    },
    tags: ['rag', 'concept', 'app'],
  },
  {
    id: 'quiz:concept:function-calling:1',
    kind: 'mcq',
    prompt: {
      tr: 'Function calling\'de model kendi cevabı yerine ne üretir?',
      en: 'What does the model produce instead of its own answer in function calling?',
    },
    options: [
      { tr: 'Yapılandırılmış JSON ile bir tool/fonksiyon çağrısı', en: 'A structured JSON call to a tool/function' },
      { tr: 'Rastgele bir resim', en: 'A random image' },
      { tr: 'Veritabanı sorgusu (SQL)', en: 'A database query (SQL)' },
      { tr: 'Şifreli binary', en: 'Encrypted binary' },
    ],
    correct: 0,
    explain: {
      tr: 'Function calling\'de model, JSON Schema ile tanımlanmış tool listesinden bir tool_call(JSON) üretir. Uygulama bu JSON\'u parse edip ilgili fonksiyonu çalıştırır, sonucu modele geri verir.',
      en: 'In function calling the model produces a tool_call(JSON) from a tool list defined with JSON Schema. The app parses the JSON, runs the function, and feeds the result back to the model.',
    },
    tags: ['function-calling', 'concept', 'agent'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Çözüm Eşleştirme (20) — "Şu özelliklere sahip çözüm hangisidir?"
  // ═══════════════════════════════════════════════════════════

  {
    id: 'quiz:solution:vllm:1',
    kind: 'mcq',
    prompt: {
      tr: 'Sürekli batching ve PagedAttention ile yüksek eşzamanlı LLM sunumunda öne çıkan, OpenAI uyumlu API sunan açık kaynaklı sunucu hangisidir?',
      en: 'Which open-source server, exposing an OpenAI-compatible API, stands out for high-concurrency LLM serving with continuous batching and PagedAttention?',
    },
    options: [
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'SGLang', en: 'SGLang' },
      { tr: 'Ollama', en: 'Ollama' },
    ],
    correct: 1,
    explain: {
      tr: 'vLLM, PagedAttention ve continuous batching ile yüksek eşzamanlılıkta üretim API servisleri için güçlü varsayılandır. OpenAI uyumlu API ve geniş model desteği sunar.',
      en: 'vLLM is a strong default for production API services at high concurrency thanks to PagedAttention and continuous batching, with OpenAI-compatible API and broad model support.',
    },
    tags: ['vllm', 'solution', 'production'],
  },
  {
    id: 'quiz:solution:sglang:1',
    kind: 'mcq',
    prompt: {
      tr: 'RadixAttention ve yapılandırılmış üretim ile karmaşık agent/üretim akışlarını hedefleyen hızlı LLM servis çerçevesi hangisidir?',
      en: 'Which fast LLM serving framework targets complex agent/generation flows with RadixAttention and structured generation?',
    },
    options: [
      { tr: 'SGLang', en: 'SGLang' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'TensorRT-LLM', en: 'TensorRT-LLM' },
      { tr: 'Hugging Face TGI', en: 'Hugging Face TGI' },
    ],
    correct: 0,
    explain: {
      tr: 'SGLang, RadixAttention ile prefix paylaşımı ve structured output için optimize edilmiştir; karmaşık çok aşamalı üretim ve ajan akışları için idealdir.',
      en: 'SGLang is optimized for prefix sharing via RadixAttention and structured output; ideal for complex multi-stage generation and agent flows.',
    },
    tags: ['sglang', 'solution', 'structured'],
  },
  {
    id: 'quiz:solution:lmdeploy:1',
    kind: 'mcq',
    prompt: {
      tr: 'Model sıkıştırma, TurboMind çıkarımı ve OpenAI uyumlu servis sağlayan, NVIDIA GPU odaklı üretim araç takımı hangisidir?',
      en: 'Which NVIDIA-GPU-focused production toolkit combines model compression, TurboMind inference, and OpenAI-compatible serving?',
    },
    options: [
      { tr: 'LMDeploy', en: 'LMDeploy' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'MLC LLM', en: 'MLC LLM' },
    ],
    correct: 0,
    explain: {
      tr: 'LMDeploy, motor ve servis katmanını birlikte sunar; AWQ nicemleme ve OpenAI uyumlu API sağlar. En güçlü yolu NVIDIA GPU odaklıdır.',
      en: 'LMDeploy combines the engine and serving layers, with AWQ quantization and OpenAI-compatible API. Its strongest path is NVIDIA-GPU-centric.',
    },
    tags: ['lmdeploy', 'solution', 'turbomind'],
  },
  {
    id: 'quiz:solution:tensorrt-llm:1',
    kind: 'mcq',
    prompt: {
      tr: 'NVIDIA GPU\'larda düşük gecikme ve yüksek verim için derleyici/çalışma zamanı olarak çalışan, nicemleme ve çoklu GPU destekleyen çözüm hangisidir?',
      en: 'Which solution acts as a compiler/runtime for low-latency, high-throughput inference on NVIDIA GPUs with quantization and multi-GPU support?',
    },
    options: [
      { tr: 'TensorRT-LLM', en: 'TensorRT-LLM' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'ExLlamaV3', en: 'ExLlamaV3' },
    ],
    correct: 0,
    explain: {
      tr: 'TensorRT-LLM, model tanımlarını NVIDIA TensorRT çekirdeklerine yaklaştırarak üretim çıkarımı için optimize eder; nicemleme ve çoklu GPU seçenekleri sunar.',
      en: 'TensorRT-LLM brings model definitions close to NVIDIA TensorRT kernels for production-grade inference, with quantization and multi-GPU options.',
    },
    tags: ['tensorrt-llm', 'solution', 'nvidia'],
  },
  {
    id: 'quiz:solution:llama-cpp:1',
    kind: 'mcq',
    prompt: {
      tr: 'GGUF modellerini CPU, CUDA, Metal, Vulkan gibi geniş donanım yelpazesinde yerel çalıştıran taşınabilir C/C++ motoru hangisidir?',
      en: 'Which portable C/C++ engine runs GGUF models locally across a wide hardware range (CPU, CUDA, Metal, Vulkan)?',
    },
    options: [
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'MLX-LM', en: 'MLX-LM' },
      { tr: 'MLC LLM', en: 'MLC LLM' },
      { tr: 'Ollama', en: 'Ollama' },
    ],
    correct: 0,
    explain: {
      tr: 'llama.cpp az bağımlılıkla birçok platformda çalışır; GGUF ve nicemlenmiş model ekosistemi güçlüdür. Yerel, çevrimdışı ve kaynak kısıtlı çıkarım için idealdir.',
      en: 'llama.cpp runs on many platforms with few dependencies; GGUF and quantized-model ecosystem is strong. Ideal for local, offline, and resource-constrained inference.',
    },
    tags: ['llama-cpp', 'solution', 'portable'],
  },
  {
    id: 'quiz:solution:mlx-lm:1',
    kind: 'mcq',
    prompt: {
      tr: 'Apple Silicon üzerinde LLM üretimi ve ince ayar için MLX tabanlı Python paketi hangisidir?',
      en: 'Which MLX-based Python package provides LLM generation and fine-tuning on Apple Silicon?',
    },
    options: [
      { tr: 'MLX-LM', en: 'MLX-LM' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'MLC LLM', en: 'MLC LLM' },
      { tr: 'Ollama', en: 'Ollama' },
    ],
    correct: 0,
    explain: {
      tr: 'mlx-lm, Apple\'ın birleşik bellek mimarisini kullanarak Mac üzerinde model yükleme, nicemleme, üretim ve LoRA akışlarını sadeleştirir.',
      en: 'mlx-lm uses Apple\'s unified memory to simplify model loading, quantization, generation, and LoRA workflows on Mac.',
    },
    tags: ['mlx-lm', 'solution', 'apple-silicon'],
  },
  {
    id: 'quiz:solution:mlc-llm:1',
    kind: 'mcq',
    prompt: {
      tr: 'TVM tabanlı derleme ile CUDA, Vulkan, Metal ve WebGPU gibi birçok hedefte taşınabilir LLM yürütmesi sağlayan çözüm hangisidir?',
      en: 'Which solution provides portable LLM execution across CUDA, Vulkan, Metal, WebGPU, and more via TVM-based compilation?',
    },
    options: [
      { tr: 'MLC LLM', en: 'MLC LLM' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'MLX-LM', en: 'MLX-LM' },
      { tr: 'OpenVINO GenAI', en: 'OpenVINO GenAI' },
    ],
    correct: 0,
    explain: {
      tr: 'MLC LLM, derleme yaklaşımıyla aynı modeli farklı cihaz sınıflarına (tarayıcı, mobil, GPU) taşır. WebLLM altyapısı da bu yığın üzerine kuruludur.',
      en: 'MLC LLM uses compilation to ship the same model to different device classes (browser, mobile, GPU). WebLLM is built on top of this stack.',
    },
    tags: ['mlc-llm', 'solution', 'compiler'],
  },
  {
    id: 'quiz:solution:exllamav3:1',
    kind: 'mcq',
    prompt: {
      tr: 'Tüketici sınıfı NVIDIA GPU\'larda EXL2/EXL3 düşük bitli formatlarla nicemlenmiş çıkarıma odaklanan motor hangisidir?',
      en: 'Which engine focuses on low-bit (EXL2/EXL3) quantized inference on consumer NVIDIA GPUs?',
    },
    options: [
      { tr: 'ExLlamaV3', en: 'ExLlamaV3' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'TensorRT-LLM', en: 'TensorRT-LLM' },
      { tr: 'vLLM', en: 'vLLM' },
    ],
    correct: 0,
    explain: {
      tr: 'ExLlamaV3, tek kullanıcı ve yerel NVIDIA GPU senaryolarında düşük bitli nicemlenmiş modeller için optimize edilir. Etkin geliştirilen projenin sürüm ve uyumluluk matrisi izlenmelidir.',
      en: 'ExLlamaV3 is optimized for low-bit quantized models on single-user and local NVIDIA GPUs. Its actively developed release and compatibility matrix should be tracked.',
    },
    tags: ['exllamav3', 'solution', 'quantized'],
  },
  {
    id: 'quiz:solution:openvino-genai:1',
    kind: 'mcq',
    prompt: {
      tr: 'Intel CPU, GPU ve NPU hedeflerinde üretken yapay zekâ çıkarımı için OpenVINO boru hatlarını sunan çözüm hangisidir?',
      en: 'Which solution provides OpenVINO pipelines for generative AI inference on Intel CPU, GPU, and NPU?',
    },
    options: [
      { tr: 'OpenVINO GenAI', en: 'OpenVINO GenAI' },
      { tr: 'ONNX Runtime GenAI', en: 'ONNX Runtime GenAI' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
    ],
    correct: 0,
    explain: {
      tr: 'OpenVINO GenAI, Intel donanım portföyünde CPU/GPU/NPU cihaz seçimiyle üretken model çıkarımı sağlar. En yüksek değer Intel ekosisteminde ortaya çıkar.',
      en: 'OpenVINO GenAI provides generative-model inference with CPU/GPU/NPU device selection on the Intel portfolio. Highest value comes inside the Intel ecosystem.',
    },
    tags: ['openvino-genai', 'solution', 'intel'],
  },
  {
    id: 'quiz:solution:onnx-runtime-genai:1',
    kind: 'mcq',
    prompt: {
      tr: 'ONNX modelleri için token üretimi, örnekleme ve KV önbellek yönetimini donanım yürütme sağlayıcılarıyla birleştiren çapraz platform çalışma zamanı hangisidir?',
      en: 'Which cross-platform runtime combines token generation, sampling, and KV cache management for ONNX models with hardware execution providers?',
    },
    options: [
      { tr: 'ONNX Runtime GenAI', en: 'ONNX Runtime GenAI' },
      { tr: 'OpenVINO GenAI', en: 'OpenVINO GenAI' },
      { tr: 'TensorRT-LLM', en: 'TensorRT-LLM' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
    ],
    correct: 0,
    explain: {
      tr: 'ONNX Runtime GenAI, ONNX standardını kullanan çok platformlu uygulamalar için tek bir modeli CPU/GPU/NPU\'da çalıştırır; execution provider runtime\'da seçilir.',
      en: 'ONNX Runtime GenAI runs a single ONNX model on CPU/GPU/NPU for cross-platform apps; the execution provider is chosen at runtime.',
    },
    tags: ['onnx-runtime-genai', 'solution', 'cross-platform'],
  },
  {
    id: 'quiz:solution:ollama:1',
    kind: 'mcq',
    prompt: {
      tr: 'Modelleri tek komutla indirip yerel API ve sohbet akışıyla çalıştıran, model paketleme/sürümleme yaşam döngüsünü yöneten popüler model yöneticisi hangisidir?',
      en: 'Which popular model manager downloads and runs models with a single command through a local API and chat flow, handling packaging and versioning?',
    },
    options: [
      { tr: 'Ollama', en: 'Ollama' },
      { tr: 'LM Studio', en: 'LM Studio' },
      { tr: 'Jan', en: 'Jan' },
      { tr: 'Docker Model Runner', en: 'Docker Model Runner' },
    ],
    correct: 0,
    explain: {
      tr: 'Ollama, basit CLI/API ile model paketleme, sürümleme, yerel depolama ve arka plan servis yaşam döngüsünü yönetir. Yerel geliştirme, prototipleme ve kişisel kullanım için idealdir.',
      en: 'Ollama handles packaging, versioning, local storage, and background service lifecycle in a simple CLI/API. Ideal for local development, prototyping, and personal use.',
    },
    tags: ['ollama', 'solution', 'local'],
  },
  {
    id: 'quiz:solution:lm-studio:1',
    kind: 'mcq',
    prompt: {
      tr: 'Yerel modelleri keşfetmek, sohbet etmek ve OpenAI uyumlu yerel API açmak için grafik masaüstü çalışma alanı sunan uygulama hangisidir?',
      en: 'Which application provides a graphical desktop workspace for discovering local models, chatting, and exposing an OpenAI-compatible local API?',
    },
    options: [
      { tr: 'LM Studio', en: 'LM Studio' },
      { tr: 'Ollama', en: 'Ollama' },
      { tr: 'Jan', en: 'Jan' },
      { tr: 'GPT4All', en: 'GPT4All' },
    ],
    correct: 0,
    explain: {
      tr: 'LM Studio, model kataloğu, sohbet/playground, donanım ayarları ve OpenAI uyumlu yerel sunucuyu tek uygulamada toplar. Yeni başlayanlar için güçlü masaüstü deneyimi sunar.',
      en: 'LM Studio combines a model catalog, chat/playground, hardware controls, and an OpenAI-compatible local server in one app. Strong desktop experience for newcomers.',
    },
    tags: ['lm-studio', 'solution', 'desktop'],
  },
  {
    id: 'quiz:solution:jan:1',
    kind: 'mcq',
    prompt: {
      tr: 'Yerel ve uzaktaki modeller için açık kaynaklı (AGPL-3.0) masaüstü sohbet ve geliştirici çalışma alanı sunan uygulama hangisidir?',
      en: 'Which open-source (AGPL-3.0) desktop chat and developer workspace is aimed at local and remote models?',
    },
    options: [
      { tr: 'Jan', en: 'Jan' },
      { tr: 'LM Studio', en: 'LM Studio' },
      { tr: 'GPT4All', en: 'GPT4All' },
      { tr: 'AnythingLLM', en: 'AnythingLLM' },
    ],
    correct: 0,
    explain: {
      tr: 'Jan, AGPL-3.0 lisanslı açık kaynaklı bir masaüstü uygulamasıdır; yerel model çalıştırma, uzantılar ve OpenAI uyumlu API sunar.',
      en: 'Jan is an open-source (AGPL-3.0) desktop app with local model execution, extensions, and an OpenAI-compatible API.',
    },
    tags: ['jan', 'solution', 'open-source'],
  },
  {
    id: 'quiz:solution:gpt4all:1',
    kind: 'mcq',
    prompt: {
      tr: 'Tüketici cihazlarında çevrimdışı sohbet, LocalDocs ve yerel API ile veri gizliliği odaklı kişisel kullanım sunan masaüstü uygulaması hangisidir?',
      en: 'Which desktop application provides offline chat, LocalDocs, and a local API for privacy-oriented personal use on consumer devices?',
    },
    options: [
      { tr: 'GPT4All', en: 'GPT4All' },
      { tr: 'LM Studio', en: 'LM Studio' },
      { tr: 'Jan', en: 'Jan' },
      { tr: 'AnythingLLM', en: 'AnythingLLM' },
    ],
    correct: 0,
    explain: {
      tr: 'GPT4All, kolay model indirme, LocalDocs ve yerel API ile çevrimdışı sohbet ve yerel dokümanlar için idealdir. Veri gizliliği odaklıdır.',
      en: 'GPT4All provides easy model downloads, LocalDocs, and a local API for offline chat and local documents; it is privacy-oriented.',
    },
    tags: ['gpt4all', 'solution', 'offline'],
  },
  {
    id: 'quiz:solution:open-webui:1',
    kind: 'mcq',
    prompt: {
      tr: 'Ollama ve OpenAI uyumlu sunucular için zengin, kendi kendine barındırılan web çalışma alanı sağlayan uygulama hangisidir?',
      en: 'Which application provides a rich self-hosted web workspace for Ollama and OpenAI-compatible servers?',
    },
    options: [
      { tr: 'Open WebUI', en: 'Open WebUI' },
      { tr: 'AnythingLLM', en: 'AnythingLLM' },
      { tr: 'Jan', en: 'Jan' },
      { tr: 'LM Studio', en: 'LM Studio' },
    ],
    correct: 0,
    explain: {
      tr: 'Open WebUI, sohbet, model seçimi, bilgi tabanı, araçlar ve kullanıcı yönetimini mevcut model sunucularının üstüne ekler. Token üreten motor değildir; altta bir model sunucusu gerekir.',
      en: 'Open WebUI adds chat, model selection, knowledge, tools, and user management on top of existing model servers. It is not the token-generating engine; it needs an underlying model server.',
    },
    tags: ['open-webui', 'solution', 'ui'],
  },
  {
    id: 'quiz:solution:anythingllm:1',
    kind: 'mcq',
    prompt: {
      tr: 'Belgeler, RAG çalışma alanları, ajanlar ve çoklu model sağlayıcılarını birleştiren masaüstü/web uygulaması hangisidir?',
      en: 'Which desktop and web application combines documents, RAG workspaces, agents, and multiple model providers?',
    },
    options: [
      { tr: 'AnythingLLM', en: 'AnythingLLM' },
      { tr: 'Open WebUI', en: 'Open WebUI' },
      { tr: 'Jan', en: 'Jan' },
      { tr: 'GPT4All', en: 'GPT4All' },
    ],
    correct: 0,
    explain: {
      tr: 'AnythingLLM, yerel/bulut modelleri vektör veritabanları ve çalışma alanı akışlarıyla son kullanıcı deneyimine dönüştürür. Hızlı RAG prototipleri için idealdir.',
      en: 'AnythingLLM turns local or cloud models into an end-user experience with vector DBs and workspace flows. Ideal for rapid RAG prototypes.',
    },
    tags: ['anythingllm', 'solution', 'rag'],
  },
  {
    id: 'quiz:solution:nvidia-dynamo:1',
    kind: 'mcq',
    prompt: {
      tr: 'Çok düğümlü üretken AI çıkarımını ayrıştırmak için akıllı yönlendirme ve KV/prefill-decode ayrıştırması sunan NVIDIA dağıtık çalışma zamanı hangisidir?',
      en: 'Which NVIDIA distributed runtime offers smart routing and KV/prefill-decode disaggregation for multi-node generative AI inference?',
    },
    options: [
      { tr: 'NVIDIA Dynamo', en: 'NVIDIA Dynamo' },
      { tr: 'llm-d', en: 'llm-d' },
      { tr: 'Ray Serve LLM', en: 'Ray Serve LLM' },
      { tr: 'KServe', en: 'KServe' },
    ],
    correct: 0,
    explain: {
      tr: 'NVIDIA Dynamo, çok düğümlü çıkarım için ayrıştırılmış sunum mimarisi sunar; TensorRT-LLM, vLLM ve SGLang motorlarını Kubernetes, Slurm veya yerel küme yollarında koordine eder.',
      en: 'NVIDIA Dynamo provides a disaggregated serving architecture for multi-node inference, coordinating TensorRT-LLM, vLLM, and SGLang across Kubernetes, Slurm, or local-cluster paths.',
    },
    tags: ['nvidia-dynamo', 'solution', 'disaggregated'],
  },
  {
    id: 'quiz:solution:nvidia-triton:1',
    kind: 'mcq',
    prompt: {
      tr: 'Birden çok model çerçevesini (TensorRT-LLM, PyTorch, ONNX) ortak HTTP/gRPC arkasında sunan genel amaçlı çıkarım sunucusu hangisidir?',
      en: 'Which general-purpose inference server exposes multiple model frameworks (TensorRT-LLM, PyTorch, ONNX) behind common HTTP/gRPC?',
    },
    options: [
      { tr: 'NVIDIA Triton', en: 'NVIDIA Triton' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'BentoML', en: 'BentoML' },
      { tr: 'Ray Serve', en: 'Ray Serve' },
    ],
    correct: 0,
    explain: {
      tr: 'Triton, model çerçevelerini ve LLM olmayan modelleri (vision, speech) tek platformda birleştirir; saf bir LLM runtime\'ı değil, sunucu kabuğu ve orkestrasyon katmanıdır.',
      en: 'Triton unifies model frameworks and non-LLM models (vision, speech) on one platform; it is not a pure LLM runtime but a server and orchestration shell.',
    },
    tags: ['nvidia-triton', 'solution', 'multi-framework'],
  },
  {
    id: 'quiz:solution:litellm-proxy:1',
    kind: 'mcq',
    prompt: {
      tr: 'Yüzlerce LLM sağlayıcısını OpenAI uyumlu API, yönlendirme, fallback ve bütçe politikalarıyla birleştiren ağ geçidi hangisidir?',
      en: 'Which gateway unifies hundreds of LLM providers with an OpenAI-compatible API, routing, fallbacks, and budget policies?',
    },
    options: [
      { tr: 'LiteLLM Proxy', en: 'LiteLLM Proxy' },
      { tr: 'Kong AI Gateway', en: 'Kong AI Gateway' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'Ollama', en: 'Ollama' },
    ],
    correct: 0,
    explain: {
      tr: 'LiteLLM Proxy, kimlik, maliyet, kota, gözlemlenebilirlik ve hata devri sağlar; model ağırlıklarını doğrudan çalıştırmaz. Birden çok bulut/yerel model API\'sini yöneten ekipler için idealdir.',
      en: 'LiteLLM Proxy provides identity, cost, quotas, observability, and failover; it does not execute model weights directly. Ideal for teams managing multiple cloud and local model APIs.',
    },
    tags: ['litellm-proxy', 'solution', 'gateway'],
  },
  {
    id: 'quiz:solution:webllm:1',
    kind: 'mcq',
    prompt: {
      tr: 'LLM çıkarımını WebGPU ile doğrudan tarayıcıda çalıştıran, sunucusuz web deneyimleri için JavaScript çalışma zamanı hangisidir?',
      en: 'Which JavaScript runtime runs LLM inference directly in the browser via WebGPU, enabling serverless web experiences?',
    },
    options: [
      { tr: 'WebLLM', en: 'WebLLM' },
      { tr: 'MLC LLM', en: 'MLC LLM' },
      { tr: 'ExecuTorch', en: 'ExecuTorch' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
    ],
    correct: 0,
    explain: {
      tr: 'WebLLM model indirme, önbellekleme, worker desteği ve OpenAI benzeri API ile çıkarımı tarayıcıda çalıştırır. Bu, promptları sunucuya göndermeden bir akış kurmayı mümkün kılar; gerçek veri çıkışı ve mevzuat uyumu uygulamanın tüm ağ davranışıyla ayrıca denetlenmelidir.',
      en: 'WebLLM runs inference in the browser with model download, caching, workers, and an OpenAI-like API. This enables a flow that does not send prompts to an inference server, but actual data egress and compliance still require an audit of the application’s full network behavior.',
    },
    tags: ['webllm', 'solution', 'browser'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Karar/Uygulama (15) — "Şu senaryo için hangi katman uygundur?"
  // ═══════════════════════════════════════════════════════════

  {
    id: 'quiz:decision:1',
    kind: 'mcq',
    prompt: {
      tr: 'Apple Silicon Mac\'te 8B modeli denemek istiyorsunuz. Hangi kombinasyon en uygundur?',
      en: 'You want to try an 8B model on an Apple Silicon Mac. Which combination is most appropriate?',
    },
    options: [
      { tr: 'vLLM + CUDA backend', en: 'vLLM + CUDA backend' },
      { tr: 'mlx-lm veya llama.cpp Metal backend', en: 'mlx-lm or llama.cpp Metal backend' },
      { tr: 'TensorRT-LLM', en: 'TensorRT-LLM' },
      { tr: 'OpenVINO GenAI', en: 'OpenVINO GenAI' },
    ],
    correct: 1,
    explain: {
      tr: 'mlx-lm Apple Silicon için optimize edilmiştir; llama.cpp\'nin Metal backend\'i de iyi çalışır. CUDA tabanlı motorlar Mac\'te çalışmaz, OpenVINO Intel odaklıdır.',
      en: 'mlx-lm is optimized for Apple Silicon and llama.cpp\'s Metal backend also works well. CUDA-based engines do not run on Mac, and OpenVINO is Intel-focused.',
    },
    tags: ['decision', 'apple-silicon', 'inference'],
  },
  {
    id: 'quiz:decision:2',
    kind: 'mcq',
    prompt: {
      tr: 'Üretim ortamında 1000+ eşzamanlı istek alan, açık kaynak OpenAI uyumlu bir API sunmak istiyorsunuz. Hangi motoru tercih edersiniz?',
      en: 'You want to expose an open-source, OpenAI-compatible API for 1000+ concurrent requests in production. Which engine do you prefer?',
    },
    options: [
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'vLLM veya SGLang', en: 'vLLM or SGLang' },
      { tr: 'GPT4All', en: 'GPT4All' },
      { tr: 'WebLLM', en: 'WebLLM' },
    ],
    correct: 1,
    explain: {
      tr: 'vLLM continuous batching + PagedAttention ile yüksek eşzamanlılıkta öne çıkar; SGLang da RadixAttention ile güçlü bir alternatiftir. Diğerleri bu ölçekte uygun değildir.',
      en: 'vLLM stands out at high concurrency via continuous batching + PagedAttention; SGLang is a strong alternative with RadixAttention. The others are not fit for that scale.',
    },
    tags: ['decision', 'production', 'scaling'],
  },
  {
    id: 'quiz:decision:3',
    kind: 'mcq',
    prompt: {
      tr: 'Sadece CPU olan bir sunucuda GGUF formatında 13B model çalıştırmak istiyorsunuz. Hangi çözüm en uygundur?',
      en: 'You want to run a 13B GGUF model on a CPU-only server. Which solution is the best fit?',
    },
    options: [
      { tr: 'TensorRT-LLM', en: 'TensorRT-LLM' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'llama.cpp', en: 'llama.cpp' },
      { tr: 'NVIDIA Dynamo', en: 'NVIDIA Dynamo' },
    ],
    correct: 2,
    explain: {
      tr: 'llama.cpp CPU dahil birçok donanımı destekler; GGUF formatı ve nicemleme için optimize edilmiştir. Diğerleri CPU-only senaryosu için uygun değildir.',
      en: 'llama.cpp supports CPU and many other backends; it is optimized for GGUF and quantized models. The others are not suitable for CPU-only scenarios.',
    },
    tags: ['decision', 'cpu', 'llama-cpp'],
  },
  {
    id: 'quiz:decision:4',
    kind: 'mcq',
    prompt: {
      tr: 'Kendi şirket dokümanlarınız üzerinde çalışan, web tabanlı bir ekip sohbet asistanı kurmak istiyorsunuz. Altta hangi yığın en uygundur?',
      en: 'You want a web-based team chat assistant over your company documents. Which stack is most appropriate?',
    },
    options: [
      { tr: 'Sadece vLLM', en: 'vLLM alone' },
      { tr: 'Open WebUI + vLLM/Ollama + RAG (vector DB)', en: 'Open WebUI + vLLM/Ollama + RAG (vector DB)' },
      { tr: 'Sadece llama.cpp', en: 'llama.cpp alone' },
      { tr: 'Sadece WebLLM', en: 'WebLLM alone' },
    ],
    correct: 1,
    explain: {
      tr: 'Open WebUI, mevcut bir model sunucusunun üstüne RAG, kullanıcı yönetimi ve sohbet arayüzü ekler. Tam yığın: Open WebUI + vLLM/Ollama + vector DB (pgvector, Qdrant).',
      en: 'Open WebUI adds RAG, user management, and chat UI on top of an existing model server. Full stack: Open WebUI + vLLM/Ollama + vector DB (pgvector, Qdrant).',
    },
    tags: ['decision', 'rag', 'team'],
  },
  {
    id: 'quiz:decision:5',
    kind: 'mcq',
    prompt: {
      tr: 'Bir ajan uygulamasında çıktının belirli bir JSON şemasına uyması gerekiyor. En güvenilir kontrol hangisidir?',
      en: 'An agent application requires output to match a JSON schema. Which control is most reliable?',
    },
    options: [
      { tr: 'Yalnızca temperature=0 kullanmak', en: 'Use temperature=0 only' },
      { tr: 'Strict/grammar desteği ve uygulama tarafı şema doğrulaması', en: 'Strict or grammar support plus application-side schema validation' },
      { tr: 'Top-p değerini yükseltmek', en: 'Raise top-p' },
      { tr: 'Daha uzun bir system prompt yazmak', en: 'Write a longer system prompt' },
    ],
    correct: 1,
    explain: {
      tr: 'Örnekleme ayarı tek başına şema uyumunu garanti etmez. Sağlayıcının strict veya grammar kısıtını kullanın; sonucu uygulama tarafında doğrulayın ve başarısızlık yolunu yönetin.',
      en: 'Sampling settings alone do not guarantee schema conformance. Use provider strict or grammar constraints, validate the result in the application, and handle the failure path.',
    },
    tags: ['decision', 'sampling', 'agent'],
  },
  {
    id: 'quiz:decision:6',
    kind: 'mcq',
    prompt: {
      tr: '70B modeli 8K bağlamda çalıştıracak, GPU belleğiniz 24 GB. Hangi yaklaşım en uygun?',
      en: 'You want to run a 70B model at 8K context on a 24 GB GPU. Which approach is best?',
    },
    options: [
      { tr: 'FP16 tam model', en: 'Full FP16 model' },
      { tr: 'INT4 nicemleme veya AWQ', en: 'INT4 quantization or AWQ' },
      { tr: 'FP32 tam model', en: 'Full FP32 model' },
      { tr: 'Saf pruning', en: 'Pure pruning' },
    ],
    correct: 1,
    explain: {
      tr: '70B FP16 ağırlıklar yaklaşık 140 GB, INT4 ham ağırlıklar yaklaşık 35 GB yer ister. Çalışma alanı ve KV önbelleği ek bellek gerektirir; 24 GB için offload veya daha agresif sıkıştırma gerekebilir ve kalite ayrıca ölçülmelidir.',
      en: 'Raw 70B FP16 weights need about 140 GB and INT4 weights about 35 GB. Workspace and KV cache add memory overhead; fitting 24 GB may require offload or stronger compression, and quality must be measured separately.',
    },
    tags: ['decision', 'quantization', 'gpu'],
  },
  {
    id: 'quiz:decision:7',
    kind: 'mcq',
    prompt: {
      tr: 'Bir telefon uygulaması içine küçük bir dil modeli gömmek istiyorsunuz. Hangi runtime en uygundur?',
      en: 'You want to embed a small language model inside a phone app. Which runtime is most appropriate?',
    },
    options: [
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'ExecuTorch', en: 'ExecuTorch' },
      { tr: 'TensorRT-LLM', en: 'TensorRT-LLM' },
      { tr: 'NVIDIA Triton', en: 'NVIDIA Triton' },
    ],
    correct: 1,
    explain: {
      tr: 'ExecuTorch, PyTorch modellerini mobil ve gömülü cihazlarda çalıştırmak için tasarlanmıştır. Diğerleri sunucu/servis odaklıdır.',
      en: 'ExecuTorch is designed to run PyTorch models on mobile and embedded devices. The others are server/service-focused.',
    },
    tags: ['decision', 'mobile', 'edge'],
  },
  {
    id: 'quiz:decision:8',
    kind: 'mcq',
    prompt: {
      tr: 'Promptları çıkarım sunucusuna göndermeden tarayıcı içinde model çalıştırmak istiyorsunuz. Hangi çözüm en uygundur?',
      en: 'You want to run a model in the browser without sending prompts to an inference server. Which solution is most appropriate?',
    },
    options: [
      { tr: 'Ollama', en: 'Ollama' },
      { tr: 'WebLLM (WebGPU)', en: 'WebLLM (WebGPU)' },
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'OpenVINO GenAI', en: 'OpenVINO GenAI' },
    ],
    correct: 1,
    explain: {
      tr: 'WebLLM modeli tarayıcıda WebGPU ile çalıştırabilir. Bu seçim promptları çıkarım sunucusuna göndermemeyi sağlar; telemetri, model indirme ve diğer ağ çağrıları yine uygulama düzeyinde denetlenmelidir.',
      en: 'WebLLM can run the model in the browser through WebGPU. That avoids sending prompts to an inference server, while telemetry, model download, and other network calls still require application-level review.',
    },
    tags: ['decision', 'privacy', 'browser'],
  },
  {
    id: 'quiz:decision:9',
    kind: 'mcq',
    prompt: {
      tr: 'Üretimde prefill ve decode\'un birbirini yavaşlattığını fark ediyorsunuz. Hangi mimari yaklaşım çözüm sağlar?',
      en: 'In production you notice prefill and decode slowing each other down. Which architectural approach solves it?',
    },
    options: [
      { tr: 'Continuous batching', en: 'Continuous batching' },
      { tr: 'Disaggregated serving (prefill/decode ayrımı)', en: 'Disaggregated serving (prefill/decode split)' },
      { tr: 'Static batching', en: 'Static batching' },
      { tr: 'Dynamic batching', en: 'Dynamic batching' },
    ],
    correct: 1,
    explain: {
      tr: 'NVIDIA Dynamo ve llm-d gibi ayrıştırılmış sunum çözümleri prefill ile decode iş yüklerini bağımsız ölçekleyebilir. Kazanç; model, trafik, donanım ve SLO\'ya göre ölçülmelidir.',
      en: 'Disaggregated serving solutions such as NVIDIA Dynamo and llm-d can scale prefill and decode workloads independently. Any gain must be measured for the model, traffic, hardware, and SLO.',
    },
    tags: ['decision', 'prefill-decode', 'scaling'],
  },
  {
    id: 'quiz:decision:10',
    kind: 'mcq',
    prompt: {
      tr: 'Birden çok açık kaynak modeli, OpenAI API\'siyle çalışan kendi yazılımınızla entegre etmek istiyorsunuz. Hangi yaklaşım lock-in\'i önler?',
      en: 'You want to integrate several open models with your own software that already uses the OpenAI API. Which approach avoids lock-in?',
    },
    options: [
      { tr: 'Her motor için ayrı SDK yazmak', en: 'Write a separate SDK for each engine' },
      { tr: 'OpenAI uyumlu API kullanan motorlar + aynı OpenAI istemcisi', en: 'Use OpenAI-compatible engines and the same OpenAI client' },
      { tr: 'Sadece Hugging Face transformers', en: 'Hugging Face transformers only' },
      { tr: 'Sadece LangChain', en: 'LangChain only' },
    ],
    correct: 1,
    explain: {
      tr: 'OpenAI uyumlu API sunan motorlar (vLLM, SGLang, Ollama, LM Studio) tek OpenAI Python SDK\'sıyla çalışır. base_url değiştirmek yeterlidir; lock-in olmaz.',
      en: 'OpenAI-compatible engines (vLLM, SGLang, Ollama, LM Studio) work with the same OpenAI Python SDK. Just change base_url; no lock-in.',
    },
    tags: ['decision', 'api', 'portability'],
  },
  {
    id: 'quiz:decision:11',
    kind: 'mcq',
    prompt: {
      tr: 'Sürekli olarak "cevap verirken context window\'un ortasındaki bilgiyi görmezden geliyor" şikayeti alıyorsunuz. Hangi strateji daha etkilidir?',
      en: 'You keep hearing "the model ignores information in the middle of the context window". Which strategy is more effective?',
    },
    options: [
      { tr: 'Context window\'u sürekli büyütmek', en: 'Keep inflating the context window' },
      { tr: 'RAG + chunking + en önemli 3-5 chunk\'ı başta/sona koymak', en: 'RAG + chunking + put the 3-5 most important chunks at start/end' },
      { tr: 'Temperature\'ı artırmak', en: 'Increase temperature' },
      { tr: 'System prompt\'u kısaltmak', en: 'Shorten the system prompt' },
    ],
    correct: 1,
    explain: {
      tr: '"Lost in the middle" etkisi gerçektir. RAG ile dış bilgiyi modele enjekte etmek, önemli bilgiyi baş/son\'a yerleştirmek, daha etkili bir stratejidir.',
      en: 'The "lost in the middle" effect is real. Using RAG to inject external knowledge and placing the most important info at the start/end is more effective.',
    },
    tags: ['decision', 'rag', 'context-window'],
  },
  {
    id: 'quiz:decision:12',
    kind: 'mcq',
    prompt: {
      tr: 'Bir Q&A sistemi için vektör veritabanı seçeceksiniz. 5 milyon doküman parçanız var, PostgreSQL zaten kullanıyorsunuz. En pratik seçim nedir?',
      en: 'You are picking a vector DB for a Q&A system. You have 5M document chunks and already use PostgreSQL. What is the most practical choice?',
    },
    options: [
      { tr: 'Pinecone (cloud)', en: 'Pinecone (cloud)' },
      { tr: 'pgvector eklentisi', en: 'pgvector extension' },
      { tr: 'Milvus cluster', en: 'Milvus cluster' },
      { tr: 'Chroma', en: 'Chroma' },
    ],
    correct: 1,
    explain: {
      tr: '5 milyon vektör için pgvector yeterlidir; PostgreSQL\'i zaten kullanıyorsanız operasyonel yük minimuma iner. Daha büyük ölçeklerde Milvus veya Qdrant tercih edilir.',
      en: 'pgvector is enough for 5M vectors; if you already use PostgreSQL, operational overhead stays minimal. Larger scales call for Milvus or Qdrant.',
    },
    tags: ['decision', 'vector-db', 'rag'],
  },
  {
    id: 'quiz:decision:13',
    kind: 'mcq',
    prompt: {
      tr: 'Bir LLM ajanında "model bir tool\'dan cevap alamadığında sonsuz döngüye giriyor" sorunuyla karşılaşıyorsunuz. En iyi çözüm nedir?',
      en: 'In an LLM agent, you face "the model enters an infinite loop when a tool doesn\'t return". What is the best solution?',
    },
    options: [
      { tr: 'Daha büyük model kullanmak', en: 'Use a larger model' },
      { tr: 'Max iteration limit + reasoning trace loglama + circuit breaker', en: 'Max iteration limit + reasoning trace logging + circuit breaker' },
      { tr: 'Tool\'ları kaldırmak', en: 'Remove the tools' },
      { tr: 'Temperature\'ı artırmak', en: 'Increase temperature' },
    ],
    correct: 1,
    explain: {
      tr: 'Agent tasarımında max iteration limit şarttır; reasoning trace loglama hata tespiti ve debug için kritiktir. Sonsuz döngüyü önlemek için "time-out" ve "circuit breaker" ekleyin.',
      en: 'A max iteration limit is mandatory in agent design; reasoning trace logging is critical for debugging. Add time-out and circuit breaker to prevent infinite loops.',
    },
    tags: ['decision', 'agent', 'reliability'],
  },
  {
    id: 'quiz:decision:14',
    kind: 'mcq',
    prompt: {
      tr: 'Bir kurumsal LLM API yönetiminde "her müşteri kendi bütçesi, her kullanıcı kendi kotası, fallback sağlayıcı" gerekiyor. Hangi katman uygundur?',
      en: 'In an enterprise LLM API setup you need per-customer budgets, per-user quotas, and a fallback provider. Which layer fits?',
    },
    options: [
      { tr: 'Sadece vLLM', en: 'vLLM alone' },
      { tr: 'LiteLLM Proxy veya Kong AI Gateway', en: 'LiteLLM Proxy or Kong AI Gateway' },
      { tr: 'Sadece llama.cpp', en: 'llama.cpp alone' },
      { tr: 'Sadece WebLLM', en: 'WebLLM alone' },
    ],
    correct: 1,
    explain: {
      tr: 'API gateway\'ler (LiteLLM Proxy, Kong AI Gateway) kimlik, kota, bütçe, yönlendirme ve fallback politikalarını sağlar. vLLM/llama.cpp bunları tek başına sunmaz.',
      en: 'API gateways (LiteLLM Proxy, Kong AI Gateway) provide identity, quotas, budgets, routing, and fallback policies. vLLM/llama.cpp do not provide these on their own.',
    },
    tags: ['decision', 'gateway', 'enterprise'],
  },
  {
    id: 'quiz:decision:15',
    kind: 'mcq',
    prompt: {
      tr: 'Bir modeli kendi korpusunuz (ürün belgeleri, sohbet günlükleri) üzerinde uzmanlaştırmak istiyorsunuz, ancak 70B modeli full fine-tune etmek için yeterli GPU\'nuz yok. Hangi strateji uygundur?',
      en: 'You want to specialize a model on your own corpus (product docs, chat logs), but you don\'t have enough GPU to full fine-tune a 70B model. Which strategy fits?',
    },
    options: [
      { tr: 'Full fine-tuning', en: 'Full fine-tuning' },
      { tr: 'LoRA veya QLoRA', en: 'LoRA or QLoRA' },
      { tr: 'Sadece prompt engineering', en: 'Prompt engineering only' },
      { tr: 'Sadece RAG', en: 'RAG only' },
    ],
    correct: 1,
    explain: {
      tr: 'LoRA/QLoRA yalnızca adaptör parametrelerini eğiterek tam ince ayara göre bellek gereksinimini azaltabilir. Bir 70B modelin sığıp sığmaması nicemleme, dizi uzunluğu, rank, optimizer ve offload düzenine bağlıdır; kalite hedef görev kümesinde ölçülmelidir.',
      en: 'LoRA or QLoRA can reduce memory demand versus full fine-tuning by training adapter parameters. Whether a 70B model fits depends on quantization, sequence length, rank, optimizer, and offload strategy; quality must be measured on the target task set.',
    },
    tags: ['decision', 'lora', 'fine-tuning'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Doğru/Yanlış (5) — Yaygın yanlış inanışlar
  // ═══════════════════════════════════════════════════════════

  {
    id: 'quiz:myth:1',
    kind: 'truefalse',
    prompt: {
      tr: 'vLLM her durumda en hızlı LLM sunum motorudur.',
      en: 'vLLM is the fastest LLM serving engine in every scenario.',
    },
    correct: false,
    explain: {
      tr: 'vLLM continuous batching + PagedAttention ile yüksek eşzamanlı senaryolarda öne çıkar. Düşük eşzamanlılık, Apple Silicon veya edge gibi farklı senaryolarda TensorRT-LLM, llama.cpp, mlx-lm daha hızlı olabilir.',
      en: 'vLLM stands out for high-concurrency scenarios. For low concurrency, Apple Silicon, or edge, TensorRT-LLM, llama.cpp, or mlx-lm can be faster.',
    },
    tags: ['myth', 'vllm', 'serving'],
  },
  {
    id: 'quiz:myth:2',
    kind: 'truefalse',
    prompt: {
      tr: 'Sıcaklık (temperature) 0\'a ayarlandığında model aynı girdiyle her zaman aynı cevabı üretir.',
      en: 'When temperature is set to 0, the model always produces the same answer for the same input.',
    },
    correct: false,
    explain: {
      tr: 'Temperature=0 birçok motorda greedy seçime yaklaşır ve tekrarlanabilirliği artırır; fakat çekirdek, donanım, eşzamanlılık ve sağlayıcı uygulaması sonucu değiştirebilir. Seed ve sürümler sabitlense bile bit düzeyinde özdeşlik ayrıca sınanmalıdır.',
      en: 'Temperature=0 approaches greedy selection in many engines and improves repeatability, but kernels, hardware, concurrency, and provider implementation can still change output. Even with pinned seeds and versions, bit-level identity must be tested.',
    },
    tags: ['myth', 'temperature', 'sampling'],
  },
  {
    id: 'quiz:myth:3',
    kind: 'truefalse',
    prompt: {
      tr: 'Quantization (nicemleme) modelin kalitesini her zaman düşürür.',
      en: 'Quantization always reduces the model\'s quality.',
    },
    correct: false,
    explain: {
      tr: 'Kalite etkisi model, bit genişliği, kalibrasyon verisi ve göreve bağlıdır. AWQ, GPTQ veya QAT kaybı azaltabilir; bazı görevlerde fark küçükken bazılarında belirgin olabilir. Nicemlenmiş model hedef değerlendirme kümesinde tabanla karşılaştırılmalıdır.',
      en: 'Quality impact depends on model, bit width, calibration data, and task. AWQ, GPTQ, or QAT can reduce loss; the difference may be small on some tasks and material on others. Compare the quantized model with its baseline on the target evaluation set.',
    },
    tags: ['myth', 'quantization', 'optimization'],
  },
  {
    id: 'quiz:myth:4',
    kind: 'truefalse',
    prompt: {
      tr: 'Daha büyük context window = model her zaman o kadar bilgiyi hatırlar.',
      en: 'A larger context window means the model always remembers that much information.',
    },
    correct: false,
    explain: {
      tr: '"Lost in the middle" etkisi gerçektir; modeller uzun bağlamda ortadaki bilgiyi kenarlardakinden daha az hatırlar. Ayrıca KV cache belleği bağlamla doğrusal büyür, VRAM hızla dolar. Etkili bağlam genellikle nominal bağlamdan küçüktür.',
      en: 'The "lost in the middle" effect is real: in long contexts, models recall middle info less than the edges. Also, KV cache memory grows linearly with context, so VRAM fills up fast. Effective context is usually smaller than nominal context.',
    },
    tags: ['myth', 'context-window', 'memory'],
  },
  {
    id: 'quiz:myth:5',
    kind: 'truefalse',
    prompt: {
      tr: 'LoRA adaptörü eklendikten sonra inference sırasında ekstra matris çarpımı yapılmaz.',
      en: 'After adding a LoRA adapter, no extra matrix multiplication happens during inference.',
    },
    correct: false,
    explain: {
      tr: 'LoRA adaptörü ana ağırlıklara birleştirilmezse çıkarım sırasında ek adaptör hesaplaması gerekir. Birleştirme desteği, çoklu adaptör gereksinimi ve gecikme etkisi kullanılan sunucu sürümünde ölçülmelidir.',
      en: 'If a LoRA adapter is not merged into the base weights, inference performs additional adapter computation. Measure merge support, multi-adapter needs, and latency impact on the serving release you use.',
    },
    tags: ['myth', 'lora', 'inference'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Karar/Uygulama — Genişletilmiş Senaryolar (20) — quiz:decision-extended:1-20
  // ═══════════════════════════════════════════════════════════

  {
    id: 'quiz:decision-extended:1',
    kind: 'mcq',
    prompt: {
      tr: 'Bir öğrenci ilk kez Mac\'inde (M2 veya üstü) bir LLM denemek istiyor; terminalden tek satırla çalışan bir deneyim arıyor. İlk adım için en uygun kombinasyon nedir?',
      en: 'A student wants to try an LLM on a Mac (M2 or newer) for the first time and is looking for a one-line terminal experience. What is the best starting combination?',
    },
    options: [
      { tr: 'Ollama ile `ollama pull llama3.2:3b` ve `ollama run`', en: 'Ollama with `ollama pull llama3.2:3b` and `ollama run`' },
      { tr: 'vLLM + CUDA kurulumu', en: 'vLLM + CUDA setup' },
      { tr: 'TensorRT-LLM + NVIDIA sürücüleri', en: 'TensorRT-LLM + NVIDIA drivers' },
      { tr: 'OpenVINO GenAI (Intel CPU için)', en: 'OpenVINO GenAI (for Intel CPU)' },
    ],
    correct: 0,
    explain: {
      tr: 'Ollama, Apple Silicon için tek satırda kurulur, modelleri hazır gelir ve terminalden anında sohbet başlatır. vLLM ve TensorRT-LLM NVIDIA GPU ister; OpenVINO ise Intel donanımına odaklıdır.',
      en: 'Ollama installs in one line on Apple Silicon, ships ready-to-run models, and starts a chat from the terminal. vLLM and TensorRT-LLM need an NVIDIA GPU; OpenVINO is focused on Intel hardware.',
    },
    tags: ['decision', 'apple-silicon', 'starter'],
  },
  {
    id: 'quiz:decision-extended:2',
    kind: 'mcq',
    prompt: {
      tr: 'Şirketiniz üretimde 1000 eşzamanlı kullanıcı için OpenAI uyumlu bir API kuracak; maliyet, kota ve düşmeyen servis (fallback) şart. Mimari nasıl olmalı?',
      en: 'Your company is deploying an OpenAI-compatible API for 1000 concurrent users in production; cost, quotas, and failover are required. What should the architecture look like?',
    },
    options: [
      { tr: 'Tek bir vLLM sunucusu, açık port', en: 'A single vLLM server with an open port' },
      { tr: 'vLLM/SGLang (sunum) + LiteLLM Proxy (kota, maliyet, fallback) + kimlik katmanı', en: 'vLLM/SGLang (serving) + LiteLLM Proxy (quotas, cost, fallback) + auth layer' },
      { tr: 'Sadece Ollama + Open WebUI', en: 'Ollama + Open WebUI only' },
      { tr: 'Sadece WebLLM, istemci tarafı', en: 'WebLLM only, on the client' },
    ],
    correct: 1,
    explain: {
      tr: 'Üretim için sunum motoru (vLLM/SGLang) tek başına kota, çoklu sağlayıcı, maliyet takibi veya auth sağlamaz. Bu işleri yapan bir ağ geçidi katmanı (LiteLLM Proxy, Kong AI Gateway) şarttır.',
      en: 'In production, a serving engine (vLLM/SGLang) alone does not provide quotas, multi-provider routing, cost tracking, or auth. A gateway layer (LiteLLM Proxy, Kong AI Gateway) is required for those concerns.',
    },
    tags: ['decision', 'production', 'gateway'],
  },
  {
    id: 'quiz:decision-extended:3',
    kind: 'mcq',
    prompt: {
      tr: 'Akıllı telefonda veya IoT cihazında (örn. 4 GB RAM) küçük bir asistan çalıştırmak istiyorsunuz. Hangi yığın uygundur?',
      en: 'You want to run a small assistant on a smartphone or IoT device (e.g. 4 GB RAM). Which stack fits?',
    },
    options: [
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'SGLang', en: 'SGLang' },
      { tr: 'ExecuTorch + 1-3B nicellenmiş model', en: 'ExecuTorch + 1-3B quantized model' },
      { tr: 'TensorRT-LLM (H100 ile)', en: 'TensorRT-LLM (with H100)' },
    ],
    correct: 2,
    explain: {
      tr: 'Edge cihazlar için PyTorch ekibi tarafından geliştirilen ExecuTorch (veya llama.cpp Android portu) uygundur; 1-3B nicellenmiş (INT4) model 2-4 GB RAM\'de çalışır. vLLM/SGLang sunucu sınıfıdır.',
      en: 'ExecuTorch (built by the PyTorch team) or a llama.cpp Android port fits edge devices; a 1-3B INT4 quantized model runs in 2-4 GB RAM. vLLM/SGLang are server-class.',
    },
    tags: ['decision', 'edge', 'mobile'],
  },
  {
    id: 'quiz:decision-extended:4',
    kind: 'mcq',
    prompt: {
      tr: 'Modelin bilgi kesim tarihinden sonra olan olaylar hakkında doğru yanıt vermesi gerekiyor. Hangi kavram temel çözümdür?',
      en: 'The model needs to answer correctly about events that happened after its training cutoff. Which concept is the core solution?',
    },
    options: [
      { tr: 'Sıcaklık (temperature) ayarı', en: 'Temperature setting' },
      { tr: 'Quantization', en: 'Quantization' },
      { tr: 'RAG (Retrieval-Augmented Generation)', en: 'RAG (Retrieval-Augmented Generation)' },
      { tr: 'LoRA adaptörü', en: 'LoRA adapter' },
    ],
    correct: 2,
    explain: {
      tr: 'RAG, modelin cevap vermeden önce güncel/ilgili belgeleri getirip prompt\'a eklemesini sağlar. Bu sayede model bilgi kesiminden sonra olaylar hakkında güvenilir yanıt verebilir; fine-tuning ise pahalı ve güncelliği zor.',
      en: 'RAG retrieves up-to-date or relevant documents and adds them to the prompt before generation. This lets the model answer reliably about post-cutoff events; fine-tuning is expensive and hard to keep fresh.',
    },
    tags: ['decision', 'rag', 'freshness'],
  },
  {
    id: 'quiz:decision-extended:5',
    kind: 'mcq',
    prompt: {
      tr: 'Aynı model hem geliştirici Mac\'inde hem de veri merkezi Linux sunucusunda değişiklik olmadan çalışmalı. Hangi yaklaşım doğru kabul edilir?',
      en: 'The same model must run unchanged on both a developer Mac and a data-center Linux server. Which approach is considered correct?',
    },
    options: [
      { tr: 'İki ayrı format, iki ayrı model', en: 'Two separate formats, two separate models' },
      { tr: 'GGUF gibi çapraz platform bir format kullanmak', en: 'Use a cross-platform format like GGUF' },
      { tr: 'Yalnızca CUDA formatı', en: 'CUDA-only format' },
      { tr: 'Yalnızca MLX formatı', en: 'MLX-only format' },
    ],
    correct: 1,
    explain: {
      tr: 'GGUF (llama.cpp) hem Apple Silicon hem Linux CPU/GPU\'da aynı modelle çalışır. Aynı ağırlık dosyasını iki platformda birden kullanmak için tasarlanmış taşınabilir bir formattır.',
      en: 'GGUF (llama.cpp) runs the same model on both Apple Silicon and Linux CPU/GPU. It is a portable format designed to use one weight file across both platforms.',
    },
    tags: ['decision', 'portability', 'gguf'],
  },
  {
    id: 'quiz:decision-extended:6',
    kind: 'mcq',
    prompt: {
      tr: 'Multi-tenant bir SaaS\'te her müşterinin LLM maliyetini ayrı takip etmek ve bütçesini aşmasını engellemek istiyorsunuz. Doğru katman nedir?',
      en: 'In a multi-tenant SaaS, you want to track each customer\'s LLM cost separately and prevent them from exceeding their budget. What is the right layer?',
    },
    options: [
      { tr: 'Sadece vLLM', en: 'vLLM alone' },
      { tr: 'API Gateway (LiteLLM Proxy veya Kong AI Gateway) ile kota/bütçe kuralları', en: 'API Gateway (LiteLLM Proxy or Kong AI Gateway) with quota/budget policies' },
      { tr: 'Ollama', en: 'Ollama' },
      { tr: 'Sadece WebLLM', en: 'WebLLM only' },
    ],
    correct: 1,
    explain: {
      tr: 'Maliyet kontrolü, kota ve tenant başına takip bir API gateway işidir. vLLM/Ollama gibi motorlar bu politikaları uygulamaz; gateway gelen isteği tenant\'a bağlar ve bütçeyi denetler.',
      en: 'Cost control, quotas, and per-tenant tracking are API gateway concerns. Engines like vLLM or Ollama do not enforce these policies; the gateway maps the request to a tenant and enforces the budget.',
    },
    tags: ['decision', 'saas', 'cost-control'],
  },
  {
    id: 'quiz:decision-extended:7',
    kind: 'mcq',
    prompt: {
      tr: 'Açık kaynak bir modeli tıbbi veya hukuki içeriğe özel olarak odaklamak istiyorsunuz. En pratik ilk adım nedir?',
      en: 'You want to specialize an open-source model on medical or legal content. What is the most practical first step?',
    },
    options: [
      { tr: 'Sıfırdan full fine-tune', en: 'Full fine-tune from scratch' },
      { tr: 'LoRA/QLoRA ile alan-özgü ince ayar', en: 'Domain-specific fine-tuning with LoRA/QLoRA' },
      { tr: 'GPU\'yu değiştirmek', en: 'Swap the GPU' },
      { tr: 'Context window\'u ikiye katlamak', en: 'Double the context window' },
    ],
    correct: 1,
    explain: {
      tr: 'LoRA/QLoRA, tüm ağırlıkları güncellemeden alan davranışını denemek için uygun bir başlangıçtır. Gerekli veri ve bellek model, dizi uzunluğu, rank ve eğitim hedefine bağlıdır; alan bilgisi güncelliği için retrieval seçeneği de ayrıca değerlendirilmelidir.',
      en: 'LoRA or QLoRA is a practical starting point for testing domain behavior without updating every weight. Data and memory needs depend on model, sequence length, rank, and training goal; retrieval should also be evaluated when the problem is knowledge freshness.',
    },
    tags: ['decision', 'fine-tuning', 'lora'],
  },
  {
    id: 'quiz:decision-extended:8',
    kind: 'mcq',
    prompt: {
      tr: 'Sohbet uygulamasında ilk token\'ın < 100 ms\'de gelmesi (TTFT) şart. En etkili kaldıraç nedir?',
      en: 'A chat app requires Time To First Token under 100 ms. What is the most effective lever?',
    },
    options: [
      { tr: 'Nicellenmiş (INT4/AWQ) model + prefill optimizasyonu + prompt-cache', en: 'Quantized (INT4/AWQ) model + prefill optimization + prompt cache' },
      { tr: 'Daha büyük bir model seçmek', en: 'Pick a larger model' },
      { tr: 'Context window\'u 1M\'e çıkarmak', en: 'Bump the context window to 1M' },
      { tr: 'Sıcaklığı yükseltmek', en: 'Raise the temperature' },
    ],
    correct: 0,
    explain: {
      tr: 'TTFT büyük ölçüde prefill aşamasına bağlıdır. Nicellenmiş model prefill\'i hızlandırır; prompt cache aynı sistem prompt\'u tekrar hesaplamaz; uzun bağlam ise prefill\'i yavaşlatır.',
      en: 'TTFT is dominated by the prefill phase. A quantized model accelerates prefill; a prompt cache avoids recomputing the same system prompt; a longer context slows prefill down.',
    },
    tags: ['decision', 'latency', 'prefill'],
  },
  {
    id: 'quiz:decision-extended:9',
    kind: 'mcq',
    prompt: {
      tr: 'Müşteri verileri dışarı çıkmamalı, tamamen şirket içinde kalmalı. Hangi mimari uygundur?',
      en: 'Customer data must not leave the company; everything must stay on-prem. Which architecture fits?',
    },
    options: [
      { tr: 'Genel bulut LLM API', en: 'Public cloud LLM API' },
      { tr: 'Kendi veri merkezinde llama.cpp/llama.cpp sunucusu veya Ollama + yerel model', en: 'On-prem llama.cpp/llama.cpp server or Ollama with a local model' },
      { tr: 'WebLLM ile istemci tarafı', en: 'Client-side WebLLM' },
      { tr: 'Sadece embedding API', en: 'Embedding API only' },
    ],
    correct: 1,
    explain: {
      tr: 'Yerinde barındırılan llama.cpp veya Ollama, çıkarım yolunu şirket altyapısında tutabilir. Bunun veri çıkışını gerçekten engellemesi için model indirme, telemetri, istemci, kayıt, ağ ve yedekleme yolları da kurum politikasına göre sınırlandırılmalıdır.',
      en: 'On-prem llama.cpp or Ollama can keep the inference path inside company infrastructure. To actually prevent data egress, model downloads, telemetry, clients, logs, networks, and backups must also be constrained by company policy.',
    },
    tags: ['decision', 'privacy', 'on-prem'],
  },
  {
    id: 'quiz:decision-extended:10',
    kind: 'mcq',
    prompt: {
      tr: 'Mevcut OpenAI API entegrasyonunuzu başka bir sağlayıcıya (örn. Anthropic veya yerel vLLM) taşımak istiyorsunuz. Hangi kavram/komponent geçişi kolaylaştırır?',
      en: 'You want to migrate an existing OpenAI API integration to another provider (e.g. Anthropic or local vLLM). Which concept/component makes the switch easier?',
    },
    options: [
      { tr: 'Sıfırdan yeniden kod yazmak', en: 'Rewrite the code from scratch' },
      { tr: 'OpenAI uyumlu API (vLLM, LocalAI, LiteLLM Proxy)', en: 'OpenAI-compatible API (vLLM, LocalAI, LiteLLM Proxy)' },
      { tr: 'Sadece özel bir HTTP istemcisi kullanmak', en: 'Use a custom HTTP client only' },
      { tr: 'Yalnızca WebLLM', en: 'WebLLM only' },
    ],
    correct: 1,
    explain: {
      tr: 'OpenAI uyumlu uç noktalar sunan motorlar (vLLM, SGLang, LocalAI, Ollama, LiteLLM Proxy) sayesinde istemci tarafında değişiklik yapmadan base URL değiştirip farklı sağlayıcıya geçebilirsiniz.',
      en: 'Engines that expose OpenAI-compatible endpoints (vLLM, SGLang, LocalAI, Ollama, LiteLLM Proxy) let you switch providers by changing the base URL without modifying client code.',
    },
    tags: ['decision', 'migration', 'openai-compatible'],
  },
  {
    id: 'quiz:decision-extended:11',
    kind: 'mcq',
    prompt: {
      tr: 'Kullanıcı arayüzünde cevabın "yazılıyormuş gibi" token token görünmesi gerekiyor. Hangi mekanizma kullanılır?',
      en: 'The UI should render the answer token by token as if it is being typed. Which mechanism is used?',
    },
    options: [
      { tr: 'Streaming (SSE / HTTP chunked)', en: 'Streaming (SSE / HTTP chunked)' },
      { tr: 'Caching', en: 'Caching' },
      { tr: 'Batching', en: 'Batching' },
      { tr: 'Quantization', en: 'Quantization' },
    ],
    correct: 0,
    explain: {
      tr: 'Streaming, modelin tam cevabı bitirmesini beklemeden her token\'ı istemciye yollamasıdır (SSE veya HTTP chunked). TTFT ve TPOT kullanıcı deneyimini belirleyen metriklerdir.',
      en: 'Streaming sends each token to the client without waiting for the full answer to finish (SSE or HTTP chunked). TTFT and TPOT are the metrics that govern perceived responsiveness.',
    },
    tags: ['decision', 'streaming', 'ux'],
  },
  {
    id: 'quiz:decision-extended:12',
    kind: 'mcq',
    prompt: {
      tr: 'Aynı anda 3-4 farklı LLM\'i yükleyip yanıtlarını karşılaştırmak istiyorsunuz. Yerel olarak en pratik çözüm nedir?',
      en: 'You want to load 3-4 different LLMs at once and compare their answers. What is the most practical local solution?',
    },
    options: [
      { tr: 'vLLM', en: 'vLLM' },
      { tr: 'LM Studio veya Ollama (yan yana modeller)', en: 'LM Studio or Ollama (side-by-side models)' },
      { tr: 'TensorRT-LLM', en: 'TensorRT-LLM' },
      { tr: 'Sadece bir modeli yükleyip diğerlerini silmek', en: 'Load only one model and delete the rest' },
    ],
    correct: 1,
    explain: {
      tr: 'LM Studio ve Ollama, birden fazla modeli aynı anda yükleyip yan yana çalıştırmayı ve aynı prompt ile karşılaştırmayı kolaylaştırır. vLLM tek bir modeli yüksek verimle sunar, karşılaştırma için tasarlanmamıştır.',
      en: 'LM Studio and Ollama make it easy to load multiple models side by side and compare them on the same prompt. vLLM serves a single model at high throughput and is not designed for A/B comparison.',
    },
    tags: ['decision', 'comparison', 'desktop'],
  },
  {
    id: 'quiz:decision-extended:13',
    kind: 'mcq',
    prompt: {
      tr: 'KV cache belleği 24 GB GPU\'da OOM (Out-Of-Memory) veriyor. En uygun ilk müdahale nedir?',
      en: 'The KV cache is OOM-ing on a 24 GB GPU. What is the most appropriate first mitigation?',
    },
    options: [
      { tr: 'Context window\'u küçültmek ve/veya PagedAttention kullanan vLLM\'e geçmek', en: 'Reduce the context window and/or switch to a PagedAttention engine like vLLM' },
      { tr: 'Daha büyük bir GPU almak', en: 'Buy a larger GPU' },
      { tr: 'Sıcaklığı yükseltmek', en: 'Raise the temperature' },
      { tr: 'Sampling formatını değiştirmek', en: 'Change the sampling format' },
    ],
    correct: 0,
    explain: {
      tr: 'KV cache belleği context ile doğrusal büyür. Önce context window\'u küçültmek veya PagedAttention (vLLM) kullanmak belleği ciddi oranda azaltır; yeni GPU almak son çaredir.',
      en: 'KV cache memory grows linearly with context. Reducing the context window or using a PagedAttention engine like vLLM significantly cuts memory; buying a bigger GPU is the last resort.',
    },
    tags: ['decision', 'kv-cache', 'memory'],
  },
  {
    id: 'quiz:decision-extended:14',
    kind: 'mcq',
    prompt: {
      tr: 'Aynı prompt için farklı yanıtlar geliyor; tekrarlanabilirlik (reproducibility) istiyorsunuz. Hangi ayar doğrudan etkili değildir?',
      en: 'The same prompt returns different answers and you want reproducibility. Which setting does NOT directly affect it?',
    },
    options: [
      { tr: 'Sıcaklık (temperature) = 0', en: 'Temperature = 0' },
      { tr: 'Top-p = 1, seed sabitlemek', en: 'Top-p = 1 and pinning the seed' },
      { tr: 'Max tokens', en: 'Max tokens' },
      { tr: 'Modülün dağıtık/atomik sırası (FP sırası)', en: 'Distributed/atomic ordering (FP order) of the engine' },
    ],
    correct: 2,
    explain: {
      tr: 'Max tokens, cevabın uzunluğunu sınırlar; rastgeleliği etkilemez. Tekrarlanabilirlik için temperature=0, top-p=1, sabit seed ve belirli motorlarda atomik operasyon sırası önemlidir.',
      en: 'Max tokens limits answer length, not randomness. For reproducibility, set temperature=0, top-p=1, fix the seed, and watch atomic operation order in some engines.',
    },
    tags: ['decision', 'sampling', 'reproducibility'],
  },
  {
    id: 'quiz:decision-extended:15',
    kind: 'mcq',
    prompt: {
      tr: 'Eski bir modeli (örn. Llama 2 7B) yeni bir donanımda (örn. Apple M4 veya RTX 4090) çalıştırmak istiyorsunuz. Hangi adım doğru?',
      en: 'You want to run an old model (e.g. Llama 2 7B) on new hardware (e.g. Apple M4 or RTX 4090). Which step is correct?',
    },
    options: [
      { tr: 'Modeli yeniden eğitmek', en: 'Retrain the model' },
      { tr: 'Ağırlıkları uygun formata dönüştürmek (GGUF/SafeTensors) ve donanıma uygun motoru seçmek', en: 'Convert the weights to a suitable format (GGUF/SafeTensors) and pick a hardware-appropriate engine' },
      { tr: 'Sadece OpenAI API kullanmak', en: 'Use the OpenAI API only' },
      { tr: 'Aynı Python pickle dosyasını kullanmak', en: 'Use the same Python pickle file' },
    ],
    correct: 1,
    explain: {
      tr: 'Eski modeller genellikle uyumsuz formatta gelir. Hedef donanıma göre format dönüşümü (PyTorch -> GGUF/SafeTensors) ve motor seçimi (Metal için mlx-lm, NVIDIA için vLLM/TensorRT-LLM) gerekir.',
      en: 'Old models often come in incompatible formats. You need format conversion (PyTorch to GGUF/SafeTensors) and an engine that matches the target hardware (mlx-lm for Metal, vLLM/TensorRT-LLM for NVIDIA).',
    },
    tags: ['decision', 'conversion', 'legacy'],
  },
  {
    id: 'quiz:decision-extended:16',
    kind: 'mcq',
    prompt: {
      tr: 'Bir agent\'ın internete erişip güncel bilgi çekmesi gerekiyor. Hangi kavram/komponent kullanılır?',
      en: 'An agent needs to access the internet and pull up-to-date information. Which concept/component is used?',
    },
    options: [
      { tr: 'Quantization', en: 'Quantization' },
      { tr: 'Function calling / tool use', en: 'Function calling / tool use' },
      { tr: 'LoRA', en: 'LoRA' },
      { tr: 'Speculative decoding', en: 'Speculative decoding' },
    ],
    correct: 1,
    explain: {
      tr: 'Function calling (tool use) modele "bir arama API\'si çağır" gibi dış eylemleri tanımlar. Model JSON şemasına uygun tool çağrısı üretir, uygulama onu çalıştırır, sonucu modele geri verir.',
      en: 'Function calling (tool use) defines external actions for the model, like "call this search API". The model emits a tool call matching a JSON schema, the app runs it, and feeds the result back.',
    },
    tags: ['decision', 'agent', 'function-calling'],
  },
  {
    id: 'quiz:decision-extended:17',
    kind: 'mcq',
    prompt: {
      tr: 'RAG sisteminin retrieval kısmı yavaş; büyük bir vector DB ve milyonlarca parça var. Hangi optimizasyon ilk adımdır?',
      en: 'Your RAG system\'s retrieval is slow; you have a large vector DB with millions of chunks. What is the first optimization to try?',
    },
    options: [
      { tr: 'HNSW veya IVF indeksli vector DB kullanmak (Qdrant, Milvus, pgvector)', en: 'Use an HNSW or IVF-indexed vector DB (Qdrant, Milvus, pgvector)' },
      { tr: 'LLM\'i değiştirmek', en: 'Switch the LLM' },
      { tr: 'Sıcaklığı artırmak', en: 'Increase the temperature' },
      { tr: 'Embedding modelini silmek', en: 'Delete the embedding model' },
    ],
    correct: 0,
    explain: {
      tr: 'Vector DB indeksleme (HNSW, IVF) milyonlarca parçada bile O(log N) arama sağlar. Flat/brute-force arama O(N) olduğundan büyük veri setlerinde pratikte kullanılamaz.',
      en: 'Vector DB indexing (HNSW, IVF) gives O(log N) search even on millions of chunks. Flat/brute-force is O(N) and is impractical at scale.',
    },
    tags: ['decision', 'rag', 'vector-db'],
  },
  {
    id: 'quiz:decision-extended:18',
    kind: 'mcq',
    prompt: {
      tr: 'Fine-tuning yapmak istiyorsunuz ama yerel GPU\'nuz yok; sadece kiralık API erişiminiz var. En uygun strateji nedir?',
      en: 'You want to fine-tune but have no local GPU; you only have rented API access. What is the best strategy?',
    },
    options: [
      { tr: 'API ile fine-tuning sunan bir sağlayıcıyı kullanmak (OpenAI fine-tune, Hugging Face AutoTrain, Together, Fireworks)', en: 'Use a provider that offers fine-tuning via API (OpenAI fine-tune, Hugging Face AutoTrain, Together, Fireworks)' },
      { tr: 'Beklemek', en: 'Wait' },
      { tr: 'Sadece prompt engineering', en: 'Prompt engineering only' },
      { tr: 'Sadece daha büyük model seçmek', en: 'Only pick a larger model' },
    ],
    correct: 0,
    explain: {
      tr: 'Birçok sağlayıcı managed fine-tuning sunar; veri yükle, fine-tune başlat, adapter indir veya API üzerinden çağır. GPU ihtiyacını sağlayıcı karşılar; bu küçük veri için LoRA/QLoRA ile dakikalar-saatler sürer.',
      en: 'Many providers offer managed fine-tuning: upload data, start the job, download the adapter, or call it via API. The provider handles the GPU; with LoRA/QLoRA on small data this takes minutes to hours.',
    },
    tags: ['decision', 'fine-tuning', 'managed'],
  },
  {
    id: 'quiz:decision-extended:19',
    kind: 'mcq',
    prompt: {
      tr: 'Quantization kalite kaybı yaratır mı? Doğru cevap nedir?',
      en: 'Does quantization cause quality loss? What is the correct answer?',
    },
    options: [
      { tr: 'Her zaman ciddi kalite kaybı olur', en: 'It always causes severe quality loss' },
      { tr: 'İyi uygulanmış INT4 (AWQ/GPTQ) ve QAT yöntemleri kaliteyi büyük ölçüde korur; sadece agresif + dikkatsiz niceleme düşürür', en: 'Well-applied INT4 (AWQ/GPTQ) and QAT methods largely preserve quality; only aggressive + careless quantization drops quality' },
      { tr: 'Kalite artar', en: 'Quality goes up' },
      { tr: 'Sadece fine-tune edilmemiş modellerde etkili olur', en: 'It only affects non-fine-tuned models' },
    ],
    correct: 1,
    explain: {
      tr: 'AWQ/GPTQ gibi iyi kalibre edilmiş yöntemler çoğu benchmarkta ihmal edilebilir fark yaratır. QAT (Quantization-Aware Training) ile kalite korunabilir. Sorun, düşük bit + dikkatsiz kalibrasyondan doğar.',
      en: 'Well-calibrated methods like AWQ/GPTQ show negligible differences on most benchmarks. QAT (Quantization-Aware Training) preserves quality. Trouble comes from low bits plus careless calibration.',
    },
    tags: ['decision', 'quantization', 'quality'],
  },
  {
    id: 'quiz:decision-extended:20',
    kind: 'mcq',
    prompt: {
      tr: 'İki modelin çıktısını gerçek kullanıcı trafiğinde A/B test etmek istiyorsunuz. En uygun altyapı nedir?',
      en: 'You want to A/B test two model outputs on real user traffic. What is the best infrastructure for this?',
    },
    options: [
      { tr: 'API gateway / proxy üzerinde yönlendirme ve kota (LiteLLM Proxy, Kong AI Gateway) + metrik', en: 'Routing and quota at the API gateway/proxy (LiteLLM Proxy, Kong AI Gateway) + metrics' },
      { tr: 'Sadece bir modeli manuel olarak değiştirmek', en: 'Manually swap one model in and out' },
      { tr: 'Sadece kullanıcı anketi', en: 'Just use a user survey' },
      { tr: 'Sadece embedding değiştirmek', en: 'Only swap the embedding' },
    ],
    correct: 0,
    explain: {
      tr: 'A/B test için gateway seviyesinde trafik yönlendirmesi (örn. %50 model A, %50 model B) ve yanıt kalitesi/maliyet metrikleri gerekir. Bu iş LiteLLM Proxy, Kong AI Gateway veya özel bir router ile yapılır.',
      en: 'A/B testing needs gateway-level traffic split (e.g. 50% model A, 50% model B) and quality/cost metrics. This is what LiteLLM Proxy, Kong AI Gateway, or a custom router does.',
    },
    tags: ['decision', 'ab-test', 'gateway'],
  },

  // ═══════════════════════════════════════════════════════════
  //  Efsane/Gerçek — Genişletilmiş (10) — quiz:myth-extended:1-10
  // ═══════════════════════════════════════════════════════════

  {
    id: 'quiz:myth-extended:1',
    kind: 'truefalse',
    prompt: {
      tr: 'Daha büyük model her zaman daha iyi sonuç üretir.',
      en: 'A larger model always produces better results.',
    },
    correct: false,
    explain: {
      tr: 'Daha büyük model genelde daha güçlüdür, ama her zaman değil: latency, maliyet ve nicellenmiş küçük modeller bazı görevlerde daha iyi fiyat/performans sunar. Görev + kısıt önemlidir.',
      en: 'Bigger models tend to be stronger, but not always: latency, cost, and well-quantized smaller models often win on price/performance for a given task. The task and constraints matter.',
    },
    tags: ['myth', 'model-size', 'cost'],
  },
  {
    id: 'quiz:myth-extended:2',
    kind: 'truefalse',
    prompt: {
      tr: 'Açık kaynak LLM\'ler üretimde kullanılamaz.',
      en: 'Open-source LLMs cannot be used in production.',
    },
    correct: false,
    explain: {
      tr: 'Llama, Mistral ve Qwen gibi açık ağırlıklı modeller üretimde kullanılabilir. vLLM, SGLang veya TensorRT-LLM gibi uygun bir motor; kapasite testi, izleme ve güvenlik kontrolleriyle hedeflenen SLO\'lara göre işletilmelidir.',
      en: 'Open-weight models such as Llama, Mistral, and Qwen can run in production. An appropriate engine such as vLLM, SGLang, or TensorRT-LLM should be operated against target SLOs with capacity testing, observability, and security controls.',
    },
    tags: ['myth', 'open-source', 'production'],
  },
  {
    id: 'quiz:myth-extended:3',
    kind: 'truefalse',
    prompt: {
      tr: 'Apple Silicon üzerinde LLM çalıştırılamaz.',
      en: 'LLMs cannot run on Apple Silicon.',
    },
    correct: false,
    explain: {
      tr: 'MLX-LM ve llama.cpp\'nin Metal arka ucu Apple Silicon üzerinde LLM çıkarımını destekler. Sığabilecek model boyutu birleşik bellek, nicemleme, bağlam ve çalışma zamanı yüklerine bağlıdır; performans hedef donanımda ölçülmelidir.',
      en: 'MLX-LM and llama.cpp\'s Metal backend support LLM inference on Apple Silicon. Model fit depends on unified memory, quantization, context, and runtime overhead; performance should be measured on the target hardware.',
    },
    tags: ['myth', 'apple-silicon', 'inference'],
  },
  {
    id: 'quiz:myth-extended:4',
    kind: 'truefalse',
    prompt: {
      tr: 'Bir kez fine-tune edilen model artık değiştirilemez.',
      en: 'A model that has been fine-tuned once cannot be changed afterwards.',
    },
    correct: false,
    explain: {
      tr: 'LoRA gibi adaptör tabanlı yöntemlerle aynı temel modele birden fazla adaptör takılıp çıkarılabilir. Yeni veri geldiğinde adaptör yeniden eğitilebilir; temel model sabit kalır.',
      en: 'With adapter methods like LoRA, you can attach and detach multiple adapters to the same base model. When new data arrives, the adapter can be retrained while the base model stays fixed.',
    },
    tags: ['myth', 'fine-tuning', 'lora'],
  },
  {
    id: 'quiz:myth-extended:5',
    kind: 'truefalse',
    prompt: {
      tr: 'Quantization sadece inference hızını etkiler, çıktı kalitesini hiç değiştirmez.',
      en: 'Quantization only affects inference speed and never changes output quality.',
    },
    correct: false,
    explain: {
      tr: 'Nicelleme çoğu durumda kaliteyi ihmal edilebilir seviyede etkiler, ama sıfır değildir. Özellikle agresif düşük-bit (INT3 ve altı) veya dikkatsiz kalibrasyon kaliteyi bozabilir; perplexity ve benchmarklarla ölçmek gerekir.',
      en: 'Quantization usually has a negligible impact on quality, but it is not zero. Aggressive low-bit (INT3 and below) or careless calibration can hurt quality; measure with perplexity and benchmarks.',
    },
    tags: ['myth', 'quantization', 'quality'],
  },
  {
    id: 'quiz:myth-extended:6',
    kind: 'truefalse',
    prompt: {
      tr: 'Context window ne kadar büyükse model o kadar iyi uzun metinleri kullanır.',
      en: 'The larger the context window, the better the model uses long texts.',
    },
    correct: false,
    explain: {
      tr: '"Lost in the middle" etkisi gerçektir: modeller uzun bağlamda ortadaki bilgiyi kenarlardakinden daha az hatırlar. Ayrıca KV cache belleği bağlamla doğrusal büyür, VRAM hızla dolar ve prefill uzar.',
      en: 'The "lost in the middle" effect is real: in long contexts, models recall middle information less than the edges. KV cache memory also grows linearly with context, VRAM fills fast, and prefill gets slower.',
    },
    tags: ['myth', 'context-window', 'memory'],
  },
  {
    id: 'quiz:myth-extended:7',
    kind: 'truefalse',
    prompt: {
      tr: 'vLLM ve SGLang tamamen aynı şeyi yapar; birini seçmek yeterlidir.',
      en: 'vLLM and SGLang do exactly the same thing; picking either is enough.',
    },
    correct: false,
    explain: {
      tr: 'İkisi de yüksek verimli OpenAI uyumlu sunum yapar, ama farklıdır. vLLM continuous batching + PagedAttention; SGLang RadixAttention ile structured/agent senaryolarında güçlüdür. Yük, format ve kullanım senaryosu seçimi belirler.',
      en: 'Both provide high-throughput OpenAI-compatible serving, but they differ. vLLM uses continuous batching + PagedAttention; SGLang leans on RadixAttention for structured/agent workloads. Workload and format guide the choice.',
    },
    tags: ['myth', 'vllm', 'sglang'],
  },
  {
    id: 'quiz:myth-extended:8',
    kind: 'truefalse',
    prompt: {
      tr: 'Bir LLM internete bağlanmadan güncel bilgi veremez.',
      en: 'An LLM cannot provide up-to-date information without internet access.',
    },
    correct: false,
    explain: {
      tr: 'Model bilgi kesim tarihine kadar olan veriyle eğitilmiştir; ama RAG, function calling ve tool use ile dış kaynaklardan güncel bilgi çekebilir. Yani "güncel bilgi" modele dışarıdan getirilir, modelin kendi ağırlıklarında değildir.',
      en: 'A model is trained on data up to its cutoff; but RAG, function calling, and tool use let it pull fresh information from external sources. In other words, "up to date" comes from outside, not from the weights themselves.',
    },
    tags: ['myth', 'rag', 'freshness'],
  },
  {
    id: 'quiz:myth-extended:9',
    kind: 'truefalse',
    prompt: {
      tr: 'GGUF formatı yalnızca CPU için tasarlanmıştır, GPU\'da kullanılamaz.',
      en: 'The GGUF format is designed only for CPU and cannot be used on GPU.',
    },
    correct: false,
    explain: {
      tr: 'GGUF, llama.cpp tarafından kullanılan CPU-odaklı bir formattır ama aynı zamanda Apple Metal, CUDA ve Vulkan backend\'leriyle GPU\'da da çalışır. GGUF, format olarak donanımdan bağımsızdır; motor uygun backend\'i seçer.',
      en: 'GGUF, used by llama.cpp, is a CPU-friendly format, but it also runs on GPU via Apple Metal, CUDA, and Vulkan backends. As a format it is hardware-agnostic; the engine picks the appropriate backend.',
    },
    tags: ['myth', 'gguf', 'gpu'],
  },
  {
    id: 'quiz:myth-extended:10',
    kind: 'truefalse',
    prompt: {
      tr: 'Embedding vektörleri her zaman aynı boyuttadır (örn. her zaman 1536).',
      en: 'Embedding vectors are always the same size (e.g. always 1536).',
    },
    correct: false,
    explain: {
      tr: 'Embedding boyutu modele bağlıdır. text-embedding-3-small 1536, text-embedding-3-large 3072, all-MiniLM-L6-v2 384, BGE-large 1024 üretir. Aynı vector DB içinde bile farklı boyutlu koleksiyonlar ayrı tutulmalıdır.',
      en: 'Embedding size depends on the model. text-embedding-3-small produces 1536, text-embedding-3-large 3072, all-MiniLM-L6-v2 384, BGE-large 1024. In the same vector DB, collections of different dimensions must be kept separate.',
    },
    tags: ['myth', 'embedding', 'vector-db'],
  },
]
