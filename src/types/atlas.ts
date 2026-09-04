export type Locale = 'tr' | 'en'
export type CategoryId = 'INF' | 'SRV' | 'RUN' | 'APP' | 'DST' | 'GTW' | 'EDG'
export type ProjectStatus = 'active' | 'mature' | 'preview' | 'maintenance' | 'archived'
export type SourceType = 'official-docs' | 'official-repository'

export interface LocalizedText { tr: string; en: string }
export interface LocalizedList { tr: string[]; en: string[] }

export interface Category {
  id: CategoryId
  slug: string
  name: LocalizedText
  summary: LocalizedText
  responsibility: LocalizedText
  notFor: LocalizedText
  order: number
}

export interface Source {
  title: string
  publisher: string
  url: string
  sourceType: SourceType
  supportsClaims: string[]
  verifiedAt: string
}

export interface Solution {
  id: string
  slug: string
  name: string
  primaryCategory: CategoryId
  capabilityTags: string[]
  summary: LocalizedText
  description: LocalizedText
  notFor: LocalizedText
  strengths: LocalizedList
  limitations: LocalizedList
  idealFor: LocalizedList
  executionBackends: string[]
  hardware: string[]
  modelFormats: string[]
  apiProtocols: string[]
  deploymentScopes: string[]
  license: string
  projectStatus: ProjectStatus
  alternatives: string[]
  sources: Source[]
  lastVerified: string
}

export interface AtlasData { categories: Category[]; solutions: Solution[] }
