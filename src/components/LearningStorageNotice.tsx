import { useProgress } from '@/features/learning/progress'
import { pick, useLocale } from '@/i18n/copy'

export function LearningStorageNotice() {
  const { persistent } = useProgress()
  const locale = useLocale()
  if (persistent) return null
  return <p className="shell notice" role="status">{pick(locale,
    'Tarayıcı ilerlemeyi kaydedemiyor. Bu oturumda öğrenmeye devam edebilirsiniz; sayfa yeniden yüklenirse yeni ilerleme kaybolur.',
    'Your browser cannot save progress. You can keep learning in this session; new progress will be lost if the page reloads.',
  )}</p>
}
