import { z } from 'zod'

const text = z.object({ tr: z.string().trim().min(1), en: z.string().trim().min(1) })
const slugs = z.array(z.string().min(1))
const visual = z.enum(['token-grid', 'kv-cache', 'pipeline', 'quantize', 'attention', 'context-window', 'embedding', 'gpu-mesh', 'batching', 'tree'])
const question = { id: z.string().min(1), prompt: text, tags: slugs.min(1) }

export const learningDataSchema = z.object({
  solutionSlugs: slugs,
  concepts: z.array(z.object({
    sources: z.array(z.string().url().startsWith('https://')).optional(),
    slug: z.string().min(1), name: text, short: text, beginner: text, intermediate: text, advanced: text,
    category: z.enum(['core', 'serving', 'optimization', 'hardware', 'app']), visual,
    relatedConcepts: slugs, relatedSolutions: slugs,
  })).min(1),
  flashcards: z.array(z.object({
    id: z.string().min(1), source: z.enum(['concept', 'solution']), refSlug: z.string().min(1),
    front: text, back: text, hint: text.optional(), tags: slugs.min(1),
  })).min(1),
  quizzes: z.array(z.discriminatedUnion('kind', [
    z.object({ ...question, kind: z.literal('mcq'), options: z.array(text).min(2), correct: z.number().int().nonnegative(), explain: text }),
    z.object({ ...question, kind: z.literal('truefalse'), correct: z.boolean(), explain: text }),
    z.object({ ...question, kind: z.literal('match'), pairs: z.array(z.object({ left: text, right: text })).min(2) }),
  ])).min(1),
  lessons: z.array(z.object({
    slug: z.string().min(1), title: text, summary: text, level: z.enum(['starter', 'intermediate']), durationMin: z.number().positive(),
    steps: z.array(z.object({
      title: text, body: text, visual: visual.optional(),
      codeBlock: z.object({ lang: z.string().min(1), code: z.string().min(1) }).optional(),
      tryIt: z.object({ label: text, href: z.string().url().startsWith('https://') }).optional(),
    })).min(1),
    relatedConcepts: slugs, relatedSolutions: slugs,
  })).min(1),
}).superRefine((data, ctx) => {
  const conceptSlugs = new Set(data.concepts.map((c) => c.slug))
  const solutionSlugs = new Set(data.solutionSlugs)
  const issue = (path: (string | number)[], message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, path, message })
  for (const collection of ['concepts', 'flashcards', 'quizzes', 'lessons'] as const) {
    const seen = new Set<string>()
    data[collection].forEach((entry, index) => {
      const id = 'slug' in entry ? entry.slug : entry.id
      if (seen.has(id)) issue([collection, index], `Duplicate identifier ${id}`)
      seen.add(id)
    })
  }
  for (const collection of ['concepts', 'lessons'] as const) {
    data[collection].forEach((entry, index) => {
      entry.relatedConcepts.forEach((slug) => { if (!conceptSlugs.has(slug)) issue([collection, index, 'relatedConcepts'], `Unknown concept ${slug}`) })
      entry.relatedSolutions.forEach((slug) => { if (!solutionSlugs.has(slug)) issue([collection, index, 'relatedSolutions'], `Unknown solution ${slug}`) })
    })
  }
  data.flashcards.forEach((card, index) => {
    if (!(card.source === 'concept' ? conceptSlugs : solutionSlugs).has(card.refSlug)) issue(['flashcards', index, 'refSlug'], `Unknown card reference ${card.refSlug}`)
  })
  data.quizzes.forEach((quiz, index) => {
    if (quiz.kind === 'mcq' && quiz.correct >= quiz.options.length) issue(['quizzes', index, 'correct'], 'Correct option is outside the answer list')
  })
})
