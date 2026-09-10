import { describe, expect, it } from 'vitest'
import { matchGuide, type GuideAnswers } from './matcher'

describe('selection guide matcher', () => {
  it.each([
    [{ hardware: 'apple', scope: 'local', interface: 'desktop', scale: 'single', platform: 'none' }, 'lm-studio'],
    [{ hardware: 'nvidia', scope: 'local', interface: 'developer', scale: 'single', platform: 'none' }, 'ollama'],
    [{ hardware: 'nvidia', scope: 'production', interface: 'api', scale: 'multi', platform: 'server' }, 'vllm'],
    [{ hardware: 'nvidia', scope: 'production', interface: 'api', scale: 'cluster', platform: 'kubernetes' }, 'kserve'],
    [{ hardware: 'edge', scope: 'device', interface: 'app', scale: 'single', platform: 'browser' }, 'webllm'],
  ] satisfies [GuideAnswers, string][])('returns a justified shortlist for %o', (answers, expected) => {
    const result = matchGuide(answers)
    expect(result.map(({ slug }) => slug)).toContain(expected)
    expect(result[0]?.reason.tr.length).toBeGreaterThan(10)
  })
})

it('does not recommend GPU-only serving engines for CPU-only production', () => {
  const matches = matchGuide({ hardware: 'cpu', scope: 'production', interface: 'api', scale: 'multi', platform: 'server' })
  expect(matches.map((m) => m.slug)).toContain('vllm')
  expect(matches.map((m) => m.slug)).not.toContain('sglang')
})
it('routes native mobile inference to device runtimes', () => {
  expect(matchGuide({ hardware: 'edge', scope: 'device', interface: 'app', scale: 'single', platform: 'none' }).map((m) => m.slug)).toContain('executorch')
})
it('does not silently ignore conflicting browser and cluster requirements', () => {
  expect(matchGuide({ hardware: 'edge', scope: 'production', interface: 'api', scale: 'cluster', platform: 'browser' })).toEqual([])
})
it('honors Apple hardware when serving APIs', () => {
  const matches = matchGuide({ hardware: 'apple', scope: 'production', interface: 'api', scale: 'multi', platform: 'server' })
  expect(matches.map((m) => m.slug)).toContain('llama-cpp')
  expect(matches.map((m) => m.slug)).not.toContain('vllm')
})
