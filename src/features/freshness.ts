export const isStale = (verifiedAt: string, reference = '2026-08-12') => (Date.parse(reference) - Date.parse(verifiedAt)) / 86_400_000 > 180
