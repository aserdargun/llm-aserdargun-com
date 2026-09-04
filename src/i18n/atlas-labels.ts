import type { Locale, ProjectStatus, SourceType } from '@/types/atlas'

const turkishValues: Record<string, string> = {
  'Backend-dependent': 'Arka uca bağlı',
  Browser: 'Tarayıcı',
  Cloud: 'Bulut',
  'Cloud APIs': 'Bulut API’leri',
  Cluster: 'Küme',
  Container: 'Konteyner',
  Desktop: 'Masaüstü',
  Edge: 'Uç',
  Embedded: 'Gömülü',
  Local: 'Yerel',
  'Local API': 'Yerel API',
  Mobile: 'Mobil',
  'Mobile GPU': 'Mobil GPU',
  'OpenAI-compatible': 'OpenAI uyumlu',
  'OpenAI-compatible servers': 'OpenAI uyumlu sunucular',
  'OpenAI-like API': 'OpenAI benzeri API',
  'Provider APIs': 'Sağlayıcı API’leri',
  'Provider-dependent': 'Sağlayıcıya bağlı',
  Server: 'Sunucu',
}

export const displayAtlasValue = (locale: Locale, value: string) => locale === 'tr' ? (turkishValues[value] ?? value) : value

export const displayAtlasValues = (locale: Locale, values: string[]) => values.map((value) => displayAtlasValue(locale, value)).join(' · ')

export const projectStatusLabel = (locale: Locale, status: ProjectStatus) => ({
  active: locale === 'tr' ? 'Aktif' : 'Active',
  mature: locale === 'tr' ? 'Olgun' : 'Mature',
  preview: locale === 'tr' ? 'Önizleme' : 'Preview',
  maintenance: locale === 'tr' ? 'Bakım kipi' : 'Maintenance',
  archived: locale === 'tr' ? 'Arşivlendi' : 'Archived',
})[status]

export const sourceTypeLabel = (locale: Locale, sourceType: SourceType) => ({
  'official-docs': locale === 'tr' ? 'Resmî dokümantasyon' : 'Official documentation',
  'official-repository': locale === 'tr' ? 'Resmî proje deposu' : 'Official project repository',
})[sourceType]
