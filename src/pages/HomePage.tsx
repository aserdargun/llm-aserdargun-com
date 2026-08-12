import { ArrowRight, BookOpenCheck, Boxes, Braces, Cpu, Database, Laptop, Network, Route, Server, ShieldCheck, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CategoryStrip } from '@/components/CategoryStrip'
import { pick, useLocale } from '@/i18n/copy'

export function HomePage() {
  const locale = useLocale()
  const scenarios = [
    [Laptop, pick(locale, 'Mac ile yerel başla', 'Start locally on Mac'), pick(locale, 'Apple Silicon için yerel model yolları.', 'Local model paths for Apple Silicon.')],
    [Cpu, pick(locale, 'NVIDIA GPU', 'NVIDIA GPU'), pick(locale, 'Tek GPU’dan optimize üretime.', 'From one GPU to optimized production.')],
    [Server, pick(locale, 'Üretim API servisi', 'Production API'), pick(locale, 'Eşzamanlı, gözlemlenebilir sunum.', 'Concurrent, observable serving.')],
    [Boxes, 'Kubernetes', pick(locale, 'Taşınabilir ve ölçeklenebilir platform.', 'Portable, scalable platform.')],
    [Smartphone, pick(locale, 'Uç ve mobil', 'Edge & mobile'), pick(locale, 'Cihaz içinde gizlilik ve düşük gecikme.', 'On-device privacy and low latency.')],
  ] as const
  return <>
    <section className="home-hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <h1>{pick(locale, 'Doğru modeli, doğru katmanda çalıştırın.', 'Run the right model on the right layer.')}</h1>
          <p>{pick(locale, 'LLM çalıştırma ve sunma ekosistemini katmanlarına ayıran, kaynaklara dayalı bir alan rehberi.', 'A source-backed field guide that separates the LLM runtime and serving ecosystem into its architectural layers.')}</p>
          <div className="hero-actions"><Link className="button primary" to={`/${locale}/guide`}>{pick(locale, 'Yeni başlıyorum', 'I’m getting started')}<ArrowRight size={18} /></Link><Link className="button secondary" to={`/${locale}/explore`}>{pick(locale, 'Ne aradığımı biliyorum', 'I know what I’m looking for')}<ArrowRight size={18} /></Link></div>
        </div>
        <div className="layer-diagram" aria-hidden="true"><div><Cpu /></div><div><Server /></div><div><Braces /></div><div><Database /></div><div><Network /></div><div><Route /></div><div><Smartphone /></div></div>
      </div>
    </section>
    <section className="shell layer-section" aria-labelledby="layers-title"><div className="section-intro"><span className="mono">LLM RUNTIME &amp; SERVING</span><h2 id="layers-title">{pick(locale, 'Tek pazar değil, yedi mimari katman.', 'Not one market, but seven architectural layers.')}</h2></div><CategoryStrip /></section>
    <section className="home-rationale"><div className="shell rationale-grid"><div><h2>{pick(locale, 'Katmanlar neden önemli?', 'Why do the layers matter?')}</h2><p>{pick(locale, 'TensorRT-LLM, vLLM, Ollama ve LM Studio aynı işi yapmaz. Bir motoru masaüstü çalışma alanıyla yalnızca “hız” üzerinden sıralamak mimari sorumluluğu gizler.', 'TensorRT-LLM, vLLM, Ollama, and LM Studio do not do the same job. Ranking an engine against a desktop workspace by “speed” hides architectural responsibility.')}</p><ul className="check-list"><li>{pick(locale, 'Doğrudan alternatifleri doğru katmanda görün.', 'See direct alternatives within the right layer.')}</li><li>{pick(locale, 'Donanım, dağıtım ve API uyumunu birlikte tartın.', 'Weigh hardware, deployment, and API fit together.')}</li><li>{pick(locale, 'Her önemli iddiayı resmi kaynağına kadar izleyin.', 'Trace every material claim to an official source.')}</li></ul></div><div className="scenario-panel"><span className="mono">{pick(locale, 'SENARYO ROTALARI', 'SCENARIO ROUTES')}</span>{scenarios.map(([Icon, title, body]) => <Link key={title} to={`/${locale}/guide`}><Icon size={22} /><span><strong>{title}</strong><small>{body}</small></span><ArrowRight size={17} /></Link>)}</div></div></section>
    <section className="shell commitment"><div><ShieldCheck /><h2>{pick(locale, 'Kaynaklara dayalı yaklaşım', 'Source-backed by design')}</h2><p>{pick(locale, 'Kayıtlar resmi belgeler ve proje depolarıyla doğrulanır; son doğrulama tarihi görünürdür.', 'Records are verified against official documentation and repositories, with visible verification dates.')}</p></div><div><BookOpenCheck /><h2>{pick(locale, 'Evrensel hız sıralaması yok', 'No universal speed ranking')}</h2><p>{pick(locale, 'Performans; model, donanım, iş yükü, eşzamanlılık ve SLO ile birlikte anlam kazanır.', 'Performance only makes sense with model, hardware, workload, concurrency, and SLO context.')}</p></div><Link className="button secondary" to={`/${locale}/methodology`}>{pick(locale, 'Metodolojiyi incele', 'Read the methodology')}<ArrowRight size={17} /></Link></section>
  </>
}
