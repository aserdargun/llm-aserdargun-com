import type { Locale, ProjectStatus } from '@/types/atlas'
import { pick } from '@/i18n/copy'

export function StatusBadge({ status, locale }: { status: ProjectStatus; locale: Locale }) {
  const labels: Record<ProjectStatus, string> = { active: pick(locale, 'Aktif', 'Active'), mature: pick(locale, 'Olgun', 'Mature'), preview: pick(locale, 'Önizleme', 'Preview'), maintenance: pick(locale, 'Bakım kipi', 'Maintenance') }
  return <span className={`status status-${status}`}>{labels[status]}</span>
}
