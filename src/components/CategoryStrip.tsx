import { ArrowRight, ChevronDown } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import { solutions } from '@/data/solutions'
import { layerColors } from '@/features/layers'
import { pick, useLocale } from '@/i18n/copy'
import type { CategoryId } from '@/types/atlas'

export function CategoryStrip() {
  const locale = useLocale()
  const [active, setActive] = useState<CategoryId | null>('RUN')
  return <div className="category-ledger">{categories.map((category) => {
    const expanded = active === category.id
    const count = solutions.filter((solution) => solution.primaryCategory === category.id).length
    return <article
      key={category.id}
      className={expanded ? 'category-row expanded' : 'category-row'}
      style={{ '--cat-color': layerColors[category.id] } as CSSProperties}
    >
      <button
        type="button"
        aria-label={`${category.id} · ${category.name[locale]}`}
        aria-expanded={expanded}
        aria-controls={`category-${category.id}`}
        onClick={() => setActive((current) => current === category.id ? null : category.id)}
      >
        <span className="mono category-code">{category.id}</span>
        <strong>{category.name[locale]}</strong>
        <span className="category-summary">{category.summary[locale]}</span>
        <span className="mono category-count">{String(count).padStart(2, '0')} {pick(locale, 'KAYIT', 'RECORDS')}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {expanded && <section id={`category-${category.id}`} role="region" aria-label={category.name[locale]} className="category-detail">
        <div><span className="mono">{pick(locale, 'SORUMLULUK', 'RESPONSIBILITY')}</span><p>{category.responsibility[locale]}</p></div>
        <div><span className="mono">{pick(locale, 'SINIR', 'BOUNDARY')}</span><p>{category.notFor[locale]}</p></div>
        <Link to={`/${locale}/explore?category=${category.id}`}>{pick(locale, 'Bu katmanı keşfet', 'Explore this layer')}<ArrowRight size={17} aria-hidden="true" /></Link>
      </section>}
    </article>
  })}</div>
}
