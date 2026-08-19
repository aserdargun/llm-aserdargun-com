import { ArrowRight, BookOpenCheck, Brain, Layers, Sparkles, Timer } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ProgressRing } from '@/components/ProgressRing'
import { StreakBadge } from '@/components/StreakBadge'
import { concepts } from '@/data/concepts'
import { flashcards } from '@/data/flashcards'
import { lessons } from '@/data/lessons'
import { useProgress } from '@/features/learning/progress'
import { buildQueue, summarize } from '@/features/learning/selectors'
import { learnCards, learnCommon, learnHome } from '@/i18n/learn-copy'
import { pick, useLocale } from '@/i18n/copy'

export function LearnHomePage() {
  const locale = useLocale()
  const { state } = useProgress()
  const queue = useMemo(() => buildQueue(flashcards, state, new Date()), [state])
  const totals = useMemo(() => summarize(state, lessons.length), [state])
  const queueSize = queue.due.length + queue.new.length
  return (
    <div className="shell page-shell learn-hub">
      <header className="page-heading">
        <div>
          <span className="mono">{pick(locale, 'ÖĞRENME KATMANI', 'LEARNING LAYER')}</span>
          <h1>{learnHome.title[locale]}</h1>
          <p>{learnHome.intro[locale]}</p>
        </div>
        <StreakBadge days={totals.streakDays} longest={totals.longestStreak} />
      </header>

      <section className="learn-grid">
        <Link to={`/${locale}/learn/concepts`} className="learn-card">
          <Layers size={28} aria-hidden="true" />
          <h2>{pick(locale, 'Kavramlar', 'Concepts')}</h2>
          <p>{pick(locale, '3 seviyede oku: günlük dil, teknik detay, ileri seviye.', 'Read in 3 levels: plain language, technical, advanced.')}</p>
          <span className="learn-card__count">{concepts.length} {pick(locale, 'kavram', 'concepts')}</span>
          <span className="learn-card__cta">{learnHome.ctaConcepts[locale]} <ArrowRight size={16} /></span>
        </Link>
        <Link to={`/${locale}/learn/flashcards`} className="learn-card">
          <Brain size={28} aria-hidden="true" />
          <h2>{pick(locale, 'Kartlar', 'Flashcards')}</h2>
          <p>{pick(locale, 'Spaced repetition ile her gün küçük bir set tekrar et.', 'Review a small daily set with spaced repetition.')}</p>
          <span className="learn-card__count">{queueSize > 0 ? `${queueSize} ${learnCards.cardCount[locale]}` : learnCommon.noCards[locale]}</span>
          <span className="learn-card__cta">{learnHome.ctaCards[locale]} <ArrowRight size={16} /></span>
        </Link>
        <Link to={`/${locale}/learn/quiz`} className="learn-card">
          <Sparkles size={28} aria-hidden="true" />
          <h2>{pick(locale, 'Quiz', 'Quiz')}</h2>
          <p>{pick(locale, 'Kısa sorularla anlık geri bildirim al.', 'Instant feedback from short questions.')}</p>
          <span className="learn-card__count">{pick(locale, 'Hızlı & rastgele', 'Quick & random')}</span>
          <span className="learn-card__cta">{learnHome.ctaQuiz[locale]} <ArrowRight size={16} /></span>
        </Link>
        <Link to={`/${locale}/learn/lessons`} className="learn-card">
          <BookOpenCheck size={28} aria-hidden="true" />
          <h2>{pick(locale, 'Dersler', 'Lessons')}</h2>
          <p>{pick(locale, '5-8 adımlı, görsel mini-dersler.', '5–8 step visual mini-lessons.')}</p>
          <span className="learn-card__count">{lessons.length} {pick(locale, 'ders', 'lessons')}</span>
          <span className="learn-card__cta">{learnHome.ctaLessons[locale]} <ArrowRight size={16} /></span>
        </Link>
      </section>

      <section className="learn-progress" aria-labelledby="progress-title">
        <div className="section-heading">
          <Timer size={20} aria-hidden="true" />
          <h2 id="progress-title">{pick(locale, 'İlerlemen', 'Your progress')}</h2>
        </div>
        <div className="learn-progress__grid">
          <ProgressRing value={Math.min(1, totals.cardsReviewed / Math.max(1, flashcards.length))} label={`${totals.cardsReviewed}`} caption={learnHome.stats.cards[locale]} />
          <ProgressRing value={Math.min(1, totals.conceptsRead / Math.max(1, concepts.length))} label={`${totals.conceptsRead}`} caption={learnHome.stats.concepts[locale]} />
          <ProgressRing value={Math.min(1, totals.lessonsCompleted / Math.max(1, lessons.length))} label={`${totals.lessonsCompleted}`} caption={learnHome.stats.lessons[locale]} />
          <ProgressRing value={Math.min(1, totals.quizzesAnswered / 30)} label={`${totals.quizzesAnswered}`} caption={learnHome.stats.quizzes[locale]} />
        </div>
        {!totals.hasAnyActivity ? (
          <div className="learn-empty">
            <strong>{learnHome.empty.title[locale]}</strong>
            <p>{learnHome.empty.body[locale]}</p>
          </div>
        ) : null}
      </section>
    </div>
  )
}
