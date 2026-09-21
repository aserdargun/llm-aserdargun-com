import { writeFileSync } from 'node:fs'
import { datasetRelease } from '../src/data/dataset-release'
import { concepts } from '../src/data/concepts'
import { flashcards } from '../src/data/flashcards'
import { quizzes } from '../src/data/quizzes'
import { lessons } from '../src/data/lessons'
import { learningDataSchema } from '../src/types/learning-schema'
import { categories } from '../src/data/categories'
import { solutions } from '../src/data/solutions'
import { atlasDataSchema } from '../src/types/schema'
import { sourceAudit } from '../src/data/source-audit'
import { portfolio } from '../src/data/portfolio'

const result = atlasDataSchema.safeParse({ categories, solutions })

if (!result.success) {
  for (const issue of result.error.issues) console.error(`${issue.path.join('.')}: ${issue.message}`)
  process.exit(1)
}

console.log(`Validated ${result.data.categories.length} categories and ${result.data.solutions.length} solutions.`)

const learning = learningDataSchema.safeParse({ concepts, flashcards, quizzes, lessons, solutionSlugs: solutions.map((s) => s.slug) })
if (!learning.success) {
  for (const issue of learning.error.issues) console.error(`${issue.path.join('.')}: ${issue.message}`)
  process.exit(1)
}
console.log(`Validated ${concepts.length} concepts, ${flashcards.length} flashcards, ${quizzes.length} questions and ${lessons.length} lessons.`)

const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value
for (const [collection, version] of Object.entries(datasetRelease.collections)) {
  if (!Number.isInteger(version.schemaVersion) || version.schemaVersion < 1 || !validDate(version.revision)) throw new Error(`Invalid version for ${collection}`)
  if (!datasetRelease.evidence.some((entry) => (entry.collections as readonly string[]).includes(collection)) && collection !== 'sourceAudit') throw new Error(`Missing revision evidence for ${collection}`)
}
for (const entry of datasetRelease.evidence) {
  if (!validDate(entry.checkedAt) || !entry.url.startsWith('https://')) throw new Error(`Invalid evidence: ${entry.topic}`)
  for (const collection of entry.collections) if (!(collection in datasetRelease.collections)) throw new Error(`Unknown evidence collection: ${collection}`)
}
if (!validDate(sourceAudit.checkedAt) || sourceAudit.entries.length !== solutions.length || new Set(sourceAudit.entries.map((entry) => entry.solution)).size !== solutions.length) throw new Error('Source endpoint audit must cover each solution exactly once')
for (const entry of sourceAudit.entries) {
  if (!solutions.some((solution) => solution.slug === entry.solution && solution.sources.some((source) => source.url === entry.url))) throw new Error(`Unmatched audit endpoint: ${entry.solution}`)
}
for (const route of portfolio.routes) {
  if (new URL(route.href).hostname !== `${route.code}.aserdargun.com` || !route.title.tr || !route.title.en || !route.description.tr || !route.description.en) throw new Error(`Invalid portfolio route: ${route.code}`)
}

writeFileSync(new URL('../public/dataset-release.json', import.meta.url), JSON.stringify(datasetRelease, null, 2) + '\n')
writeFileSync(new URL('../public/atlas-data.json', import.meta.url), JSON.stringify({
  datasetRelease, sourceAudit, portfolio, categories, solutions, concepts, flashcards, quizzes, lessons,
}, null, 2) + '\n')
