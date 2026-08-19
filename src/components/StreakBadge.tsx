import { Flame } from 'lucide-react'
import { pick, useLocale } from '@/i18n/copy'

export function StreakBadge({ days, longest }: { days: number; longest: number }) {
  const locale = useLocale()
  return (
    <span className="streak-badge" title={pick(locale, 'En uzun seri', 'Longest streak') + `: ${longest}`}>
      <Flame size={16} aria-hidden="true" />
      <strong>{days}</strong>
      <span className="streak-badge__label">{pick(locale, 'gün', 'days')}</span>
    </span>
  )
}
