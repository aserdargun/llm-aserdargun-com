import { PortfolioLearning } from '@/components/PortfolioLearning'
import { ArrowRight, BookOpenCheck, Brain, Layers, Sparkles, Timer } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ProgressRing } from '@/components/ProgressRing'
import { StreakBadge } from '@/components/StreakBadge'
import { concepts } from '@/data/concepts'
import { flashcards } from '@/data/flashcards'
import { lessons } from '@/data/lessons'
import { learningStages, totalPathLessons, totalPathMinutes } from '@/features/learning/path'
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
          <p>{pick(locale, 'Aralıklı tekrar ile her gün küçük bir set tekrar et.', 'Review a small daily set with spaced repetition.')}</p>
          <span className="learn-card__count">{queueSize > 0 ? `${queueSize} ${learnCards.cardCount[locale]}` : learnCommon.noCards[locale]}</span>
          <span className="learn-card__cta">{learnHome.ctaCards[locale]} <ArrowRight size={16} /></span>
        </Link>
        <Link to={`/${locale}/learn/quiz`} className="learn-card">
          <Sparkles size={28} aria-hidden="true" />
          <h2>{pick(locale, 'Test', 'Quiz')}</h2>
          <p>{pick(locale, 'Kısa sorularla anlık geri bildirim al.', 'Instant feedback from short questions.')}</p>
          <span className="learn-card__count">{pick(locale, 'Hızlı ve rastgele', 'Quick and random')}</span>
          <span className="learn-card__cta">{learnHome.ctaQuiz[locale]} <ArrowRight size={16} /></span>
        </Link>
        <Link to={`/${locale}/learn/lessons`} className="learn-card">
          <BookOpenCheck size={28} aria-hidden="true" />
          <h2>{pick(locale, 'Dersler', 'Lessons')}</h2>
          <p>{pick(locale, '4–7 adımlı, görsel mini dersler.', 'Visual mini-lessons with 4–7 steps.')}</p>
          <span className="learn-card__count">{lessons.length} {pick(locale, 'ders', 'lessons')}</span>
          <span className="learn-card__cta">{learnHome.ctaLessons[locale]} <ArrowRight size={16} /></span>
        </Link>
      </section>

      <section className="learn-path" aria-labelledby="path-title">
        <div className="section-heading">
          <Timer size={20} aria-hidden="true" />
          <span className="mono">{learnHome.path.eyebrow[locale]}</span>
          <h2 id="path-title">{learnHome.path.title[locale]}</h2>
          <p>{learnHome.path.intro[locale]}</p>
        </div>
        <ol className="learn-path__stages">
          {learningStages.map((stage, index) => (
            <li key={stage.id} className="learn-path__stage">
              <span className="learn-path__index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{stage.title[locale]}</h3>
                <p className="learn-path__meta">
                  {stage.lessons.length} {learnHome.path.lessons[locale]} · {stage.concepts.length}{' '}
                  {learnHome.path.concepts[locale]} · {stage.cards} {learnHome.path.cards[locale]} ·{' '}
                  {stage.quiz ? learnHome.path.quiz[locale] : learnHome.path.quizOff[locale]} ·{' '}
                  {stage.minutes} {pick(locale, 'dk', 'min')}
                </p>
                <ul className="learn-path__lessons">
                  {stage.lessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link to={`/${locale}/learn/lessons/${lesson.slug}`}>
                        {lesson.title[locale]} <ArrowRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <p className="learn-path__total">
          {totalPathLessons} {learnHome.path.lessons[locale]} · {totalPathMinutes} {pick(locale, 'dk', 'min')}{' '}
          {learnHome.path.total[locale]}
        </p>
      </section>

      <PortfolioLearning />

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
