import { ArrowDown, ArrowRight, Check, CircleDot, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CategoryStrip } from '@/components/CategoryStrip'
import { categories } from '@/data/categories'
import { solutions } from '@/data/solutions'
import { pick, useLocale } from '@/i18n/copy'

export function HomePage() {
  const locale = useLocale()
  const signals = [
    [pick(locale, 'Agentic oturumlar', 'Agentic sessions'), pick(locale, 'Uzun yaşayan durum ve araç çağrıları', 'Long-lived state and tool calls')],
    [pick(locale, 'Uzun bağlam', 'Long context'), pick(locale, 'Bellek ve ön-doldurma maliyeti', 'Memory and prefill cost')],
    ['Prefill / Decode', pick(locale, 'Ayrıştırılmış yürütme yolları', 'Disaggregated execution paths')],
    ['KV cache', pick(locale, 'Bilinçli yönlendirme ve katmanlama', 'Aware routing and tiering')],
    ['MoE', pick(locale, 'Uzman paralelliği ve yük dengesi', 'Expert parallelism and load balance')],
    [pick(locale, 'Heterojen hızlandırıcılar', 'Heterogeneous accelerators'), pick(locale, 'GPU, TPU, NPU ve cihaz hedefleri', 'GPU, TPU, NPU, and device targets')],
  ] as const
  const featured = ['ollama', 'vllm', 'nvidia-dynamo'].map((slug) => solutions.find((solution) => solution.slug === slug)!).filter(Boolean)
  return <>
    <section className="home-hero">
      <div className="shell hero-kicker mono"><span>LLM RUNTIME &amp; SERVING</span><span>{pick(locale, 'ALAN REHBERİ · 2026', 'FIELD GUIDE · 2026')}</span></div>
      <div className="shell hero-grid"><div className="hero-copy">
        <h1>{pick(locale, 'Tek pazar değil.', 'Not one market.')}<br />{pick(locale, 'Yedi mimari katman.', 'Seven architectural layers.')}</h1>
        <p>{pick(locale, 'Motorlardan sunuculara, yerel çalıştırıcılardan dağıtık platformlara: doğru karşılaştırma önce mimari rolü ayırır.', 'From engines to servers, local runners to distributed platforms: a useful comparison starts by separating architectural roles.')}</p>
        <div className="hero-actions"><a className="button primary" href="#layers-ledger">{pick(locale, 'Katmanları incele', 'Review the layers')}<ArrowDown size={17} /></a><Link className="button secondary" to={`/${locale}/guide`}>{pick(locale, 'Seçim rehberini aç', 'Open the selection guide')}<ArrowRight size={17} /></Link></div>
        <Link className="text-link hero-learn" to={`/${locale}/learn`}>{pick(locale, 'Önce temel bilgileri öğren', 'Learn the basics first')}<ArrowRight size={16} /></Link>
      </div><aside className="hero-evidence" aria-label={pick(locale, 'Atlas özeti', 'Atlas summary')}>
        <div><span className="mono">31</span><small>{pick(locale, 'doğrulanmış çözüm profili', 'verified solution profiles')}</small></div>
        <div><span className="mono">07</span><small>{pick(locale, 'ayrı mimari sorumluluk', 'distinct architectural roles')}</small></div>
        <div><span className="mono">01</span><small>{pick(locale, 'kaynak politikası', 'source policy')}</small></div>
        <Link to={`/${locale}/methodology`}>{pick(locale, 'Kanıt standardını gör', 'View the evidence standard')}<ExternalLink size={15} /></Link>
      </aside></div>
      <div className="shell hero-source mono"><span><CircleDot size={12} />{pick(locale, 'RESMİ BELGE VE DEPO KAYNAKLARI', 'OFFICIAL DOCUMENTATION AND REPOSITORIES')}</span><span>{pick(locale, 'SON DOĞRULAMA', 'LAST VERIFIED')} · 2026-08-12</span></div>
    </section>
    <section id="layers-ledger" className="shell layer-section" aria-labelledby="layers-title"><div className="architecture-grid"><div className="ledger-panel"><div className="ledger-heading"><span className="mono">01 · {pick(locale, 'MİMARİ DEFTER', 'ARCHITECTURE LEDGER')}</span><h2 id="layers-title" className="sr-only">{pick(locale, 'Önce sorumluluğu ayırın.', 'Separate responsibility first.')}</h2><p>{pick(locale, 'Rolü ve sınırı açın; doğrudan alternatifleri aynı satırda bulun.', 'Open the role and boundary; find direct alternatives in the same row.')}</p></div><CategoryStrip /></div><aside className="signals-panel" aria-labelledby="signals-title"><span className="mono">02 · {pick(locale, '2026 SİNYALLERİ', '2026 SIGNALS')}</span><h2 id="signals-title">{pick(locale, 'Seçim neye göre değişti?', 'What changed the decision?')}</h2><div className="signal-list">{signals.map(([title, detail]) => <div key={title}><Check size={15} /><strong>{title}</strong><span>{detail}</span></div>)}</div></aside></div></section>
    <section className="shell evidence-section"><div className="section-intro"><span className="mono">03 · {pick(locale, 'KARŞILAŞTIRMA VE KANIT', 'COMPARISON AND EVIDENCE')}</span><div><h2>{pick(locale, 'Aynı soruyu, doğru katmanda sorun.', 'Ask the same question in the right layer.')}</h2><p>{pick(locale, 'Her profil rol, donanım, dağıtım kapsamı ve resmi kaynak iziyle birlikte okunur.', 'Every profile is read with its role, hardware, deployment scope, and official-source trail.')}</p></div></div><div className="evidence-table-wrap"><table className="evidence-table"><thead><tr><th>{pick(locale, 'ÇÖZÜM', 'SOLUTION')}</th><th>{pick(locale, 'KATMAN', 'LAYER')}</th><th>{pick(locale, 'DONANIM', 'HARDWARE')}</th><th>{pick(locale, 'DAĞITIM', 'DEPLOYMENT')}</th><th>{pick(locale, 'KANIT', 'EVIDENCE')}</th></tr></thead><tbody>{featured.map((solution) => { const category = categories.find((item) => item.id === solution.primaryCategory)!; return <tr key={solution.slug}><th><Link to={`/${locale}/solutions/${solution.slug}`}>{solution.name}<ArrowRight size={15} /></Link></th><td><span className="mono">{solution.primaryCategory}</span> {category.name[locale]}</td><td>{solution.hardware.slice(0, 2).join(' · ')}</td><td>{solution.deploymentScopes.slice(0, 3).join(' · ')}</td><td><span className="evidence-state"><CircleDot size={11} />{pick(locale, 'Resmi kaynak', 'Official source')}</span></td></tr> })}</tbody></table></div><div className="evidence-actions"><Link className="button secondary" to={`/${locale}/explore`}>{pick(locale, '31 kaydın tamamını keşfet', 'Explore all 31 records')}<ArrowRight size={17} /></Link><Link className="text-link" to={`/${locale}/methodology`}>{pick(locale, 'Metodolojiyi incele', 'Read the methodology')}</Link></div></section>
  </>
}
