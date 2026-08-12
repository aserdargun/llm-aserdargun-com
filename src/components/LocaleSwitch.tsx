import { Languages } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { localizePath } from '@/i18n/locale'
import { useLocale } from '@/i18n/copy'

export function LocaleSwitch() {
  const locale = useLocale()
  const location = useLocation()
  const target = locale === 'tr' ? 'en' : 'tr'
  const path = `${location.pathname}${location.search}${location.hash}`
  return <Link className="locale-switch" to={localizePath(path, target)} aria-label={locale === 'tr' ? 'Switch to English' : 'Türkçeye geç'}><Languages size={16} aria-hidden="true" /><span className={locale === 'tr' ? 'active' : ''}>TR</span><span aria-hidden="true">/</span><span className={locale === 'en' ? 'active' : ''}>EN</span></Link>
}
