import { categories } from '../src/data/categories'
import { solutions } from '../src/data/solutions'
import { atlasDataSchema } from '../src/types/schema'

const result = atlasDataSchema.safeParse({ categories, solutions })

if (!result.success) {
  for (const issue of result.error.issues) console.error(`${issue.path.join('.')}: ${issue.message}`)
  process.exit(1)
}

console.log(`Validated ${result.data.categories.length} categories and ${result.data.solutions.length} solutions.`)
