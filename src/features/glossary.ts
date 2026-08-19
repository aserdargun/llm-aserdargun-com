import type { Locale } from '@/types/atlas'

export interface GlossaryEntry {
  term: string
  tr: string
  en: string
  analogy: { tr: string; en: string }
}

/** Öğrenme sayfasındaki mini sözlük ve sayfa genelindeki tooltip'ler için tek kaynak. */
export const glossary: GlossaryEntry[] = [
  { term: 'Token', tr: 'Modelin okuduğu ve yazdığı en küçük birim; kabaca bir kelime parçası.', en: 'The smallest unit a model reads and writes; roughly a word piece.', analogy: { tr: 'Cümleleri harf harf değil, anlamlı parçalar halinde işler.', en: 'Processes sentences in meaningful chunks, not letter by letter.' } },
  { term: 'Çıkarım (Inference)', tr: 'Modeli çalıştırıp bir girdiden çıktı üretme işlemi.', en: 'Running the model to produce output from an input.', analogy: { tr: 'Öğrenciye soru sorup cevap almak.', en: 'Asking a student a question and getting an answer.' } },
  { term: 'Ağırlıklar (Weights)', tr: 'Modelin eğitim sırasında öğrendiği bilgi; dosyanın büyük kısmı budur.', en: 'The knowledge the model learned during training; most of the file is this.', analogy: { tr: 'Modelin hafızası ve notları.', en: 'The model’s memory and notes.' } },
  { term: 'KV Cache', tr: 'Modelin az önce ürettiklerini hatırladığı kısa süreli bellek.', en: 'The short-term memory where the model remembers what it just generated.', analogy: { tr: 'Cevabı yazarken başını unutmamak için tuttuğu not.', en: 'A note it keeps so it doesn’t forget the start while writing.' } },
  { term: 'Nicemleme (Quantization)', tr: 'Ağırlıkları daha düşük hassasiyete sıkıştırarak modeli küçültme.', en: 'Shrinking the model by compressing weights to lower precision.', analogy: { tr: 'Fotoğrafı kaliteyi çok bozmadan sıkıştırmak.', en: 'Compressing a photo without ruining it too much.' } },
  { term: 'Batching', tr: 'Birden çok isteği birlikte işleyerek donanımı verimli kullanma.', en: 'Processing multiple requests together to use hardware efficiently.', analogy: { tr: 'Otobüse tek tek değil, toplu binmek.', en: 'Boarding the bus as a group, not one by one.' } },
  { term: 'Prefill / Decode', tr: 'Soruyu okuma (prefill) ve cevabı yazma (decode) aşamaları.', en: 'The reading (prefill) and writing (decode) phases.', analogy: { tr: 'Önce soruyu okur, sonra cevabı yazar.', en: 'First read the question, then write the answer.' } },
  { term: 'GGUF', tr: 'Nicemlenmiş modeller için yaygın, taşınabilir dosya formatı.', en: 'A common, portable file format for quantized models.', analogy: { tr: 'Modelin taşınabilir dosya kutusu.', en: 'The model’s portable file box.' } },
  { term: 'OpenAI-uyumlu API', tr: 'Birçok aracın konuştuğu ortak istek/yanıt biçimi.', en: 'A common request/response format many tools speak.', analogy: { tr: 'Herkesin anladığı ortak bir dil.', en: 'A common language everyone understands.' } },
  { term: 'RAG', tr: 'Cevap vermeden önce belgelerden ilgili parçaları bulup kullanma.', en: 'Finding and using relevant document chunks before answering.', analogy: { tr: 'Sınavda cevap vermeden önce notlarına bakmak.', en: 'Checking your notes before answering in an exam.' } },
  { term: 'İnce ayar (Fine-tuning / LoRA)', tr: 'Genel modeli kendi verinle özelleştirme.', en: 'Customizing a general model with your own data.', analogy: { tr: 'Genel bilgiyi kendi dersine göre uyarlamak.', en: 'Adapting general knowledge to your own course.' } },
  { term: 'TTFT', tr: 'İlk token’a kadar geçen süre (Time To First Token).', en: 'Time to first token.', analogy: { tr: 'İlk kelimeyi duyana kadar geçen süre.', en: 'How long until you hear the first word.' } },
  { term: 'Gecikme / Verim', tr: 'Tek isteğin süresi (gecikme) ve birim zamanda işlenen iş (verim).', en: 'Time per request (latency) and work per unit time (throughput).', analogy: { tr: 'Tek siparişin hızı / saatte kaç sipariş.', en: 'Speed of one order / orders per hour.' } },
]

/** Çözüm profillerindeki uyumluluk alanları için kısa, benzetmeli açıklamalar. */
export const fieldTips: Record<string, { tr: string; en: string }> = {
  category: { tr: 'Aracın ait olduğu mimari katman.', en: 'The architectural layer the tool belongs to.' },
  hardware: { tr: 'Bu aracın modeli çalıştırabildiği işlemci ve GPU türleri.', en: 'The CPU and GPU types this tool can run the model on.' },
  backend: { tr: 'Modeli gerçekten yürüten alt motorlar.', en: 'The underlying engines that actually execute the model.' },
  format: { tr: 'Modelin saklandığı dosya biçimleri.', en: 'The file formats the model is stored in.' },
  protocol: { tr: 'Uygulamanın bu araçla konuştuğu arayüzler.', en: 'The interfaces your app uses to talk to this tool.' },
  scope: { tr: 'Bu aracın çalıştırılabildiği ortamlar.', en: 'The environments where this tool can run.' },
  license: { tr: 'Bu aracı kullanma ve dağıtma koşulları.', en: 'The terms for using and distributing this tool.' },
  status: { tr: 'Projenin ne kadar olgun ve aktif olduğu.', en: 'How mature and active the project is.' },
}

/** Metodoloji sayfasındaki performans metrikleri için benzetmeli açıklamalar. */
export const metricTips: Record<string, { tr: string; en: string }> = {
  'TTFT': { tr: 'İlk kelimeyi duyana kadar geçen süre.', en: 'How long until you hear the first word.' },
  'TPOT / ITL': { tr: 'Kelimeler arasındaki bekleme; akışın ne kadar akıcı olduğu.', en: 'The pause between words; how smoothly it flows.' },
  'Output tokens/s': { tr: 'Saniyede kaç kelime ürettiği.', en: 'How many words it produces per second.' },
  'Requests/s': { tr: 'Saniyede kaç soruya cevap verdiği.', en: 'How many questions it answers per second.' },
  'End-to-end latency': { tr: 'Soruyu sorduğun andan cevabı tam aldığın ana kadar geçen süre.', en: 'From asking to receiving the full answer.' },
  'SLO-constrained goodput': { tr: 'Hız hedefini tutturan yararlı iş miktarı.', en: 'Useful work that meets a speed target.' },
  'Memory': { tr: 'Modelin ve çalışma alanının kapladığı bellek.', en: 'Memory used by the model and its workspace.' },
  'Energy': { tr: 'Her cevap için harcanan enerji.', en: 'Energy spent per answer.' },
}

export const fieldTip = (key: string, locale: Locale) => fieldTips[key]?.[locale] ?? ''
export const metricTip = (key: string, locale: Locale) => metricTips[key]?.[locale] ?? ''
