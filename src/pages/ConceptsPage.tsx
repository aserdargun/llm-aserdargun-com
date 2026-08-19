import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { concepts } from '@/data/concepts'
import { useProgress } from '@/features/learning/progress'
import { learnCommon, learnConcepts, learnPills } from '@/i18n/learn-copy'
import { pick, useLocale } from '@/i18n/copy'

const categoryLabel = (locale: ReturnType<typeof useLocale>, cat: string) => {
  switch (cat) {
    case 'core':
      return learnPills.core[locale]
    case 'serving':
      return learnPills.serving[locale]
    case 'optimization':
      return learnPills.optimization[locale]
    case 'hardware':
      return learnPills.hardware[locale]
    case 'app':
      return learnPills.app[locale]
    default:
      return cat
  }
}

export function ConceptsPage() {
  const locale = useLocale()
  const [query, setQuery] = useState('')
  const { state } = useProgress()
  const readSet = useMemo(() => new Set(state.readConcepts), [state.readConcepts])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return concepts
    return concepts.filter((c) => {
      const hay = `${c.name[locale]} ${c.short[locale]}`.toLowerCase()
      return hay.includes(q)
    })
  }, [query, locale])

  return (
    <div className="shell page-shell">
      <header className="page-heading">
        <div>
          <span className="mono">{pick(locale, 'KAVRAM SÖZLÜĞÜ', 'CONCEPT GLOSSARY')}</span>
          <h1>{learnConcepts.title[locale]}</h1>
          <p>{learnConcepts.intro[locale]}</p>
        </div>
      </header>
      <div className="search-field" style={{ maxWidth: 420 }}>
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={query}
          placeholder={learnConcepts.searchPlaceholder[locale]}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={learnConcepts.searchPlaceholder[locale]}
        />
      </div>

      {concepts.length === 0 ? (
        <p className="empty-state" style={{ marginTop: 32 }}>{learnCommon.noConcepts[locale]}</p>
      ) : (
        <ul className="concept-list">
          {filtered.map((c) => (
            <li key={c.slug} className="concept-list__item">
              <Link to={`/${locale}/learn/concepts/${c.slug}`} className="concept-list__link">
                <span className="concept-list__pill">{categoryLabel(locale, c.category)}</span>
                <strong>{c.name[locale]}</strong>
                <small>{c.short[locale]}</small>
                {readSet.has(c.slug) ? <span className="concept-list__read">{learnConcepts.markedRead[locale]}</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
