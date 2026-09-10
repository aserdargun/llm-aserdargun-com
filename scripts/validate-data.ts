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

writeFileSync(new URL('../public/dataset-release.json', import.meta.url), JSON.stringify(datasetRelease, null, 2) + '\n')
