import type { Locale, Solution } from '@/types/atlas'

export const filterKeys = ['category', 'hardware', 'backend', 'format', 'protocol', 'scope', 'status'] as const
export type FilterKey = typeof filterKeys[number]
export interface ExploreState {
  q: string
  category: string[]
  hardware: string[]
  backend: string[]
  format: string[]
  protocol: string[]
  scope: string[]
  status: string[]
  view: 'list' | 'card'
}

export const emptyExploreState = (): ExploreState => ({ q: '', category: [], hardware: [], backend: [], format: [], protocol: [], scope: [], status: [], view: 'list' })

export function parseExploreState(params: URLSearchParams): ExploreState {
  const state = emptyExploreState()
  state.q = params.get('q')?.trim() ?? ''
  for (const key of filterKeys) state[key] = params.getAll(key).filter(Boolean)
  state.view = params.get('view') === 'card' ? 'card' : 'list'
  return state
}

export function serializeExploreState(state: ExploreState): URLSearchParams {
  const params = new URLSearchParams()
  if (state.q) params.set('q', state.q)
  for (const key of filterKeys) for (const value of state[key]) params.append(key, value)
  if (state.view === 'card') params.set('view', 'card')
  return params
}

const includesOne = (actual: string[], wanted: string[]) => wanted.length === 0 || wanted.some((value) => actual.includes(value))

export function filterSolutions(items: Solution[], state: ExploreState, locale: Locale): Solution[] {
  const query = state.q.toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-US')
  return items.filter((item) => {
    const searchable = [item.name, item.primaryCategory, item.summary[locale], item.description[locale], ...item.capabilityTags].join(' ').toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-US')
    return (!query || searchable.includes(query))
      && (!state.category.length || state.category.includes(item.primaryCategory))
      && includesOne(item.hardware, state.hardware)
      && includesOne(item.executionBackends, state.backend)
      && includesOne(item.modelFormats, state.format)
      && includesOne(item.apiProtocols, state.protocol)
      && includesOne(item.deploymentScopes, state.scope)
      && (!state.status.length || state.status.includes(item.projectStatus))
  })
}
