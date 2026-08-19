import type { Concept } from '@/types/learning'

/**
 * Concept glossary. Each concept has three reading levels and a visual key.
 * Populated by content workers (aşama 2/3/4).
 */
export const concepts: Concept[] = [
  // ─── Core (8) ────────────────────────────────────────────────
  {
    slug: 'tokenization',
    name: { tr: 'Tokenization', en: 'Tokenization' },
    short: {
      tr: 'Modelin metni anlayabilmesi için onu küçük sayısal parçalara (token) bölme işlemi.',
      en: 'Splitting text into small numerical pieces (tokens) so a model can work with it.',
    },
    beginner: {
      tr: 'Bir model sayılarla çalışır, harflerle değil. Tokenization, "Merhaba dünya" gibi bir cümleyi alıp modelin işleyebileceği küçük parçalara — kelimelere, hecelere veya harf gruplarına — ayırır. Her parçaya bir sayı (token ID) verilir ve model o sayılarla işlem yapar. Aynı cümle farklı tokenizerlarla farklı sayıda parçaya bölünebilir.',
      en: 'A model works with numbers, not letters. Tokenization takes a sentence like "Hello world" and breaks it into smaller pieces — words, syllables, or groups of letters — that the model can process. Each piece is given a number (a token ID), and the model works on those numbers. The same sentence can split into a different number of pieces depending on the tokenizer.',
    },
    intermediate: {
      tr: 'Çoğu modern LLM, BPE (Byte Pair Encoding) veya SentencePiece gibi alt-kelime (subword) tokenleştiriciler kullanır. Bu yöntem, sık geçen kelimeleri tek bir token olarak, nadir veya bilinmeyen kelimeleri ise birden çok alt parçaya bölerek temsil eder. Token sayısı, modelin bağlam penceresi (context window), maliyet ve gecikme üzerinde doğrudan etkilidir. OpenAI’ın cl100k_base tokenizer’ı Türkçe gibi sondan eklemeli dillerde İngilizce’ye göre 2-3 kat daha fazla token üretebilir.',
      en: 'Most modern LLMs use subword tokenizers like BPE (Byte Pair Encoding) or SentencePiece. These methods represent frequent words as a single token, and break rare or unknown words into multiple sub-pieces. The number of tokens directly affects the model’s context window, cost, and latency. OpenAI’s cl100k_base tokenizer can produce 2-3x more tokens for agglutinative languages like Turkish compared to English.',
    },
    advanced: {
      tr: 'Tokenleştirici seçimi, bir modelin her dilde ne kadar verimli çalıştığının sessiz belirleyicisidir. SentencePiece, eğitim verisinden dil-agnostik alt-kelime dağarcığı öğrenirken, BPE byte seviyesine inerek OOV (out-of-vocabulary) sorununu kökten çözer. Pratik bir mühendis olarak bilmeniz gereken: (1) her model kendi tokenizer’ı ile gelir, başka bir modelin dağarcığı kullanılamaz; (2) token sayısı ≈ API maliyeti; (3) "gpt-4" kelimesi genellikle 2-3 token olarak bölünür, oysa "merhaba" Türkçe’de 2 token yer alabilir. Aynı prompt’un farklı dillerde maliyetini karşılaştırırken bu fark kritik önem taşır.',
      en: 'Tokenizer choice is the silent determinant of how efficiently a model works in any language. SentencePiece learns a language-agnostic subword vocabulary from training data, while BPE goes down to the byte level and eliminates OOV (out-of-vocabulary) issues entirely. As a practical engineer you should know: (1) every model ships with its own tokenizer, and you cannot reuse another model’s vocabulary; (2) token count ≈ API cost; (3) the word "gpt-4" usually splits into 2-3 tokens, while "merhaba" in Turkish can take 2 tokens. Comparing the cost of the same prompt across languages makes this gap critical.',
    },
    visual: 'token-grid',
    relatedConcepts: ['context-window', 'embedding', 'prompt', 'system-prompt'],
    relatedSolutions: ['vllm', 'ollama', 'llama-cpp', 'open-webui'],
    category: 'core',
  },
  {
    slug: 'context-window',
    name: { tr: 'Context Window (Bağlam Penceresi)', en: 'Context Window' },
    short: {
      tr: 'Modelin tek bir çağrıda "görebildiği" token sayısı sınırı.',
      en: 'The maximum number of tokens a model can "see" in a single call.',
    },
    beginner: {
      tr: 'Bir insanın sohbette aklında tutabildiği son birkaç cümle gibi düşünün: modelin de bir "kısa süreli hafızası" var. Context window, modelin bir seferde işleyebildiği toplam metin miktarıdır — hem senin sorun hem de modelin verdiği cevap bu sınıra dahildir. Bu sınırı aşarsan, modelin konuşmanın başını unutması beklenir.',
      en: 'Think of it like a person’s short-term memory in a chat: a model also has a "short-term memory." The context window is the total amount of text a model can process at once — both your question and its answer count toward this limit. If you exceed it, you can expect the model to forget the beginning of the conversation.',
    },
    intermediate: {
      tr: 'Context window genellikle token cinsinden ifade edilir. GPT-4 sınıfı modeller 8K, 32K, 128K hatta 1M token’a kadar destekleyebilir. Ancak uzun bağlamda dikkat (attention) mekanizmasının maliyeti O(n²) olduğundan bellek ve gecikme hızla artar. Ayrıca "lost in the middle" etkisi: modeller uzun bağlamda ortadaki bilgiyi kenarlardakinden daha az hatırlar. Bu yüzden uzun belgelerde RAG veya özetleme stratejileri genellikle context window’u şişirmekten daha sağlıklıdır.',
      en: 'Context window is usually expressed in tokens. GPT-4-class models can support 8K, 32K, 128K, even 1M tokens. But because the attention mechanism has O(n²) cost, memory and latency grow quickly as the context grows. There is also the "lost in the middle" effect: in long contexts, models recall information in the middle less reliably than at the edges. That is why, for long documents, RAG or summarization strategies are usually healthier than just inflating the context window.',
    },
    advanced: {
      tr: 'Modern context window iddiaları dikkatle okunmalıdır. Llama 3.1 405B, 128K token bağlamını RoPE tabanlı pozisyon kodlaması ve GQA (Grouped-Query Attention) ile mümkün kılar; yine de "etkili" bağlam çoğu kıyaslamada 32K civarında olur, çünkü uzun bağlam değerlendirmesinde Needle-in-a-Haystack testleri bile yetersiz kalabilir. Pratik üretimde: (1) context window ≠ "etkili hafıza", (2) KV cache belleği context ile doğrusal büyür — 128K × 80 katman × 8 KV başlığı = önemli VRAM, (3) streaming API’lerde context maliyeti istemci tarafında değil, sunucu state’inde birikir.',
      en: 'Modern context window claims need careful reading. Llama 3.1 405B makes 128K context possible with RoPE-based positional encoding and GQA (Grouped-Query Attention); even so, the "effective" context on most benchmarks sits around 32K, because long-context evaluations like Needle-in-a-Haystack can still be insufficient. In production: (1) context window ≠ "effective memory", (2) KV cache memory grows linearly with context — 128K × 80 layers × 8 KV heads = significant VRAM, (3) in streaming APIs, context cost accumulates in server state, not on the client.',
    },
    visual: 'context-window',
    relatedConcepts: ['tokenization', 'attention', 'kv-cache', 'prompt'],
    relatedSolutions: ['vllm', 'llama-cpp', 'ollama', 'nvidia-dynamo'],
    category: 'core',
  },
  {
    slug: 'attention',
    name: { tr: 'Attention (Dikkat Mekanizması)', en: 'Attention Mechanism' },
    short: {
      tr: 'Modelin bir token üretirken cümlenin hangi kısımlarına "odaklanacağını" belirleyen mekanizma.',
      en: 'The mechanism that decides which parts of the input a model should focus on when generating a token.',
    },
    beginner: {
      tr: 'Bir kitabı okurken önemli yerleri altını çizersin ya da not alırsın — modelin "attention" denen mekanizması tam da bunu dijital olarak yapar. Model, cümledeki her kelime için diğer kelimelere ne kadar "önem vermesi" gerektiğine karar verir. "Kedi yemeğini yedi" cümlesinde "kedi" kelimesiyle "yedi" kelimesi arasında güçlü bir bağ kurulması bu mekanizma sayesinde olur.',
      en: 'When you read a book you highlight important parts or take notes — the "attention" mechanism does the same thing digitally. For each word in a sentence, the model decides how much "importance" to give to the other words. In the sentence "The cat ate its food", the strong link between "cat" and "ate" is built through this mechanism.',
    },
    intermediate: {
      tr: 'Transformer mimarisinin kalbi self-attention’dır. Her token, diğer tüm tokenlara üç vektör olarak temsil edilir: Query (Q, "ne arıyorum?"), Key (K, "neler sunuyorum?") ve Value (V, "bulunursa ne katkı sağlarım?"). Skor = softmax(Q·Kᵀ / √d_k) · V. Bu sayede sıralı işlemeye (RNN) gerek kalmadan tüm bağlam tek seferde değerlendirilir. Maliyet O(n²) olduğundan, uzun metinlerde FlashAttention, Multi-Query Attention (MQA) ve Grouped-Query Attention (GQA) gibi varyantlar bellek ve hız için kritik optimizasyonlardır.',
      en: 'Self-attention is the heart of the Transformer architecture. Each token is represented to all other tokens as three vectors: Query (Q, "what am I looking for?"), Key (K, "what do I offer?") and Value (V, "what do I contribute if I’m found?"). The score is softmax(Q·Kᵀ / √d_k) · V. This way the whole context is evaluated in one pass, with no need for sequential processing (RNN). Because the cost is O(n²), variants like FlashAttention, Multi-Query Attention (MQA) and Grouped-Query Attention (GQA) are critical optimizations for memory and speed on long texts.',
    },
    advanced: {
      tr: 'Modern dikkat varyasyonlarını bilmek, model seçiminde fark yaratır. Multi-Head Attention (MHA) en esnek ama en pahalı yoldur; MQA tek K/V başlığı paylaşarak belleği büyük oranda düşürür (özellikle decoder’da etkili); GQA, MHA ve MQA arasında bir uzlaşma olarak 4-8 K/V grubu kullanır — Llama 2/3, Mistral ve Qwen2 bu yaklaşımı benimser. FlashAttention ise dikkat matrisini HBM yerine SRAM üzerinde blok blok hesaplayarak hem bellek trafiğini hem FLOP’u azaltır; vLLM ve TensorRT-LLM bu çekirdeği üretim çıkarımında yoğun kullanır. Pratik kural: aynı modelde GQA + FlashAttention = 2-4x daha yüksek verim.',
      en: 'Knowing modern attention variants makes a real difference in model selection. Multi-Head Attention (MHA) is the most flexible but most expensive path; MQA drastically reduces memory by sharing a single K/V head (effective especially in the decoder); GQA strikes a balance between MHA and MQA with 4-8 K/V groups — Llama 2/3, Mistral and Qwen2 adopt this approach. FlashAttention computes the attention matrix block by block in SRAM instead of HBM, reducing both memory traffic and FLOPs; vLLM and TensorRT-LLM use these kernels heavily in production inference. Practical rule: in the same model, GQA + FlashAttention = 2-4x higher throughput.',
    },
    visual: 'attention',
    relatedConcepts: ['kv-cache', 'context-window', 'embedding', 'paged-attention'],
    relatedSolutions: ['vllm', 'tensorrt-llm', 'sglang', 'nvidia-triton'],
    category: 'core',
  },
  {
    slug: 'prompt',
    name: { tr: 'Prompt (İstem)', en: 'Prompt' },
    short: {
      tr: 'Modele gönderdiğin girdi metni — modelin ne yapacağını belirleyen asıl komut.',
      en: 'The input text you send to the model — the actual instruction that decides what the model does.',
    },
    beginner: {
      tr: 'Prompt, modele yazdığın her şeydir: soru, görev, talimat, örnek… Hepsi prompt. Bir modele "Bu cümleyi Türkçeye çevir: How are you?" dediğinde, "Bu cümleyi Türkçeye çevir:" kısmı talimat, "How are you?" kısmı ise içeriktir — ikisi birlikte prompt’u oluşturur. Aynı modele aynı soruyu farklı şekillerde sorarsan, farklı cevaplar alabilirsin. Bu yüzden "iyi prompt yazmak" çoğu zaman ince ayar yapmaktan daha etkilidir.',
      en: 'A prompt is everything you write to a model: question, task, instruction, examples — all of it. When you say "Translate this sentence to Turkish: How are you?" to a model, "Translate this sentence to Turkish:" is the instruction, and "How are you?" is the content — together they form the prompt. If you ask the same model the same question in different ways, you can get different answers. That is why "writing a good prompt" is often more effective than fine-tuning.',
    },
    intermediate: {
      tr: 'İyi bir prompt genellikle dört bileşenden oluşur: (1) Rol/Kişilik ("Sen deneyimli bir editörsün"), (2) Görev tanımı ("Aşağıdaki metni özetle"), (3) Bağlam/veri (kaynak metin), (4) Format/kısıt ("3 madde halinde, her madde 20 kelimeyi geçmesin"). Few-shot prompting, modele 2-5 örnek vererek kalıbı öğretir; chain-of-thought ise "adım adım düşün" diyerek muhakemeyi zorlar. Bir prompt mühendisi olarak temel ilke: netlik, kısıt, örnek ve doğrulama — belirsiz bir prompt pahalı tokenlarla gelen belirsiz bir cevap demektir.',
      en: 'A good prompt usually has four components: (1) Role/persona ("You are an experienced editor"), (2) Task definition ("Summarize the text below"), (3) Context/data (the source text), (4) Format/constraint ("In 3 bullet points, each no longer than 20 words"). Few-shot prompting teaches the pattern by giving the model 2-5 examples; chain-of-thought forces reasoning by saying "think step by step". As a prompt engineer, the basic principles are: clarity, constraint, example, and validation — an ambiguous prompt means an ambiguous answer paid for with expensive tokens.',
    },
    advanced: {
      tr: 'Üretim seviyesinde prompt tasarımı artık "yazı yazmak" değil, bir mühendislik döngüsüdür. A/B test altyapısı, token bütçesi izleme, JSON-schema kısıtlaması (function calling/structured output) ve prompt-versioning (ör. PromptLayer, Helicone) standart hale geldi. Pratik sırlar: (1) token bütçesinin %60-70’ini context, %10-15’ini format talimatı, %20-25’ini output için ayır; (2) "step-by-step" yerine daha spesifik zincirleme düşünce (CoT-SC, self-consistency) kullan; (3) model değişikliğinde aynı prompt bile farklı sonuç verebilir — her model için regression testi tut. Atlas’ta "system prompt" ayrı bir kavramdır ve modelin temel davranışını kalıcı olarak şekillendirir.',
      en: 'In production, prompt design is no longer "writing" — it is an engineering loop. A/B test infrastructure, token budget tracking, JSON-schema constraints (function calling/structured output) and prompt-versioning (e.g. PromptLayer, Helicone) have become standard. Practical tips: (1) allocate 60-70% of token budget to context, 10-15% to format instructions, 20-25% to output; (2) use more specific chain-of-thought (CoT-SC, self-consistency) instead of plain "step-by-step"; (3) the same prompt can give different results across models — keep regression tests per model. In the Atlas, "system prompt" is a separate concept and permanently shapes the model’s core behavior.',
    },
    visual: 'token-grid',
    relatedConcepts: ['system-prompt', 'tokenization', 'context-window', 'temperature'],
    relatedSolutions: ['open-webui', 'anythingllm', 'litellm-proxy', 'lm-studio'],
    category: 'core',
  },
  {
    slug: 'embedding',
    name: { tr: 'Embedding (Gömme)', en: 'Embedding' },
    short: {
      tr: 'Metin, görsel veya sesun anlamını yansıtacak şekilde bir sayı vektörüne dönüştürülmesi.',
      en: 'Converting text, image, or audio into a numeric vector that reflects its meaning.',
    },
    beginner: {
      tr: 'Bir filmin özetine göre benzer filmleri bulmak istediğini düşün. Her filmi "macera oranı", "romantizm oranı", "gerilim" gibi sayılarla puanlayabilirsin. İşte embedding, kelimeleri veya cümleleri bu şekilde yüzlerce sayıdan oluşan bir vektöre çevirir. Anlamca yakın şeyler vektör uzayında da yakın olur. "Kral" ve "kraliçe" vektörleri birbirine yakındır, "muz" ile arasında ise daha büyük mesafe vardır.',
      en: 'Imagine you want to find similar movies based on their plots. You can score each movie with numbers like "adventure ratio", "romance ratio", "suspense". Embedding does exactly that for words or sentences, turning them into a vector of hundreds of numbers. Semantically close things end up close in vector space too. "King" and "queen" have close vectors, while "banana" sits much further from them.',
    },
    intermediate: {
      tr: 'Embedding modelleri (örn. text-embedding-3-small, BGE-M3, E5) cümle/paragraf düzeyinde 384-3072 boyutlu yoğun vektörler üretir. Bu vektörler semantik arama (RAG), kümeleme, anomali tespiti ve sınıflandırma için temel yapı taşıdır. Benzerlik için cosine similarity, dot product veya Euclidean distance kullanılır. Önemli ayrım: aynı modelin embedding’leri tutarlı bir uzay oluşturur — farklı modellerin vektörleri karşılaştırılamaz. Üretimde embedding’ler genellikle pgvector, Qdrant veya Milvus gibi vektör veritabanlarında saklanır.',
      en: 'Embedding models (e.g. text-embedding-3-small, BGE-M3, E5) produce dense vectors of 384-3072 dimensions at sentence/paragraph level. These vectors are the building blocks of semantic search (RAG), clustering, anomaly detection, and classification. For similarity, cosine similarity, dot product, or Euclidean distance is used. Important distinction: embeddings from the same model form a consistent space — vectors from different models cannot be compared. In production, embeddings are typically stored in vector databases like pgvector, Qdrant, or Milvus.',
    },
    advanced: {
      tr: 'Embedding seçimi, RAG kalitesini doğrudan belirler. Üç kritik metrik: (1) MTEB sıralaması — genel kalite, (2) Maksimum context — uzun belgelerde chunklama, (3) Çok dillilik — Türkçe için BGE-M3 veya multilingual-e5-large tercih edilir. Üretim tuzakları: (a) aynı modelin farklı versiyonları bile vektör uzayını değiştirir — migration sırasında tüm veriyi yeniden embed etmeniz gerekir; (b) chunk stratejisi 512 tokenlık sabit parçalar yerine semantik sınırlandırmayla daha iyi sonuç verir; (c) hybrid search (BM25 + dense) salt dense’ten çoğu benchmarkta üstündür. Atlas’ta embedding üreten çözümler genellikle ayrı modellerdir (örn. BGE, E5) ve serving altyapısından farklıdır.',
      en: 'Embedding choice directly determines RAG quality. Three critical metrics: (1) MTEB ranking — general quality, (2) Maximum context — chunking for long documents, (3) Multilingual support — for Turkish, BGE-M3 or multilingual-e5-large are preferred. Production pitfalls: (a) even different versions of the same model change the vector space — during migration you must re-embed all data; (b) chunk strategy yields better results with semantic boundaries than fixed 512-token chunks; (c) hybrid search (BM25 + dense) outperforms pure dense on most benchmarks. In the Atlas, embedding-producing solutions are usually separate models (e.g. BGE, E5) and differ from the serving infrastructure.',
    },
    visual: 'embedding',
    relatedConcepts: ['tokenization', 'context-window', 'prompt', 'attention'],
    relatedSolutions: ['vllm', 'xinference', 'open-webui', 'litellm-proxy'],
    category: 'core',
  },
  {
    slug: 'temperature',
    name: { tr: 'Temperature (Sıcaklık)', en: 'Temperature' },
    short: {
      tr: 'Modelin bir sonraki token’ı seçerken ne kadar "rastgele" davranacağını kontrol eden parametre.',
      en: 'A parameter that controls how much randomness the model uses when choosing the next token.',
    },
    beginner: {
      tr: 'Bir arkadaşına "bana bir film öner" diye sorduğunda, bazen aynı soruya hep aynı filmi söyler, bazen farklı farklı filmler önerir. Temperature, modelin bu "farklılık" derecesini ayarlayan düğmedir. 0’a yakın değerlerde model her zaman en olası cevabı seçer (daha tutarlı, daha "robotik"); 1’in üzerine çıkarsan cevaplar daha yaratıcı ama bazen saçma olabilir.',
      en: 'When you ask a friend "suggest me a movie", sometimes they name the same film every time, sometimes different ones each time. Temperature is the knob that controls how much of that "variation" the model shows. Near 0, the model always picks the most likely answer (more consistent, more "robotic"); above 1 the answers get more creative but can sometimes be nonsense.',
    },
    intermediate: {
      tr: 'Matematiksel olarak temperature, modelin ham logits çıktısını softmax’ten önce T değerine böler: P(token) = softmax(logits / T). T=0.0 greedy decoding (her zaman en yüksek olasılıklı token); T=1.0 modelin eğitim dağılımına yakın; T>1 dağılımı yumuşatır (daha rastgele), T<1 keskinleştirir (daha odaklı). Pratik yönergeler: kod üretimi ve veri çıkarma için T=0; yaratıcı yazı ve beyin fırtınası için T=0.7-1.0; "doğaçlama" için 1.0-1.3. Birçok API default olarak T=1.0 verir; bu genellikle rastgele gibi hissettiren tek nedendir.',
      en: 'Mathematically, temperature divides the model’s raw logits by T before softmax: P(token) = softmax(logits / T). T=0.0 is greedy decoding (always the most likely token); T=1.0 is close to the training distribution; T>1 flattens the distribution (more random), T<1 sharpens it (more focused). Practical guidelines: T=0 for code generation and data extraction; T=0.7-1.0 for creative writing and brainstorming; 1.0-1.3 for "improvisation". Many APIs default to T=1.0; that is often the only reason the output feels random.',
    },
    advanced: {
      tr: 'Temperature tek başına rastgelelik ayarlamaz — Top-p ve Top-k ile birlikte çalışır. Üretimde: (1) deterministik görevlerde (test, kod çıkarma, RAG cevabı) T=0 + seed sabitle, reproducibility şart; (2) speculative decoding ve beam search T=0 greedy ile çalışır; (3) yaratıcı yazıda sadece T değil, repetition_penalty ve frequency_penalty da ekleyin (1.05-1.2 arası); (4) farklı modellerde aynı T farklı sonuç verir — Llama 3 ile T=0.3, Mistral ile T=0.6 daha "doğal" olabilir. Atlas açısından: sampling parametreleri API gateway katmanında (LiteLLM, Kong) merkezi olarak uygulanabilir, böylece istemci tarafında sürpriz yaşanmaz.',
      en: 'Temperature alone does not set randomness — it works together with Top-p and Top-k. In production: (1) for deterministic tasks (tests, code extraction, RAG answers) set T=0 with a fixed seed, reproducibility matters; (2) speculative decoding and beam search run with T=0 greedy; (3) for creative writing, add not just T but also repetition_penalty and frequency_penalty (around 1.05-1.2); (4) the same T can give different results across models — T=0.3 may feel "natural" with Llama 3, T=0.6 with Mistral. From the Atlas perspective, sampling parameters can be enforced centrally at the API gateway layer (LiteLLM, Kong) so the client side is never surprised.',
    },
    visual: 'tree',
    relatedConcepts: ['top-p', 'prompt', 'tokenization', 'system-prompt'],
    relatedSolutions: ['vllm', 'ollama', 'open-webui', 'litellm-proxy'],
    category: 'core',
  },
  {
    slug: 'top-p',
    name: { tr: 'Top-p (Nucleus Sampling)', en: 'Top-p (Nucleus Sampling)' },
    short: {
      tr: 'Olasılık kütlesinin en üstteki p kadarını seçip sadece oradan örnekleme yöntemi.',
      en: 'A sampling method that picks from the smallest set of tokens whose probabilities sum to p.',
    },
    beginner: {
      tr: 'Diyelim modelin sıradaki kelime için 100 adayı var. Top-p=0.9 demek, "Bu 100 adaydan olasılık toplamı %90’ı kapsayacak şekilde en üsttekileri seç, gerisini görmezden gel" demektir. Genellikle bu, en olası 5-15 kelime arasında kalır. Böylece model ne çok "garanti" seçer (sıkıcı), ne de çok saçma bir kelimeye sapar (anlamsız). Top-p, temperature’a ek bir "akıllı filtre" gibidir.',
      en: 'Suppose the model has 100 candidates for the next word. Top-p=0.9 means "pick the top ones whose probability adds up to 90%, ignore the rest." Usually this leaves the 5-15 most likely words. The model is neither too "safe" (boring) nor drifts into nonsense. Top-p acts like an intelligent filter on top of temperature.',
    },
    intermediate: {
      tr: 'Nucleus sampling (Holtzman et al., 2020) olasılık kütle fonksiyonunun (PMF) kuyruğunu keser. p=0.9 demek ki: olasılıkları büyükten küçüğe sırala, birikimli toplam p’ye ulaşana kadar al. Avantajı: dağılım keskin olduğunda (örn. "The" ardından "cat" neredeyse kesin) sadece 1-2 token seçer; dağılım düz olduğunda (kelime seçimi belirsiz) daha geniş bir kümeye izin verir. Bu yüzden Top-p tek başına, sabit Top-k’dan daha sağlıklıdır. Çoğu API (OpenAI, Anthropic) Top-p=1.0 varsayılanıyla gelir ve temperature ile birlikte kullanılmasını önerir.',
      en: 'Nucleus sampling (Holtzman et al., 2020) truncates the tail of the probability mass function (PMF). p=0.9 means: sort probabilities high to low, keep taking them until cumulative sum reaches p. The advantage: when the distribution is sharp (e.g. "The" is almost surely followed by "cat"), only 1-2 tokens are chosen; when the distribution is flat (word choice is uncertain), a wider set is allowed. That is why Top-p alone is healthier than a fixed Top-k. Most APIs (OpenAI, Anthropic) ship with Top-p=1.0 as default and recommend using it alongside temperature.',
    },
    advanced: {
      tr: 'Top-p ile Temperature arasındaki etkileşim yanlış anlaşılır. OpenAI’ın önerisi: ikisini birden değiştirmeyin. Üretim desenleri: (1) yaratıcı üretimde T=0.8 + Top-p=0.9 iyi bir başlangıçtır; (2) tekrarlayan çıktılarda min_p (örn. min_p=0.05) Top-p’den daha iyi sonuç verebilir — son 1-2 yıllık open-source modellerde varsayılan olur; (3) JSON/structured output’ta sıcaklık 0 ve Top-p=1 zorunludur, aksi halde şema bozulur; (4) Speculative decoding’de Top-p=1 (full sampling) draft modelin kabul oranını etkiler. Atlas’ta serving motorları (vLLM, TensorRT-LLM) sampling parametrelerini sıralı olarak uygular: logit işleme → repetition penalty → sıcaklık → Top-k/Top-p → örnekleme.',
      en: 'The interaction between Top-p and Temperature is often misunderstood. OpenAI’s advice: do not change both at once. Production patterns: (1) for creative output, T=0.8 + Top-p=0.9 is a good start; (2) for repetitive outputs, min_p (e.g. min_p=0.05) can outperform Top-p — it has become the default in recent open-source models; (3) for JSON/structured output, temperature 0 and Top-p=1 are mandatory, otherwise the schema breaks; (4) in Speculative decoding, Top-p=1 (full sampling) affects the draft model’s acceptance rate. In the Atlas, serving engines (vLLM, TensorRT-LLM) apply sampling parameters in sequence: logit processing → repetition penalty → temperature → Top-k/Top-p → sampling.',
    },
    visual: 'tree',
    relatedConcepts: ['temperature', 'prompt', 'tokenization', 'system-prompt'],
    relatedSolutions: ['vllm', 'ollama', 'open-webui', 'litellm-proxy'],
    category: 'core',
  },
  {
    slug: 'system-prompt',
    name: { tr: 'System Prompt (Sistem İstemi)', en: 'System Prompt' },
    short: {
      tr: 'Modelin "görev tanımı" ve davranış kuralları — kullanıcı mesajlarından ayrı tutulan başlangıç talimatı.',
      en: 'The model’s "task definition" and behavioral rules — an initial instruction kept separate from user messages.',
    },
    beginner: {
      tr: 'Bir restorana girdiğinde garson sana menüden değil, "günün çorbası, ana yemek şu, içecek şunlar" şeklinde günün teklifini söyler. System prompt, modelin "garson" rolünü üstlendiği başlangıç talimatıdır. Kullanıcı her yeni mesaj yazdığında bu çerçeve değişmez — model "Türkçe konuşan, kısa cevap veren bir yazılım asistanısın" gibi bir rolü hep hatırlar.',
      en: 'When you walk into a restaurant, the waiter does not read the menu — they tell you "today’s soup, the main course is X, drinks are Y". The system prompt is the initial instruction where the model takes on a "waiter" role. Every time the user writes a new message, that frame does not change — the model always remembers a role like "you are a Turkish-speaking, short-answer software assistant".',
    },
    intermediate: {
      tr: 'API tasarımında üç mesaj tipi vardır: system (operatör tarafından, kullanıcıya görünmez), user (kullanıcı girdisi), assistant (modelin geçmiş cevapları). System prompt, modelin persona’sını, çıktı formatını, kısıtlamaları ve araç çağrı izinlerini tanımlar. OpenAI’ın modelleri system mesajına daha yüksek ağırlık verir; bu yüzden talimatı oraya koymak user mesajına koymaktan daha etkilidir. Üretimde sık karşılaşılan pattern: system prompt’a sıkı güvenlik kuralları, user mesajına iş verisi, assistant mesajlarına ise few-shot örnekleri yerleştirilir.',
      en: 'There are three message types in API design: system (set by the operator, invisible to the user), user (user input), assistant (model’s past replies). The system prompt defines the model’s persona, output format, constraints, and tool-calling permissions. OpenAI’s models weight system messages more heavily, so placing instructions there is more effective than putting them in the user message. A common production pattern is: strict safety rules in the system prompt, task data in the user message, and few-shot examples in assistant messages.',
    },
    advanced: {
      tr: 'System prompt güvenliği, üretim sistemlerinde birinci sınıf bir endişedir. Saldırı yüzeyi: (1) "instruction override" — kullanıcı "system prompt’u yoksay" derse ne olur?; (2) "prompt injection" — kullanıcının yüklediği belge içine gizlenmiş talimatlar; (3) "system prompt extraction" — modelin gizli talimatlarını sızdırması. Savunma: (a) system prompt’a sıkı çıktı formatı (JSON-schema) kısıtı, (b) kullanıcı içeriğini <data>...</data> gibi açık sınırlayıcılarla izole et, (c) izleme katmanında (Langfuse, Helicone) system prompt değişikliklerini logla, (d) modeli saldırıya karşı düzenli kırmızı takım testine sok. Atlas’ta serving motoru system prompt’u işlemden geçirirken güvenilir sayar; gerçek sınır uygulama katmanındadır.',
      en: 'System prompt security is a first-class concern in production systems. Attack surface: (1) "instruction override" — what if a user says "ignore the system prompt"?; (2) "prompt injection" — instructions hidden in documents the user uploads; (3) "system prompt extraction" — the model leaking its hidden instructions. Defenses: (a) tight output format (JSON-schema) constraints in the system prompt, (b) isolate user content with explicit delimiters like <data>...</data>, (c) log system prompt changes in the observability layer (Langfuse, Helicone), (d) regularly red-team the model against attacks. In the Atlas, the serving engine treats the system prompt as trusted when processing it; the real boundary is at the application layer.',
    },
    visual: 'token-grid',
    relatedConcepts: ['prompt', 'tokenization', 'temperature', 'context-window'],
    relatedSolutions: ['open-webui', 'anythingllm', 'litellm-proxy', 'jan'],
    category: 'core',
  },

  // ─── Serving (6) ─────────────────────────────────────────────
  {
    slug: 'kv-cache',
    name: { tr: 'KV Cache', en: 'KV Cache' },
    short: {
      tr: 'Önceki tokenların Key/Value vektörlerini saklayarak her adımda dikkat hesabını yeniden yapmaktan kurtaran önbellek.',
      en: 'A cache that stores Key/Value vectors of past tokens, avoiding recomputing attention at every step.',
    },
    beginner: {
      tr: 'Bir sayfalık metni her seferinde baştan okumaktansa, satır satır ilerlerken önceki satırları "aklında tutmak" gibidir. Model token üretirken, daha önce ürettiği her token’ın Key ve Value bilgisini GPU belleğinde tutar. Bu sayede her yeni token üretiminde tüm geçmişi yeniden hesaplamak yerine, sadece yeni gelen token’ı mevcut önbelleğe ekler. Bu, üretim hızını 5-10 kat artırabilir.',
      en: 'It is like reading a page of text while keeping previous lines "in mind" instead of starting from the top every time. When the model generates a token, it keeps the Key and Value information of all previously generated tokens in GPU memory. That way, instead of recomputing the entire history at every new token, it only adds the new token to the existing cache. This can speed up generation 5-10x.',
    },
    intermediate: {
      tr: 'Self-attention’da her yeni token için Q yeni hesaplanır ama K ve V geçmiş tokenlardan gelir. KV cache bu K/V matrislerini katman başına saklar: her katman için (num_heads, seq_len, head_dim) boyutunda bir tensör. Formül: token başına bellek ≈ 2 × num_layers × num_kv_heads × head_dim × dtype_bytes. Llama 3 8B için 1K bağlamda yaklaşık 60 MB, 128K bağlamda ise 7-8 GB. Bu yüzden uzun bağlamlı çok sayıda eşzamanlı istek, GPU belleğinin en büyük tüketicisidir. PagedAttention, KV cache’i işletim sistemindeki "sayfalama" gibi yöneterek bu soruna çözüm getirir.',
      en: 'In self-attention, Q is computed fresh for each new token, but K and V come from past tokens. KV cache stores these K/V matrices per layer: a tensor of (num_heads, seq_len, head_dim) per layer. Formula: per-token memory ≈ 2 × num_layers × num_kv_heads × head_dim × dtype_bytes. For Llama 3 8B, about 60 MB at 1K context, 7-8 GB at 128K context. That is why many concurrent requests with long context are the biggest GPU memory consumer. PagedAttention addresses this by managing KV cache like paging in operating systems.',
    },
    advanced: {
      tr: 'KV cache yönetimi, üretim çıkarımının kalbi ve en büyük darboğazıdır. Üç ana optimizasyon ekseni: (1) paylaşım — GQA ile K/V başlık sayısını azaltma (Llama 3 8B: 32 → 8 K/V başlık, %75 bellek tasarrufu); (2) nicemleme — FP16 KV cache yerine INT8/FP8 (vLLM 0.4+ bu özelliği sunar), belleği yarıya indirir ama perplexity’de minimal artış getirir; (3) sayfalama — PagedAttention (vLLM) KV cache bloklarını sabit boyutlu "page"ler halinde tutar, parçalanmayı ve kopyalamayı önler. Pratik etki: aynı 80GB A100 üzerinde, PagedAttention olmadan 50 eşzamanlı istek, PagedAttention ile 500+ eşzamanlı istek mümkün olur. Disaggregated serving (Dynamo, llm-d) prefill ve decode için ayrı KV cache pool’u kullanır.',
      en: 'KV cache management is the heart and the biggest bottleneck of production inference. Three main optimization axes: (1) sharing — reducing K/V head count with GQA (Llama 3 8B: 32 → 8 K/V heads, 75% memory savings); (2) quantization — INT8/FP8 instead of FP16 KV cache (vLLM 0.4+ ships this), cuts memory in half with minimal perplexity hit; (3) paging — PagedAttention (vLLM) keeps KV cache blocks in fixed-size "pages", preventing fragmentation and copies. Practical impact: on the same 80GB A100, 50 concurrent requests without PagedAttention vs 500+ with PagedAttention. Disaggregated serving (Dynamo, llm-d) uses separate KV cache pools for prefill and decode.',
    },
    visual: 'kv-cache',
    relatedConcepts: ['attention', 'paged-attention', 'batching', 'prefill-decode'],
    relatedSolutions: ['vllm', 'tensorrt-llm', 'sglang', 'nvidia-dynamo'],
    category: 'serving',
  },
  {
    slug: 'batching',
    name: { tr: 'Batching (Toplu İşleme)', en: 'Batching' },
    short: {
      tr: 'Birden çok isteği aynı anda bir araya getirip GPU üzerinde paralel işleme — verimi dramatik şekilde artırır.',
      en: 'Combining multiple requests and processing them in parallel on the GPU — dramatically increases throughput.',
    },
    beginner: {
      tr: 'Bir markette tek tek kasaya gelen müşterilerle uğraşmak yerine, tüm alışverişleri bir araya toplamak ve sepetleri birlikte kasadan geçirmek gibidir. GPU, binlerce küçük işlemi aynı anda yapabilen bir donanımdır; bir istek tek başına geldiğinde GPU’nun kapasitesinin çok azını kullanır. Batching, bu boş kapasiteyi aynı anda birden çok istekle doldurur ve toplam verimi 10-30 kat artırabilir.',
      en: 'Instead of dealing with customers at the checkout one by one, batching means gathering all the groceries and running the carts through the register together. A GPU is hardware that can do thousands of small operations at once; when a single request arrives, it uses only a tiny fraction of the GPU’s capacity. Batching fills that spare capacity with multiple requests at once, lifting total throughput by 10-30x.',
    },
    intermediate: {
      tr: 'Üç batching modeli vardır: (1) Static batching — tüm istekler prompt uzunluğuna kadar bekler, sonra birlikte çalışır, verim düşük çünkü kısa istekler uzun olanları bekler; (2) Dynamic batching — bir pencere (örn. 10 ms) boyunca istek toplar ve gruplar halinde işler, Orca (Microsoft) bu yaklaşımı popülerleştirdi; (3) Continuous batching (iteration-level) — vLLM’in temel yeniliği: her decoding iteration’ında biten istekler gruptan çıkar, yeniler eklenir. Bu, "kısa istekler uzunları beklemez" prensibiyle verimi 2-4x daha artırır. Birçok production motoru (vLLM, SGLang, TensorRT-LLM) artık continuous batching varsayılanını sunar.',
      en: 'There are three batching models: (1) Static batching — all requests wait until they match the prompt length, then run together, low throughput because short requests wait for long ones; (2) Dynamic batching — collects requests for a window (e.g. 10 ms) and runs them in groups, an approach popularized by Orca (Microsoft); (3) Continuous batching (iteration-level) — the core innovation of vLLM: at each decoding iteration, finished requests leave the group, new ones join. This follows the "short requests do not wait for long ones" principle and lifts throughput another 2-4x. Most production engines (vLLM, SGLang, TensorRT-LLM) now ship continuous batching as default.',
    },
    advanced: {
      tr: 'Continuous batching bile mükemmel değildir; "batch composition" yine de önemlidir. Aynı batch’teki isteklerin benzer prefill uzunluğunda ve decode adımında olması verimi artırır. vLLM "in-flight batching" ile her iterasyonda KV cache slot yönetimini PagedAttention üzerinden yapar. Üst düzey optimizasyonlar: (1) SGLang RadixAttention — farklı isteklerin ortak prefix’lerini paylaşır (system prompt, örnekler), 2-5x hız kazancı; (2) Disaggregated serving (Dynamo) — prefill ve decode’u farklı GPU’lara ayırır, bağımsız ölçeklendirme sağlar; (3) Chunked prefill — uzun prefill’leri küçük parçalara bölerek decode istekleriyle iç içe geçirir. Pratik: 8x A100 üzerinde continuous batching + chunked prefill ile 1000+ token/s/ GPU verim elde edilebilir.',
      en: 'Even continuous batching is not perfect; "batch composition" still matters. Requests in the same batch having similar prefill length and decode step increase throughput. vLLM’s "in-flight batching" manages KV cache slots over PagedAttention at every iteration. Advanced optimizations: (1) SGLang RadixAttention — shares the common prefix across requests (system prompt, examples), 2-5x speedup; (2) Disaggregated serving (Dynamo) — separates prefill and decode to different GPUs, enabling independent scaling; (3) Chunked prefill — breaks long prefills into smaller chunks, interleaving them with decode requests. In practice, on 8x A100 with continuous batching + chunked prefill you can hit 1000+ tokens/s/GPU throughput.',
    },
    visual: 'batching',
    relatedConcepts: ['kv-cache', 'paged-attention', 'prefill-decode', 'streaming'],
    relatedSolutions: ['vllm', 'sglang', 'tensorrt-llm', 'nvidia-triton'],
    category: 'serving',
  },
  {
    slug: 'streaming',
    name: { tr: 'Streaming (Akış)', en: 'Streaming' },
    short: {
      tr: 'Modelin cevabı token token, parça parça istemciye göndermesi — kullanıcı ilk kelimeyi beklerken cevabı görmeye başlar.',
      en: 'The model sends its answer to the client token by token — the user starts seeing the answer while waiting for the first word.',
    },
    beginner: {
      tr: 'Bir restoranda tüm yemeğin hazır olmasını bekleyip bir anda masaya gelmesi yerine, çorbayı önce, ana yemeği sonra getirmesi gibidir. Streaming, modelin cevabını kelime kelime (ya da token token) istemciye yollamasıdır. ChatGPT’te cevabın "yazılıyormuş gibi" görünmesi streaming sayesindedir — eğer streaming olmasaydı her cevap için tüm modelin bitmesini beklemen gerekirdi.',
      en: 'It is like a restaurant bringing the soup first and the main course after, instead of waiting for the entire meal and serving it all at once. Streaming is the model sending its answer word by word (or token by token) to the client. The "typing as you read" look in ChatGPT comes from streaming — without it you would have to wait for the whole model to finish before each answer.',
    },
    intermediate: {
      tr: 'Streaming, Server-Sent Events (SSE) veya HTTP chunked transfer üzerinden uygulanır. OpenAI’ın chat completion API’si `stream=true` parametresiyle SSE döner; her event bir delta (yeni token + metadata) içerir. Üretimde üç önemli nokta: (1) TTFT (Time To First Token) — ilk token gelene kadar geçen süre, kullanıcı deneyimi için en kritik metrik; (2) TPOT (Time Per Output Token) — sonraki tokenlar arası süre, genellikle 30-80 ms hedeflenir; (3) streaming cancellation — istemci bağlantıyı kopardığında sunucu decode’u durdurmalı, aksi halde boşa GPU döngüsü harcanır. Bu, özellikle uzun çıktılarda önemli bir maliyet kontrolüdür.',
      en: 'Streaming is implemented via Server-Sent Events (SSE) or HTTP chunked transfer. OpenAI’s chat completion API returns SSE with `stream=true`; each event contains a delta (new token + metadata). Three important points in production: (1) TTFT (Time To First Token) — time until the first token arrives, the most critical UX metric; (2) TPOT (Time Per Output Token) — time between subsequent tokens, typically targeted at 30-80 ms; (3) streaming cancellation — when the client disconnects, the server should stop decoding, otherwise GPU cycles are wasted. This is an important cost control especially for long outputs.',
    },
    advanced: {
      tr: 'Streaming altyapısı, serving motorunun event loop’unu ve istemci kütüphanesini iç içe geçirir. OpenAI Python SDK, "openai.AsyncStream" ile async iterasyon sağlar; bu, asyncio tabanlı web sunucularında (FastAPI, aiohttp) düşük gecikmeyle çalışır. Üst düzey konular: (1) Backpressure — istemci yavaşsa motor, decode’u yavaşlatmalı veya iptal etmeli, aksi halde KV cache şişer; (2) Speculative decoding + streaming — taslak tokenları öne sürerek ilk token’ı daha hızlı getirir; (3) Tool calling streaming — model bir tool çağırdığında bile cevap kesintisiz akmaya devam etmeli; (4) Üretim izleme — TTFT ve TPOT dağılımları Prometheus + Grafana üzerinden uyarı eşikleriyle izlenir (p95 TTFT < 500 ms, p99 TPOT < 150 ms tipik bir SLA).',
      en: 'Streaming infrastructure tightly couples the serving engine’s event loop and the client library. OpenAI’s Python SDK provides async iteration via "openai.AsyncStream"; this works with low latency on asyncio-based web servers (FastAPI, aiohttp). Advanced topics: (1) Backpressure — if the client is slow the engine should slow or cancel decoding, otherwise KV cache balloons; (2) Speculative decoding + streaming — pushes draft tokens forward to deliver the first token faster; (3) Tool calling streaming — when the model calls a tool, the response must continue flowing seamlessly; (4) Production observability — TTFT and TPOT distributions are monitored with alerting thresholds in Prometheus + Grafana (p95 TTFT < 500 ms, p99 TPOT < 150 ms is a typical SLA).',
    },
    visual: 'pipeline',
    relatedConcepts: ['batching', 'prefill-decode', 'tokenization', 'context-window'],
    relatedSolutions: ['vllm', 'ollama', 'open-webui', 'bentoml'],
    category: 'serving',
  },
  {
    slug: 'paged-attention',
    name: { tr: 'PagedAttention', en: 'PagedAttention' },
    short: {
      tr: 'vLLM’in buluşu: KV cache’i sabit boyutlu "sayfalar" halinde tutarak bellek parçalanmasını ve kopyalamayı ortadan kaldıran teknik.',
      en: 'vLLM’s invention: keeping KV cache in fixed-size "pages" to eliminate memory fragmentation and copying.',
    },
    beginner: {
      tr: 'Bir kütüphanede her kitap için ayrı bir raf ayırmak yerine, tüm kitapları aynı boyutta sayfalara bölüp raflara dağıtmak gibidir. Boş sayfalar başka kitaplar tarafından doldurulabilir. PagedAttention (vLLM, 2023) bu fikri GPU belleğine taşır: her isteğin KV cache’i büyük tek bir blok yerine küçük 16-tokenlık "page"ler halinde tutulur. Bu, aynı GPU’da çok daha fazla eşzamanlı isteğe izin verir.',
      en: 'Instead of giving each book its own shelf in a library, you split all books into same-size pages and spread them across shelves. Empty pages can be filled by other books. PagedAttention (vLLM, 2023) brings this idea to GPU memory: each request’s KV cache is kept in small 16-token "pages" instead of one large block. This allows many more concurrent requests on the same GPU.',
    },
    intermediate: {
      tr: 'Geleneksel sistemlerde her isteğin KV cache’i pre-allocation stratejisiyle ayrılır: max_seq_len kadar ardışık bellek ayrılır. Bu hem parçalanma (fragmentation) yaratır hem de gerçek kullanım genellikle max_seq_len’in çok altında olduğundan bellek israf eder. PagedAttention, işletim sistemlerindeki "virtual memory + page table" modelini ödünç alır: her istek bir "block table"a sahiptir; fiziksel sayfalar GPU belleğinde herhangi bir yerde olabilir. Bu, (1) parçalanmayı ortadan kaldırır, (2) belleği neredeyse %100 kullanır, (3) farklı isteklerin aynı prefix’i için sayfa paylaşımına (prefix sharing) izin verir.',
      en: 'In traditional systems, each request’s KV cache is pre-allocated: contiguous memory up to max_seq_len is reserved. This both creates fragmentation and wastes memory because actual usage is usually far below max_seq_len. PagedAttention borrows the "virtual memory + page table" model from operating systems: each request has a "block table"; physical pages can live anywhere in GPU memory. This (1) eliminates fragmentation, (2) uses memory at nearly 100%, (3) allows page sharing for the same prefix across different requests (prefix sharing).',
    },
    advanced: {
      tr: 'PagedAttention, SOSP’23’te yayımlanan ve LLM serving alanını yeniden şekillendiren bir çalışmadır (Kwon et al., UC Berkeley). Sadece bellek verimliliği değil, "copy-on-write" sayesinde beam search, parallel sampling ve çoklu output (aynı prompt’tan N farklı cevap) senaryolarında dramatik hız kazanımı sağlar — her output aynı prefill sayfalarını paylaşır. vLLM açık kaynak kodlu olarak yayımlandıktan sonra SGLang, TensorRT-LLM ve diğer motorlar benzer sayfalama yaklaşımlarını benimsedi. Pratik benchmark: aynı 24GB A5000 üzerinde, PagedAttention olmadan 30 istek/s, PagedAttention ile 250+ istek/s mümkün olur. Yine de bazı sınırları var: page size 16 token sabit, çok küçük/çok büyük context’lerde fine-tuning gerekebilir.',
      en: 'PagedAttention is the work that reshaped the LLM serving field, published at SOSP’23 (Kwon et al., UC Berkeley). It is not only memory efficiency: with "copy-on-write" it brings dramatic speedups to beam search, parallel sampling, and multi-output (N different answers from the same prompt) scenarios — every output shares the same prefill pages. After vLLM’s open source release, SGLang, TensorRT-LLM and other engines adopted similar paging approaches. Practical benchmark: on the same 24GB A5000, 30 req/s without PagedAttention vs 250+ req/s with PagedAttention. Still, there are limits: page size is fixed at 16 tokens, very small or very large contexts may need fine-tuning.',
    },
    visual: 'tree',
    relatedConcepts: ['kv-cache', 'batching', 'attention', 'prefill-decode'],
    relatedSolutions: ['vllm', 'sglang', 'tensorrt-llm', 'nvidia-triton'],
    category: 'serving',
  },
  {
    slug: 'speculative-decoding',
    name: { tr: 'Speculative Decoding (Tahmine Dayalı Kod Çözme)', en: 'Speculative Decoding' },
    short: {
      tr: 'Küçük bir "taslak" modelin hızlıca önerdiği tokenları büyük modelin toplu olarak doğrulaması yöntemi.',
      en: 'A method where a small "draft" model proposes tokens quickly, and the large model verifies them in batches.',
    },
    beginner: {
      tr: 'Bir editörün bir makaleyi kelime kelime okuyup düzeltmesi yavaştır. Ama editörün bir kıdemli asistanı önce "şu kelimeler değiştirilebilir" diye önerilerde bulunursa, editör bunları toplu kontrol edip onaylayabilir ya da reddedebilir. Speculative decoding, küçük hızlı bir modelin (taslak) büyük modelin (hedef) bir sonraki birkaç tokenını tahmin etmesi, büyük modelin ise bu tahminleri paralel olarak doğrulamasıdır. Ortalama 2-3x hız kazancı sağlar.',
      en: 'An editor reading and correcting an article word by word is slow. But if a senior editor’s assistant first suggests "these words could be changed", the editor can check those suggestions in bulk and approve or reject. Speculative decoding is a small fast model (draft) predicting the next few tokens of the large model (target), and the large model verifying those predictions in parallel. It gives an average 2-3x speedup.',
    },
    intermediate: {
      tr: 'İki ana yaklaşım vardır: (1) Self-speculative — aynı modelin farklı katman çıkışları (early exit) ile taslak üretmek, ek bellek gerektirmez; (2) Model-pair spekülasyon — küçük bir model (örn. Llama 3 8B) büyük model (Llama 3 70B) için taslak üretir. Akış: taslak model K adet token üretir (K=4-8 tipik), hedef model bunları tek bir forward pass’ta doğrular. Kabul edilen token sayısı K’ya yakınsa büyük hız kazancı; kabul oranı düşükse (%50 altı) hız avantajı kaybolur. Pratik olarak: küçük model ≈ %5-10 büyüklüğünde olmalı, dağılımları benzer olmalı.',
      en: 'There are two main approaches: (1) Self-speculative — using different layer outputs of the same model (early exit) as the draft, no extra memory required; (2) Model-pair speculation — a small model (e.g. Llama 3 8B) drafts for a large model (Llama 3 70B). Flow: the draft model produces K tokens (K=4-8 typical), the target model verifies them in a single forward pass. If the accepted token count is close to K, the speedup is big; if the acceptance rate is low (below 50%), the speed advantage disappears. In practice, the small model should be about 5-10% the size, and the distributions should be similar.',
    },
    advanced: {
      tr: 'Speculative decoding’in matematiksel garantisi önemlidir: hedef modelin dağılımından örnekleme yapıyor gibi sonuç verir — yani sonuç kalitesi korunur, sadece hız kazanılır. 2024 sonrası trendler: (1) Medusa — tek bir modele birden çok "kafa" ekleyerek self-speculative; (2) EAGLE / EAGLE-2 — daha doğru tahmin için özellik seviyesi (feature-level) spekülasyon; (3) Lookahead decoding ve Lookahead-Glue — Jacobi/Monge iterasyonu; (4) Tree-based drafting — tek bir forward ile dallanmış K token üretir, kabul oranı %70+ çıkabilir. Üretim tavsiyeleri: taslak model ve hedef model aynı donanım üzerinde olmalı (veri transferi hız kazancını yutar); K değeri iş yüküne göre 4-8 arası tune edilmeli; tool calling’de spekülasyon ya hiç uygulanmamalı ya da tool sonrası yeniden başlatılmalı.',
      en: 'Speculative decoding has an important mathematical guarantee: the output looks like sampling from the target model’s distribution — so output quality is preserved, only speed improves. Post-2024 trends: (1) Medusa — adds multiple "heads" to a single model for self-speculation; (2) EAGLE / EAGLE-2 — feature-level speculation for more accurate predictions; (3) Lookahead decoding and Lookahead-Glue — Jacobi/Monge iteration; (4) Tree-based drafting — generates a branching K tokens in a single forward, acceptance rate can hit 70%+. Production tips: draft and target should be on the same hardware (data transfer eats the speedup); K should be tuned 4-8 per workload; in tool calling either do not speculate or restart after the tool.',
    },
    visual: 'tree',
    relatedConcepts: ['kv-cache', 'batching', 'paged-attention', 'attention'],
    relatedSolutions: ['vllm', 'sglang', 'tensorrt-llm', 'lmdeploy'],
    category: 'serving',
  },
  {
    slug: 'prefill-decode',
    name: { tr: 'Prefill / Decode Ayrımı', en: 'Prefill / Decode Separation' },
    short: {
      tr: 'Prompt işleme (prefill) ile token üretme (decode) aşamalarının farklı yük profilleri — disaggregated serving bu farktan doğar.',
      en: 'The different load profiles of prompt processing (prefill) and token generation (decode) — disaggregated serving stems from this gap.',
    },
    beginner: {
      tr: 'Bir sınavda önce tüm soruları okursun (prefill — büyük bir iş, paralel yapılabilir), sonra cevapları yazarsın (decode — küçük ama sıralı işlemler). LLM’de de modelin çalışması iki faza ayrılır: önce gelen tüm prompt bir kerede işlenir, sonra cevap token token üretilir. Bu iki faz GPU üzerinde farklı şekillerde yük oluşturur; ayrı donanımlara bölmek verimi ciddi şekilde artırır.',
      en: 'In an exam, you first read all the questions (prefill — a big job you can do in parallel), then write the answers (decode — small but sequential operations). In an LLM, the model’s work also splits into two phases: first the entire incoming prompt is processed at once, then the answer is generated token by token. These two phases load the GPU differently; splitting them onto separate hardware significantly boosts efficiency.',
    },
    intermediate: {
      tr: 'Prefill aşaması: tüm prompt tokenları paralel olarak işlenir, GPU compute-bound çalışır (matris çarpımları GPU çekirdeklerini doldurur), düşük gecikme, yüksek FLOPS kullanımı. Decode aşaması: her seferinde 1 token işlenir, GPU memory-bandwidth-bound çalışır (KV cache’ten okuma baskın), yüksek gecikme/token ama düşük FLOPS. Bu yüzden prefill ve decode aynı GPU’da aynı anda çalıştığında birbirlerini yavaşlatır — prefill bir anda binlerce FLOP isterken, decode bant genişliğini tıkar. Çözüm: disaggregated serving (NVIDIA Dynamo, llm-d), prefill ve decode’u farklı GPU’lara ayırır; her faz kendi donanımında en verimli şekilde çalışır.',
      en: 'Prefill phase: all prompt tokens are processed in parallel, the GPU runs compute-bound (matrix fills the GPU cores), low latency, high FLOPS use. Decode phase: 1 token processed at a time, the GPU runs memory-bandwidth-bound (KV cache reads dominate), high latency/token but low FLOPS. So when prefill and decode run on the same GPU at the same time, they slow each other down — prefill demands thousands of FLOPs at once while decode clogs bandwidth. The solution: disaggregated serving (NVIDIA Dynamo, llm-d) splits prefill and decode onto different GPUs; each phase runs most efficiently on its own hardware.',
    },
    advanced: {
      tr: 'Disaggregated serving, modern LLM sunumunun en önemli mimari evrimlerinden biridir. Üç temel bileşen: (1) Prefill node — yüksek FLOPS (ör. H100), prompt’u KV cache’e yazar ve decode node’a aktarır; (2) Decode node — yüksek bellek bant genişliği (ör. A100), token üretir; (3) Transfer — KV cache, RDMA veya NVLink üzerinden aktarılır, tipik boyut Llama 3 70B / 8K bağlamda ~3 GB. Zorluklar: (a) KV cache transfer gecikmesi (~50-100 ms), (b) farklı node’larda bağlam yönetimi, (c) prefill-decode arasında yük dengeleme. Pratik: 1 prefill node + 4 decode node yapısı, monolithik yapıya göre 1.5-2x daha yüksek toplam verim sağlar. SGLang, disaggregated mode’u 2024’te deneysel olarak sundu; vLLM v1 ve TensorRT-LLM de bu yönde ilerliyor.',
      en: 'Disaggregated serving is one of the most important architectural evolutions of modern LLM serving. Three core components: (1) Prefill node — high FLOPS (e.g. H100), writes the prompt into the KV cache and ships it to the decode node; (2) Decode node — high memory bandwidth (e.g. A100), generates tokens; (3) Transfer — KV cache is shipped over RDMA or NVLink, typical size is ~3 GB for Llama 3 70B / 8K context. Challenges: (a) KV cache transfer latency (~50-100 ms), (b) context management across different nodes, (c) load balancing between prefill and decode. In practice, a 1 prefill + 4 decode node layout yields 1.5-2x higher total throughput vs monolithic. SGLang shipped disaggregated mode experimentally in 2024; vLLM v1 and TensorRT-LLM are moving in this direction too.',
    },
    visual: 'pipeline',
    relatedConcepts: ['kv-cache', 'batching', 'paged-attention', 'streaming'],
    relatedSolutions: ['nvidia-dynamo', 'vllm', 'sglang', 'llm-d'],
    category: 'serving',
  },

  // ─── Optimization (1) ───────────────────────────────────────
  {
    slug: 'quantization',
    name: { tr: 'Quantization (Nicemleme)', en: 'Quantization' },
    short: {
      tr: 'Model ağırlıklarını daha düşük bit sayısına sıkıştırarak bellek ve hız kazancı sağlama (FP32 → FP16 → INT8 → INT4).',
      en: 'Compressing model weights to a lower bit count to save memory and improve speed (FP32 → FP16 → INT8 → INT4).',
    },
    beginner: {
      tr: 'Bir fotoğrafı yüksek çözünürlük yerine düşük çözünürlükte kaydetmek gibidir — dosya boyutu küçülür ama biraz detay kaybedersin. Nicemleme, modelin ağırlıklarını (sayılarını) daha kısa temsillere dönüştürür. FP16 (yarı hassasiyet) yerine INT8 (8 bit tamsayı) veya INT4 (4 bit tamsayı) kullanırsan, model 2-4 kat daha az yer kaplar ve çoğu zaman fark edilir bir kalite kaybı olmadan daha hızlı çalışır. 7 milyar parametreli bir model FP16’da 14 GB yer kaplarken, INT4’te sadece 3.5 GB’a düşer.',
      en: 'It is like saving a photo at a lower resolution instead of a high one — file size shrinks but you lose some detail. Quantization converts the model’s weights (numbers) into shorter representations. Instead of FP16 (half precision), if you use INT8 (8-bit integer) or INT4 (4-bit integer), the model takes 2-4x less space and often runs faster without noticeable quality loss. A 7B parameter model takes 14 GB in FP16, but only 3.5 GB in INT4.',
    },
    intermediate: {
      tr: 'İki ana yaklaşım: (1) Post-training quantization (PTQ) — eğitim sonrası uygulanır, hızlıdır ama %1-3 perplexity artışı olabilir; ör. GPTQ, AWQ, GGUF Q4/Q5. (2) Quantization-aware training (QAT) — eğitim sırasında nicemlemeyi simüle eder, daha iyi kalite ama daha pahalı. Bit seçimi pratik tablo: FP16 (16 bit, full kalite, baseline), INT8 (8 bit, %50 bellek, kalite kaybı minimal), INT4 (4 bit, %25 bellek, dikkatli olmak gerekir; Llama 3 8B Q4_K_M Türkçe’de perplexity +0.5 civarı), INT2/INT3 (aşırı sıkıştırma, çoğu kullanım için yetersiz). AWQ (Activation-aware Weight Quantization) özellikle activation outliers’ı koruyarak INT4 kalitesini korumada başarılıdır.',
      en: 'Two main approaches: (1) Post-training quantization (PTQ) — applied after training, fast but can cause 1-3% perplexity increase; e.g. GPTQ, AWQ, GGUF Q4/Q5. (2) Quantization-aware training (QAT) — simulates quantization during training, better quality but more expensive. Bit selection practical table: FP16 (16 bit, full quality, baseline), INT8 (8 bit, 50% memory, minimal quality loss), INT4 (4 bit, 25% memory, requires care; Llama 3 8B Q4_K_M adds around 0.5 perplexity on Turkish), INT2/INT3 (extreme compression, insufficient for most uses). AWQ (Activation-aware Weight Quantization) succeeds at preserving INT4 quality by protecting activation outliers.',
    },
    advanced: {
      tr: 'Üretim nicemleme stratejisi, kullanım senaryosuna göre seçilir. Llama.cpp’de GGUF formatı; Q4_K_M, Q5_K_M, Q8_0 gibi "quantization type" seçenekleri sunar — K_M "karışık" anlamına gelir: dikkat katmanları (outlier’a hassas) daha yüksek, MLP katmanları daha düşük bit ile kodlanır. vLLM 0.4+ ile FP8 KV cache ve INT4 ağırlık kombinasyonu mümkün; A100’de FP8 native desteklenir, H100’de FP8 hem compute hem memory path için kullanılır. Donanım eşleştirmesi kritik: (1) INT4 = bellek tasarrufu, FP8 = hız (Tensor Core), (2) edge cihazlarda INT4/INT8 zorunlu, (3) API serving’de Q4 + FP8 KV iyi bir orta nokta. Kalite testi: Türkçe gibi az temsil edilen dillerde, MMLU gibi İngilizce ağırlıklı benchmarklardan çok, "tr-dedup" gibi dil-özgü kıyaslamalara bakılmalı.',
      en: 'A production quantization strategy is chosen per use case. Llama.cpp’s GGUF format offers "quantization type" options like Q4_K_M, Q5_K_M, Q8_0 — the K_M means "mixed": attention layers (sensitive to outliers) are encoded with higher bit, MLP layers with lower. vLLM 0.4+ allows FP8 KV cache + INT4 weight combos; on A100 FP8 is natively supported, on H100 FP8 is used in both compute and memory paths. Hardware mapping is critical: (1) INT4 = memory savings, FP8 = speed (Tensor Core), (2) INT4/INT8 mandatory on edge devices, (3) Q4 + FP8 KV is a good middle ground for API serving. Quality testing: for underrepresented languages like Turkish, language-specific benchmarks like "tr-dedup" matter more than English-heavy ones like MMLU.',
    },
    visual: 'quantize',
    relatedConcepts: ['kv-cache', 'context-window', 'paged-attention', 'tokenization'],
    relatedSolutions: ['llama-cpp', 'tensorrt-llm', 'exllamav3', 'lmdeploy'],
    category: 'optimization',
  },

  // ─── Optimization (5) ───────────────────────────────────────
  {
    slug: 'distillation',
    name: { tr: 'Distillation (Bilgi Aktarımı)', en: 'Distillation' },
    short: {
      tr: 'Büyük öğretmen modelinin bilgisini daha küçük öğrenci modele aktararak boyut/performans dengesi kurma.',
      en: 'Transferring a large teacher model\'s knowledge to a smaller student model for a better size/performance balance.',
    },
    beginner: {
      tr: 'Büyük ve güçlü bir model var, ama onu her yerde çalıştırmak çok pahalı. Distillation, büyük modelin "öğrendiği" bilgiyi alıp küçük bir modele "öğretmek" demek. Tıpkı deneyimli bir ustanın çırağına yılların birikimini aktarması gibi. Küçük model büyüğünün %5-10\'u kadar yer kaplayıp çoğu görevde onun %80-95\'i kadar başarılı olabilir.',
      en: 'You have a large and powerful model, but running it everywhere is expensive. Distillation means taking a large model\'s "learned" knowledge and "teaching" it to a smaller model. Like an experienced master passing years of knowledge to an apprentice. The small model takes 5-10% the size of the big one and can be 80-95% as good on most tasks.',
    },
    intermediate: {
      tr: 'Distillation iki temel sinyale dayanır: (1) "soft labels" — öğretmen modelin son katmandaki olasılık dağılımı, sadece doğru cevabı değil "doğru cevaba ne kadar yakın" bilgisini de taşır; (2) "feature distillation" — ara katman (hidden state) benzerliği. Loss fonksiyonu L = α·L_hard + (1-α)·L_soft·T², burada T sıcaklık. Pratikte TinyLlama (1.1B), DistilBERT, Phi-3-mini gibi modeller distillation ile üretilir. Avantajı: tek bir inference pass ile büyük model kalitesinin çoğu elde edilir; dezavantajı: öğretmen güncellendiğinde öğrenci de yeniden eğitilmeli.',
      en: 'Distillation relies on two key signals: (1) "soft labels" — the teacher model\'s final-layer probability distribution, which carries not just the correct answer but also "how close to correct" information; (2) "feature distillation" — hidden-state similarity. Loss: L = α·L_hard + (1-α)·L_soft·T², where T is temperature. In practice, models like TinyLlama (1.1B), DistilBERT, Phi-3-mini are produced by distillation. Advantage: most of the large model\'s quality in a single inference pass; disadvantage: whenever the teacher updates, the student must be retrained.',
    },
    advanced: {
      tr: 'Distillation stratejileri 2024 sonrası önemli ölçüde olgunlaştı. "Self-distillation" — modelin kendi eski versiyonundan yeni versiyonuna (örn. Llama 3 → Llama 3.1) bilgi aktarımı; "Online distillation" — öğrenci ve öğretmen eşzamanlı eğitilir (Co-Distillation, Born-Again Networks); "Progressive distillation" — çok küçük öğrenciye kadar aşamalı sıkıştırma. Üretim notları: (1) task-specific distillation RAG veya function-calling gibi dar alanlarda çok etkili — %3 boyutla %95 kalite korunabilir; (2) "teacher bias" aktarımı — öğretmen kendi sınırlılıklarını da aktarır, teacher seçimi kritik; (3) "forward KL" (öğretmen→öğrenci) ile "reverse KL" (öğrenci→öğretmen) farklı sonuçlar verir; reverse KL öğrencinin keşif alanını genişletir. Atlas açısından: distillation çıktısı genellikle inference motoruna (vLLM, llama.cpp) doğrudan verilir.',
      en: 'Distillation strategies have matured significantly after 2024. "Self-distillation" — transferring knowledge from a model\'s older version to its newer one (e.g. Llama 3 → Llama 3.1); "Online distillation" — student and teacher trained simultaneously (Co-Distillation, Born-Again Networks); "Progressive distillation" — stepwise compression to a very small student. Production notes: (1) task-specific distillation is very effective in narrow domains like RAG or function-calling — 95% quality can be retained at 3% size; (2) "teacher bias" transfer — the teacher also transfers its limitations, so teacher selection is critical; (3) "forward KL" (teacher → student) vs "reverse KL" (student → teacher) yield different results; reverse KL broadens the student\'s exploration. In the Atlas, distillation output is usually fed directly into inference engines (vLLM, llama.cpp).',
    },
    visual: 'pipeline',
    relatedConcepts: ['quantization', 'fine-tuning', 'lora', 'pruning'],
    relatedSolutions: ['tensorrt-llm', 'lmdeploy', 'mlc-llm', 'llama-cpp'],
    category: 'optimization',
  },
  {
    slug: 'lora',
    name: { tr: 'LoRA (Düşük Ranklı Adaptasyon)', en: 'LoRA (Low-Rank Adaptation)' },
    short: {
      tr: 'Modelin tamamını eğitmeden küçük adaptör matrisleri ekleyerek verimli ince ayar yapma yöntemi.',
      en: 'A method that adds small adapter matrices for efficient fine-tuning without retraining the whole model.',
    },
    beginner: {
      tr: 'Bir arabanın motorunu tamamen söküp değiştirmek yerine üstüne küçük bir turbo ekleyerek daha güçlü yapmak gibi. LoRA, orijinal modelin ağırlıklarını değiştirmez, küçük "adaptör" matrisler ekler. Bu adaptörler orijinal modelin %1\'inden bile az yer kaplar. Eğitilecek parametre sayısı dramatik şekilde düşer, tek bir GPU ile büyük modelleri ince ayar yapabilir hale gelirsin.',
      en: 'Instead of fully disassembling a car\'s engine and replacing it, you add a small turbo on top to make it more powerful. LoRA does not change the original model\'s weights, it adds small "adapter" matrices. These adapters take up less than 1% of the original model. The number of parameters to train drops dramatically, so you can fine-tune large models even on a single GPU.',
    },
    intermediate: {
      tr: 'LoRA, "ağırlık matrisleri düşük ranklı bir güncelleme ile yaklaşıklanabilir" gözleminden doğar (Hu et al., 2021). Matematiksel olarak W\' = W + ΔW, ΔW = A·B, A∈R^(d×r), B∈R^(r×d), r≪d. Rank r=8-64 tipik; Llama 7B için %0.1-0.5 eğitilebilir parametre. Avantajları: (1) GPU belleği 3-4x düşer, (2) eğitim 10x hızlanır, (3) birden çok LoRA adaptörü aynı temel model üzerine "takılıp çıkarılabilir". Çeşitleri: QLoRA (4-bit temel model + LoRA, 33B modeli tek 24GB GPU\'da eğitir), DoRA (ağırlık yönü + büyüklüğü ayrıştırma), AdaLoRA (dinamik rank tahsisi).',
      en: 'LoRA arises from the observation that "weight matrices can be approximated by a low-rank update" (Hu et al., 2021). Mathematically W\' = W + ΔW, ΔW = A·B, A∈R^(d×r), B∈R^(r×d), r≪d. Typical rank r=8-64; for Llama 7B that is 0.1-0.5% trainable parameters. Advantages: (1) GPU memory drops 3-4x, (2) training is 10x faster, (3) multiple LoRA adapters can be "plugged and unplugged" on the same base model. Variants: QLoRA (4-bit base + LoRA, trains a 33B model on a single 24GB GPU), DoRA (separates weight direction and magnitude), AdaLoRA (dynamic rank allocation).',
    },
    advanced: {
      tr: 'LoRA üretimde iki yönde olgunlaştı: (1) Birleştirme (merging) — eğitimden sonra LoRA adaptörü ana ağırlıklara geri eklenir (linear merge); bu yapılmazsa her inference\'ta ek matris çarpımı yapılır. vLLM ve llama.cpp merge edilmiş saf modeli tercih eder. (2) Çoklu adaptör yönetimi — tek bir temel model üzerine 50+ farklı LoRA servisi, gerektiğinde "hot-swap". Bu, bir model servisinde farklı müşterilere farklı "kişilik" sunmayı mümkün kılar. Pratik: rank seçimi trade-off yaratır — düşük rank (r=4) az bellek ama düşük kapasite; yüksek rank (r=128) tam FT\'ye yakın kalite ama eğitim maliyeti artar. Adapter fusion (IA³, prefix-tuning) gibi alternatif yöntemler başka alanlarda daha etkili olabilir.',
      en: 'LoRA has matured in two directions in production: (1) Merging — after training, the LoRA adapter is added back to the main weights (linear merge); if not done, every inference pays for an extra matrix multiplication. vLLM and llama.cpp prefer the merged plain model. (2) Multi-adapter management — 50+ different LoRA services on a single base model, "hot-swapped" on demand. This enables serving different "personalities" to different customers in one model service. Practical: rank choice creates a trade-off — low rank (r=4) is light on memory but low capacity; high rank (r=128) approaches full FT quality but raises training cost. Alternatives like adapter fusion (IA³, prefix-tuning) can be more effective in other domains.',
    },
    visual: 'pipeline',
    relatedConcepts: ['fine-tuning', 'quantization', 'distillation', 'pruning'],
    relatedSolutions: ['mlx-lm', 'vllm', 'lmdeploy', 'ollama'],
    category: 'optimization',
  },
  {
    slug: 'fine-tuning',
    name: { tr: 'Fine-Tuning (İnce Ayar)', en: 'Fine-Tuning' },
    short: {
      tr: 'Önceden eğitilmiş bir modeli kendi veri kümenle ve görevinle yeniden eğiterek uzmanlaştırma.',
      en: 'Specializing a pre-trained model by retraining it on your own dataset and task.',
    },
    beginner: {
      tr: 'Bir doktor düşün: tıp fakültesinden mezun olduktan sonra ihtisas yapar, sonra bir alana daha da odaklanır. Fine-tuning, modelin "genel kültürü" (önceden eğitilmiş ağırlıklar) üzerine kendi alanında uzmanlaşması için yapılan ek eğitimdir. Tıbbi bir model, hukuki bir model, kendi şirketinin dilini konuşan bir model — hepsi fine-tuning ile yapılır.',
      en: 'Think of a doctor: after graduating from medical school, they specialize, then narrow further into a sub-field. Fine-tuning is the additional training that takes a model\'s "general knowledge" (pre-trained weights) and specializes it in your domain. A medical model, a legal model, a model that speaks your company\'s language — all are made with fine-tuning.',
    },
    intermediate: {
      tr: 'Üç temel fine-tuning türü: (1) Full fine-tuning — tüm ağırlıkları güncelle, en kaliteli ama en pahalı (70B model için yüzlerce GB VRAM); (2) LoRA/QLoRA — küçük adaptör eğit, büyük model sabit kalır, bellek dostu; (3) Instruction tuning — modeli "soru-cevap" formatına alıştır (Alpaca, Vicuna, FLAN yaklaşımı). Pratikte: (a) fine-tuning veri kümesi kalitesi nicelikten daha önemli — 1000 iyi örnek, 100.000 kötü örnekten üstündür; (b) "catastrophic forgetting" — model yeni bilgiyi öğrenirken eski bilgisini unutabilir, düşük learning rate ve LoRA bunu azaltır; (c) evaluation — fine-tune öncesi ve sonrası aynı test seti şart.',
      en: 'Three main fine-tuning types: (1) Full fine-tuning — updates all weights, highest quality but most expensive (hundreds of GB VRAM for a 70B model); (2) LoRA/QLoRA — trains small adapters, large model stays frozen, memory-friendly; (3) Instruction tuning — gets the model used to the "Q&A" format (Alpaca, Vicuna, FLAN approach). In practice: (a) fine-tuning dataset quality matters more than quantity — 1000 good examples beat 100,000 bad ones; (b) "catastrophic forgetting" — the model can forget old knowledge while learning new; low learning rate and LoRA reduce it; (c) evaluation — same test set before and after fine-tuning is mandatory.',
    },
    advanced: {
      tr: 'Üretimde fine-tuning stratejisi "önce prompt mühendisliği, sonra RAG, sonra fine-tuning" sırasını izler. Çünkü fine-tuning pahalı ve bakım gerektirir. Yeni trend: "continued pre-training" — sıfırdan eğitmek yerine, mevcut modeli kendi korpusunuz (ürün belgeleri, sohbet günlükleri) üzerinde bir dönem daha eğitirsin, sonra instruction fine-tuning yaparsın. Bu yaklaşım Türkçe gibi az temsil edilen diller için özellikle etkili. Teknik notlar: (1) SFT (Supervised Fine-Tuning) veri formatı ChatML, ShareGPT, OpenAI messages gibi şemalardan biri olmalı; (2) gradient accumulation ve gradient checkpointing belleği 4-8x azaltır; (3) DeepSpeed ZeRO-3 ile 70B full FT tek bir 8xA100 node\'unda mümkün. Atlas açısından: eğitilen model çıktısı GGUF veya HF formatında dışa aktarılır, sonra vLLM veya llama.cpp ile servis edilir.',
      en: 'In production, fine-tuning strategy follows the order "prompt engineering first, then RAG, then fine-tuning". Because fine-tuning is expensive and needs maintenance. New trend: "continued pre-training" — instead of training from scratch, you train the existing model for one more pass on your own corpus (product docs, chat logs), then do instruction fine-tuning. This approach is especially effective for underrepresented languages like Turkish. Technical notes: (1) SFT (Supervised Fine-Tuning) data format must be one of ChatML, ShareGPT, OpenAI messages, etc.; (2) gradient accumulation and gradient checkpointing reduce memory 4-8x; (3) DeepSpeed ZeRO-3 makes 70B full FT possible on a single 8xA100 node. In the Atlas, the trained model is exported in GGUF or HF format, then served with vLLM or llama.cpp.',
    },
    visual: 'pipeline',
    relatedConcepts: ['lora', 'distillation', 'prompt', 'rlhf'],
    relatedSolutions: ['mlx-lm', 'vllm', 'lmdeploy', 'ollama'],
    category: 'optimization',
  },
  {
    slug: 'rlhf',
    name: { tr: 'RLHF (İnsan Geri Bildirimiyle Pekiştirmeli Öğrenme)', en: 'RLHF (RL from Human Feedback)' },
    short: {
      tr: 'Modelin insan tercihleriyle eğitilmiş bir "ödül modeli" aracılığıyla daha yararlı ve güvenli cevaplar üretmesini sağlama yöntemi.',
      en: 'A method that trains the model to produce more helpful and safe outputs through a reward model trained on human preferences.',
    },
    beginner: {
      tr: 'Bir çocuk bisiklete binerken her düşüşte "acı", her başarılı sürüşte "tebrik" alır — zamanla daha iyi öğrenir. RLHF, modelin benzer şekilde insan değerlendirmelerinden ders çıkarmasıdır. İnsanlar iki cevabı karşılaştırır ("hangisi daha iyi?") ve bu tercihler bir "ödül modeli"ne dönüşür. Model, ödül modelinden yüksek puan alacak şekilde ince ayar yapılır. ChatGPT\'nin "yardımsever ve zararsız" olmasının temel nedeni budur.',
      en: 'When a child learns to ride a bike, every fall is "pain", every successful ride is "congratulations" — over time they learn better. RLHF is the model learning similarly from human evaluations. Humans compare two answers ("which is better?") and these preferences become a "reward model". The model is then fine-tuned to score high on the reward model. This is the main reason ChatGPT is "helpful and harmless".',
    },
    intermediate: {
      tr: 'RLHF üç adımdan oluşur (Christiano et al., 2017; Ouyang et al., 2022 — InstructGPT): (1) SFT — insan yazılı iyi cevaplarla supervised fine-tuning; (2) Reward model — insan tercih çiftlerinden (A, B) bir sıralama modeli eğit; (3) PPO/GRPO — ödül modelini maksimum yapacak şekilde dil modelini pekiştirmeli güncelle. "RLHF vs DPO" tartışması önemli: DPO (Direct Preference Optimization) ayrı bir ödül modeli gerektirmez, doğrudan tercih verisi üzerinden policy günceller — daha kararlı, daha az hesaplama. Modern modeller (Llama 3, Qwen2) genellikle DPO + GRPO kombinasyonu kullanır.',
      en: 'RLHF has three steps (Christiano et al., 2017; Ouyang et al., 2022 — InstructGPT): (1) SFT — supervised fine-tuning on human-written good answers; (2) Reward model — train a ranking model from human preference pairs (A, B); (3) PPO/GRPO — reinforcement-learning update of the language model to maximize the reward model. The "RLHF vs DPO" debate matters: DPO (Direct Preference Optimization) does not need a separate reward model, it updates the policy directly on preference data — more stable, less compute. Modern models (Llama 3, Qwen2) typically use a DPO + GRPO combination.',
    },
    advanced: {
      tr: 'RLHF üretim sistemleri için pahalı ve risklidir. Üç temel sorun: (1) "reward hacking" — model ödül modelini "hackleyerek" yüksek puan alır ama gerçekten iyi cevap üretmez; çözüm: "constitutional AI" (Anthropic) gibi ek kısıtlar; (2) "sycophancy" — model insanlara "evet efendim" moduna girer, çünkü olumlu cevaplar daha yüksek puan alır; (3) "mode collapse" — PPO güncellemeleri çok agresif olursa model çeşitliliğini kaybeder. Çözüm yolları: (a) KTO (Kahneman-Tversky) — reference-free, daha kararlı; (b) Process reward — sadece son cevabı değil, muhakeme zincirini puanla; (c) Online RLHF — sürekli güncellenen insan tercih verisi. Atlas açısından: RLHF/DPO aşaması eğitim pipeline\'ında bir adımdır; inference motoru (vLLM, SGLang) yalnızca son modeli çalıştırır, tercih mekanizması görmez.',
      en: 'RLHF is expensive and risky for production systems. Three core problems: (1) "reward hacking" — the model "hacks" the reward model to score high without producing truly good answers; solution: extra constraints like "constitutional AI" (Anthropic); (2) "sycophancy" — the model enters a "yes sir" mode, because agreeable answers score higher; (3) "mode collapse" — if PPO updates are too aggressive the model loses diversity. Solutions: (a) KTO (Kahneman-Tversky) — reference-free, more stable; (b) Process reward — score not just the final answer but the reasoning chain; (c) Online RLHF — continuously updated human preference data. In the Atlas, RLHF/DPO is one step in the training pipeline; the inference engine (vLLM, SGLang) just runs the final model and does not see the preference mechanism.',
    },
    visual: 'pipeline',
    relatedConcepts: ['fine-tuning', 'prompt', 'system-prompt', 'lora'],
    relatedSolutions: ['vllm', 'lmdeploy', 'sglang', 'open-webui'],
    category: 'optimization',
  },
  {
    slug: 'pruning',
    name: { tr: 'Pruning (Budama)', en: 'Pruning' },
    short: {
      tr: 'Modelin önemsiz ağırlık, dikkat başlığı veya katmanlarını çıkararak daha küçük ve hızlı hale getirme.',
      en: 'Removing unimportant weights, attention heads, or layers from a model to make it smaller and faster.',
    },
    beginner: {
      tr: 'Bir ağacın budanması gibi: kuru ve gereksiz dalları kesersen ağaç daha sağlıklı büyür. Pruning, bir modelin "önemsiz" parçalarını — az kullanılan ağırlıklar, katkısı düşük dikkat başlıkları, gereksiz katmanlar — çıkarır. Sonuçta model aynı işi daha az parametreyle yapar. %30-50 budama sonrası kalite çoğu benchmarkta ihmal edilebilir düzeyde düşer, ama bellek ve hız kazancı belirgin olur.',
      en: 'Like pruning a tree: if you cut dry and unnecessary branches, the tree grows healthier. Pruning removes the "unimportant" parts of a model — rarely used weights, low-contribution attention heads, unnecessary layers. The result is a model that does the same job with fewer parameters. After 30-50% pruning quality drops negligibly on most benchmarks, but memory and speed gains are significant.',
    },
    intermediate: {
      tr: 'Üç temel pruning türü: (1) Unstructured pruning — bireysel ağırlıkları sıfırla (sparse model), yüksek sıkıştırma oranı ama modern GPU\'larda hız kazancı sınırlı çünkü matris çarpımları dense formatta yapılır; (2) Structured pruning — tüm nöronları, kanalları veya katmanları çıkar, doğrudan hız kazancı sağlar; (3) Semi-structured (2:4 sparsity) — her 4 ağırlıktan 2\'sini sıfırla, NVIDIA Ampere+ GPU\'larda Sparse Tensor Core\'lar 2x hız verir. Pruning genellikle fine-tuning ile birlikte yapılır (prune-then-finetune) çünkü budama tek başına kalite kaybına yol açar.',
      en: 'Three main pruning types: (1) Unstructured pruning — zero out individual weights (sparse model), high compression but limited speedup on modern GPUs because matrix multiplications stay dense; (2) Structured pruning — remove whole neurons, channels, or layers, gives direct speedup; (3) Semi-structured (2:4 sparsity) — zero out 2 of every 4 weights, NVIDIA Ampere+ GPU Sparse Tensor Cores give 2x speed. Pruning is usually done together with fine-tuning (prune-then-finetune) because pruning alone causes quality loss.',
    },
    advanced: {
      tr: 'Pruning üretimde quantization ve distillation ile birlikte "model compression üçlüsü" olarak değerlendirilir. State-of-the-art: SparseGPT (Frantar & Alistarh, 2023) — büyük dil modelleri için tek seferde (one-shot) pruning, calibration verisiyle çalışır; Wanda (Sun et al., 2023) — ağırlık × activation büyüklüğüne göre pruning, calibration verisi bile gerektirmez. Bu yöntemler Llama 2 70B\'yi %50 sparselite kadar budayabilir, perplexity artışı < 0.5. Üretim notları: (a) pruned model inference\'ı vLLM/llama.cpp\'de doğrudan desteklenmiyor; SparseTensorCore kullanmak için özel çekirdek gerekir (TensorRT-LLM, FasterTransformer); (b) pruning + quantization kombinasyonu (örn. 4-bit + 2:4 sparse) belleği 8x düşürür; (c) "lottery ticket hypothesis" — büyük bir ağın küçük bir alt kümesi tek başına aynı kaliteye ulaşabilir.',
      en: 'In production, pruning is considered part of the "model compression trio" along with quantization and distillation. State-of-the-art: SparseGPT (Frantar & Alistarh, 2023) — one-shot pruning for large language models with calibration data; Wanda (Sun et al., 2023) — pruning by weight × activation magnitude, even without calibration data. These methods can prune Llama 2 70B to 50% sparsity with perplexity increase < 0.5. Production notes: (a) pruned model inference is not directly supported in vLLM/llama.cpp; you need special kernels for SparseTensorCore (TensorRT-LLM, FasterTransformer); (b) pruning + quantization combo (e.g. 4-bit + 2:4 sparse) cuts memory 8x; (c) "lottery ticket hypothesis" — a small subset of a large network can reach the same quality on its own.',
    },
    visual: 'tree',
    relatedConcepts: ['quantization', 'distillation', 'attention', 'fine-tuning'],
    relatedSolutions: ['tensorrt-llm', 'llama-cpp', 'lmdeploy', 'mlc-llm'],
    category: 'optimization',
  },

  // ─── Hardware (5) ───────────────────────────────────────────
  {
    slug: 'cuda',
    name: { tr: 'CUDA (NVIDIA GPU Hesaplama Platformu)', en: 'CUDA' },
    short: {
      tr: 'NVIDIA GPU\'lar üzerinde paralel hesaplama için kullanılan C/C++ eklentisi ve çalışma zamanı.',
      en: 'A C/C++ extension and runtime for parallel computing on NVIDIA GPUs.',
    },
    beginner: {
      tr: 'Bir CPU\'yu tek bir güçlü işçi gibi düşün: bir seferde birkaç karmaşık iş yapar. Bir GPU\'yu binlerce küçük işçinin olduğu bir fabrika gibi düşün: binlerce basit işi aynı anda yapar. CUDA, NVIDIA\'nın GPU fabrikasını programlamak için verdiği "iş yönergesi" kitabıdır. LLM eğitimi ve çıkarımı bu fabrikada devasa matris çarpımları yapar; CUDA olmadan bu işlemler mümkün olmazdı.',
      en: 'Think of a CPU as a single strong worker: a few complex jobs at a time. A GPU is a factory with thousands of small workers: thousands of simple jobs in parallel. CUDA is NVIDIA\'s "work instruction" book for programming that GPU factory. LLM training and inference do massive matrix multiplications in this factory; without CUDA those operations wouldn\'t be possible.',
    },
    intermediate: {
      tr: 'CUDA, NVIDIA\'nın 2006\'dan beri geliştirdiği paralel hesaplama mimarisidir. Üç temel kavram: (1) Thread hierarchy — grid > block > thread, binlerce thread bir kernel içinde koşar; (2) Memory hierarchy — global, shared, constant, texture bellekler; shared memory en hızlı ama sınırlı; (3) Streams — asenkron iş kuyruğu, CPU-GPU örtüşmesini sağlar. LLM çekirdekleri: gemm (matris çarpımı), attention (FlashAttention), quantization (INT4/INT8 çekirdekleri) hep CUDA ile yazılır. vLLM, TensorRT-LLM, SGLang, llama.cpp\'nin CUDA backend\'i hep bu çekirdekleri kullanır.',
      en: 'CUDA is the parallel-computing architecture NVIDIA has been developing since 2006. Three core concepts: (1) Thread hierarchy — grid > block > thread, thousands of threads run in one kernel; (2) Memory hierarchy — global, shared, constant, texture memory; shared is fastest but limited; (3) Streams — async work queue, enables CPU-GPU overlap. LLM kernels: gemm (matrix multiplication), attention (FlashAttention), quantization (INT4/INT8 kernels) are all written in CUDA. vLLM, TensorRT-LLM, SGLang, llama.cpp\'s CUDA backend all use these kernels.',
    },
    advanced: {
      tr: 'Modern CUDA yığını karmaşık bir yazılım katmanları setidir. Sektörde "Metal" ve "ROCm" (AMD) alternatifleri olsa da, LLM çıkarımında pazarın ~%90\'ı NVIDIA\'dadır. Pratik bilgiler: (1) CUDA toolkit sürümü ile sürücü sürümü uyumlu olmalı (nvidia-smi ile kontrol); (2) compute capability (örn. A100 = 8.0, H100 = 9.0) hangi çekirdeklerin çalışacağını belirler; (3) Tensor Core\'lar FP16/BF16/INT8/FP8 için özelleşmiş matris birimleri, modern LLM performansının temelidir; (4) Multi-GPU için NVLink (GPU-GPU) veya NCCL (cluster) kullanılır; (5) MIG (Multi-Instance GPU) tek bir A100/H100\'i 7 ayrı instance\'a böler, maliyet optimizasyonu için kullanılır. Atlas\'ta bir çözümün "CUDA" desteği varsa, NVIDIA GPU zorunlu demektir.',
      en: 'The modern CUDA stack is a complex set of software layers. Although there are "Metal" and "ROCm" (AMD) alternatives in the market, ~90% of LLM inference runs on NVIDIA. Practical info: (1) CUDA toolkit version must match driver version (check with nvidia-smi); (2) compute capability (e.g. A100 = 8.0, H100 = 9.0) determines which kernels will run; (3) Tensor Cores are specialized matrix units for FP16/BF16/INT8/FP8, the foundation of modern LLM performance; (4) NVLink (GPU-GPU) or NCCL (cluster) is used for Multi-GPU; (5) MIG (Multi-Instance GPU) splits a single A100/H100 into 7 separate instances, used for cost optimization. In the Atlas, if a solution has "CUDA" support, it means NVIDIA GPU is mandatory.',
    },
    visual: 'gpu-mesh',
    relatedConcepts: ['paged-attention', 'attention', 'quantization', 'npu'],
    relatedSolutions: ['vllm', 'tensorrt-llm', 'sglang', 'exllamav3'],
    category: 'hardware',
  },
  {
    slug: 'npu',
    name: { tr: 'NPU (Sinir Ağı İşlem Birimi)', en: 'NPU (Neural Processing Unit)' },
    short: {
      tr: 'Yapay zekâ işlemleri (özellikle matris çarpımları ve aktivasyonlar) için özelleşmiş düşük güçlü çip.',
      en: 'A low-power chip specialized for AI operations, especially matrix multiplications and activations.',
    },
    beginner: {
      tr: 'GPU genel amaçlı bir "fabrika" ise, NPU bu fabrikanın yalnızca yapay zekâ işleri için ayrılmış özel bir bölümü gibidir. Telefonundaki, dizüstü bilgisayarındaki yeni çiplerin içinde "NPU" yazıyorsa, bu küçük özel çip yapay zekâ işlerini (yüz tanıma, sesli asistan, görsel filtre) GPU\'dan çok daha az enerjiyle yapar. LLM\'ler için henüz yeterince güçlü olmasa da, küçük modelleri (1-7B) verimli şekilde çalıştırabilir.',
      en: 'If a GPU is a general-purpose "factory", an NPU is a special section of that factory dedicated only to AI work. If your phone or laptop\'s new chip says "NPU", that small specialized chip does AI tasks (face recognition, voice assistant, visual filters) using much less energy than the GPU. It is not yet powerful enough for full LLMs, but it can run small models (1-7B) efficiently.',
    },
    intermediate: {
      tr: 'NPU\'lar 2017\'den sonra yaygınlaştı (Apple Neural Engine, Qualcomm Hexagon, Intel NPU, MediaTek APU). Mimari farkları: (1) Veri akışı (dataflow) mimarisi — sabit matris çarpımı birimlerinden oluşur, GPU\'nun SIMT modelinden farklı; (2) Sıfır-durum (zero-state) yönetimi — ağırlıklar SRAM\'de tutulur, DRAM erişimi minimum; (3) Enerji verimliliği — watt başına 5-15 TOPS, GPU\'nun 1-3 katı. LLM çıkarımı için: 7B model INT4 nicemli olarak Apple M4 NPU\'da 20-30 token/s; Qualcomm X Elite NPU\'da 13B model çalıştırılabilir. OpenVINO GenAI ve ONNX Runtime GenAI, NPU desteği olan inference motorlarıdır.',
      en: 'NPUs became common after 2017 (Apple Neural Engine, Qualcomm Hexagon, Intel NPU, MediaTek APU). Architectural differences: (1) Dataflow architecture — fixed matrix multiplication units, different from GPU\'s SIMT model; (2) Zero-state management — weights are held in SRAM, minimal DRAM access; (3) Energy efficiency — 5-15 TOPS per watt, 1-3x the GPU. For LLM inference: 7B model quantized INT4 runs at 20-30 tokens/s on Apple M4 NPU; 13B model can run on Qualcomm X Elite NPU. OpenVINO GenAI and ONNX Runtime GenAI are inference engines with NPU support.',
    },
    advanced: {
      tr: 'NPU üretim LLM çıkarımı için hâlâ sınırlı bir niş, ama hızla büyüyor. Üç ana sorun: (1) bellek — NPU SRAM tipik olarak 8-64 MB, LLM ağırlıkları DRAM\'den aktarılmalı; (2) operatör desteği — flash attention, paged attention gibi yeni çekirdekler NPU\'lara yavaş portlanır; (3) dinamik şekil — değişken bağlam uzunluğu NPU\'nun sabit veri akışını bozar. Üretim notları: (a) Apple M4 Max NPU, MLX üzerinden 70B INT4 model çalıştırabilir (RAM paylaşımı sayesinde); (b) Qualcomm AI Engine, llama.cpp\'nin QNN backend\'i ile kullanılır; (c) Intel NPU (Meteor Lake, Lunar Lake) OpenVINO GenAI üzerinden 7B/13B model verimli çalıştırır. Pratik: NPU, edge cihazlarda "her zaman açık" (always-on) AI asistan senaryoları için idealdir; bulut çıkarımı hâlâ GPU egemenliğinde.',
      en: 'NPU is still a limited niche for production LLM inference, but it is growing fast. Three main issues: (1) memory — NPU SRAM is typically 8-64 MB, LLM weights must be transferred from DRAM; (2) operator support — new kernels like flash attention, paged attention are slow to be ported to NPUs; (3) dynamic shape — variable context length disrupts the NPU\'s fixed dataflow. Production notes: (a) Apple M4 Max NPU can run a 70B INT4 model through MLX (thanks to shared RAM); (b) Qualcomm AI Engine is used via llama.cpp\'s QNN backend; (c) Intel NPU (Meteor Lake, Lunar Lake) runs 7B/13B models efficiently through OpenVINO GenAI. Practical: NPU is ideal for "always-on" AI assistant scenarios on edge devices; cloud inference is still GPU-dominated.',
    },
    visual: 'gpu-mesh',
    relatedConcepts: ['cuda', 'apple-silicon', 'onnx', 'webgpu'],
    relatedSolutions: ['openvino-genai', 'onnx-runtime-genai', 'executorch', 'webllm'],
    category: 'hardware',
  },
  {
    slug: 'apple-silicon',
    name: { tr: 'Apple Silicon Unified Memory', en: 'Apple Silicon Unified Memory' },
    short: {
      tr: 'Mac çiplerinde CPU, GPU ve NPU\'nun aynı belleği paylaşması — LLM çıkarımını kolaylaştıran özel mimari.',
      en: 'On Mac chips, CPU, GPU and NPU share the same memory — an architecture that simplifies LLM inference.',
    },
    beginner: {
      tr: 'Normal bir bilgisayarda ekran kartının (GPU) kendi belleği vardır, ana bellekten ayrıdır. Büyük bir modeli çalıştırmak için modeli GPU belleğine kopyalaman gerekir. Apple Silicon\'da (M1/M2/M3/M4) böyle bir ayrım yok: CPU, GPU ve NPU aynı RAM\'i paylaşır. Bu yüzden 64 GB RAM\'li bir Mac, 64 GB\'lık bir modeli (nicemlenmiş olarak) çalıştırabilir; normal PC\'de aynı işlem için 64 GB GPU belleği (yani pahalı bir kart) lazım olurdu.',
      en: 'On a normal computer, the graphics card (GPU) has its own memory, separate from main memory. To run a large model you need to copy it to GPU memory. On Apple Silicon (M1/M2/M3/M4) there is no such split: CPU, GPU and NPU share the same RAM. That is why a 64 GB RAM Mac can run a 64 GB model (quantized); on a normal PC the same job would need 64 GB of GPU memory (i.e. an expensive card).',
    },
    intermediate: {
      tr: 'Apple Silicon, "unified memory architecture" (UMA) kullanır. Teknik özellikler: (1) M4 Max, 128 GB\'a kadar unified memory destekler; (2) bellek bant genişliği M4 Max\'te 400 GB/s, bu H100 GPU\'nun (~3 TB/s) çok altında ama DDR5 sistemden (~80 GB/s) 5x yüksek; (3) Metal API\'si GPU erişimi sağlar, MLX ise Apple\'ın Python-first framework\'üdür. LLM çıkarımı: llama.cpp Metal backend, mlx-lm (Apple\'ın resmi MLX\'i temelli) Mac için optimize motorlardır. Pratik karşılaştırma: 8B model M4 Max\'te ~25-40 token/s (INT4), M2 Max\'te ~15-25 token/s; aynı model eşdeğer NVIDIA laptop GPU\'da daha yüksek olabilir ama güç tüketimi çok daha fazladır.',
      en: 'Apple Silicon uses "unified memory architecture" (UMA). Technical specs: (1) M4 Max supports up to 128 GB unified memory; (2) memory bandwidth on M4 Max is 400 GB/s, well below the H100 GPU (~3 TB/s) but 5x higher than DDR5 systems (~80 GB/s); (3) the Metal API provides GPU access, while MLX is Apple\'s Python-first framework. LLM inference: llama.cpp\'s Metal backend and mlx-lm (built on Apple\'s official MLX) are the engines optimized for Mac. Practical comparison: 8B model at ~25-40 token/s on M4 Max (INT4), ~15-25 token/s on M2 Max; the same model can be higher on an equivalent NVIDIA laptop GPU but with much higher power draw.',
    },
    advanced: {
      tr: 'Apple Silicon, LLM geliştirici deneyimini sessizce dönüştürdü. 2024 sonrası trendler: (1) MLX-LM birinci sınıf citizen — Apple, mlx-lm\'i ana repo olarak benimsedi, LoRA eğitimi de çalışır; (2) "MLX formatı" — saf PyTorch yerine optimize edilmiş format, 2-3x hızlı yükleme; (3) Mac-as-a-service (MaaS) — küçük ekipler, M4 Ultra Mac Studio ile orta ölçekli inference API\'si çalıştırabilir, GPU kira maliyetini düşürür. Kısıtlar: (a) TF32 desteği yok, bu yüzden bazı training ops yavaş; (b) distributed training sınırlı, NCCL benzeri API yok; (c) FP8 native değil. Atlas açısından: Mac\'te çalışan modeller genellikle "kolay yerel geliştirme" kategorisinde, üretim dağıtımı için değil. Ancak fine-tuning ve küçük inference senaryoları için "fiyat/performans" kraldır.',
      en: 'Apple Silicon has quietly transformed the LLM developer experience. Trends after 2024: (1) MLX-LM is a first-class citizen — Apple adopted mlx-lm as a main repo, LoRA training also works; (2) "MLX format" — optimized format over plain PyTorch, 2-3x faster load; (3) Mac-as-a-service (MaaS) — small teams can run a mid-scale inference API on M4 Ultra Mac Studio, lowering GPU rental cost. Limits: (a) no TF32 support, so some training ops are slow; (b) distributed training is limited, no NCCL-like API; (c) FP8 is not native. In the Atlas, models running on Mac usually fall in the "easy local development" category, not for production deployment. But for fine-tuning and small inference scenarios, "price/performance" rules.',
    },
    visual: 'gpu-mesh',
    relatedConcepts: ['cuda', 'npu', 'quantization', 'onnx'],
    relatedSolutions: ['mlx-lm', 'llama-cpp', 'ollama', 'lm-studio'],
    category: 'hardware',
  },
  {
    slug: 'webgpu',
    name: { tr: 'WebGPU (Tarayıcıda GPU)', en: 'WebGPU' },
    short: {
      tr: 'Modern web tarayıcılarında GPU\'ya güvenli ve düşük seviyeli erişim sağlayan standart.',
      en: 'A standard that provides safe, low-level GPU access in modern web browsers.',
    },
    beginner: {
      tr: 'WebGL\'den bir adım daha ileri: WebGPU, tarayıcı içinden doğrudan modern GPU komutları göndermeni sağlar. Eskiden tarayıcıda 3D oyun veya yapay zekâ çalıştırmak sınırlıydı. Şimdi LLM\'ler birkaç yüz MB indikten sonra tümüyle tarayıcında çalışabilir — veri sunucuya gitmez, gizlilik üst düzeydedir. Tabii ki büyük modeller (70B+) hâlâ tarayıcıda pratik değil, ama 1-7B arası modeller için WebGPU çığır açtı.',
      en: 'One step further than WebGL: WebGPU lets you send modern GPU commands directly from inside the browser. Running 3D games or AI in the browser used to be limited. Now LLMs can run entirely inside your browser after a few hundred MB download — data never leaves the device, privacy is top tier. Of course large models (70B+) are still impractical in the browser, but for 1-7B models WebGPU is a breakthrough.',
    },
    intermediate: {
      tr: 'WebGPU, W3C standardıdır; Chrome, Firefox, Safari ve Edge modern sürümlerinde desteklenir. WebGL\'den farkları: (1) Compute shader desteği — matris çarpımı gibi genel amaçlı GPU işlemleri; (2) Explicit pipeline — vertex/fragment yerine compute/render pipeline ayrımı; (3) Düşük overhead — driver seviyesinde modern API\'lere (Vulkan, Metal, DX12) benzer. LLM çıkarımı için WebLLM ve MLC LLM başlıca motorlardır; her ikisi de WebGPU compute shader\'larını matris çarpımları için kullanır. Pratik: 4B Q4 model MacBook Safari\'de ~15-20 token/s, Android Chrome\'da Pixel 8\'de ~8-10 token/s. İlk model indirme 200-500 MB sürebilir, sonraki açılışlar cache\'ten olur.',
      en: 'WebGPU is a W3C standard; supported in modern Chrome, Firefox, Safari, and Edge. Differences from WebGL: (1) Compute shader support — general-purpose GPU work like matrix multiplication; (2) Explicit pipeline — separation of compute vs render pipeline; (3) Lower overhead — modern API similar to driver level (Vulkan, Metal, DX12). For LLM inference, WebLLM and MLC LLM are the main engines; both use WebGPU compute shaders for matrix multiplications. Practical: 4B Q4 model at ~15-20 token/s on MacBook Safari, ~8-10 token/s on Pixel 8 Android Chrome. First model download can take 200-500 MB, subsequent loads come from cache.',
    },
    advanced: {
      tr: 'WebGPU LLM çıkarımında bazı ince noktalar var. Üç ana sınırlama: (1) WASM-JS köprüsü — model kodu JS\'te, GPU kernel\'ları WGSL (WebGPU Shading Language) ile yazılır; her iki katman arasında veri kopyalama performansı düşürür; (2) Shader compilation — yeni model mimarisi için shader\'lar runtime\'da derlenir, bu ilk açılışta 5-30 saniye gecikme yaratır; (3) Tarayıcı farklılıkları — Safari\'nin Metal backend\'i ile Chrome\'un Vulkan backend\'i arasında 1.5-2x performans farkı olabilir. Üretim notları: (a) WebLLM, Service Worker ile model cache\'leme yapar; (b) PWA + WebGPU = offline AI; (c) gizlilik avantajı: hiçbir veri dışarı çıkmaz, GDPR/KVKK uyumu kolaylaşır; (d) sınırlı VRAM — çoğu mobil cihazda 4-8 GB GPU belleği paylaşılır. Atlas açısından: WebGPU destekli çözümler "edge" ve "client-side AI" kategorisinde, server değil.',
      en: 'There are some subtle points in WebGPU LLM inference. Three main limits: (1) WASM-JS bridge — model code in JS, GPU kernels written in WGSL (WebGPU Shading Language); data copying between the two layers hurts performance; (2) Shader compilation — shaders for new model architectures are compiled at runtime, adding 5-30 seconds to first launch; (3) Browser differences — there can be 1.5-2x performance gap between Safari\'s Metal backend and Chrome\'s Vulkan backend. Production notes: (a) WebLLM uses Service Worker for model caching; (b) PWA + WebGPU = offline AI; (c) privacy advantage: no data leaves the device, GDPR/KVKK compliance gets easier; (d) limited VRAM — most mobile devices share 4-8 GB of GPU memory. In the Atlas, WebGPU-enabled solutions fall in the "edge" and "client-side AI" category, not server.',
    },
    visual: 'gpu-mesh',
    relatedConcepts: ['cuda', 'npu', 'onnx', 'apple-silicon'],
    relatedSolutions: ['webllm', 'mlc-llm', 'executorch', 'onnx-runtime-genai'],
    category: 'hardware',
  },
  {
    slug: 'onnx',
    name: { tr: 'ONNX (Açık Model Formatı)', en: 'ONNX (Open Neural Network Exchange)' },
    short: {
      tr: 'Farklı çerçeveler (PyTorch, TensorFlow) arasında modelleri taşınabilir kılan açık standart format.',
      en: 'An open standard format that makes models portable across different frameworks (PyTorch, TensorFlow).',
    },
    beginner: {
      tr: 'Bir filmi farklı oynatıcılarda izleyebilmek için ortak bir video formatı (mp4) kullanırız. ONNX, yapay zekâ modelleri için benzer bir "ortak dil"dir: PyTorch\'ta eğittiğin bir modeli ONNX formatına çevirirsen, ONNX Runtime veya OpenVINO gibi başka motorlarda da çalıştırabilirsin. Bu sayede modelini bir kez eğitip, pek çok farklı donanımda (CPU, GPU, NPU) çalıştırabilirsin.',
      en: 'We use a common video format (mp4) so that a movie can be played on different players. ONNX is a similar "common language" for AI models: if you convert a model you trained in PyTorch to ONNX format, you can run it in other engines like ONNX Runtime or OpenVINO. That way you train a model once and run it on many different hardware (CPU, GPU, NPU).',
    },
    intermediate: {
      tr: 'ONNX, Microsoft ve Facebook tarafından 2017\'de başlatıldı, şimdi LF AI & Data çatısı altında. Üç katman: (1) Model format — operatörleri (matmul, conv, attention) standart tensor graph olarak tanımlar; (2) Runtime — ONNX Runtime (ORT), donanım-specific "execution provider" (EP) seçer: CUDA, DirectML, OpenVINO, TensorRT, CoreML; (3) Quantization — ORT quantize tool ile QDQ (Quantize-Dequantize) formatı, INT8 nicemli modeli farklı donanımlarda çalıştırır. Pratik: PyTorch modeli ONNX\'e çevirmek torch.onnx.export() ile yapılır; "dynamic_axes" parametresi değişken batch/sequence uzunluğunu sağlar. Üretimde: ONNX modeli tek bir yapı olarak dağıtılır, EP runtime\'da seçilir — aynı model dosyası hem CPU hem GPU hem NPU\'da çalışır.',
      en: 'ONNX was started by Microsoft and Facebook in 2017, now under LF AI & Data. Three layers: (1) Model format — defines operators (matmul, conv, attention) as a standard tensor graph; (2) Runtime — ONNX Runtime (ORT) picks the hardware-specific "execution provider" (EP): CUDA, DirectML, OpenVINO, TensorRT, CoreML; (3) Quantization — ORT quantize tool produces QDQ (Quantize-Dequantize) format that runs the INT8 quantized model on different hardware. Practical: converting a PyTorch model to ONNX is done with torch.onnx.export(); the "dynamic_axes" parameter enables variable batch/sequence length. In production: the ONNX model is deployed as a single artifact, EP is chosen at runtime — the same model file runs on CPU, GPU, and NPU.',
    },
    advanced: {
      tr: 'ONNX ekosistemi, LLM çıkarımı için "ONNX Runtime GenAI" ile 2024\'te olgunlaştı. Avantajları: (1) Framework bağımsızlığı — PyTorch, TensorFlow, JAX modelleri tek ONNX\'e çevrilebilir; (2) Hardware abstraction — tek model, farklı EP\'lerle farklı donanımlarda çalışır; (3) Operator seti — standard ops (Conv, MatMul, Attention) tam, exotic ops bazen özel domain kullanır. Kısıtlar: (a) yeni model mimarileri (örn. sliding window attention) ONNX spec\'e eklenmeli; (b) dynamic shape desteği EP\'lere göre farklı; (c) dynamic quantization verimli ama static quantization daha hızlı. ONNX Runtime GenAI\'nin Llama 3, Phi-3, Mistral desteği var; Ollama, LM Studio gibi çözümlerin altında llama.cpp çalışsa da, üretim ortamlarında ONNX sıklıkla tercih edilir. Atlas açısından: bir çözüm ONNX destekliyorsa, model formatı konusunda esnek demektir.',
      en: 'The ONNX ecosystem matured for LLM inference with "ONNX Runtime GenAI" in 2024. Advantages: (1) Framework independence — PyTorch, TensorFlow, JAX models can be converted to a single ONNX; (2) Hardware abstraction — one model, different EPs, different hardware; (3) Operator set — standard ops (Conv, MatMul, Attention) complete, exotic ops sometimes use a custom domain. Limits: (a) new model architectures (e.g. sliding window attention) need to be added to the ONNX spec; (b) dynamic shape support differs per EP; (c) dynamic quantization is efficient but static quantization is faster. ONNX Runtime GenAI has Llama 3, Phi-3, Mistral support; while solutions like Ollama, LM Studio run on llama.cpp underneath, ONNX is often preferred in production environments. In the Atlas, if a solution supports ONNX, it means the model format is flexible.',
    },
    visual: 'pipeline',
    relatedConcepts: ['webgpu', 'npu', 'quantization', 'apple-silicon'],
    relatedSolutions: ['onnx-runtime-genai', 'openvino-genai', 'executorch', 'mlc-llm'],
    category: 'hardware',
  },

  // ─── App (5) ────────────────────────────────────────────────
  {
    slug: 'rag',
    name: { tr: 'RAG (Retrieval-Augmented Generation)', en: 'RAG (Retrieval-Augmented Generation)' },
    short: {
      tr: 'Modelin cevap üretirken dış bir bilgi kaynağından (dokümanlar, vektör DB) ilgili bilgi çekip kullanması.',
      en: 'Having the model pull relevant information from an external source (documents, vector DB) while generating an answer.',
    },
    beginner: {
      tr: 'Sınava çalışan bir öğrenci düşün: cevabı ezbere değil, yanındaki açık kitabın ilgili sayfasından bakarak veriyor. RAG, modelin aynısını yapması: soru geldiğinde önce bir "bilgi bankası" (doküman koleksiyonu, vektör veritabanı) taranır, en alakalı parçalar bulunur, sonra model bu parçalarla zenginleştirilmiş bir prompt\'la cevabını üretir. Modelin bilgisi güncelliğini yitirmiş olsa bile, RAG ile en son bilgiye erişebilir.',
      en: 'Imagine a student studying for an exam: they answer not from memory, but by referring to the relevant page of the open book next to them. RAG makes the model do the same: when a question comes, a "knowledge bank" (document collection, vector database) is searched first, the most relevant pieces are found, then the model generates its answer with a prompt enriched by these pieces. Even if the model\'s knowledge is outdated, RAG gives access to the latest information.',
    },
    intermediate: {
      tr: 'RAG pipeline\'ı dört aşamadan oluşur: (1) Indexing — dokümanlar parçalara (chunk) bölünür, her chunk embedding modeliyle vektöre çevrilir, vektör DB\'ye yazılır; (2) Retrieval — kullanıcı sorusu embedding\'e çevrilir, cosine similarity ile en yakın K chunk (tipik K=3-10) çekilir; (3) Augmentation — bulunan chunk\'lar system prompt\'a veya user prompt\'a eklenir; (4) Generation — model bu zenginleştirilmiş prompt\'la cevabını üretir. Üç temel varyant: (a) "naive RAG" — sadece semantic search; (b) "hybrid RAG" — BM25 (keyword) + dense (embedding) birleşimi; (c) "graph RAG" — bilgiyi graf olarak indeksler, ilişkileri de çeker. Başarısızlık modları: chunking kötü, retrieval alakasız, model "halüsinasyon" yapıyor (kaynak göstermeden uyduruyor).',
      en: 'A RAG pipeline has four stages: (1) Indexing — documents are split into chunks, each chunk is converted to a vector by an embedding model and written to a vector DB; (2) Retrieval — the user query is converted to an embedding, the K most similar chunks (typical K=3-10) are pulled by cosine similarity; (3) Augmentation — the found chunks are added to the system or user prompt; (4) Generation — the model produces its answer with this enriched prompt. Three main variants: (a) "naive RAG" — pure semantic search; (b) "hybrid RAG" — BM25 (keyword) + dense (embedding) combination; (c) "graph RAG" — indexes knowledge as a graph, also pulls relations. Failure modes: bad chunking, irrelevant retrieval, model "hallucinating" (making things up without citing sources).',
    },
    advanced: {
      tr: 'İleri RAG mimarileri 2024 sonrası ciddi şekilde karmaşıklaştı. "Agentic RAG" — modelin sorguyu alt-sorgulara bölüp çoklu retrieval yaptığı sistem (örn. multi-step query rewriting). "Self-RAG" — model her cevapta "bu bilgiyi kullanmalı mıyım?" diye düşünür (Asai et al., 2023). "CRAG (Corrective RAG)" — retrieval kalitesini değerlendirip düşükse web search\'a yönlendirir. Pratik notlar: (1) Re-ranking (Cohere Rerank, BGE-reranker) retrieval kalitesini %15-25 artırır; (2) chunk boyutu trade-off: küçük chunk (256) kesin ama bağlam kaybı; büyük chunk (1024) bağlam korur ama gürültülü; (3) Hybrid search (BM25 + dense) salt dense\'ten çoğu benchmarkta üstündür; (4) "lost in the middle" etkisi: 10+ chunk verildiğinde model ortadakini görmezden gelir, en önemli 3-5 chunk başta ve sonda olmalı. Atlas açısından: RAG destekleyen çözümler genellikle "app" kategorisindedir (Open WebUI, AnythingLLM).',
      en: 'Advanced RAG architectures have gotten significantly more complex after 2024. "Agentic RAG" — the model splits the query into sub-queries and does multiple retrievals (e.g. multi-step query rewriting). "Self-RAG" — the model thinks "should I use this information?" at each answer (Asai et al., 2023). "CRAG (Corrective RAG)" — evaluates retrieval quality and routes to web search if it is low. Practical notes: (1) re-ranking (Cohere Rerank, BGE-reranker) improves retrieval quality 15-25%; (2) chunk size trade-off: small chunk (256) is precise but loses context; large chunk (1024) keeps context but noisy; (3) hybrid search (BM25 + dense) beats pure dense on most benchmarks; (4) "lost in the middle" effect: when 10+ chunks are given the model ignores the middle ones, the 3-5 most important should be at the start and end. In the Atlas, RAG-supporting solutions usually fall in the "app" category (Open WebUI, AnythingLLM).',
    },
    visual: 'pipeline',
    relatedConcepts: ['embedding', 'vector-db', 'prompt', 'context-window'],
    relatedSolutions: ['open-webui', 'anythingllm', 'lmdeploy', 'vllm'],
    category: 'app',
  },
  {
    slug: 'function-calling',
    name: { tr: 'Function Calling (Fonksiyon Çağırma)', en: 'Function Calling' },
    short: {
      tr: 'Modelin kendi cevabı yerine dış bir fonksiyonu/aracı çağırması için yapılandırılmış JSON çıktısı üretmesi.',
      en: 'The model producing a structured JSON output to call an external function/tool instead of giving its own answer.',
    },
    beginner: {
      tr: 'Bir garson müşterinin siparişini alıp mutfağa iletir, kendisi yemek pişirmez. Function calling, modelin "garson" rolü: kullanıcı "İstanbul hava durumu" derse, model kendisi hava durumunu bilmez, ama "hava_durumu" fonksiyonunu çağırır, o fonksiyon sonucu getirir, model bu sonucu kullanıcıya "yarın İstanbul\'da 18°C, parçalı bulutlu" şeklinde aktarır. Model veriyi kendisi üretmez, bir aracı çağırır.',
      en: 'A waiter takes the customer\'s order and passes it to the kitchen; they don\'t cook. Function calling is the model\'s "waiter" role: if the user asks "weather in Istanbul", the model doesn\'t know the weather itself, but it calls the "get_weather" function, that function brings the result, and the model passes it to the user as "tomorrow in Istanbul 18°C, partly cloudy". The model doesn\'t generate data, it calls a tool.',
    },
    intermediate: {
      tr: 'Function calling akışı: (1) Geliştirici bir "tool schema" listesi tanımlar (JSON Schema / OpenAPI benzeri) — fonksiyon adı, parametreleri, açıklaması; (2) Schema, system prompt\'a veya API\'nin "tools" parametresine eklenir; (3) Model cevap yerine tool_call(JSON) üretir; (4) Uygulama bu JSON\'u parse eder, ilgili fonksiyonu çalıştırır; (5) Fonksiyon sonucu modele geri verilir, model bu sefer düz metin cevap üretir. Üç yaygın format: (a) OpenAI tool_calls formatı (en yaygın), (b) Anthropic tool_use (benzer ama farklı JSON şeması), (c) Google function_calling (farklı yapı). Üretim notları: (a) tool şeması çok büyükse token maliyeti artar — 50 tool = binlerce token; (b) tool selection accuracy düşükse "forced tool choice" parametresi ile kısıtla; (c) JSON validasyon için Pydantic veya Zod kullan.',
      en: 'Function calling flow: (1) Developer defines a "tool schema" list (JSON Schema / OpenAPI-like) — function name, parameters, description; (2) Schema is added to the system prompt or the API\'s "tools" parameter; (3) Model produces tool_call(JSON) instead of an answer; (4) Application parses this JSON, runs the relevant function; (5) Function result is fed back to the model, which now produces a plain text answer. Three common formats: (a) OpenAI tool_calls format (most common), (b) Anthropic tool_use (similar but different JSON schema), (c) Google function_calling (different structure). Production notes: (a) if tool schema is too large, token cost grows — 50 tools = thousands of tokens; (b) if tool selection accuracy is low, constrain with "forced tool choice" parameter; (c) use Pydantic or Zod for JSON validation.',
    },
    advanced: {
      tr: 'İleri function calling tasarımı zorludur. Üç temel sorun: (1) "tool hallucination" — model var olmayan bir tool\'u çağırır, çözüm: strict schema validation; (2) "tool chain explosion" — model 10 tool\'u sırayla çağırır, her birinde hata olabilir, çözüm: max iteration limit ve "reasoning trace" loglama; (3) "parallel tool calls" — birden çok bağımsız tool aynı anda çağrılmalı (OpenAI "parallel_tool_calls=true" destekler). Üretimde "tool registry" deseni: tool\'lar merkezi bir kayıtta tanımlı, versiyonlanır, monitoring\'le hangi tool\'un ne sıklıkta çağrıldığı izlenir. OpenAI 2024\'te "tool use + structured outputs" kombinasyonunu "strict mode" ile sundu — JSON şemasına %100 uyumlu çıktı garantisi. Atlas açısından: function calling desteği olan motorlar (vLLM, SGLang) bu özelliği OpenAI uyumlu API\'de otomatik sunar; agent framework\'leri (LangChain, LlamaIndex) üst katmanda tool yönetimi sağlar.',
      en: 'Advanced function calling design is hard. Three core problems: (1) "tool hallucination" — model calls a non-existent tool, solution: strict schema validation; (2) "tool chain explosion" — model calls 10 tools in sequence, each can fail, solution: max iteration limit and "reasoning trace" logging; (3) "parallel tool calls" — multiple independent tools must be called simultaneously (OpenAI supports "parallel_tool_calls=true"). In production, the "tool registry" pattern: tools are defined in a central registry, versioned, and monitored for call frequency. In 2024 OpenAI shipped "tool use + structured outputs" combination in "strict mode" — 100% JSON schema conformance guarantee. In the Atlas, engines with function calling support (vLLM, SGLang) expose this feature through their OpenAI-compatible API; agent frameworks (LangChain, LlamaIndex) provide tool management at a higher level.',
    },
    visual: 'pipeline',
    relatedConcepts: ['prompt', 'system-prompt', 'agent', 'rag'],
    relatedSolutions: ['vllm', 'sglang', 'litellm-proxy', 'open-webui'],
    category: 'app',
  },
  {
    slug: 'agent',
    name: { tr: 'Agent (LLM Tabanlı Ajan)', en: 'LLM Agent' },
    short: {
      tr: 'Bir LLM\'in planlama yapıp çoklu araç/agent çağrısıyla karmaşık görevleri adım adım çözdüğü sistem.',
      en: 'A system where an LLM plans and solves complex tasks step by step through multiple tool/agent calls.',
    },
    beginner: {
      tr: 'Bir insan "bana Paris için 3 günlük plan yap" dediğinde önce uçuş, otel, müze saatleri, restoran gibi bilgileri araştırır, sonra bunları birleştirir. LLM agent, modelin bu türden çok adımlı bir "araştırmacı-asistan" gibi davranmasıdır. Her adımda model ne yapacağına karar verir, araç çağırır (web arama, veritabanı sorgusu, hesap makinesi), sonucu değerlendirir, bir sonraki adıma geçer. Sonunda bir "agent loop" tamamlanır.',
      en: 'When a human says "make me a 3-day plan for Paris", they first research flights, hotels, museum hours, restaurants, then combine them. An LLM agent is when the model behaves like a multi-step "researcher-assistant". At each step the model decides what to do, calls a tool (web search, database query, calculator), evaluates the result, moves to the next step. Finally an "agent loop" completes.',
    },
    intermediate: {
      tr: 'Agent mimarisinin üç temel bileşeni: (1) Planner — görevi alt adımlara böler (örn. ReAct, Plan-and-Execute); (2) Tools — function calling ile erişilen dış kaynaklar (arama, dosya, API); (3) Memory — kısa vadede konuşma geçmişi, uzun vadede vektör DB\'de saklanan bilgi. Üç yaygın kalıp: (a) ReAct (Reasoning + Acting) — düşün, hareket et, gözlemle döngüsü; (b) Reflexion — hatalardan ders çıkarıp yeniden dener; (c) Multi-agent — birden çok agent\'ın farklı rollere bürünüp birlikte çalışması (örn. AutoGen, CrewAI). Pratik notlar: (a) "infinite loop" riski — model bir tool\'dan cevap alamadığında döngüye girebilir, max iteration şart; (b) maliyet kontrolü — her tool call ek token, çok adımlı agent cevabı 10x pahalıya getirebilir; (c) eval (değerlendirme) zordur — agent çıktısı deterministik değildir, end-to-end test şart.',
      en: 'An agent architecture has three core components: (1) Planner — splits the task into sub-steps (e.g. ReAct, Plan-and-Execute); (2) Tools — external resources accessed through function calling (search, file, API); (3) Memory — short-term conversation history, long-term info stored in a vector DB. Three common patterns: (a) ReAct (Reasoning + Acting) — think, act, observe loop; (b) Reflexion — learns from mistakes and retries; (c) Multi-agent — multiple agents take on different roles and work together (e.g. AutoGen, CrewAI). Practical notes: (a) "infinite loop" risk — model can loop if a tool doesn\'t return, max iteration mandatory; (b) cost control — every tool call is extra tokens, a multi-step agent answer can be 10x more expensive; (c) eval is hard — agent output isn\'t deterministic, end-to-end testing is required.',
    },
    advanced: {
      tr: 'İleri agent tasarımı, 2024-2025\'te hızla olgunlaşan bir alan. Üç ana trend: (1) "Tool-use agents" — Anthropic MCP (Model Context Protocol) standardı, farklı veri kaynaklarını/tool\'ları ortak interface ile bağlar; (2) "Code agents" — model Python kodu yazıp çalıştırır (OpenAI Code Interpreter, Aider, Devin yaklaşımı), yazılım mühendisliği görevlerini otonom çözer; (3) "Multi-agent orchestration" — supervisor agent alt agent\'ları yönetir (LangGraph, CrewAI). Üretim sorunları: (a) "reliability" — agent görevi %100 başarıyla bitiremez, "human-in-the-loop" şart; (b) "observability" — her tool call\'un trace\'lenmesi gerekir (Langfuse, Helicone); (c) "security" — agent\'ın tool\'lar üzerinde yetkisi kısıtlı olmalı, "least privilege" ilkesi. Atlas açısından: agent destekli çözümler SGLang, vLLM\'in structured output\'u üzerine kurulur; AnythingLLM, Open WebUI üst katmanda agent akışı sağlar.',
      en: 'Advanced agent design is a rapidly maturing field in 2024-2025. Three main trends: (1) "Tool-use agents" — Anthropic MCP (Model Context Protocol) standard, connects different data sources/tools with a common interface; (2) "Code agents" — model writes and runs Python code (OpenAI Code Interpreter, Aider, Devin approach), autonomously solves software engineering tasks; (3) "Multi-agent orchestration" — supervisor agent manages sub-agents (LangGraph, CrewAI). Production issues: (a) "reliability" — agent cannot complete a task 100% successfully, "human-in-the-loop" is required; (b) "observability" — every tool call must be traced (Langfuse, Helicone); (c) "security" — agent\'s authority over tools must be limited, "least privilege" principle. In the Atlas, agent-supporting solutions are built on top of SGLang, vLLM\'s structured output; AnythingLLM, Open WebUI provide agent flow at a higher level.',
    },
    visual: 'pipeline',
    relatedConcepts: ['function-calling', 'rag', 'prompt', 'system-prompt'],
    relatedSolutions: ['sglang', 'vllm', 'litellm-proxy', 'open-webui'],
    category: 'app',
  },
  {
    slug: 'vector-db',
    name: { tr: 'Vector Database (Vektör Veritabanı)', en: 'Vector Database' },
    short: {
      tr: 'Embedding vektörlerini saklayıp benzerlik araması (ANN) için özelleşmiş veritabanı.',
      en: 'A database specialized for storing embedding vectors and similarity (ANN) search.',
    },
    beginner: {
      tr: 'Bir kütüphanede "macera romanları" rafını ararken her kitabı teker teker açıp konusunu okumazsın; konuya göre sınıflama yapılmıştır, doğru rafa yönlendirilirsin. Vektör veritabanı, embedding\'leri (metin/görsel/ses\'in sayısal temsili) saklar ve "şu vektöre en benzer 10 vektörü bul" gibi sorguları hızlıca cevaplar. RAG, anlamsal arama, öneri sistemleri hep bunun üzerine kuruludur.',
      en: 'When you look for the "adventure novels" shelf in a library, you don\'t open every book and read its plot; they are classified by topic, you are pointed to the right shelf. A vector database stores embeddings (numeric representations of text/image/audio) and quickly answers queries like "find the 10 vectors most similar to this one". RAG, semantic search, and recommender systems are all built on top of it.',
    },
    intermediate: {
      tr: 'Vektör DB\'lerin iki temel yapı taşı: (1) Index — yüksek boyutlu vektörleri hızlı aramak için ANN (Approximate Nearest Neighbor) algoritması (HNSW, IVF, ScaNN); (2) Metadata — vektörün yanında düz metin/etiket (kaynak doküman, tarih, kategori). Önemli vektör DB\'ler: pgvector (PostgreSQL eklentisi), Qdrant (Rust), Milvus (C++), Weaviate (Go), Chroma (Python), Pinecone (yönetilen). Trade-off\'lar: (a) HNSW en doğru ama bellek yoğun; (b) IVF bellek dostu ama doğruluk düşer; (c) filtreleme — metadata ile birlikte arama (pre-filter vs post-filter) başarımı etkiler. Üretimde: 1 milyon vektör için pgvector bile yeterli, 100M+ ölçeğinde Qdrant veya Milvus tercih edilir.',
      en: 'Two core building blocks of vector DBs: (1) Index — ANN (Approximate Nearest Neighbor) algorithm for fast high-dimensional search (HNSW, IVF, ScaNN); (2) Metadata — plain text/tags alongside the vector (source document, date, category). Important vector DBs: pgvector (PostgreSQL extension), Qdrant (Rust), Milvus (C++), Weaviate (Go), Chroma (Python), Pinecone (managed). Trade-offs: (a) HNSW most accurate but memory-hungry; (b) IVF memory-friendly but lower accuracy; (c) filtering — combined search with metadata (pre-filter vs post-filter) affects performance. In production: pgvector is enough for 1 million vectors, at 100M+ scale Qdrant or Milvus is preferred.',
    },
    advanced: {
      tr: 'Vektör veritabanı seçimi RAG performansını doğrudan etkiler. 2024-2025\'te öne çıkan trendler: (1) "Hybrid search" — çoğu modern vektör DB artık BM25 (sparse) + dense birleştirmesi yapar (Qdrant hybrid, Weaviate hybrid); (2) "Quantized index" — INT8 veya binary quantized index, belleği 4-32x düşürür ama %1-3 recall kaybı; (3) "Disk-based ANN" — belleğe sığmayan 1B+ vektörler için DiskANN/SPANN; (4) "Metadata filtering" — Milvus 2.4 ve Qdrant 1.10+, bitmap index ile hızlı metadata filtreleme. Üretim notları: (a) RAG için vektör boyutu 768-1024 iyi bir denge, 3072 (OpenAI text-embedding-3-large) pahalı ama daha doğru; (b) re-ranking her zaman post-retrieval adımı olarak yapılmalı; (c) "freshness" — yeni dokümanlar eklendikçe index güncellenmeli, vektör DB seçiminde "incremental indexing" desteği önemli. Atlas açısından: RAG destekli uygulamalar (Open WebUI, AnythingLLM) pgvector, Chroma veya Qdrant kullanır; bazıları kendi içlerinde basit bir vector store ile gelir.',
      en: 'Vector database choice directly impacts RAG performance. Trends in 2024-2025: (1) "Hybrid search" — most modern vector DBs now combine BM25 (sparse) + dense (Qdrant hybrid, Weaviate hybrid); (2) "Quantized index" — INT8 or binary quantized index cuts memory 4-32x with 1-3% recall loss; (3) "Disk-based ANN" — DiskANN/SPANN for 1B+ vectors that don\'t fit in memory; (4) "Metadata filtering" — Milvus 2.4 and Qdrant 1.10+ with fast metadata filtering via bitmap index. Production notes: (a) for RAG, vector size 768-1024 is a good balance, 3072 (OpenAI text-embedding-3-large) is expensive but more accurate; (b) re-ranking should always be a post-retrieval step; (c) "freshness" — index should be updated as new documents are added, "incremental indexing" support is important when choosing a vector DB. In the Atlas, RAG-supporting applications (Open WebUI, AnythingLLM) use pgvector, Chroma, or Qdrant; some come with a simple in-house vector store.',
    },
    visual: 'embedding',
    relatedConcepts: ['embedding', 'rag', 'function-calling'],
    relatedSolutions: ['open-webui', 'anythingllm', 'openvino-genai', 'onnx-runtime-genai'],
    category: 'app',
  },
  {
    slug: 'openai-compatible-api',
    name: { tr: 'OpenAI-Compatible API', en: 'OpenAI-Compatible API' },
    short: {
      tr: 'OpenAI\'ın REST API şemasını taklit eden, böylece aynı istemci kütüphanesiyle erişilebilen LLM uç noktaları.',
      en: 'LLM endpoints that mimic OpenAI\'s REST API schema, accessible with the same client libraries.',
    },
    beginner: {
      tr: 'Bir USB-C şarj aleti tüm yeni telefonları şarj eder; çünkü herkes aynı standarda uyar. OpenAI-compatible API, LLM dünyasının USB-C\'sidir: OpenAI\'ın "/v1/chat/completions" uç noktasını taklit eden herhangi bir servis (vLLM, Ollama, LM Studio, LiteLLM), aynı OpenAI Python kütüphanesiyle çağrılabilir. "from openai import OpenAI; client = OpenAI(base_url=\'http://localhost:8000/v1\')" yazıp Ollama\'dan Llama 3 çalıştırabilirsin — kodun geri kalanı değişmez.',
      en: 'A USB-C charger charges all new phones; because everyone follows the same standard. The OpenAI-compatible API is the LLM world\'s USB-C: any service that mimics OpenAI\'s "/v1/chat/completions" endpoint (vLLM, Ollama, LM Studio, LiteLLM) can be called with the same OpenAI Python library. "from openai import OpenAI; client = OpenAI(base_url=\'http://localhost:8000/v1\')" and you can run Llama 3 from Ollama — the rest of your code doesn\'t change.',
    },
    intermediate: {
      tr: 'OpenAI API şeması, LLM servisleri için fiili standart haline geldi. Temel uç noktalar: (1) /v1/chat/completions — sohbet, (2) /v1/completions — eski metin tamamlama, (3) /v1/embeddings — embedding üretimi, (4) /v1/models — model listesi. Bu uç noktaları sunan tüm motorlar (vLLM, SGLang, Ollama, LM Studio, llama.cpp\'nin HTTP server\'ı) OpenAI Python SDK ile doğrudan çalışır. Avantajları: (a) lock-in yok — model veya sağlayıcı değiştirmek sadece base_url değiştirmek kadar kolay; (b) ekosistem — LangChain, LlamaIndex, Cursor, Continue.dev hep OpenAI API\'sini varsayar; (c) portföy çeşitliliği — aynı anda OpenAI, Anthropic, yerel Llama\'yı karışık kullanabilirsin (LiteLLM üzerinden).',
      en: 'The OpenAI API schema has become the de facto standard for LLM services. Core endpoints: (1) /v1/chat/completions — chat, (2) /v1/completions — legacy text completion, (3) /v1/embeddings — embedding generation, (4) /v1/models — model listing. All engines that expose these endpoints (vLLM, SGLang, Ollama, LM Studio, llama.cpp\'s HTTP server) work directly with the OpenAI Python SDK. Advantages: (a) no lock-in — switching model or provider is just changing base_url; (b) ecosystem — LangChain, LlamaIndex, Cursor, Continue.dev all assume OpenAI API; (c) portfolio diversity — you can mix OpenAI, Anthropic, and local Llama simultaneously (through LiteLLM).',
    },
    advanced: {
      tr: 'OpenAI-compatible API\'nin sınırları da var. Üç önemli nokta: (1) "feature drift" — OpenAI yeni özellik eklediğinde (tool_calls, structured outputs, vision, audio) açık kaynak motorlar gecikmeli takip eder; (2) "subtle differences" — temperature, top_p, logprobs gibi parametreler motorlar arasında farklı yorumlanabilir; (3) "streaming variations" — SSE delta\'larının format\'ı çoğunlukla aynıdır ama metadata eklemeleri farklıdır. Üretim stratejileri: (a) "API gateway" katmanı (LiteLLM, Kong AI Gateway) sağlayıcı farklılıklarını normalize eder, üst katman tek tip görür; (b) "function calling" OpenAI uyumlu motorlarda genellikle "tools" parametresiyle çalışır ama JSON şeması uyumu test edilmeli; (c) "vision" desteği OpenAI uyumlu çoğu motor için ayrı bir endpoint (örn. /v1/chat/completions\'a image_url geçirilir). Atlas açısından: OpenAI-compatible sunan tüm çözümler "lock-in yok" avantajını taşır; bu onları özellikle kurumsal senaryolarda değerli kılar.',
      en: 'The OpenAI-compatible API has its limits. Three important points: (1) "feature drift" — when OpenAI adds a new feature (tool_calls, structured outputs, vision, audio) open-source engines follow with a delay; (2) "subtle differences" — parameters like temperature, top_p, logprobs can be interpreted differently across engines; (3) "streaming variations" — SSE delta format is mostly the same but metadata additions differ. Production strategies: (a) an "API gateway" layer (LiteLLM, Kong AI Gateway) normalizes provider differences so the upper layer sees a uniform surface; (b) "function calling" in OpenAI-compatible engines usually works with the "tools" parameter but JSON schema conformance should be tested; (c) "vision" support in most OpenAI-compatible engines is a separate endpoint (e.g. pass image_url to /v1/chat/completions). In the Atlas, all solutions that expose OpenAI-compatible APIs carry the "no lock-in" advantage; this makes them especially valuable in enterprise scenarios.',
    },
    visual: 'pipeline',
    relatedConcepts: ['function-calling', 'agent', 'system-prompt', 'rag'],
    relatedSolutions: ['vllm', 'ollama', 'litellm-proxy', 'sglang'],
    category: 'app',
  },
]
