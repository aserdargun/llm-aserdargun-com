import { describe, expect, it } from 'vitest'
import { localeFromPath, localizePath } from './locale'

describe('locale routing', () => {
  it('parses supported locales and defaults to Turkish', () => {
    expect(localeFromPath('/en/explore')).toBe('en')
    expect(localeFromPath('/fr/explore')).toBe('tr')
  })

  it('changes only the locale segment while preserving search and hash', () => {
    expect(localizePath('/tr/explore?category=INF&compare=vllm#results', 'en')).toBe('/en/explore?category=INF&compare=vllm#results')
  })
})
