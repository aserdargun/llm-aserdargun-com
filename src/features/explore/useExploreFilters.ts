import { useSearchParams } from 'react-router-dom'
import { emptyExploreState, parseExploreState, serializeExploreState, type ExploreState, type FilterKey } from './filters'

export function useExploreFilters() {
  const [params, setParams] = useSearchParams()
  const state = parseExploreState(params)
  const commit = (next: ExploreState) => {
    const compare = params.get('compare')
    const serialized = serializeExploreState(next)
    if (compare) serialized.set('compare', compare)
    setParams(serialized, { replace: true })
  }
  return {
    state,
    setQuery: (q: string) => commit({ ...state, q }),
    setView: (view: ExploreState['view']) => commit({ ...state, view }),
    toggle: (key: FilterKey, value: string) => commit({ ...state, [key]: state[key].includes(value) ? state[key].filter((item) => item !== value) : [...state[key], value] }),
    clear: () => commit(emptyExploreState()),
  }
}
