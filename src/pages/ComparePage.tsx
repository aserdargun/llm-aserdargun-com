import { AlertTriangle, Check, Copy, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/StatusBadge'
import { categories } from '@/data/categories'
import { solutions } from '@/data/solutions'
import { selectionsCrossCategories } from '@/features/compare/compare'
import { useCompareSelection } from '@/features/compare/useCompareSelection'
import { pick, useLocale } from '@/i18n/copy'
import type { Solution } from '@/types/atlas'

type Row = { label: [string, string]; value: (solution: Solution) => string }
const rows: Row[] = [
  { label: ['Temel rol', 'Primary role'], value: (item) => item.summary.en },
  { label: ['İdeal kullanım', 'Ideal use'], value: (item) => item.idealFor.en.join(' · ') },
  { label: ['Donanım', 'Hardware'], value: (item) => item.hardware.join(' · ') },
  { label: ['Çalıştırma arka ucu', 'Execution backend'], value: (item) => item.executionBackends.join(' · ') },
  { label: ['Model formatı', 'Model format'], value: (item) => item.modelFormats.join(' · ') },
  { label: ['API protokolü', 'API protocol'], value: (item) => item.apiProtocols.join(' · ') },
  { label: ['Dağıtım kapsamı', 'Deployment scope'], value: (item) => item.deploymentScopes.join(' · ') },
  { label: ['Proje durumu', 'Project status'], value: (item) => item.projectStatus },
  { label: ['Lisans', 'License'], value: (item) => item.license },
  { label: ['Son doğrulama', 'Last verified'], value: (item) => item.lastVerified },
]

export function ComparePage() {
  const locale = useLocale()
  const compare = useCompareSelection()
  const [diffOnly, setDiffOnly] = useState(false)
  const [copied, setCopied] = useState(false)
  const selected = compare.selected.map((slug) => solutions.find((item) => item.slug === slug)!).filter(Boolean)
  const cross = selectionsCrossCategories(compare.selected, solutions)
  const visibleRows = diffOnly ? rows.filter((row) => new Set(selected.map(row.value)).size > 1) : rows
  const copyLink = async () => { if (navigator.clipboard) await navigator.clipboard.writeText(window.location.href); setCopied(true) }
  return <div className="shell page-shell compare-page">
    <div className="page-heading compare-heading"><div><h1>{pick(locale, 'Çözümleri karşılaştırın', 'Compare solutions')}</h1><p>{pick(locale, 'Aynı katmandaki araçları karşılaştırın; farklı katmanları birlikte incelerken mimari rolü gözden kaçırmayın.', 'Compare tools within the same layer; keep architectural role in view when examining different layers together.')}</p></div><Link className="button secondary" to={`/${locale}/explore?compare=${compare.selected.join(',')}`}><Plus size={18} />{pick(locale, 'Çözüm ekle (en fazla 4)', 'Add solution (up to 4)')}</Link></div>
    {compare.invalid.length > 0 && <div className="notice" role="status">{pick(locale, 'Bilinmeyen seçimler yok sayıldı:', 'Unknown selections were ignored:')} {compare.invalid.join(', ')}</div>}
    {cross && <div className="layer-warning" role="alert"><AlertTriangle /><span>{pick(locale, 'Farklı mimari katmanları karşılaştırıyorsunuz. Bu araçlar birbirinin doğrudan alternatifi olmayabilir.', 'You are comparing different architectural layers. These tools may not be direct alternatives.')}</span></div>}
    {selected.length === 0 ? <div className="compare-empty"><h2>{pick(locale, 'Henüz çözüm seçilmedi', 'No solutions selected yet')}</h2><p>{pick(locale, 'Keşif ekranından en fazla dört çözüm ekleyin.', 'Add up to four solutions from Explore.')}</p><Link className="button primary" to={`/${locale}/explore`}>{pick(locale, 'Çözümleri keşfet', 'Explore solutions')}</Link></div> : <>
      <div className="compare-controls"><label><input type="checkbox" checked={diffOnly} onChange={(event) => setDiffOnly(event.target.checked)} />{pick(locale, 'Yalnızca farklılıkları vurgula', 'Highlight differences only')}</label><button className="button secondary" type="button" onClick={copyLink}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? pick(locale, 'Bağlantı kopyalandı', 'Link copied') : pick(locale, 'Paylaşılabilir bağlantıyı kopyala', 'Copy shareable link')}</button><button className="button ghost-danger" type="button" onClick={compare.clear}><Trash2 size={17} />{pick(locale, 'Seçimi temizle', 'Clear selection')}</button></div>
      <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th aria-label={pick(locale, 'Karşılaştırma boyutu', 'Comparison dimension')} />{selected.map((item) => { const category = categories.find(({ id }) => id === item.primaryCategory)!; return <th key={item.slug}><span className="mono">{item.primaryCategory} · {category.name[locale]}</span><strong>{item.name}</strong><button type="button" aria-label={`${pick(locale, 'Kaldır', 'Remove')} ${item.name}`} onClick={() => compare.remove(item.slug)}><X size={17} /></button></th>})}</tr></thead><tbody>{visibleRows.map((row) => <tr key={row.label[1]}><th>{locale === 'tr' ? row.label[0] : row.label[1]}</th>{selected.map((item) => <td key={item.slug}>{row.label[1] === 'Project status' ? <StatusBadge status={item.projectStatus} locale={locale} /> : row.label[1] === 'Primary role' ? item.summary[locale] : row.label[1] === 'Ideal use' ? item.idealFor[locale].join(' · ') : row.value(item)}</td>)}</tr>)}</tbody></table></div>
    </>}
  </div>
}
