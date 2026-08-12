import { useSearchParams } from 'react-router-dom'
import { solutions } from '@/data/solutions'
import { addSelection, parseCompareSelection, removeSelection } from './compare'

export function useCompareSelection() {
  const [params, setParams] = useSearchParams()
  const parsed = parseCompareSelection(params.get('compare'), solutions)
  const commit = (slugs: string[]) => {
    const next = new URLSearchParams(params)
    if (slugs.length) next.set('compare', slugs.join(','))
    else next.delete('compare')
    setParams(next, { replace: true })
  }
  return {
    selected: parsed.slugs,
    invalid: parsed.invalid,
    add: (slug: string) => commit(addSelection(parsed.slugs, slug)),
    remove: (slug: string) => commit(removeSelection(parsed.slugs, slug)),
    clear: () => commit([]),
    toggle: (slug: string) => commit(parsed.slugs.includes(slug) ? removeSelection(parsed.slugs, slug) : addSelection(parsed.slugs, slug)),
  }
}
