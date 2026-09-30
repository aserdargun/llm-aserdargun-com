import type { Concept, Lesson } from '@/types/learning'
import { concepts } from '@/data/concepts'
import { lessons } from '@/data/lessons'

/**
 * Önerilen öğrenme sırası.
 *
 * Sıra elle yazılmaz: mevcut ders ve kavram verisinden türetilir, böylece
 * yeni bir ders veya kavram eklendiğinde yol otomatik olarak genişler.
 * Her adım yalnızca mevcut kayıtlara işaret eder; yeni kanıt iddiası eklemez.
 */

/** Kavramın hangi okuma seviyesinde çalışılacağı. */
export type ConceptLevel = 'beginner' | 'intermediate'

export interface LearningStage {
  id: 'start' | 'build'
  title: { tr: string; en: string }
  lessons: Lesson[]
  concepts: Concept[]
  /** Bu aşamada tekrar edilecek kart sayısı (kart havuzunun tamamı değil, o aşamanın payı). */
  cards: number
  quiz: boolean
  minutes: number
}

const levelRank: Record<Lesson['level'], number> = { starter: 0, intermediate: 1 }

/** Her kavramın iki okuma seviyesinde de yaklaşık okuma süresi. */
const CONCEPT_MINUTES: Record<ConceptLevel, number> = { beginner: 3, intermediate: 5 }

const STAGES: {
  id: LearningStage['id']
  title: { tr: string; en: string }
  lessonLevels: Lesson['level'][]
  conceptLevel: ConceptLevel
  cardShare: number
  quiz: boolean
}[] = [
  {
    id: 'start',
    title: { tr: 'Önce çalıştır', en: 'Run it first' },
    lessonLevels: ['starter'],
    conceptLevel: 'beginner',
    cardShare: 0.5,
    quiz: false,
  },
  {
    id: 'build',
    title: { tr: 'Sonra üretime taşı', en: 'Then move to production' },
    lessonLevels: ['intermediate'],
    conceptLevel: 'intermediate',
    cardShare: 0.5,
    quiz: true,
  },
]

function stageConcepts(level: ConceptLevel): Concept[] {
  if (level === 'beginner') return concepts
  // İkinci aşamada yalnızca çözümlerle doğrudan ilişkili kavramlar derinleşir.
  return concepts.filter((concept) => concept.relatedSolutions.length > 0)
}

export function buildLearningStages(): LearningStage[] {
  const ordered = [...lessons].sort(
    (a, b) => levelRank[a.level] - levelRank[b.level] || a.durationMin - b.durationMin,
  )

  return STAGES.map((stage) => {
    const stageLessons = ordered.filter((lesson) => stage.lessonLevels.includes(lesson.level))
    const stageConceptList = stageConcepts(stage.conceptLevel)
    const cards = Math.round(concepts.length * stage.cardShare)
    const minutes =
      stageLessons.reduce((total, lesson) => total + lesson.durationMin, 0) +
      stageConceptList.length * CONCEPT_MINUTES[stage.conceptLevel] +
      cards * 1 +
      (stage.quiz ? 10 : 0)

    return {
      id: stage.id,
      title: stage.title,
      lessons: stageLessons,
      concepts: stageConceptList,
      cards,
      quiz: stage.quiz,
      minutes,
    }
  })
}

export const learningStages = buildLearningStages()
export const totalPathMinutes = learningStages.reduce((total, stage) => total + stage.minutes, 0)
export const totalPathLessons = learningStages.reduce((total, stage) => total + stage.lessons.length, 0)
