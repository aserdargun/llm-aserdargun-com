import type { Locale } from '@/types/atlas'

export const localeFromPath = (pathname: string): Locale => pathname.split('/')[1] === 'en' ? 'en' : 'tr'

export const localizePath = (path: string, locale: Locale): string => {
  const [beforeHash, hash = ''] = path.split('#')
  const [pathname, search = ''] = (beforeHash ?? '').split('?')
  const parts = (pathname || '/').split('/').filter(Boolean)
  if (parts[0] === 'tr' || parts[0] === 'en') parts[0] = locale
  else parts.unshift(locale)
  return `/${parts.join('/')}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`
}
