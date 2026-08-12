import { describe, expect, it } from 'vitest'
import { matchGuide, type GuideAnswers } from './matcher'

describe('selection guide matcher', () => {
  it.each([
    [{ hardware: 'apple', scope: 'local', interface: 'desktop', scale: 'single', platform: 'none' }, 'mlx-lm'],
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
