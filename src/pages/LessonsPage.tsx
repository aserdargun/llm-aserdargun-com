import { ArrowLeft, ArrowRight, Check, Copy, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ConceptVisual } from '@/components/ConceptVisual'
import { lessons } from '@/data/lessons'
import { useProgress } from '@/features/learning/progress'
import { learnCommon, learnLessons } from '@/i18n/learn-copy'
import { pick, useLocale } from '@/i18n/copy'

export function LessonsPage() {
  const locale = useLocale()
  const { slug } = useParams()
  const lesson = useMemo(() => lessons.find((l) => l.slug === slug), [slug])

  if (lessons.length === 0) {
    return (
      <div className="shell page-shell">
        <h1>{learnLessons.title[locale]}</h1>
        <p className="empty-state">{learnCommon.noLessons[locale]}</p>
        <Link to={`/${locale}/learn`} className="button primary">{pick(locale, 'Öğren paneline dön', 'Back to learn hub')}</Link>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="shell page-shell">
        <header className="page-heading">
          <div>
            <span className="mono">{pick(locale, 'DERSLER', 'LESSONS')}</span>
            <h1>{learnLessons.title[locale]}</h1>
            <p>{learnLessons.intro[locale]}</p>
          </div>
        </header>
        <ul className="lesson-list">
          {lessons.map((l) => (
            <li key={l.slug}>
              <Link to={`/${locale}/learn/lessons/${l.slug}`}>
                <span className="mono">{l.level}</span>
                <strong>{l.title[locale]}</strong>
                <small>{l.summary[locale]}</small>
                <span className="lesson-list__meta">
                  <Sparkles size={14} aria-hidden="true" /> {l.durationMin} {learnCommon.minutes[locale]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return <LessonRunner slug={lesson.slug} />
}

function LessonRunner({ slug }: { slug: string }) {
  const locale = useLocale()
  const lesson = lessons.find((l) => l.slug === slug)!
  const [step, setStep] = useState(0)
  const { state, update } = useProgress()
  const completed = state.completedLessons.includes(lesson.slug)
  const current = lesson.steps[step]
  const last = step === lesson.steps.length - 1
  return (
    <article className="shell page-shell lesson-page">
      <Link className="back-link" to={`/${locale}/learn/lessons`}>
        <ArrowLeft size={17} /> {pick(locale, 'Derslere dön', 'Back to lessons')}
      </Link>
      <header className="lesson-page__header">
        <span className="mono">{lesson.level} · {lesson.durationMin} {learnCommon.minutes[locale]}</span>
        <h1>{lesson.title[locale]}</h1>
        <p>{lesson.summary[locale]}</p>
      </header>
      <div className="lesson-stepper">
        <span className="mono">{learnLessons.step[locale]} {step + 1} {learnLessons.of[locale]} {lesson.steps.length}</span>
        <h2>{current.title[locale]}</h2>
        <p>{current.body[locale]}</p>
        {current.visual ? (
          <div className="lesson-stepper__visual">
            <ConceptVisual kind={current.visual} label={current.title[locale]} />
          </div>
        ) : null}
        {current.codeBlock ? <CodeBlock code={current.codeBlock.code} lang={current.codeBlock.lang} /> : null}
        {current.tryIt ? (
          <a className="button secondary" href={current.tryIt.href} target="_blank" rel="noopener noreferrer">
            {current.tryIt.label[locale]} <ArrowRight size={16} />
          </a>
        ) : null}
      </div>
      <div className="lesson-stepper__actions">
        <button type="button" className="button secondary" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          {learnCommon.back[locale]}
        </button>
        {last ? (
          <button
            type="button"
            className={`button ${completed ? 'secondary' : 'primary'}`}
            onClick={() => {
              if (completed) return
              update((prev) => ({
                ...prev,
                completedLessons: prev.completedLessons.includes(lesson.slug) ? prev.completedLessons : [...prev.completedLessons, lesson.slug],
              }))
            }}
          >
            {completed ? <><Check size={16} /> {learnCommon.done[locale]}</> : learnCommon.done[locale]}
          </button>
        ) : (
          <button type="button" className="button primary" onClick={() => setStep((s) => Math.min(lesson.steps.length - 1, s + 1))}>
            {learnCommon.next[locale]} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </article>
  )
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const locale = useLocale()
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }
  return (
    <div className="lesson-code">
      <div className="lesson-code__head">
        <span className="mono">{lang}</span>
        <button type="button" className="text-button" onClick={onCopy}>
          {copied ? <><Check size={14} /> {learnCommon.copied[locale]}</> : <><Copy size={14} /> {learnCommon.copy[locale]}</>}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}
