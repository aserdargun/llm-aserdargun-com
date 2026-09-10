import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { quizzes } from '@/data/quizzes'
import { recordQuiz, useProgress } from '@/features/learning/progress'
import { learnCommon, learnQuiz } from '@/i18n/learn-copy'
import { pick, useLocale } from '@/i18n/copy'
import type { QuizMatch, QuizMcq, QuizQuestion, QuizTrueFalse } from '@/types/learning'

type Phase = 'idle' | 'asking' | 'done'
type Filter = 'all' | string

const selectQuestions = (all: QuizQuestion[], filter: Filter, count: number): QuizQuestion[] => {
  const pool = filter === 'all' ? all : all.filter((q) => q.tags.includes(filter))
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

const allTags = (qs: QuizQuestion[]): string[] => {
  const s = new Set<string>()
  for (const q of qs) for (const t of q.tags) s.add(t)
  return [...s].sort()
}

export function QuizPage() {
  const locale = useLocale()
  const { update } = useProgress()
  const [phase, setPhase] = useState<Phase>('idle')
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  const tags = useMemo(() => allTags(quizzes), [])
  const start = useCallback((size = 5) => {
    const items = selectQuestions(quizzes, filter, size)
    setActive(items)
    setIndex(0)
    setPicked(null)
    setCorrectCount(0)
    setPhase(items.length > 0 ? 'asking' : 'done')
  }, [filter])

  useEffect(() => {
    if (quizzes.length === 0) setPhase('done')
  }, [])

  if (quizzes.length === 0) {
    return (
      <div className="shell page-shell">
        <h1>{learnQuiz.title[locale]}</h1>
        <p className="empty-state">{learnCommon.noQuiz[locale]}</p>
        <Link to={`/${locale}/learn`} className="button primary">{pick(locale, 'Öğren paneline dön', 'Back to learn hub')}</Link>
      </div>
    )
  }

  if (phase === 'idle') {
    return (
      <div className="shell page-shell">
        <header className="page-heading">
          <div>
            <span className="mono">{pick(locale, 'QUIZ', 'QUIZ')}</span>
            <h1>{learnQuiz.title[locale]}</h1>
            <p>{learnQuiz.intro[locale]}</p>
          </div>
        </header>
        <div className="quiz-filter">
          <label htmlFor="quiz-filter">{learnQuiz.filter[locale]}</label>
          <select id="quiz-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">{learnQuiz.filterAll[locale]}</option>
            {tags.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <button type="button" className="button primary" onClick={() => start(5)}>{learnCommon.start[locale]}</button>
      </div>
    )
  }

  if (phase === 'done') {
    const total = active.length
    const rate = total === 0 ? 0 : Math.round((correctCount / total) * 100)
    return (
      <div className="shell page-shell">
        <h1>{learnQuiz.resultsTitle[locale]}</h1>
        <p className="quiz-score"><strong>{learnQuiz.scoreLabel[locale]}:</strong> {correctCount} / {total} ({rate}%)</p>
        <div className="hero-actions">
          <button type="button" className="button primary" onClick={() => start(5)}>{learnCommon.restart[locale]}</button>
          <Link to={`/${locale}/learn`} className="button secondary">{pick(locale, 'Panele dön', 'Back to hub')}</Link>
        </div>
      </div>
    )
  }

  const q = active[index]

  return (
    <div className="shell page-shell quiz-page">
      <h1 className="sr-only">{learnQuiz.title[locale]}</h1>
      <div className="quiz-page__meta" aria-live="polite">
        <span className="mono">{learnQuiz.title[locale]}</span>
        <strong>{index + 1} / {active.length}</strong>
      </div>
      {q.kind === 'mcq' ? <Mcq q={q} picked={picked} onPick={(idx) => { setPicked(idx); const ok = idx === q.correct; if (ok) setCorrectCount((c) => c + 1); update((p) => recordQuiz(p, q.tags, ok)) }} onNext={() => { if (index + 1 >= active.length) setPhase('done'); else { setIndex((i) => i + 1); setPicked(null) } }} locale={locale} /> : null}
      {q.kind === 'truefalse' ? <TrueFalse q={q} picked={picked} onPick={(v) => { setPicked(v ? 1 : 0); const ok = v === q.correct; if (ok) setCorrectCount((c) => c + 1); update((p) => recordQuiz(p, q.tags, ok)) }} onNext={() => { if (index + 1 >= active.length) setPhase('done'); else { setIndex((i) => i + 1); setPicked(null) } }} locale={locale} /> : null}
      {q.kind === 'match' ? <MatchQuestion key={q.id} q={q} onAnswer={(ok) => { if (ok) setCorrectCount((c) => c + 1); update((p) => recordQuiz(p, q.tags, ok)) }} onNext={() => { if (index + 1 >= active.length) setPhase('done'); else { setIndex((i) => i + 1); setPicked(null) } }} locale={locale} /> : null}
    </div>
  )
}

function Mcq({ q, picked, onPick, onNext, locale }: { q: QuizMcq; picked: number | null; onPick: (i: number) => void; onNext: () => void; locale: ReturnType<typeof useLocale> }) {
  const answered = picked !== null
  return (
    <div>
      <h2 className="quiz-prompt">{q.prompt[locale]}</h2>
      <ul className="quiz-options">
        {q.options.map((opt, i) => {
          const isCorrect = answered && i === q.correct
          const isWrong = answered && i === picked && i !== q.correct
          return (
            <li key={i}>
              <button
                type="button"
                className={`quiz-option ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                onClick={() => onPick(i)}
                disabled={answered}
              >
                <span className="mono">{String.fromCharCode(65 + i)}</span> {opt[locale]}
              </button>
            </li>
          )
        })}
      </ul>
      {answered ? (
        <div className="quiz-explain">
          <p>{q.explain[locale]}</p>
          <button type="button" className="button primary" onClick={onNext}>{learnCommon.next[locale]}</button>
        </div>
      ) : null}
    </div>
  )
}

function TrueFalse({ q, picked, onPick, onNext, locale }: { q: QuizTrueFalse; picked: number | null; onPick: (v: boolean) => void; onNext: () => void; locale: ReturnType<typeof useLocale> }) {
  const answered = picked !== null
  return (
    <div>
      <h2 className="quiz-prompt">{q.prompt[locale]}</h2>
      <div className="quiz-tf">
        <button type="button" className={`quiz-option ${answered ? (q.correct ? 'is-correct' : (picked === 1 ? 'is-wrong' : '')) : ''}`} onClick={() => onPick(true)} disabled={answered}>
          {pick(locale, 'Doğru', 'True')}
        </button>
        <button type="button" className={`quiz-option ${answered ? (!q.correct ? 'is-correct' : (picked === 0 ? 'is-wrong' : '')) : ''}`} onClick={() => onPick(false)} disabled={answered}>
          {pick(locale, 'Yanlış', 'False')}
        </button>
      </div>
      {answered ? (
        <div className="quiz-explain">
          <p>{q.explain[locale]}</p>
          <button type="button" className="button primary" onClick={onNext}>{learnCommon.next[locale]}</button>
        </div>
      ) : null}
    </div>
  )
}

function MatchQuestion({ q, onAnswer, onNext, locale }: { q: QuizMatch; onAnswer: (correct: boolean) => void; onNext: () => void; locale: ReturnType<typeof useLocale> }) {
  const [picks, setPicks] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [rightOrder] = useState(() => q.pairs.map((_, i) => i).reverse())
  const [activeLeft, setActiveLeft] = useState<number | null>(null)
  const completed = Object.keys(picks).length === q.pairs.length
  const onLeft = (i: number) => setActiveLeft((cur) => (cur === i ? null : i))
  const onRight = (j: number) => {
    if (activeLeft === null || submitted) return
    setPicks((p) => ({ ...Object.fromEntries(Object.entries(p).filter(([, value]) => value !== j)), [activeLeft]: j }))
    setActiveLeft(null)
  }
  return (
    <div>
      <h2 className="quiz-prompt">{q.prompt[locale]}</h2>
      <div className="quiz-match">
        <ul>
          {q.pairs.map((p, i) => (
            <li key={i}>
              <button type="button" className={`quiz-option ${activeLeft === i ? 'is-correct' : ''} ${submitted ? (picks[i] === i ? 'is-correct' : 'is-wrong') : ''}`} onClick={() => onLeft(i)} disabled={submitted} aria-pressed={activeLeft === i}>
                {p.left[locale]}{picks[i] !== undefined ? ` → ${q.pairs[picks[i]].right[locale]}` : ''}
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {rightOrder.map((j) => {
            const p = q.pairs[j]
            const matchedLeft = Object.entries(picks).find(([, r]) => r === j)?.[0]
            const matchedRight = matchedLeft !== undefined && q.pairs[Number(matchedLeft)].right[locale] === p.right[locale]
            return (
              <li key={j}>
                <button type="button" className={`quiz-option ${activeLeft !== null && picks[activeLeft] === j ? 'is-correct' : ''} ${submitted && matchedRight ? 'is-correct' : ''}`} onClick={() => onRight(j)} disabled={submitted || activeLeft === null}>
                  {p.right[locale]}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {completed ? (
        <div className="quiz-explain" aria-live="polite">
          {submitted ? <><p>{q.pairs.map((p) => `${p.left[locale]} → ${p.right[locale]}`).join(' · ')}</p><button type="button" className="button primary" onClick={onNext}>{learnCommon.next[locale]}</button></> :
            <button type="button" className="button primary" onClick={() => { setSubmitted(true); onAnswer(q.pairs.every((_, i) => picks[i] === i)) }}>{pick(locale, 'Yanıtı kontrol et', 'Check answer')}</button>}
        </div>
      ) : null}
    </div>
  )
}
