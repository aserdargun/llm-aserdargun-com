import { describe, expect, it } from 'vitest'
import { solutions } from '@/data/solutions'
import { addSelection, parseCompareSelection, selectionsCrossCategories } from './compare'

describe('comparison selection', () => {
  it('ignores invalid slugs, removes duplicates, and caps at four', () => {
    const parsed = parseCompareSelection('vllm,vllm,missing,ollama,lm-studio,tensorrt-llm,sglang', solutions)
    expect(parsed.slugs).toEqual(['vllm', 'ollama', 'lm-studio', 'tensorrt-llm'])
    expect(parsed.invalid).toContain('missing')
  })

  it('does not add beyond four', () => {
    expect(addSelection(['vllm', 'ollama', 'lm-studio', 'tensorrt-llm'], 'sglang')).toHaveLength(4)
  })

  it('warns when architectural categories differ', () => {
    expect(selectionsCrossCategories(['tensorrt-llm', 'ollama'], solutions)).toBe(true)
    expect(selectionsCrossCategories(['tensorrt-llm', 'llama-cpp'], solutions)).toBe(false)
  })
})
