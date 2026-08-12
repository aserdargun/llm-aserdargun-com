import type { Solution } from '@/types/atlas'

export function parseCompareSelection(raw: string | null, items: Solution[]) {
  const known = new Set(items.map(({ slug }) => slug))
  const invalid: string[] = []
  const slugs: string[] = []
  for (const slug of (raw ?? '').split(',').filter(Boolean)) {
    if (!known.has(slug)) invalid.push(slug)
    else if (!slugs.includes(slug) && slugs.length < 4) slugs.push(slug)
  }
  return { slugs, invalid }
}

export const addSelection = (selected: string[], slug: string) => selected.includes(slug) || selected.length >= 4 ? selected : [...selected, slug]
export const removeSelection = (selected: string[], slug: string) => selected.filter((item) => item !== slug)

export function selectionsCrossCategories(selected: string[], items: Solution[]): boolean {
  const categories = new Set(items.filter(({ slug }) => selected.includes(slug)).map(({ primaryCategory }) => primaryCategory))
  return categories.size > 1
}
