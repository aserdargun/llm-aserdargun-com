import { ArrowDown, ArrowRight, BookOpen, Brain, Cpu, GraduationCap, HardDriveDownload, Lightbulb, Monitor, Network, Route, Server, Smartphone, Sparkles, Zap } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import { glossary } from '@/features/glossary'
import { layerColors } from '@/features/layers'
import { pick, useLocale } from '@/i18n/copy'
import type { CategoryId } from '@/types/atlas'

type LayerVisual = {
  id: CategoryId
  icon: typeof Cpu
  role: { tr: string; en: string }
  plain: { tr: string; en: string }
  analogy: { tr: string; en: string }
  examples: string[]
}

const layerVisuals: LayerVisual[] = [
  { id: 'INF', icon: Cpu, role: { tr: 'Çekirdek', en: 'Core' }, plain: { tr: 'Modelin beynini gerçekten çalıştıran motor.', en: 'The engine that actually runs the model’s brain.' }, analogy: { tr: 'Arabanın motoru: gücü üreten parça.', en: 'The car engine: the part that produces the power.' }, examples: ['TensorRT-LLM', 'llama.cpp', 'MLX-LM'] },
  { id: 'SRV', icon: Server, role: { tr: 'Sunum', en: 'Serving' }, plain: { tr: 'Aynı anda birçok kullanıcıya modeli servis eden katman.', en: 'The layer that serves the model to many users at once.' }, analogy: { tr: 'Restorandaki garson: siparişleri alır, mutfağa iletir.', en: 'The waiter: takes orders and relays them to the kitchen.' }, examples: ['vLLM', 'SGLang', 'Triton'] },
  { id: 'RUN', icon: HardDriveDownload, role: { tr: 'Yerel', en: 'Local' }, plain: { tr: 'Modeli tek komutla indirip yerelde çalıştıran yardımcı.', en: 'The helper that downloads and runs models locally with one command.' }, analogy: { tr: 'Uygulama mağazası: indir, kur, kullan.', en: 'An app store: download, install, use.' }, examples: ['Ollama', 'RamaLama', 'Docker Model Runner'] },
  { id: 'APP', icon: Monitor, role: { tr: 'Arayüz', en: 'Interface' }, plain: { tr: 'Sohbet edip deney yaptığın grafik masaüstü uygulaması.', en: 'The graphical desktop app where you chat and experiment.' }, analogy: { tr: 'Arabanın direksiyonu ve göstergeleri: kullanıcının dokunduğu yer.', en: 'The steering wheel and dashboard: what the user touches.' }, examples: ['LM Studio', 'Jan', 'GPT4All'] },
  { id: 'DST', icon: Network, role: { tr: 'Ölçek', en: 'Scale' }, plain: { tr: 'Modeli birçok makineye yayıp ölçekleyen orkestra şefi.', en: 'The conductor that spreads the model across many machines.' }, analogy: { tr: 'Tek şefin yönetemediği dev bir orkestrayı koordine etmek.', en: 'Coordinating a huge orchestra one conductor can’t manage alone.' }, examples: ['NVIDIA Dynamo', 'KServe', 'Ray Serve'] },
  { id: 'GTW', icon: Route, role: { tr: 'Yönetişim', en: 'Governance' }, plain: { tr: 'Farklı model sağlayıcılarını tek kapıda toplayan trafik polisi.', en: 'The traffic cop that unifies many model providers behind one door.' }, analogy: { tr: 'Bina girişindeki danışma: herkesi doğru kata yönlendirir.', en: 'The front desk: routes everyone to the right floor.' }, examples: ['LiteLLM', 'Kong AI Gateway'] },
  { id: 'EDG', icon: Smartphone, role: { tr: 'Cihaz', en: 'Device' }, plain: { tr: 'Modeli telefonunda veya tarayıcında, veri cihazdan çıkmadan çalıştırır.', en: 'Runs the model on your phone or browser without data leaving the device.' }, analogy: { tr: 'Cebindeki mini kütüphane: internet gerekmeden cevap verir.', en: 'A mini library in your pocket: answers without the internet.' }, examples: ['WebLLM', 'llama.cpp (mobil)'] },
]

const journey = [
  { icon: Monitor, title: { tr: 'Sen sorarsın', en: 'You ask' }, body: { tr: 'LM Studio gibi bir masaüstü uygulamasında sorunu yazarsın.', en: 'You type your question in a desktop app like LM Studio.' }, layer: 'APP' },
  { icon: Route, title: { tr: 'Yönlendirilir', en: 'It is routed' }, body: { tr: 'Bir ağ geçidi isteği doğru modele veya sağlayıcıya yönlendirir (opsiyonel).', en: 'A gateway routes the request to the right model or provider (optional).' }, layer: 'GTW' },
  { icon: Server, title: { tr: 'Sunucu karşılar', en: 'The server receives it' }, body: { tr: 'vLLM gibi bir sunucu isteği alır ve benzer istekleri toplu işler.', en: 'A server like vLLM receives it and batches similar requests.' }, layer: 'SRV' },
  { icon: Cpu, title: { tr: 'Motor çalışır', en: 'The engine runs' }, body: { tr: 'TensorRT-LLM gibi bir motor modeli çalıştırıp token üretir.', en: 'An engine like TensorRT-LLM runs the model and generates tokens.' }, layer: 'INF' },
  { icon: Sparkles, title: { tr: 'Cevap döner', en: 'The answer returns' }, body: { tr: 'Üretilen tokenlar aynı yoldan geri akar ve ekranında belirir.', en: 'Generated tokens flow back the same path and appear on your screen.' }, layer: null },
]



export function LearnPage() {
  const locale = useLocale()
  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name[locale] ?? id
  return <div className="shell page-shell learn-page">
    <div className="page-heading"><div><h1>{pick(locale, 'LLM dünyasını 5 dakikada anla', 'Understand the LLM world in 5 minutes')}</h1><p>{pick(locale, 'Jargon yok, benzetmeler var. Model nedir, yedi katman ne işe yarar, bir soru sorduğunda neler olur — hepsi burada.', 'No jargon, just analogies. What a model is, what the seven layers do, and what happens when you ask a question — all here.')}</p></div></div>

    <section className="learn-basics" aria-labelledby="basics-title">
      <div className="learn-section-head"><GraduationCap /><div><span className="mono">01</span><h2 id="basics-title">{pick(locale, 'Üç temel kavram', 'Three core ideas')}</h2></div></div>
      <div className="basics-grid">
        <article><Brain /><h3>{pick(locale, 'Model', 'Model')}</h3><p>{pick(locale, 'Milyonlarca kitap okumuş bir öğrencinin beyni gibi: bilgiyi ağırlıklarında (weights) saklar.', 'Like the brain of a student who has read millions of books: it stores knowledge in its weights.')}</p></article>
        <article><Zap /><h3>{pick(locale, 'Çıkarım', 'Inference')}</h3><p>{pick(locale, 'O beyne soru sormak. Modeli çalıştırıp cevap üretme işlemine çıkarım denir.', 'Asking that brain a question. Running the model to produce an answer is called inference.')}</p></article>
        <article><BookOpen /><h3>{pick(locale, 'Token', 'Token')}</h3><p>{pick(locale, 'Modelin okuduğu ve yazdığı en küçük parça; kabaca bir kelime parçası.', 'The smallest piece a model reads and writes; roughly a word piece.')}</p></article>
      </div>
    </section>

    <section className="learn-layers" aria-labelledby="layers-title">
      <div className="learn-section-head"><Lightbulb /><div><span className="mono">02</span><h2 id="layers-title">{pick(locale, 'Yedi katman, yedi farklı iş', 'Seven layers, seven different jobs')}</h2><p>{pick(locale, 'Bu araçlar aynı işi yapmaz. Her katman farklı bir sorumluluk üstlenir — tıpkı bir restorandaki farklı roller gibi.', 'These tools don’t do the same job. Each layer takes a different responsibility — like different roles in a restaurant.')}</p></div></div>
      <div className="layer-stack">
        {layerVisuals.map((layer) => <article key={layer.id} className="stack-layer" style={{ '--layer-color': layerColors[layer.id] } as CSSProperties}><div className="stack-icon"><layer.icon size={22} /></div><div className="stack-body"><div className="stack-top"><span className="mono stack-code">{layer.id}</span><span className="stack-role">{layer.role[locale]}</span></div><h3>{categoryName(layer.id)}</h3><p>{layer.plain[locale]}</p><p className="stack-analogy"><Lightbulb size={14} />{layer.analogy[locale]}</p><div className="stack-examples">{layer.examples.map((name) => <span key={name} className="layer-chip">{name}</span>)}</div></div></article>)}
      </div>
    </section>

    <section className="learn-journey" aria-labelledby="journey-title">
      <div className="learn-section-head"><Route /><div><span className="mono">03</span><h2 id="journey-title">{pick(locale, 'Bir soru sorduğunda ne olur?', 'What happens when you ask a question?')}</h2></div></div>
      <ol className="journey-flow">
        {journey.map((step, index) => <li key={index} className="journey-step"><div className="journey-icon"><step.icon size={20} /></div><div><span className="mono journey-layer">{step.layer ? step.layer : pick(locale, 'SONUÇ', 'RESULT')}</span><h3>{step.title[locale]}</h3><p>{step.body[locale]}</p></div>{index < journey.length - 1 && <ArrowDown className="journey-arrow" size={20} />}</li>)}
      </ol>
    </section>

    <section className="learn-glossary" aria-labelledby="glossary-title">
      <div className="learn-section-head"><BookOpen /><div><span className="mono">04</span><h2 id="glossary-title">{pick(locale, 'Mini sözlük', 'Mini glossary')}</h2></div></div>
      <dl className="glossary-grid">
        {glossary.map((item) => <div key={item.term} className="glossary-item"><dt>{item.term}</dt><dd>{locale === 'tr' ? item.tr : item.en}</dd><dd className="glossary-analogy">{locale === 'tr' ? item.analogy.tr : item.analogy.en}</dd></div>)}
      </dl>
    </section>

    <section className="learn-next">
      <div><h2>{pick(locale, 'Sıradaki adım: kendi yığınını seç', 'Next step: choose your own stack')}</h2><p>{pick(locale, 'Beş soruluk rehber, senaryona uyan gerekçeli bir kısa liste üretir.', 'The five-question guide builds a justified shortlist for your scenario.')}</p></div>
      <Link className="button primary" to={`/${locale}/guide`}>{pick(locale, 'Seçim rehberine başla', 'Start the selection guide')}<ArrowRight size={18} /></Link>
    </section>
  </div>
}
