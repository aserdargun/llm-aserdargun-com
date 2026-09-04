import type { Locale, ProjectStatus } from '@/types/atlas'
import { projectStatusLabel } from '@/i18n/atlas-labels'

export function StatusBadge({ status, locale }: { status: ProjectStatus; locale: Locale }) {
  return <span className={`status status-${status}`}>{projectStatusLabel(locale, status)}</span>
}
