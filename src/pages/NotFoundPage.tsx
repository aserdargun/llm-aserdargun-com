import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pick, useLocale } from '@/i18n/copy'

export function NotFoundPage() {
  const locale = useLocale()
  return <div className="shell page-shell not-found"><span className="mono">404</span><h1>{pick(locale, 'Bu katman haritada yok.', 'This layer is not on the map.')}</h1><p>{pick(locale, 'Adres değişmiş olabilir veya bağlantı geçersiz.', 'The address may have changed or the link is invalid.')}</p><Link className="button primary" to={`/${locale}`}><ArrowLeft size={17} />{pick(locale, 'Atlas’a dön', 'Back to Atlas')}</Link></div>
}
