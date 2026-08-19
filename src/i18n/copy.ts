import { useParams } from 'react-router-dom'
import type { Locale, LocalizedText } from '@/types/atlas'

export const pick = (locale: Locale, tr: string, en: string) => locale === 'tr' ? tr : en
export const localized = (locale: Locale, value: LocalizedText) => value[locale]
export const useLocale = (): Locale => useParams().locale === 'en' ? 'en' : 'tr'

export const navigation = {
  atlas: { tr: 'Atlas', en: 'Atlas' },
  learn: { tr: 'Öğren', en: 'Learn' },
  explore: { tr: 'Keşfet', en: 'Explore' },
  compare: { tr: 'Karşılaştır', en: 'Compare' },
  guide: { tr: 'Seçim Rehberi', en: 'Selection Guide' },
  methodology: { tr: 'Metodoloji', en: 'Methodology' },
} as const
