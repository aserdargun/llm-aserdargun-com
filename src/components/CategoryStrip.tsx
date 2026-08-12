import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import { useLocale } from '@/i18n/copy'

export function CategoryStrip() {
  const locale = useLocale()
  return <div className="category-strip">{categories.map((category) => <Link key={category.id} to={`/${locale}/explore?category=${category.id}`} className="category-cell"><span className="mono category-code">{category.id}</span><strong>{category.name[locale]}</strong><span>{category.summary[locale]}</span><ArrowRight size={17} aria-hidden="true" /></Link>)}</div>
}
