import { ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { solutions } from '@/data/solutions'
import { pick, useLocale } from '@/i18n/copy'

export function CompareBar({ selected, remove, clear }: { selected: string[]; remove: (slug: string) => void; clear: () => void }) {
  const locale = useLocale()
  if (!selected.length) return null
  const names = selected.map((slug) => solutions.find((item) => item.slug === slug)!).filter(Boolean)
  return <aside className="compare-bar" aria-label={pick(locale, 'Karşılaştırma seçimi', 'Comparison selection')}>
    <div className="shell compare-bar-inner">
      <div className="compare-summary"><strong>{selected.length} {pick(locale, selected.length === 1 ? 'çözüm seçildi' : 'çözüm seçildi', selected.length === 1 ? 'solution selected' : 'solutions selected')}</strong><span>{pick(locale, 'En fazla 4 çözüm', 'Up to 4 solutions')}</span></div>
      <div className="compare-tokens">{names.map((item) => <button type="button" key={item.slug} onClick={() => remove(item.slug)} aria-label={`${pick(locale, 'Kaldır', 'Remove')} ${item.name}`}>{item.name}<X size={15} /></button>)}</div>
      <button className="text-button" type="button" onClick={clear}>{pick(locale, 'Temizle', 'Clear')}</button>
      <Link className="button primary" to={`/${locale}/compare?compare=${selected.join(',')}`}>{pick(locale, 'Karşılaştır', 'Compare')} {selected.length}<ArrowRight size={17} /></Link>
    </div>
  </aside>
}
