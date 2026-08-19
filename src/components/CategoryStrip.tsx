import { ArrowRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import { layerColors } from '@/features/layers'
import { useLocale } from '@/i18n/copy'

export function CategoryStrip() {
  const locale = useLocale()
  return <div className="category-strip">{categories.map((category) => <Link key={category.id} to={`/${locale}/explore?category=${category.id}`} className="category-cell"><span className="mono category-code" style={{ '--cat-color': layerColors[category.id] } as CSSProperties}>{category.id}</span><strong>{category.name[locale]}</strong><span>{category.summary[locale]}</span><ArrowRight size={17} aria-hidden="true" /></Link>)}</div>
}
