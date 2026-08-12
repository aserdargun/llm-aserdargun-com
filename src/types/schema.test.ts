import { describe, expect, it } from 'vitest'
import { categories } from '@/data/categories'
import { solutions } from '@/data/solutions'
import { atlasDataSchema } from './schema'

describe('atlas data schema', () => {
  it('accepts the curated atlas collections', () => {
    expect(() => atlasDataSchema.parse({ categories, solutions })).not.toThrow()
  })

  it('reports the record and field for malformed official sources', () => {
    const invalid = structuredClone(solutions)
    invalid[0]!.sources[0]!.url = 'not-a-url'
    const result = atlasDataSchema.safeParse({ categories, solutions: invalid })
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error.issues[0]?.path).toEqual(['solutions', 0, 'sources', 0, 'url'])
  })
})
