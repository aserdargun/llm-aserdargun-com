import { z } from 'zod'

const localizedTextSchema = z.object({ tr: z.string().min(1), en: z.string().min(1) })
const localizedListSchema = z.object({ tr: z.array(z.string().min(1)).min(1), en: z.array(z.string().min(1)).min(1) })
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD')
const categoryIdSchema = z.enum(['INF', 'SRV', 'RUN', 'APP', 'DST', 'GTW', 'EDG'])

export const categorySchema = z.object({
  id: categoryIdSchema,
  slug: z.string().min(2),
  name: localizedTextSchema,
  summary: localizedTextSchema,
  responsibility: localizedTextSchema,
  notFor: localizedTextSchema,
  order: z.number().int().min(1).max(7),
})

export const solutionSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  primaryCategory: categoryIdSchema,
  capabilityTags: z.array(z.string().min(1)).min(1),
  summary: localizedTextSchema,
  description: localizedTextSchema,
  notFor: localizedTextSchema,
  strengths: localizedListSchema,
  limitations: localizedListSchema,
  idealFor: localizedListSchema,
  executionBackends: z.array(z.string().min(1)).min(1),
  hardware: z.array(z.string().min(1)).min(1),
  modelFormats: z.array(z.string().min(1)).min(1),
  apiProtocols: z.array(z.string().min(1)).min(1),
  deploymentScopes: z.array(z.string().min(1)).min(1),
  license: z.string().min(1),
  projectStatus: z.enum(['active', 'mature', 'preview', 'maintenance', 'archived']),
  alternatives: z.array(z.string()),
  sources: z.array(z.object({
    title: z.string().min(1),
    publisher: z.string().min(1),
    url: z.string().url().startsWith('https://'),
    sourceType: z.enum(['official-docs', 'official-repository']),
    supportsClaims: z.array(z.string().min(1)).min(1),
    verifiedAt: isoDate,
  })).min(1),
  lastVerified: isoDate,
})

export const atlasDataSchema = z.object({
  categories: z.array(categorySchema).length(7),
  solutions: z.array(solutionSchema).length(31),
}).superRefine((data, ctx) => {
  const categoryIds = new Set(data.categories.map(({ id }) => id))
  const solutionSlugs = new Set<string>()
  data.solutions.forEach((solution, index) => {
    if (!categoryIds.has(solution.primaryCategory)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['solutions', index, 'primaryCategory'], message: `Unknown category on ${solution.slug}` })
    if (solutionSlugs.has(solution.slug)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['solutions', index, 'slug'], message: `Duplicate solution slug ${solution.slug}` })
    solutionSlugs.add(solution.slug)
  })
  data.solutions.forEach((solution, index) => solution.alternatives.forEach((slug, alternativeIndex) => {
    if (!solutionSlugs.has(slug)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['solutions', index, 'alternatives', alternativeIndex], message: `Unknown alternative ${slug}` })
  }))
})
