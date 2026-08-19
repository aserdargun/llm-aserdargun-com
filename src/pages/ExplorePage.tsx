import { Filter, Grid2X2, List, Search, SlidersHorizontal, X } from 'lucide-react'
import { useDeferredValue, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CompareBar } from '@/components/CompareBar'
import { EmptyState } from '@/components/EmptyState'
import { StatusBadge } from '@/components/StatusBadge'
import { Term } from '@/components/Term'
import { categories } from '@/data/categories'
import { solutions } from '@/data/solutions'
import { useCompareSelection } from '@/features/compare/useCompareSelection'
import { filterSolutions, filterKeys, type FilterKey } from '@/features/explore/filters'
import { useExploreFilters } from '@/features/explore/useExploreFilters'
import { fieldTip } from '@/features/glossary'
import { layerColors } from '@/features/layers'
import { pick, useLocale } from '@/i18n/copy'

const valuesFor: Record<FilterKey, string[]> = {
  category: categories.map(({ id }) => id),
  hardware: [...new Set(solutions.flatMap(({ hardware }) => hardware))].sort(),
  backend: [...new Set(solutions.flatMap(({ executionBackends }) => executionBackends))].sort(),
  format: [...new Set(solutions.flatMap(({ modelFormats }) => modelFormats))].sort(),
  protocol: [...new Set(solutions.flatMap(({ apiProtocols }) => apiProtocols))].sort(),
  scope: [...new Set(solutions.flatMap(({ deploymentScopes }) => deploymentScopes))].sort(),
  status: ['active', 'mature', 'preview', 'maintenance'],
}

export function ExplorePage() {
  const locale = useLocale()
  const { state, setQuery, setView, toggle, clear } = useExploreFilters()
  const compare = useCompareSelection()
  const [drawer, setDrawer] = useState(false)
  const mobileFilterButton = useRef<HTMLButtonElement>(null)
  const deferred = useDeferredValue(state)
  const results = filterSolutions(solutions, deferred, locale)
  const activeCount = filterKeys.reduce((sum, key) => sum + state[key].length, 0)
  const closeDrawer = () => {
    setDrawer(false)
    requestAnimationFrame(() => mobileFilterButton.current?.focus())
  }
  const labels: Record<FilterKey, string> = { category: pick(locale, 'Kategori', 'Category'), hardware: pick(locale, 'Donanım', 'Hardware'), backend: pick(locale, 'Çalıştırma arka ucu', 'Execution backend'), format: pick(locale, 'Model formatı', 'Model format'), protocol: pick(locale, 'API protokolü', 'API protocol'), scope: pick(locale, 'Dağıtım kapsamı', 'Deployment scope'), status: pick(locale, 'Proje durumu', 'Project status') }
  const rail = <div className="filter-content">
    <label className="search-field"><Search size={18} /><span className="sr-only">{pick(locale, 'Çözüm ara', 'Search solutions')}</span><input value={state.q} onChange={(event) => setQuery(event.target.value)} placeholder={pick(locale, 'Çözüm, kategori veya donanım ara', 'Search solution, category, or hardware')} /></label>
    {filterKeys.map((key) => <details key={key} open={['category', 'hardware'].includes(key)}><summary><Term tip={fieldTip(key, locale)}>{labels[key]}</Term>{state[key].length > 0 && <span>{state[key].length}</span>}</summary><div className="filter-options">{valuesFor[key].map((value) => <label key={value}><input type="checkbox" checked={state[key].includes(value)} onChange={() => toggle(key, value)} /><span>{value}</span></label>)}</div></details>)}
    <button className="text-button clear-filters" type="button" onClick={clear}>{pick(locale, 'Tüm filtreleri temizle', 'Clear all filters')}</button>
  </div>
  return <div className="shell page-shell explore-page">
    <div className="page-heading"><div><h1>{pick(locale, 'Ekosistemi keşfedin', 'Explore the ecosystem')}</h1><p>{pick(locale, '31 kaynağa dayalı çözümü yedi mimari katmanda filtreleyin.', 'Filter 31 source-backed solutions across seven architectural layers.')}</p></div><span className="freshness mono">{pick(locale, 'DOĞRULANDI', 'VERIFIED')} · 2026-08-12</span></div>
    <button ref={mobileFilterButton} className="button primary mobile-filter-button" type="button" onClick={() => setDrawer(true)}><SlidersHorizontal size={18} />{pick(locale, 'Filtreler', 'Filters')} {activeCount ? `(${activeCount})` : ''}</button>
    <div className="explore-layout">
      <aside className="filter-rail" aria-label={pick(locale, 'Çözüm filtreleri', 'Solution filters')}><div className="filter-title"><Filter size={17} /><strong>{pick(locale, 'Filtreler', 'Filters')}</strong>{activeCount > 0 && <span>{activeCount}</span>}</div>{rail}</aside>
      <section className="results-panel" aria-live="polite">
        <div className="results-toolbar"><strong>{results.length} {pick(locale, 'sonuç', 'results')}</strong><div className="view-toggle" aria-label={pick(locale, 'Görünüm', 'View')}><button type="button" className={state.view === 'list' ? 'active' : ''} aria-label={pick(locale, 'Liste görünümü', 'List view')} onClick={() => setView('list')}><List /></button><button type="button" className={state.view === 'card' ? 'active' : ''} aria-label={pick(locale, 'Kart görünümü', 'Card view')} onClick={() => setView('card')}><Grid2X2 /></button></div></div>
        {results.length === 0 ? <EmptyState title={pick(locale, 'Eşleşen çözüm yok', 'No matching solutions')} body={pick(locale, 'Aramayı genişletin veya filtreleri temizleyin.', 'Broaden the search or clear your filters.')} action={pick(locale, 'Filtreleri temizle', 'Clear filters')} onAction={clear} /> : state.view === 'list' ? <><div className="solution-table-wrap"><table className="solution-table"><thead><tr><th>{pick(locale, 'Çözüm', 'Solution')}</th><th>{pick(locale, 'Temel rol', 'Primary role')}</th><th>{pick(locale, 'Donanım', 'Hardware')}</th><th>{pick(locale, 'Dağıtım', 'Deployment')}</th><th>{pick(locale, 'Durum', 'Status')}</th><th>{pick(locale, 'Karşılaştır', 'Compare')}</th></tr></thead><tbody>{results.map((solution) => <tr key={solution.slug}><td><span className="mono row-code" style={{ color: layerColors[solution.primaryCategory] }}>{solution.primaryCategory}</span><Link to={`/${locale}/solutions/${solution.slug}`}>{solution.name}</Link></td><td>{solution.summary[locale]}</td><td>{solution.hardware.slice(0, 3).join(' · ')}</td><td>{solution.deploymentScopes.slice(0, 3).join(' · ')}</td><td><StatusBadge status={solution.projectStatus} locale={locale} /></td><td><label className="compare-check"><input type="checkbox" aria-label={`${pick(locale, 'Karşılaştır', 'Compare')} ${solution.name}`} checked={compare.selected.includes(solution.slug)} disabled={!compare.selected.includes(solution.slug) && compare.selected.length >= 4} onChange={() => compare.toggle(solution.slug)} /><span className="sr-only">{solution.name}</span></label></td></tr>)}</tbody></table></div><div className="mobile-solution-list">{results.map((solution) => <article key={solution.slug}><div className="mobile-row-top"><span className="mono row-code" style={{ color: layerColors[solution.primaryCategory] }}>{solution.primaryCategory}</span><label className="compare-check"><input type="checkbox" aria-label={`${pick(locale, 'Karşılaştır', 'Compare')} ${solution.name}`} checked={compare.selected.includes(solution.slug)} disabled={!compare.selected.includes(solution.slug) && compare.selected.length >= 4} onChange={() => compare.toggle(solution.slug)} /></label></div><h2><Link to={`/${locale}/solutions/${solution.slug}`}>{solution.name}</Link></h2><p>{solution.summary[locale]}</p><dl><div><dt>{pick(locale, 'Donanım', 'Hardware')}</dt><dd>{solution.hardware.slice(0, 2).join(' · ')}</dd></div><div><dt>{pick(locale, 'Dağıtım', 'Deployment')}</dt><dd>{solution.deploymentScopes.slice(0, 2).join(' · ')}</dd></div></dl><StatusBadge status={solution.projectStatus} locale={locale} /></article>)}</div></> : <div className="solution-cards">{results.map((solution) => <article key={solution.slug}><div><span className="mono row-code" style={{ color: layerColors[solution.primaryCategory] }}>{solution.primaryCategory}</span><StatusBadge status={solution.projectStatus} locale={locale} /></div><h2><Link to={`/${locale}/solutions/${solution.slug}`}>{solution.name}</Link></h2><p>{solution.summary[locale]}</p><small>{solution.hardware.slice(0, 3).join(' · ')}</small><label><input type="checkbox" checked={compare.selected.includes(solution.slug)} onChange={() => compare.toggle(solution.slug)} /> {pick(locale, 'Karşılaştırmaya ekle', 'Add to compare')}</label></article>)}</div>}
      </section>
    </div>
    {drawer && <div className="drawer-backdrop"><button className="drawer-scrim" type="button" aria-label={pick(locale, 'Filtreleri kapat', 'Close filters')} onClick={closeDrawer} /><aside className="filter-drawer" role="dialog" aria-modal="true" aria-label={pick(locale, 'Filtreler', 'Filters')} tabIndex={-1} autoFocus onKeyDown={(event) => { if (event.key === 'Escape') closeDrawer() }}><div className="drawer-head"><h2>{pick(locale, 'Filtreler', 'Filters')}</h2><button type="button" aria-label={pick(locale, 'Filtreleri kapat', 'Close filters')} onClick={closeDrawer}><X /></button></div>{rail}<button className="button primary drawer-apply" type="button" onClick={closeDrawer}>{results.length} {pick(locale, 'sonucu göster', 'show results')}</button></aside></div>}
    <CompareBar selected={compare.selected} remove={compare.remove} clear={compare.clear} />
  </div>
}
