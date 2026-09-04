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
      tr: 'Çoğu modern LLM, BPE (Byte Pair Encoding) veya SentencePiece gibi alt-kelime tokenleştiriciler kullanır. Sık diziler tek token olabilirken nadir sözcükler birden çok parçaya ayrılır. Token sayısı bağlam penceresini, maliyeti ve gecikmeyi doğrudan etkiler. Türkçe gibi sondan eklemeli diller bazı tokenleştiricilerde aynı anlamdaki İngilizce metinden daha çok tokene ayrılabilir; oran modelin gerçek tokenleştiricisiyle ölçülmelidir.',
      en: 'Most modern LLMs use subword tokenizers such as BPE or SentencePiece. Frequent sequences may become one token while rare words split into several pieces. Token count directly affects context capacity, cost, and latency. Agglutinative languages such as Turkish can use more tokens than equivalent English text with some tokenizers; the ratio must be measured with the model’s actual tokenizer.',
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
      tr: 'İlan edilen bağlam penceresi, modelin o uzunluğun tamamını aynı doğrulukla kullanabildiği anlamına gelmez. Uzun bağlam kalitesi görev ve değerlendirme yöntemine göre değişir; tek bir needle-in-a-haystack sonucu yeterli değildir. Üretimde hem ilgili bilgiye erişim başarısı hem de KV önbelleğinin bağlamla doğrusal büyüyen bellek maliyeti, hedef istek dağılımında ölçülmelidir.',
      en: 'An advertised context window does not mean the model uses every position at equal quality. Long-context behavior varies by task and evaluation method, and one needle-in-a-haystack result is insufficient. In production, measure both retrieval of relevant information and the KV-cache memory cost that grows linearly with context on the target request distribution.',
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
      tr: 'Modern dikkat varyasyonları modelin bellek ve sunum profilini değiştirir. MQA tek K/V başlığı paylaşır; GQA ise birden çok sorgu başlığını daha az K/V grubuna bağlayarak MHA ile MQA arasında denge kurar. FlashAttention dikkat hesabını bloklayarak ara matrisi bellekte bütünüyle oluşturmadan bellek trafiğini azaltır. Etki; model mimarisi, dizi uzunluğu, çekirdek sürümü ve donanımla birlikte ölçülmelidir.',
      en: 'Modern attention variants change a model’s memory and serving profile. MQA shares one K/V head, while GQA maps multiple query heads to fewer K/V groups as a compromise between MHA and MQA. FlashAttention tiles the calculation to reduce memory traffic without materializing the full intermediate attention matrix. Impact must be measured with the model architecture, sequence length, kernel release, and hardware.',
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
      tr: 'Üretim prompt tasarımı bir mühendislik döngüsüdür: girdiler sürümlenir, token bütçesi izlenir, yapılandırılmış çıktılar uygulama tarafında doğrulanır ve değişiklikler sabit bir değerlendirme kümesinde ölçülür. Bağlam, talimat ve çıktı için ayrılacak bütçe göreve göre belirlenir; evrensel bir yüzde yoktur. Model veya sürüm değiştiğinde aynı prompt farklı davranabileceği için regresyon değerlendirmeleri yeniden çalıştırılır.',
      en: 'Production prompt design is an engineering loop: inputs are versioned, token budgets are tracked, structured outputs are validated by the application, and changes are measured on a fixed evaluation set. Context, instruction, and output budgets are task-specific; there is no universal percentage. Because the same prompt can behave differently across models and releases, regression evaluations should run again after a change.',
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
      tr: 'Matematiksel olarak temperature, logitleri softmax öncesinde yeniden ölçekler: P(token) = softmax(logits / T). Düşük değerler dağılımı keskinleştirir, yüksek değerler düzleştirir. T=0 davranışı ve izin verilen aralık sağlayıcıya göre değişebilir. Bu yüzden başlangıç değerleri model, görev ve değerlendirme kümesinde denenmeli; API varsayılanları sürüm bazında kontrol edilmelidir.',
      en: 'Mathematically, temperature rescales logits before softmax: P(token) = softmax(logits / T). Lower values sharpen the distribution and higher values flatten it. The behavior of T=0 and the accepted range can vary by provider. Starting values should therefore be tested against the model, task, and evaluation set, with API defaults checked by release.',
    },
    advanced: {
      tr: 'Temperature; top-p, top-k, ceza parametreleri ve modelin kendi örnekleyicisiyle birlikte çalışır. Sabit seed ve düşük temperature tekrarlanabilirliği artırabilir ama farklı donanım, çekirdek veya sunucu sürümlerinde bit düzeyinde aynı sonucu garanti etmez. Üretimde örnekleme profilleri görev bazında sürümlenmeli, yapılandırılmış çıktı ayrıca şema ile doğrulanmalı ve değişiklikler regresyon kümesinde ölçülmelidir.',
      en: 'Temperature interacts with top-p, top-k, penalty parameters, and the model’s sampler. A fixed seed and low temperature can improve repeatability, but they do not guarantee bit-for-bit identical output across hardware, kernels, or server releases. In production, version sampling profiles per task, validate structured output against a schema, and measure changes on a regression set.',
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
      tr: 'Diyelim modelin sıradaki token için çok sayıda adayı var. Top-p=0.9, olasılığı en yüksek adayları toplam olasılık %90’a ulaşıncaya kadar tutup kalanları dışarıda bırakır. Kümede kaç token olacağı dağılıma ve temperature değerine göre her adımda değişir. Böylece top-p, temperature’a ek bir dinamik aday filtresi gibi çalışır.',
      en: 'Suppose the model has many candidates for the next token. Top-p=0.9 keeps the highest-probability candidates until their cumulative probability reaches 90%, excluding the rest. The number of retained tokens changes at every step with the distribution and temperature. Top-p therefore acts as a dynamic candidate filter.',
    },
    intermediate: {
      tr: 'Nucleus sampling (Holtzman et al., 2020) olasılık kütle fonksiyonunun (PMF) kuyruğunu keser. p=0.9 demek ki: olasılıkları büyükten küçüğe sırala, birikimli toplam p’ye ulaşana kadar al. Avantajı: dağılım keskin olduğunda (örn. "The" ardından "cat" neredeyse kesin) sadece 1-2 token seçer; dağılım düz olduğunda (kelime seçimi belirsiz) daha geniş bir kümeye izin verir. Bu yüzden Top-p tek başına, sabit Top-k’dan daha sağlıklıdır. Çoğu API (OpenAI, Anthropic) Top-p=1.0 varsayılanıyla gelir ve temperature ile birlikte kullanılmasını önerir.',
      en: 'Nucleus sampling (Holtzman et al., 2020) truncates the tail of the probability mass function (PMF). p=0.9 means: sort probabilities high to low, keep taking them until cumulative sum reaches p. The advantage: when the distribution is sharp (e.g. "The" is almost surely followed by "cat"), only 1-2 tokens are chosen; when the distribution is flat (word choice is uncertain), a wider set is allowed. That is why Top-p alone is healthier than a fixed Top-k. Most APIs (OpenAI, Anthropic) ship with Top-p=1.0 as default and recommend using it alongside temperature.',
    },
    advanced: {
      tr: 'Top-p ile temperature aynı olasılık dağılımını farklı biçimde etkiler; ikisini birlikte değiştirmek sonuç nedenini yorumlamayı zorlaştırabilir. Motorların min-p, top-k, top-p ve ceza sırası aynı olmayabilir. Yapılandırılmış çıktı güvenilirliği yalnızca örnekleme ayarına bırakılmamalı; sağlayıcının strict/grammar desteği ve uygulama tarafı şema doğrulaması birlikte kullanılmalıdır.',
      en: 'Top-p and temperature affect the same probability distribution in different ways, so changing both can make results harder to interpret. Engines may differ in how they order min-p, top-k, top-p, and penalties. Structured-output reliability should not rely on sampling settings alone; combine provider strict or grammar support with application-side schema validation.',
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
      tr: 'Bir sayfalık metni her seferinde baştan okumaktansa, satır satır ilerlerken önceki satırları "aklında tutmak" gibidir. Model token üretirken önceki tokenların Key ve Value bilgisini bellekte tutar. Böylece her adımda tüm geçmişi yeniden hesaplamak yerine yalnızca yeni tokenı önbelleğe ekler; bunun karşılığında bağlam ve eşzamanlılık arttıkça bellek kullanımı büyür.',
      en: 'It is like reading a page while keeping previous lines "in mind" instead of starting from the top every time. During generation, the model keeps Key and Value data for past tokens in memory. It adds only the new token instead of recomputing the full history at every step, trading computation for memory that grows with context and concurrency.',
    },
    intermediate: {
      tr: 'Self-attention’da her yeni token için Q yeni hesaplanır ama K ve V geçmiş tokenlardan gelir. KV cache bu K/V matrislerini katman başına saklar: her katman için (num_heads, seq_len, head_dim) boyutunda bir tensör. Formül: token başına bellek ≈ 2 × num_layers × num_kv_heads × head_dim × dtype_bytes. Llama 3 8B için 1K bağlamda yaklaşık 60 MB, 128K bağlamda ise 7-8 GB. Bu yüzden uzun bağlamlı çok sayıda eşzamanlı istek, GPU belleğinin en büyük tüketicisidir. PagedAttention, KV cache’i işletim sistemindeki "sayfalama" gibi yöneterek bu soruna çözüm getirir.',
      en: 'In self-attention, Q is computed fresh for each new token, but K and V come from past tokens. KV cache stores these K/V matrices per layer: a tensor of (num_heads, seq_len, head_dim) per layer. Formula: per-token memory ≈ 2 × num_layers × num_kv_heads × head_dim × dtype_bytes. For Llama 3 8B, about 60 MB at 1K context, 7-8 GB at 128K context. That is why many concurrent requests with long context are the biggest GPU memory consumer. PagedAttention addresses this by managing KV cache like paging in operating systems.',
    },
    advanced: {
      tr: 'KV cache yönetiminde üç eksen vardır: model mimarisi GQA/MQA ile K/V başlığı sayısını azaltabilir; daha düşük hassasiyetli KV biçimleri belleği azaltırken kaliteyi etkileyebilir; sayfalama ise değişken uzunluklu isteklerde parçalanma ve ön ayırma israfını sınırlar. Prefix paylaşımı ortak bağlamı yeniden kullanabilir, ayrıştırılmış sunum prefill ve decode havuzlarını ayırabilir. Kapasite; model, veri türü, blok boyutu, bağlam dağılımı ve eşzamanlılıkla ölçülmelidir.',
      en: 'KV-cache management has three axes: model architecture can reduce K/V head count through GQA or MQA; lower-precision KV formats can reduce memory while affecting quality; and paging limits fragmentation and preallocation waste for variable-length requests. Prefix sharing can reuse common context, while disaggregated serving can separate prefill and decode pools. Capacity must be measured against model, data type, block size, context distribution, and concurrency.',
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
      tr: 'Bir markette her müşterinin ürününü tek tek ayrı süreçte geçirmek yerine uygun sepetleri birlikte kasadan geçirmek gibidir. Bir istek GPU kapasitesini tek başına doldurmayabilir; batching boş kapasiteyi birden çok istekle kullanarak toplam verimi artırabilir. Fazla bekleme süresi ise ilk token gecikmesini yükseltebileceği için batch politikası hedef SLO’ya göre ayarlanır.',
      en: 'It is like sending compatible baskets through checkout together instead of running an isolated process for every customer. One request may not fill GPU capacity; batching can improve total throughput by using spare capacity across requests. Waiting too long to form a batch can raise time to first token, so the policy should follow the target SLO.',
    },
    intermediate: {
      tr: 'Üç batching modeli vardır: statik batching sabit bir grubu birlikte işler; dinamik batching kısa bir pencere boyunca istek toplar; continuous batching ise her decode iterasyonunda biten istekleri çıkarıp yenilerini ekler. Son yaklaşım kısa isteklerin uzun isteklerin tamamlanmasını beklemesini azaltır. vLLM, SGLang ve TensorRT-LLM gibi motorların destek ve varsayılanları sürüme göre kontrol edilmelidir.',
      en: 'Three batching models are common: static batching runs a fixed group together; dynamic batching collects requests over a short window; and continuous batching removes finished requests and admits new ones at each decode iteration. The latter reduces the time short requests wait for long ones. Support and defaults in engines such as vLLM, SGLang, and TensorRT-LLM should be checked by release.',
    },
    advanced: {
      tr: 'Continuous batching’de bile grup bileşimi önemlidir. İstem uzunlukları, decode ilerlemesi ve bellek baskısı zamanlama kararlarını etkiler. Prefix önbellekleme ortak istem bölümlerini yeniden kullanabilir; ayrıştırılmış sunum prefill ile decode’u bağımsız ölçekleyebilir; parçalı prefill ise uzun istemleri decode işleriyle iç içe geçirebilir. En iyi birleşim trafik dağılımı, TTFT/ITL hedefleri ve bellek sınırlarıyla benchmark edilmelidir.',
      en: 'Batch composition still matters under continuous batching. Prompt lengths, decode progress, and memory pressure all affect scheduling. Prefix caching can reuse shared prompt segments; disaggregated serving can scale prefill and decode independently; and chunked prefill can interleave long prompts with decode work. The best combination must be benchmarked against traffic distribution, TTFT/ITL targets, and memory limits.',
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
      tr: 'Streaming, Server-Sent Events (SSE) veya HTTP parça aktarımıyla uygulanabilir. Üretimde TTFT ilk parçanın kullanıcıya ulaşma süresini, TPOT sonraki tokenlar arasındaki süreyi izler. Hedefler ürün deneyimi, model ve ağ yoluna göre belirlenmelidir. İstemci bağlantısı koptuğunda sunucunun decode işini iptal edebilmesi özellikle uzun çıktılarda kaynak israfını sınırlar.',
      en: 'Streaming can use Server-Sent Events (SSE) or chunked HTTP transfer. In production, TTFT tracks time to the first visible chunk and TPOT tracks time between later tokens. Targets should follow the product experience, model, and network path. Cancelling decode after a client disconnects limits wasted work, especially for long outputs.',
    },
    advanced: {
      tr: 'Akış altyapısında backpressure, iptal, proxy tamponlama ve istemci yeniden bağlanma davranışı birlikte tasarlanır. Araç çağrısı veya yapılandırılmış delta gibi olaylar düz metin tokenlarından farklı olabilir. Üretimde TTFT, TPOT, kopan istemci sonrası boşa çalışma ve uçtan uca tamamlanma dağılımları izlenir; uyarı eşikleri evrensel değil, ürün SLO’suna göre tanımlanır.',
      en: 'Streaming infrastructure should design backpressure, cancellation, proxy buffering, and client reconnection together. Events such as tool calls or structured deltas may differ from plain-text tokens. In production, monitor TTFT, TPOT, wasted work after disconnects, and end-to-end completion distributions; alert thresholds are product SLOs, not universal constants.',
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
      tr: 'Büyük, bitişik KV alanlarını en yüksek dizi uzunluğuna göre önceden ayırmak parçalanma ve kullanılmayan kapasite yaratabilir. PagedAttention, işletim sistemlerindeki sanal bellek ve sayfa tablosu modelinden esinlenir: her isteğin blok tablosu vardır, fiziksel bloklar GPU belleğinde bitişik olmak zorunda değildir. Böylece israf azalır ve uyumlu uygulamalarda ortak önek blokları paylaşılabilir.',
      en: 'Preallocating large contiguous KV regions to the maximum sequence length can create fragmentation and unused capacity. PagedAttention borrows from virtual memory and page tables: each request has a block table, and physical blocks need not be contiguous in GPU memory. This reduces waste and can allow compatible implementations to share common-prefix blocks.',
    },
    advanced: {
      tr: 'PagedAttention, SOSP’23’te yayımlanan vLLM çalışmasının KV yönetimi yaklaşımıdır. Copy-on-write ile beam search, paralel örnekleme ve aynı istemden çoklu çıktı üretiminde ortak blokların paylaşılmasını sağlar. Benzer sayfalama fikirleri farklı sunum motorlarında farklı blok boyutları ve politikalarla uygulanır. Kazanç; bağlam dağılımı, blok boyutu, prefix paylaşımı, bellek baskısı ve zamanlayıcıyla birlikte ölçülmelidir.',
      en: 'PagedAttention is the KV-management approach introduced by the vLLM work published at SOSP’23. Copy-on-write lets beam search, parallel sampling, and multiple outputs from one prompt share common blocks. Related paging ideas appear in serving engines with different block sizes and policies. Gains must be measured with context distribution, block size, prefix sharing, memory pressure, and scheduler behavior.',
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
      tr: 'Bir editörün metni kelime kelime kontrol etmesi yerine bir asistanın birkaç öneri hazırladığını düşün. Editör bu önerileri toplu denetleyip kabul eder veya reddeder. Speculative decoding’de hızlı bir taslak yöntem sonraki tokenları önerir, hedef model ise bunları paralel doğrular. Kazanç; kabul oranı ile taslak ve doğrulama maliyetlerinin dengesine bağlıdır.',
      en: 'Imagine an assistant preparing several suggestions so an editor can validate them together instead of checking one word at a time. In speculative decoding, a fast draft method proposes upcoming tokens and the target model verifies them in parallel. Gains depend on acceptance rate and the balance between drafting and verification cost.',
    },
    intermediate: {
      tr: 'İki ana yaklaşım vardır: self-speculative yöntemler aynı modelin erken çıkış veya ek tahmin başlıklarını kullanır; model çifti yöntemleri ise ayrı bir taslak modelden öneri alır. Taslak yöntem K token önerir, hedef model bunları toplu doğrular. Kabul oranı düştüğünde ya da taslak maliyeti yükseldiğinde avantaj azalır. K değeri, taslak seçimi, bellek kullanımı ve hedef dağılıma uyum iş yükünde birlikte ayarlanmalıdır.',
      en: 'Two broad approaches are common: self-speculative methods use early exits or extra prediction heads from one model, while model-pair methods use a separate draft model. The draft proposes K tokens and the target verifies them in a batch. Advantage falls when acceptance drops or drafting cost rises. K, draft choice, memory use, and target-distribution alignment should be tuned together on the workload.',
    },
    advanced: {
      tr: 'Speculative decoding yöntemleri, doğru kabul/ret örneklemesi uygulandığında hedef dağılımı koruyabilir; her uygulama bu özelliği ayrıca doğrulamalıdır. Taslak model, çoklu tahmin başlıkları, özellik düzeyi taslak ve ağaç tabanlı öneri gibi farklı yollar vardır. Üretimde taslak maliyeti, kabul oranı, ek bellek, veri aktarımı ve kuyruk etkisi birlikte ölçülür; araç çağırma sınırlarında durumun nasıl sıfırlandığı da test edilir.',
      en: 'Speculative-decoding methods can preserve the target distribution when their accept/reject sampling is implemented correctly; each implementation must verify that property. Approaches include draft models, multiple prediction heads, feature-level drafting, and tree-based proposals. Production evaluation should combine draft cost, acceptance rate, extra memory, data transfer, and queue effects, and test how state resets around tool-call boundaries.',
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
      tr: 'Bir sınavda önce tüm soruları okursun (prefill — büyük ve paralel bir iş), sonra cevapları sırayla yazarsın (decode — tekrarlanan küçük adımlar). LLM’de de önce tüm istem işlenir, ardından yanıt token token üretilir. Bu iki faz donanımı farklı biçimde kullanır; ayrı kaynak havuzlarında çalıştırmak bazı trafik profillerinde bağımsız ölçekleme sağlar.',
      en: 'In an exam, you first read all the questions (prefill — a large, parallel job), then write answers sequentially (decode — repeated small steps). An LLM first processes the full prompt, then generates the answer token by token. The phases use hardware differently; separate resource pools can enable independent scaling for some traffic profiles.',
    },
    intermediate: {
      tr: 'Prefill tüm istem tokenlarını paralel işler ve çoğu iş yükünde hesaplama kaynaklarını yoğun kullanır. Decode her adımda yeni bir token üretirken ağırlıklar ile KV önbelleğini tekrar okur ve çoğu kez bellek bant genişliğine duyarlıdır. Aynı kaynak havuzunda bu farklı profiller birbirinin gecikmesini etkileyebilir. NVIDIA Dynamo ve llm-d gibi ayrıştırılmış sunum sistemleri fazları farklı çalışan havuzlarına yerleştirerek bağımsız ölçekleme ve zamanlama sağlar.',
      en: 'Prefill processes prompt tokens in parallel and is compute-intensive for many workloads. Decode produces one new token per step while rereading weights and KV cache, making it sensitive to memory bandwidth in many cases. In one resource pool these profiles can interfere with each other’s latency. Disaggregated serving systems such as NVIDIA Dynamo and llm-d place the phases in different worker pools for independent scaling and scheduling.',
    },
    advanced: {
      tr: 'Ayrıştırılmış sunum üç bileşeni koordine eder: prefill çalışanları istemi işler ve KV durumunu üretir; decode çalışanları token üretimini sürdürür; aktarım katmanı KV durumunu ağ veya yüksek hızlı bağlantı üzerinden taşır. Kazanç otomatik değildir: KV aktarım maliyeti, kuyruklama, yük dengeleme, hata kurtarma ve çalışan oranı uçtan uca ölçülmelidir. Doğru karşılaştırma aynı model, istem/çıktı dağılımı, eşzamanlılık ve gecikme SLO’su altında monolitik bir tabanla yapılır.',
      en: 'Disaggregated serving coordinates three components: prefill workers process prompts and produce KV state; decode workers continue token generation; and a transfer layer moves KV state over a network or high-speed interconnect. Gains are not automatic: KV-transfer cost, queuing, load balancing, failure recovery, and worker ratios must be measured end to end. A sound comparison uses the same model, prompt/output distribution, concurrency, and latency SLO against a monolithic baseline.',
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
      tr: 'Bir fotoğrafı daha düşük hassasiyetle kaydetmek gibidir: dosya küçülür, ancak ayrıntı kaybı olabilir. Nicemleme model ağırlıklarını daha az bitle temsil eder. FP16’dan INT8 veya INT4’e geçmek ham ağırlık depolamasını teorik olarak yarıya ya da dörtte bire düşürür; gerçek bellek, hız ve kalite etkisi format, çekirdek, kalibrasyon ve iş yüküne bağlıdır.',
      en: 'It is like saving a photo at lower precision: the file shrinks, but some detail can be lost. Quantization represents model weights with fewer bits. Moving raw weights from FP16 to INT8 or INT4 can theoretically halve or quarter their storage; real memory, speed, and quality effects depend on format, kernel, calibration, and workload.',
    },
    intermediate: {
      tr: 'İki ana yaklaşım vardır: post-training quantization eğitimden sonra GPTQ, AWQ veya GGUF gibi yöntemlerle uygulanır; quantization-aware training ise eğitim sırasında düşük hassasiyet etkisini simüle eder. Bit sayısı azaldıkça ham ağırlık belleği düşer, fakat ölçekler, grup boyutu, karma hassasiyet ve çalışma zamanı çekirdekleri gerçek sonucu değiştirir. Perplexity ve görev değerlendirmeleri her model ve dil için FP16 tabanıyla karşılaştırılmalıdır.',
      en: 'Two broad approaches are common: post-training quantization applies methods such as GPTQ, AWQ, or GGUF after training, while quantization-aware training simulates low precision during training. Fewer bits reduce raw weight storage, but scales, group size, mixed precision, and runtime kernels change the real result. Perplexity and task evaluations should be compared with an FP16 baseline for every model and language.',
    },
    advanced: {
      tr: 'Üretim nicemleme stratejisi; ağırlık, aktivasyon ve KV önbelleği hassasiyetlerini ayrı ayrı ele alır. GGUF, GPTQ, AWQ ve FP8 yollarının çalışma zamanı ile donanım desteği aynı değildir. Düşük bitli bir dosyanın daha küçük olması otomatik hızlanma anlamına gelmez; uygun çekirdek yoksa dönüştürme maliyeti baskın olabilir. Kalite, hedef dil ve görev kümesinde tam hassasiyetli tabanla karşılaştırılmalıdır.',
      en: 'A production quantization strategy treats weight, activation, and KV-cache precision separately. Runtime and hardware support differs across GGUF, GPTQ, AWQ, and FP8 paths. A smaller low-bit file does not automatically run faster; conversion overhead can dominate without a compatible kernel. Quality should be compared with a full-precision baseline on the target language and task set.',
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
      tr: 'Büyük ve güçlü bir modeli her yerde çalıştırmak pahalı olabilir. Distillation, öğretmen modelin çıktı veya ara temsillerini daha küçük bir öğrenci modele öğretir; deneyimli bir ustanın çırağına yöntem aktarması gibidir. Öğrenci daha düşük maliyetle çalışabilir, ancak korunan kalite göreve ve eğitim verisine göre değerlendirilmelidir.',
      en: 'Running a large, capable model everywhere can be expensive. Distillation teaches a smaller student from a teacher’s outputs or intermediate representations, like an experienced craftsperson passing methods to an apprentice. The student can run at lower cost, but retained quality must be evaluated by task and training data.',
    },
    intermediate: {
      tr: 'Distillation; öğretmenin olasılık dağılımını kullanan soft label, ara temsilleri eşleyen feature distillation veya öğretmen üretimi örneklerle eğitim gibi yollar kullanabilir. Öğrenci daha küçük olabilir, ancak öğretmen kalitesinin ne kadarını koruduğu görev bazında ölçülür. Öğretmen, veri veya hedef değiştiğinde değerlendirme ve gerekirse eğitim tekrarlanır.',
      en: 'Distillation can use soft labels from the teacher distribution, feature matching on intermediate representations, or training data generated by a teacher. The student may be smaller, but retained teacher quality must be measured per task. When the teacher, data, or target changes, evaluation and possibly training should run again.',
    },
    advanced: {
      tr: 'Distillation; self-distillation, çevrim içi öğretmen-öğrenci eğitimi ve aşamalı küçültme gibi stratejiler kullanabilir. Öğretmenin hataları ve yanlılıkları öğrenciye aktarılabileceği için öğretmen seçimi, veri filtreleme ve bağımsız değerlendirme kritiktir. Kayıp işlevi ile sıcaklık seçimi öğrencinin kapsama ve kesinlik dengesini değiştirir. Elde edilen model, hedef çalışma zamanı ve görev veri kümesinde yeniden doğrulanmalıdır.',
      en: 'Distillation can use self-distillation, online teacher/student training, or progressive reduction. Because teacher errors and biases can transfer to the student, teacher choice, data filtering, and independent evaluation are critical. Loss formulation and temperature alter the student’s coverage/precision trade-off. The resulting model must be verified again on the target runtime and task dataset.',
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
      tr: 'Bir arabanın motorunu tamamen değiştirmek yerine küçük bir eklentiyle davranışını ayarlamak gibidir. LoRA, temel model ağırlıklarını dondurup küçük adaptör matrisleri eğitir. Eğitilebilir parametre sayısı azalır; modelin tek bir GPU’ya sığıp sığmayacağı ise boyut, nicemleme, dizi uzunluğu ve optimizasyon durumuna bağlıdır.',
      en: 'It is like adjusting a car with a small add-on instead of replacing the whole engine. LoRA freezes base-model weights and trains small adapter matrices. This reduces trainable parameters; whether the model fits one GPU still depends on model size, quantization, sequence length, and optimizer state.',
    },
    intermediate: {
      tr: 'LoRA, ağırlık güncellemesini W\' = W + ΔW ve ΔW = A·B biçiminde düşük ranklı iki matrise ayırır; temel model ağırlıkları dondurulur. Rank, hedef modüller, optimizasyon durumu ve dizi uzunluğu eğitilebilir parametre ile bellek maliyetini belirler. QLoRA nicemlenmiş temel model üzerinde adaptör eğitir; DoRA ağırlık yönü ile büyüklüğünü ayırır; AdaLoRA rank bütçesini dinamik dağıtır. Kazançlar hedef model ve donanımda ölçülmelidir.',
      en: 'LoRA factors the weight update as W\' = W + ΔW with ΔW = A·B using two low-rank matrices while base weights stay frozen. Rank, target modules, optimizer state, and sequence length determine trainable-parameter and memory cost. QLoRA trains adapters over a quantized base; DoRA separates weight direction and magnitude; AdaLoRA allocates rank budget dynamically. Gains must be measured on the target model and hardware.',
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
      tr: 'Tam ince ayar tüm ağırlıkları günceller; LoRA/QLoRA gibi PEFT yöntemleri temel ağırlıkları dondurup daha küçük adaptörler eğitir; instruction tuning ise örnek talimat-cevap çiftleriyle davranışı yönlendirir. Gerekli bellek model, optimizasyon, hassasiyet ve dizi uzunluğuna bağlıdır. Veri kalitesi ile kapsama birlikte önemlidir; ayırılmış değerlendirme kümesi ve unutma testleriyle taban model karşılaştırılmalıdır.',
      en: 'Full fine-tuning updates all weights; PEFT methods such as LoRA or QLoRA freeze the base and train smaller adapters; instruction tuning uses example instruction-response pairs to shape behavior. Required memory depends on model, optimizer, precision, and sequence length. Data quality and coverage both matter, and the result should be compared with the base model on a held-out set and forgetting tests.',
    },
    advanced: {
      tr: 'Prompt, retrieval ve ince ayar birbirinin zorunlu sıralı basamakları değildir; farklı hata türlerini çözer. Bilgi güncelliği için retrieval, davranış ve biçem için ince ayar, görev tanımı için prompt daha uygun olabilir. Continued pre-training alan dilini güçlendirebilir; SFT ise örnek davranış üzerinden yönlendirir. Veri izinleri, ayırılmış değerlendirme kümesi, unutma testleri, eğitim belleği ve hedef sunum formatı planın birlikte parçalarıdır.',
      en: 'Prompting, retrieval, and fine-tuning are not mandatory sequential steps; they solve different failure types. Retrieval may fit knowledge freshness, fine-tuning may fit behavior and style, and prompts may fit task definition. Continued pretraining can reinforce domain language, while SFT teaches example behavior. Data permissions, a held-out evaluation set, forgetting tests, training memory, and the target serving format should be planned together.',
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
      tr: 'Klasik RLHF akışında önce denetimli ince ayar, sonra insan tercihleriyle ödül modeli ve ardından PPO benzeri bir politika güncellemesi bulunabilir. DPO gibi doğrudan tercih yöntemleri açık bir ödül modeli olmadan çiftli tercih verisini optimize eder; GRPO gibi yöntemler farklı geri bildirim ve örnekleme düzenleri kullanır. Hangi yöntemin seçileceği veri, doğrulanabilir ödül, hesap bütçesi ve kararlılık gereksinimine bağlıdır.',
      en: 'A classic RLHF pipeline can use supervised fine-tuning, a reward model trained on human preferences, and then a PPO-style policy update. Direct preference methods such as DPO optimize paired preferences without an explicit reward model, while approaches such as GRPO use different feedback and sampling designs. The choice depends on data, verifiable rewards, compute budget, and stability requirements.',
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
      tr: 'Bir ağacın gereksiz dallarını kesmek gibi pruning, düşük katkılı ağırlık, dikkat başlığı veya katmanları kaldırır. Parametre ve depolama miktarı azalabilir; gerçek hızlanma için çalışma zamanının ortaya çıkan seyrekliği desteklemesi gerekir. Kalite etkisi model ve görev değerlendirmesiyle ölçülmelidir.',
      en: 'Like removing unnecessary branches from a tree, pruning removes low-contribution weights, attention heads, or layers. Parameter and storage count can fall, but actual speedup requires runtime support for the resulting sparsity. Quality impact must be measured by model and task.',
    },
    intermediate: {
      tr: 'Yapılandırılmamış budama tek tek ağırlıkları sıfırlar; yapılandırılmış budama nöron, kanal veya katmanları kaldırır; 2:4 gibi yarı yapılandırılmış desenler ise belirli donanım çekirdeklerini hedefler. Sıkıştırma oranı tek başına hızlanmayı göstermez: çalışma zamanı, veri türü ve donanım aynı seyrek deseni desteklemelidir. Kalite kaybı görev kümesinde ölçülür ve gerekirse yeniden eğitimle giderilir.',
      en: 'Unstructured pruning zeros individual weights; structured pruning removes neurons, channels, or layers; semi-structured patterns such as 2:4 target specific hardware kernels. Compression ratio alone does not prove speedup: runtime, data type, and hardware must support the same sparsity pattern. Quality loss is measured on the task set and may require retraining.',
    },
    advanced: {
      tr: 'Pruning, nicemleme ve distillation birlikte ya da ayrı uygulanabilir. SparseGPT ve Wanda gibi yöntemler ağırlık ve aktivasyon sinyallerinden budama kararı çıkarır; elde edilen seyrek yapı ancak uygun çekirdek ve donanım deseniyle hız kazandırır. Yapılandırılmamış, yapılandırılmış ve 2:4 yarı yapılandırılmış seyrekliğin çalışma zamanı desteği farklıdır. Sıkıştırma oranı, görev kalitesi, bellek ve uçtan uca gecikme birlikte raporlanmalıdır.',
      en: 'Pruning, quantization, and distillation can be applied together or separately. Methods such as SparseGPT and Wanda derive pruning decisions from weight and activation signals; the sparse result speeds execution only with a compatible kernel and hardware pattern. Runtime support differs for unstructured, structured, and 2:4 semi-structured sparsity. Compression ratio, task quality, memory, and end-to-end latency should be reported together.',
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
      tr: 'Modern CUDA yığını sürücü, toolkit, kütüphane ve uygulama çekirdeklerinden oluşur. Sürücü ile CUDA çalışma zamanı uyumu, GPU’nun compute capability değeri ve kullanılan hassasiyet hangi çekirdeklerin çalışacağını belirler. Tensor Core’lar desteklenen veri türlerinde matris işlemlerini hızlandırır; NCCL ve NVLink gibi bileşenler çoklu GPU iletişimini destekler, MIG ise desteklenen GPU’ları yalıtılmış dilimlere ayırabilir. Atlas’ta CUDA desteği, ilgili yürütme yolu için NVIDIA GPU gerektiğini belirtir.',
      en: 'The modern CUDA stack spans drivers, toolkit, libraries, and application kernels. Driver/runtime compatibility, GPU compute capability, and numeric precision determine which kernels can run. Tensor Cores accelerate matrix operations for supported data types; components such as NCCL and NVLink support multi-GPU communication, while MIG can partition supported GPUs into isolated slices. In the Atlas, CUDA support means that execution path requires an NVIDIA GPU.',
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
      tr: 'GPU genel amaçlı bir "fabrika" ise NPU, bu fabrikanın yapay zekâ işleri için ayrılmış özel bir bölümü gibidir. Telefon ve dizüstü bilgisayarlardaki NPU\'lar yüz tanıma, ses ve görüntü işleme gibi desteklenen görevleri düşük güçle çalıştırır. Bir dil modelinin NPU\'da çalışıp çalışamayacağı ise model boyutuna, nicemlemeye ve cihazın desteklediği operatörlere bağlıdır.',
      en: 'If a GPU is a general-purpose "factory", an NPU is a specialized section dedicated to AI work. NPUs in phones and laptops run supported tasks such as face recognition, speech, and image processing at low power. Whether a language model can run on an NPU depends on model size, quantization, and the operators supported by that device.',
    },
    intermediate: {
      tr: 'NPU\'lar veri akışı odaklı, belirli tensör işlemlerini enerji verimli çalıştırmak için tasarlanmış hızlandırıcılardır. LLM desteği tek bir TOPS sayısıyla anlaşılmaz: kullanılabilir bellek, veri aktarımı, dinamik şekiller ve operatör kapsamı birlikte belirleyicidir. OpenVINO GenAI ile ONNX Runtime GenAI farklı yürütme sağlayıcıları üzerinden bazı Intel ve Qualcomm NPU yolları sunar; destek matrisi model ve cihaz için ayrıca doğrulanmalıdır.',
      en: 'NPUs are dataflow-oriented accelerators designed to run supported tensor operations efficiently. LLM support cannot be inferred from one TOPS number: available memory, data movement, dynamic shapes, and operator coverage all matter. OpenVINO GenAI and ONNX Runtime GenAI expose selected Intel and Qualcomm NPU paths through different execution providers; the support matrix must be checked for each model and device.',
    },
    advanced: {
      tr: 'NPU ile üretim LLM çıkarımında üç sınır öne çıkar: (1) ağırlık ve KV önbelleği için kullanılabilir bellek; (2) attention ve örnekleme gibi operatörlerin yürütme sağlayıcısındaki kapsamı; (3) değişken bağlam uzunluklarında dinamik şekil desteği. Bu yüzden "NPU destekli" ifadesi tüm modelin NPU\'da çalıştığı anlamına gelmeyebilir; bazı işlemler CPU veya GPU\'ya geri düşebilir. MLX, Apple Silicon üzerinde esas olarak birleşik bellek ve GPU/Metal yolunu kullanır; Apple Neural Engine için genel amaçlı bir LLM yürütme arayüzü değildir.',
      en: 'Three constraints dominate production LLM inference on NPUs: (1) memory available for weights and KV cache; (2) execution-provider coverage for operators such as attention and sampling; and (3) dynamic-shape support for variable context lengths. "NPU supported" therefore does not necessarily mean the whole model runs on the NPU; some operations may fall back to CPU or GPU. MLX primarily uses unified memory and the GPU/Metal path on Apple Silicon; it is not a general-purpose LLM execution interface for the Apple Neural Engine.',
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
      tr: 'Mac çiplerinde CPU ve GPU\'nun aynı bellek havuzuna erişmesi; büyük yerel modellerde veri kopyalama ve kapasite planlamasını kolaylaştıran mimari.',
      en: 'An architecture where the CPU and GPU access one memory pool, simplifying data movement and capacity planning for large local models.',
    },
    beginner: {
      tr: 'Ayrık ekran kartlı bir bilgisayarda GPU belleği ile sistem belleği farklı havuzlardır. Apple Silicon\'da CPU ve GPU aynı birleşik belleğe erişir; bu, model ağırlıklarını iki havuz arasında kopyalama ihtiyacını azaltır ve daha büyük yerel modeller için esneklik sağlar. Yine de işletim sistemi, KV önbelleği ve çalışma alanı da bellek tükettiği için model dosyası boyutu toplam RAM\'e eşit seçilmemelidir.',
      en: 'On a computer with a discrete graphics card, GPU memory and system memory are separate pools. On Apple Silicon, the CPU and GPU access unified memory, reducing copies between pools and making larger local models more practical. The operating system, KV cache, and workspace still consume memory, so a model file should not be sized to equal total RAM.',
    },
    intermediate: {
      tr: 'Apple Silicon, birleşik bellek mimarisi kullanır. Metal GPU erişimini sağlar; MLX ise bu mimari için tasarlanmış bir dizi ve makine öğrenimi çerçevesidir. llama.cpp\'nin Metal arka ucu ile MLX-LM, Mac üzerinde yerel LLM çıkarımı için yaygın iki yoldur. Gerçek hız; çip, bellek bant genişliği, model mimarisi, nicemleme, bağlam uzunluğu ve üretim ayarlarıyla değişir; tek bir token/s sayısı cihaz sınıfını temsil etmez.',
      en: 'Apple Silicon uses a unified memory architecture. Metal provides GPU access, while MLX is an array and machine-learning framework designed for that architecture. llama.cpp\'s Metal backend and MLX-LM are two common paths for local LLM inference on Mac. Actual speed varies with chip, memory bandwidth, model architecture, quantization, context length, and generation settings; one tokens-per-second number does not represent a device class.',
    },
    advanced: {
      tr: 'Apple Silicon\'da kapasite planı yalnızca ağırlık boyutuna bakmaz: KV önbelleği bağlam ve eşzamanlılıkla büyür, geçici tensörler çalışma alanı ister, işletim sistemi de aynı havuzu kullanır. Birleşik bellek büyük tek kullanıcılı modelleri kolaylaştırabilir; yüksek eşzamanlılık, çok düğümlü eğitim ve veri merkezi ölçeğinde ise yazılım ekosistemi ile ağ topolojisi ayrı değerlendirilmelidir. MLX-LM hem üretim hem de LoRA ince ayar akışları sunar; uygunluk, hedef iş yükünde ölçülmelidir.',
      en: 'Capacity planning on Apple Silicon involves more than weight size: KV cache grows with context and concurrency, temporary tensors need workspace, and the operating system shares the same pool. Unified memory can simplify large single-user models; high concurrency, multi-node training, and data-center scale still require separate evaluation of software ecosystem and network topology. MLX-LM supports both generation and LoRA fine-tuning workflows; suitability should be measured on the target workload.',
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
      tr: 'WebGL\'den bir adım daha ileri olan WebGPU, tarayıcıdan modern GPU hesaplama özelliklerine erişim sağlar. Uyumlu ve yeterince küçük bir model indirildikten sonra çıkarım cihaz içinde çalışabilir; istemler uygulamanın kendi ağ davranışına bağlı olarak yerelde kalabilir. Model boyutu, tarayıcı sınırları ve cihaz belleği pratik kapasiteyi belirler.',
      en: 'A step beyond WebGL, WebGPU exposes modern GPU compute capabilities to the browser. After a compatible, suitably sized model is downloaded, inference can run on-device; prompts can remain local depending on the application\'s own network behavior. Model size, browser limits, and device memory determine practical capacity.',
    },
    intermediate: {
      tr: 'WebGPU; hesaplama gölgelendiricileri, açık işlem hatları ve Vulkan, Metal ya da Direct3D 12 benzeri modern bir yürütme modeli sunar. WebLLM ve MLC LLM, matris işlemlerini WebGPU üzerinden çalıştıran başlıca LLM yollarındandır. İlk açılışta model indirme ve gölgelendirici derleme maliyeti vardır; sonraki yüklemeler tarayıcı önbelleğinden yararlanabilir. Destek ve hız tarayıcı, işletim sistemi, GPU sürücüsü ve modele göre ölçülmelidir.',
      en: 'WebGPU provides compute shaders, explicit pipelines, and a modern execution model similar to Vulkan, Metal, or Direct3D 12. WebLLM and MLC LLM are prominent LLM paths that run matrix operations through WebGPU. First launch includes model-download and shader-compilation costs; later loads can benefit from browser caching. Support and speed must be measured for the browser, operating system, GPU driver, and model.',
    },
    advanced: {
      tr: 'WebGPU LLM çıkarımında üç sınır önemlidir: (1) JavaScript/WASM ile WGSL çekirdekleri arasındaki veri hareketi; (2) ilk açılıştaki gölgelendirici derleme ve model önbellekleme maliyeti; (3) tarayıcıların özellik ve bellek sınırlarındaki farklılıklar. Service Worker ve kalıcı önbellek çevrimdışı kullanımı destekleyebilir, fakat "cihaz üzerinde" çalışmak tek başına veri çıkmadığını veya mevzuata uyumu garanti etmez; uygulamanın ağ istekleri ayrıca denetlenmelidir. Atlas\'ta bu yol istemci ve uç çıkarımıdır, sunucu katmanı değildir.',
      en: 'Three limits matter for WebGPU LLM inference: (1) data movement between JavaScript/WASM and WGSL kernels; (2) first-run shader compilation and model-caching cost; and (3) differences in browser feature and memory limits. Service workers and persistent caches can support offline use, but running on-device alone does not guarantee that no data leaves the device or that an application is compliant; its network behavior must be audited separately. In the Atlas this is a client and edge inference path, not the server layer.',
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
      tr: 'ONNX ortak bir tensör grafik formatı, ONNX Runtime ise CUDA, DirectML, OpenVINO, TensorRT ve CoreML gibi yürütme sağlayıcıları kullanan çalışma zamanıdır. PyTorch dışa aktarımı ve QDQ nicemleme araçları taşınabilirliği destekler; ancak her operatör, dinamik şekil ve nicemleme yolu her sağlayıcıda bulunmaz. Dönüştürülen modelin doğruluğu ile sağlayıcı uyumluluğu ayrı ayrı doğrulanmalıdır.',
      en: 'ONNX is a common tensor-graph format, while ONNX Runtime uses execution providers such as CUDA, DirectML, OpenVINO, TensorRT, and CoreML. PyTorch export and QDQ quantization tooling support portability, but every provider does not implement every operator, dynamic shape, or quantization path. Validate converted-model correctness and provider compatibility separately.',
    },
    advanced: {
      tr: 'ONNX Runtime GenAI, üretken model döngüsünü ONNX Runtime yürütme sağlayıcılarıyla birleştiren önizleme API’sidir. Taşınabilirlik otomatik değildir: dönüştürme doğruluğu, model mimarisi, özel operatörler, dinamik şekiller ve nicemleme desteği her yürütme sağlayıcısında farklı olabilir. Aynı ONNX ailesinin CPU, GPU, NPU ve WebGPU yolları bulunabilir; ancak model ile sağlayıcının güncel destek matrisi ve doğruluk sonuçları dağıtımdan önce doğrulanmalıdır.',
      en: 'ONNX Runtime GenAI is a preview API that combines a generative-model loop with ONNX Runtime execution providers. Portability is not automatic: conversion accuracy, model architecture, custom operators, dynamic shapes, and quantization support can differ by provider. One ONNX family may have CPU, GPU, NPU, and WebGPU paths, but the current model/provider support matrix and correctness results must be verified before deployment.',
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
      tr: 'İleri RAG tasarımları sorgu yeniden yazma, çok aşamalı retrieval, yeniden sıralama ve düşük kaliteli sonuçlarda başka kaynaklara yönelme gibi adımlar ekleyebilir. Her adım yeni hata ve gecikme yüzeyi oluşturur. Parça boyutu, top-k, sparse/dense ağırlığı ve yeniden sıralama kararı hedef veri kümesinde retrieval değerlendirmesiyle seçilmelidir; yanıt doğruluğu tek başına hangi aşamanın bozuk olduğunu göstermez.',
      en: 'Advanced RAG designs can add query rewriting, multi-stage retrieval, reranking, and fallback to other sources when retrieval quality is low. Every step adds failure and latency surfaces. Chunk size, top-k, sparse/dense weighting, and reranking should be selected through retrieval evaluation on the target dataset; answer accuracy alone does not reveal which stage is failing.',
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
      tr: 'İleri fonksiyon çağırma tasarımında üç sorun öne çıkar: (1) modelin kayıtlı olmayan bir aracı seçmesi; (2) uzun araç zincirlerinde hata ve maliyetin büyümesi; (3) bağımsız çağrıların güvenli biçimde paralelleştirilmesi. Üretimde araçlar merkezî bir kayıtta şemalarıyla sürümlenir; girişler uygulama tarafında doğrulanır, yetki sınırları uygulanır ve sonuçlar izlenir. Strict veya yapılandırılmış çıktı kipleri şemaya uyumu güçlendirir, ancak yetkilendirme, iş kuralı doğrulaması ve hata yönetiminin yerini almaz.',
      en: 'Three problems dominate advanced function-calling design: (1) the model selecting an unregistered tool; (2) compounding failure and cost across long tool chains; and (3) safely parallelizing independent calls. In production, tools and their schemas are versioned in a central registry; inputs are validated by the application, authorization boundaries are enforced, and outcomes are monitored. Strict or structured-output modes improve schema adherence, but they do not replace authorization, business-rule validation, or error handling.',
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
      tr: 'Ajan mimarisinde model, araçlar ve durum yönetimi birlikte çalışır. ReAct veya planla-yürüt gibi kalıplar adımları düzenleyebilir; bellek konuşma durumu, veri deposu ya da dış sistemlerden gelebilir. Üretimde yineleme, süre ve maliyet sınırları konmalı; araç hataları ile kısmi sonuçlar ele alınmalı ve uçtan uca davranış sabit görev kümelerinde değerlendirilmelidir.',
      en: 'Agent architecture combines a model, tools, and state management. Patterns such as ReAct or plan-and-execute can organize steps, while memory may come from conversation state, a data store, or external systems. In production, bound iterations, time, and cost; handle tool failures and partial results; and evaluate end-to-end behavior on fixed task sets.',
    },
    advanced: {
      tr: 'İleri ajan tasarımı; araç kullanımı, kod yürütme ve çoklu ajan orkestrasyonu gibi kalıpları birleştirir. MCP benzeri protokoller araç ve veri kaynaklarına ortak bir bağlantı modeli sağlayabilir; ancak güvenilirlik protokolden değil uygulanan sözleşmelerden gelir. Üretimde her araç çağrısı gözlemlenmeli, yineleme ve maliyet sınırları konmalı, hassas eylemler insan onayına bağlanmalı ve en az ayrıcalık ilkesi uygulanmalıdır. Model sunucusunun yapılandırılmış çıktı desteği bu kontrol düzleminin yalnızca bir parçasıdır.',
      en: 'Advanced agent design combines patterns such as tool use, code execution, and multi-agent orchestration. Protocols such as MCP can provide a common connection model for tools and data sources, but reliability comes from the contracts enforced by the application. In production, every tool call should be observable, iteration and cost limits should be set, sensitive actions should require human approval, and least privilege should apply. Structured-output support in the model server is only one part of that control plane.',
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
      tr: 'Vektör veritabanı seçimi; veri hacmi, güncelleme sıklığı, gecikme hedefi, filtre yoğunluğu ve işletme modeline göre yapılmalıdır. Hibrit arama sparse ve dense sinyalleri birleştirebilir; nicemlenmiş ya da disk tabanlı indeksler bellek kullanımını düşürürken geri çağırım ve gecikme dengesi yaratır. Embedding boyutu veya yeniden sıralama için evrensel bir doğru yoktur: hedef veri kümesinde retrieval ölçümleriyle değerlendirme yapılmalı, belge silme ve güncelleme davranışı da sınanmalıdır.',
      en: 'Vector database selection should follow data volume, update frequency, latency target, filter intensity, and operating model. Hybrid search can combine sparse and dense signals; quantized or disk-based indexes reduce memory use while trading off recall and latency. There is no universal embedding size or reranking rule: evaluate retrieval on the target dataset, including document deletion and update behavior.',
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
      tr: 'OpenAI uyumlu bir API, ortak uç nokta ve istek şekillerini taklit ederek aynı istemcinin farklı sunuculara bağlanmasını kolaylaştırır. Temel sohbet çağrıları taşınabilir olabilir; araç çağrısı, görsel, yapılandırılmış çıktı ve hata biçimleri sunucular arasında değişebileceği için uyumluluk ayrıca sınanmalıdır.',
      en: 'An OpenAI-compatible API mirrors common endpoints and request shapes so one client can connect to different servers. Basic chat calls may be portable, but tools, vision, structured output, and error formats can differ across servers and must be compatibility-tested.',
    },
    intermediate: {
      tr: 'OpenAI API biçimi, birçok yerel ve sunucu çözümünün desteklediği yaygın bir uyumluluk yüzeyidir. /v1/chat/completions, /v1/embeddings ve /v1/models gibi uçlar sık görülür; fakat uçların bulunması tam davranış eşitliği anlamına gelmez. Sağlayıcı değişimi base_url dışında kimlik doğrulama, model adı, özellik, hata ve akış sözleşmelerinde de uyarlama gerektirebilir.',
      en: 'The OpenAI API shape is a common compatibility surface supported by many local and server solutions. Endpoints such as /v1/chat/completions, /v1/embeddings, and /v1/models are widespread, but their presence does not imply identical behavior. Switching providers may require changes beyond base_url, including authentication, model names, features, errors, and streaming contracts.',
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
