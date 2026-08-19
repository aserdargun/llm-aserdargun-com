import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { flashcards } from '@/data/flashcards'
import { reviewCard, useProgress } from '@/features/learning/progress'
import { buildQueue } from '@/features/learning/selectors'
import { learnCards, learnCommon } from '@/i18n/learn-copy'
import { pick, useLocale } from '@/i18n/copy'
import type { Flashcard } from '@/types/learning'

type Phase = 'idle' | 'showing' | 'done'

export function FlashcardsPage() {
  const locale = useLocale()
  const { state, update } = useProgress()
  const [phase, setPhase] = useState<Phase>('idle')
  const [shown, setShown] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [queue, setQueue] = useState<Flashcard[]>([])
  const today = useMemo(() => new Date(), [])

  const start = useCallback(() => {
    const q = buildQueue(flashcards, state, today)
    const items = [...q.due, ...q.new]
    setQueue(items)
    setShown(0)
    setFlipped(false)
    setPhase(items.length > 0 ? 'showing' : 'done')
  }, [state, today])

  useEffect(() => {
    if (flashcards.length === 0) setPhase('done')
  }, [])

  const grade = useCallback((quality: number) => {
    const card = queue[shown]
    if (!card) return
    update((prev) => reviewCard(prev, card.id, quality, today))
    if (shown + 1 >= queue.length) setPhase('done')
    else {
      setShown((n) => n + 1)
      setFlipped(false)
    }
  }, [queue, shown, today, update])

  if (flashcards.length === 0) {
    return (
      <div className="shell page-shell">
        <h1>{learnCards.title[locale]}</h1>
        <p className="empty-state">{learnCommon.noCards[locale]}</p>
        <Link to={`/${locale}/learn`} className="button primary">{pick(locale, 'Öğren paneline dön', 'Back to learn hub')}</Link>
      </div>
    )
  }

  if (phase === 'idle') {
    return (
      <div className="shell page-shell">
        <header className="page-heading">
          <div>
            <span className="mono">{pick(locale, 'KARTLAR', 'FLASHCARDS')}</span>
            <h1>{learnCards.title[locale]}</h1>
            <p>{learnCards.intro[locale]}</p>
          </div>
        </header>
        <button type="button" className="button primary" onClick={start}>{learnCommon.start[locale]}</button>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="shell page-shell">
        <h1>{learnCards.sessionDone[locale]}</h1>
        <p>{shown > 0 ? pick(locale, `${shown} kart gözden geçirildi.`, `${shown} cards reviewed.`) : pick(locale, 'Bugün için tekrar yok.', 'Nothing due today.')}</p>
        <div className="hero-actions">
          <Link to={`/${locale}/learn`} className="button secondary">{pick(locale, 'Panele dön', 'Back to hub')}</Link>
          <button type="button" className="button primary" onClick={start}>{learnCommon.restart[locale]}</button>
        </div>
      </div>
    )
  }

  const card = queue[shown]
  return (
    <div className="shell page-shell flashcards-page">
      <div className="flashcards-page__meta">
        <span className="mono">{learnCards.session[locale]}</span>
        <strong>{shown + 1} / {queue.length}</strong>
      </div>
      <div
        className={`flashcard ${flipped ? 'flipped' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') setFlipped((v) => !v) }}
        aria-label={flipped ? learnCommon.showAnswer[locale] : pick(locale, 'Cevap', 'Answer')}
      >
        <div className="flashcard__inner">
          <div className="flashcard__face flashcard__face--front">
            <span className="mono">{card.source}</span>
            <p>{card.front[locale]}</p>
            {card.hint ? <small>{card.hint[locale]}</small> : null}
          </div>
          <div className="flashcard__face flashcard__face--back">
            <p>{card.back[locale]}</p>
          </div>
        </div>
      </div>
      <div className="flashcard-actions">
        {!flipped ? (
          <button type="button" className="button primary" onClick={() => setFlipped(true)}>{learnCommon.showAnswer[locale]}</button>
        ) : (
          <>
            <button type="button" className="button secondary" onClick={() => grade(1)}>{learnCommon.rateAgain[locale]}</button>
            <button type="button" className="button secondary" onClick={() => grade(3)}>{learnCommon.rateHard[locale]}</button>
            <button type="button" className="button primary" onClick={() => grade(5)}>{learnCommon.rateEasy[locale]}</button>
          </>
        )}
      </div>
    </div>
  )
}
