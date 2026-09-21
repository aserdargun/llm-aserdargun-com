import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { pick, useLocale } from '@/i18n/copy'

export function PortfolioLearning() {
  const locale = useLocale()
  return <section className="portfolio-learning" aria-labelledby="portfolio-title">
    <div className="section-heading"><h2 id="portfolio-title">{pick(locale, 'Öğrenme sisteminde devam et', 'Continue through the learning system')}</h2></div>
    <p>{pick(locale, 'LLM Atlas, aserdargun.com öğrenme sisteminin çalışma zamanı ve sunum rehberidir. İlgili alanlara aşağıdaki bağlantılarla geçebilirsin.', 'LLM Atlas is the runtime and serving guide in the aserdargun.com learning system. Continue into related subjects through these links.')}</p>
    <div className="portfolio-learning__grid">{portfolio.routes.map((route) => <a key={route.code} href={route.href} target="_blank" rel="noopener noreferrer">
      <span className="mono">{route.code.toUpperCase()} <ArrowUpRight size={16} aria-hidden="true" /></span>
      <h3>{route.title[locale]}</h3><p>{route.description[locale]}</p>
    </a>)}</div>
    <a className="text-link" href={portfolio.source}>{pick(locale, 'Tüm öğrenme haritası · aserdargun.com', 'Full learning map · aserdargun.com')} <ArrowUpRight size={16} aria-hidden="true" /></a>
  </section>
}
