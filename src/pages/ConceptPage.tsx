import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConceptVisual } from '@/components/ConceptVisual'
import { concepts } from '@/data/concepts'
import { solutions } from '@/data/solutions'
import { useProgress } from '@/features/learning/progress'
import { learnCommon, learnConcepts, learnPills } from '@/i18n/learn-copy'
import { pick, useLocale } from '@/i18n/copy'

type Level = 'beginner' | 'intermediate' | 'advanced'

const levelLabel: Record<Level, { tr: string; en: string }> = {
  beginner: learnCommon.beginner,
  intermediate: learnCommon.intermediate,
  advanced: learnCommon.advanced,
}

export function ConceptPage() {
  const locale = useLocale()
  const { slug } = useParams()
  const concept = concepts.find((c) => c.slug === slug)
  const [level, setLevel] = useState<Level>('beginner')
  const { state, update } = useProgress()
  if (!concept) {
    return (
      <div className="shell page-shell missing-page">
        <h1>{pick(locale, 'Kavram bulunamadı', 'Concept not found')}</h1>
        <p>{pick(locale, 'Bu kavram sözlükte yok.', 'This concept is not in the glossary.')}</p>
        <Link className="button primary" to={`/${locale}/learn/concepts`}>{pick(locale, 'Kavramlara dön', 'Back to concepts')}</Link>
      </div>
    )
  }
  const isRead = state.readConcepts.includes(concept.slug)
  const body =
    level === 'beginner' ? concept.beginner
    : level === 'intermediate' ? concept.intermediate
    : concept.advanced
  return (
    <article className="shell page-shell concept-page">
      <Link className="back-link" to={`/${locale}/learn/concepts`}>
        <ArrowLeft size={17} /> {pick(locale, 'Kavramlara dön', 'Back to concepts')}
      </Link>
      <header className="concept-page__header">
        <span className="mono">{learnPills[concept.category][locale]}</span>
        <h1>{concept.name[locale]}</h1>
        <p>{concept.short[locale]}</p>
      </header>
      <div className="concept-visual">
        <ConceptVisual kind={concept.visual} label={concept.name[locale]} />
      </div>
      <div className="concept-level-toggle" role="tablist">
        {(Object.keys(levelLabel) as Level[]).map((l) => (
          <button
            key={l}
            type="button"
            role="tab"
            aria-selected={level === l}
            className={level === l ? 'active' : ''}
            onClick={() => setLevel(l)}
          >
            {levelLabel[l][locale]}
          </button>
        ))}
      </div>
      <section className="concept-body" role="tabpanel">
        <p>{body[locale]}</p>
      </section>

      {concept.relatedConcepts.length > 0 ? (
        <section>
          <h2>{learnConcepts.relatedConcepts[locale]}</h2>
          <ul className="tag-pills">
            {concept.relatedConcepts.map((c) => {
              const target = concepts.find((x) => x.slug === c)
              if (!target) return null
              return (
                <li key={c}>
                  <Link to={`/${locale}/learn/concepts/${c}`}>{target.name[locale]}</Link>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}

      {concept.relatedSolutions.length > 0 ? (
        <section>
          <h2>{learnConcepts.relatedSolutions[locale]}</h2>
          <ul className="tag-pills">
            {concept.relatedSolutions.map((s) => {
              const target = solutions.find((x) => x.slug === s)
              if (!target) return null
              return (
                <li key={s}>
                  <Link to={`/${locale}/solutions/${s}`}>{target.name}</Link>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}

      <button
        type="button"
        className={`button ${isRead ? 'secondary' : 'primary'}`}
        onClick={() => update((prev) => {
          const list = prev.readConcepts
          if (list.includes(concept.slug)) return prev
          return { ...prev, readConcepts: [...list, concept.slug] }
        })}
      >
        {isRead ? learnConcepts.markedRead[locale] : learnConcepts.markRead[locale]}
      </button>
    </article>
  )
}
