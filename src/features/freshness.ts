import { ATLAS_DATASET_REVIEWED_AT } from '@/data/atlas-meta'

export const isStale = (verifiedAt: string, reference = ATLAS_DATASET_REVIEWED_AT) => (Date.parse(reference) - Date.parse(verifiedAt)) / 86_400_000 > 180
