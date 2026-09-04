import { Gauge, Layers3, Scale, ShieldCheck } from 'lucide-react'
import { Term } from '@/components/Term'
import { categories } from '@/data/categories'
import { ATLAS_DATASET_REVIEWED_AT } from '@/data/atlas-meta'
import { metricTip } from '@/features/glossary'
import { pick, useLocale } from '@/i18n/copy'

const metrics = [
  ['TTFT', 'İlk token süresi', 'Time to first token'],
  ['TPOT / ITL', 'Token başına süre / tokenlar arası gecikme', 'Time per output token / inter-token latency'],
  ['Output tokens/s', 'Üretilen token hızı; istem ve batch bağlamıyla okunur', 'Generation rate, read with prompt and batch context'],
  ['Requests/s', 'Belirli eşzamanlılıkta tamamlanan istekler', 'Requests completed at a specified concurrency'],
  ['End-to-end latency', 'İstemden tamamlanmış yanıta toplam süre', 'Total time from request to completed response'],
  ['SLO-constrained goodput', 'Gecikme hedefini karşılayan yararlı iş hacmi', 'Useful throughput that meets a latency objective'],
  ['Memory', 'Ağırlık, KV önbellek ve çalışma alanı belleği', 'Weights, KV cache, and workspace memory'],
  ['Energy', 'İstek veya token başına enerji', 'Energy per request or token'],
] as const

export function MethodologyPage() {
  const locale = useLocale()
  return <div className="shell page-shell methodology-page">
    <div className="page-heading"><div><h1>{pick(locale, 'Metodoloji ve kaynak politikası', 'Methodology and source policy')}</h1><p>{pick(locale, 'Sınıflandırma sınırlarını, kanıt standardını ve performans dilini açık hâle getiriyoruz.', 'We make taxonomy boundaries, evidence standards, and performance language explicit.')}</p></div><span className="freshness mono">ATLAS · {ATLAS_DATASET_REVIEWED_AT}</span></div>
    <nav className="method-nav" aria-label={pick(locale, 'Metodoloji bölümleri', 'Methodology sections')}><a href="#taxonomy">01 {pick(locale, 'Taksonomi', 'Taxonomy')}</a><a href="#sources">02 {pick(locale, 'Kaynaklar', 'Sources')}</a><a href="#metrics">03 {pick(locale, 'Metrikler', 'Metrics')}</a><a href="#ranking">04 {pick(locale, 'Sıralama ilkesi', 'Ranking policy')}</a></nav>
    <section id="taxonomy" className="method-section"><div className="method-heading"><Layers3 /><div><span className="mono">01</span><h2>{pick(locale, 'Yedi katman, tek bir pazar değil', 'Seven layers, not one market')}</h2></div></div><p>{pick(locale, 'Her çözüm birincil sorumluluğuna göre tek katmana yerleştirilir. İkincil roller yetenek etiketleriyle gösterilir; aynı kayıt birden çok kez çoğaltılmaz.', 'Each solution is placed in one layer according to its primary responsibility. Secondary roles are represented through capability tags rather than duplicate records.')}</p><div className="taxonomy-list">{categories.map((category) => <article key={category.id}><span className="mono">{category.id}</span><div><h3>{category.name[locale]}</h3><p>{category.responsibility[locale]}</p><small><strong>{pick(locale, 'Sınır:', 'Boundary:')}</strong> {category.notFor[locale]}</small></div></article>)}</div></section>
    <section id="sources" className="method-section two-column-method"><div className="method-heading"><ShieldCheck /><div><span className="mono">02</span><h2>{pick(locale, 'Kaynak ve güncellik politikası', 'Source and freshness policy')}</h2></div></div><div><p>{pick(locale, 'Öncelik resmi dokümantasyon ve resmi proje depolarındadır. Önemli yetenek ve yaşam döngüsü iddiaları kaynak bağlantısıyla birlikte tutulur.', 'Official documentation and repositories are the priority. Material capability and lifecycle claims are stored with their supporting links.')}</p><ul><li>{pick(locale, 'Her kayıt son doğrulama tarihini taşır.', 'Every record carries a last-verified date.')}</li><li>{pick(locale, '180 günü aşan kayıtlar yeniden doğrulama ister.', 'Records older than 180 days require reverification.')}</li><li>{pick(locale, 'Satıcı karşılaştırmaları evrensel gerçek gibi genellenmez.', 'Vendor comparisons are not generalized as universal truth.')}</li></ul></div></section>
    <section id="metrics" className="method-section"><div className="method-heading"><Gauge /><div><span className="mono">03</span><h2>{pick(locale, 'Performans dilimiz', 'Our performance vocabulary')}</h2></div></div><div className="metrics-list">{metrics.map(([code, tr, en]) => <div key={code}><dt className="mono"><Term tip={metricTip(code, locale)}>{code}</Term></dt><dd>{locale === 'tr' ? tr : en}</dd></div>)}</div></section>
    <section id="ranking" className="ranking-section"><Scale /><div><span className="mono">04 · {pick(locale, 'İLKE', 'PRINCIPLE')}</span><h2>{pick(locale, 'Neden evrensel hız sıralaması yok?', 'Why there is no universal speed ranking')}</h2><p>{pick(locale, '“TensorRT-LLM > vLLM > SGLang > Ollama > LM Studio” gibi tek çizgili sıralamalar, farklı katmanları ve farklı amaçları aynı yarışa sokar. Sonuç; model, nicemleme, donanım, istem uzunluğu, çıktı uzunluğu, batch, eşzamanlılık ve SLO değiştiğinde değişir.', 'A single line such as “TensorRT-LLM > vLLM > SGLang > Ollama > LM Studio” puts different layers and purposes into one race. Results change with model, quantization, hardware, prompt length, output length, batch, concurrency, and SLO.')}</p><p>{pick(locale, 'Atlas bu nedenle doğrulanabilir nitel karşılaştırma sunar; ölçüm gerektiğinde senaryoya özgü deney tasarımını teşvik eder.', 'The atlas therefore offers verifiable qualitative comparison and encourages scenario-specific experiment design when measurement is needed.')}</p></div></section>
  </div>
}
