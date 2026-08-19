import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useParams } from 'react-router-dom'
import { navigation, pick, useLocale } from '@/i18n/copy'
import { LocaleSwitch } from './LocaleSwitch'

export function AppShell() {
  const { locale: routeLocale } = useParams()
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  if (routeLocale !== 'tr' && routeLocale !== 'en') return <Navigate to="/tr" replace />
  const links = [
    ['', navigation.atlas],
    ['/learn', navigation.learn],
    ['/explore', navigation.explore],
    ['/compare', navigation.compare],
    ['/learn', navigation.learn],
    ['/guide', navigation.guide],
    ['/methodology', navigation.methodology],
  ] as const
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">{pick(locale, 'İçeriğe geç', 'Skip to content')}</a>
      <header className="site-header">
        <div className="shell header-inner">
          <NavLink to={`/${locale}`} className="brand" end>LLM <b>/</b> ATLAS</NavLink>
          <nav className={open ? 'main-nav open' : 'main-nav'} aria-label={pick(locale, 'Ana navigasyon', 'Primary navigation')}>
            {links.map(([path, label]) => <NavLink key={path} to={`/${locale}${path}`} end={path === ''} onClick={() => setOpen(false)}>{label[locale]}</NavLink>)}
          </nav>
          <div className="header-actions">
            <LocaleSwitch />
            <button className="menu-button" type="button" aria-label={pick(locale, 'Menüyü aç veya kapat', 'Toggle menu')} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>
      <main id="main-content"><Outlet /></main>
      <footer className="site-footer">
        <div className="shell footer-inner"><div><strong>LLM / ATLAS</strong><p>{pick(locale, 'LLM Runtime & Serving alan rehberi.', 'A field guide to LLM Runtime & Serving.')}</p></div><div className="footer-meta"><span>31 {pick(locale, 'çözüm', 'solutions')}</span><span>7 {pick(locale, 'katman', 'layers')}</span><span>{pick(locale, 'Doğrulandı', 'Verified')}: 2026-08-12</span></div></div>
      </footer>
    </div>
  )
}
