import { RouteErrorBoundary } from './RouteErrorBoundary'
import { Menu, X } from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { navigation, pick, useLocale } from '@/i18n/copy'
import { LocaleSwitch } from './LocaleSwitch'
import { ThemeToggle } from './ThemeToggle'
import { ATLAS_DATASET_REVIEWED_AT } from '@/data/atlas-meta'

const LearningStorageNotice = lazy(() => import('./LearningStorageNotice').then((module) => ({ default: module.LearningStorageNotice })))

export function AppShell() {
  const { locale: routeLocale } = useParams()
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const main = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const previousPath = useRef(location.pathname)
  useEffect(() => {
    setOpen(false)
    if (previousPath.current !== location.pathname) {
      if (typeof window.scrollTo === 'function') window.scrollTo(0, 0)
      main.current?.focus({ preventScroll: true })
      previousPath.current = location.pathname
    }
  }, [location.pathname])
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = pick(locale, 'LLM Atlas — Çalışma Zamanı ve Sunum Rehberi', 'LLM Atlas — Runtime & Serving Field Guide')
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = pick(
      locale,
      '31 LLM çalışma zamanı ve sunum çözümünü resmî kaynaklarla yedi mimari katmanda karşılaştırın.',
      'Compare 31 LLM runtime and serving solutions across seven architectural layers using official sources.',
    )
  }, [locale])
  if (routeLocale !== 'tr' && routeLocale !== 'en') return <Navigate to="/tr" replace />
  const links = [
    ['', navigation.atlas],
    ['/learn', navigation.learn],
    ['/explore', navigation.explore],
    ['/compare', navigation.compare],
    ['/guide', navigation.guide],
    ['/methodology', navigation.methodology],
  ] as const
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">{pick(locale, 'İçeriğe geç', 'Skip to content')}</a>
      <header className="site-header">
        <div className="shell header-inner">
          <NavLink to={`/${locale}`} className="brand" end>LLM <b>/</b> ATLAS</NavLink>
          <nav id="primary-navigation" onKeyDown={(event) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() } }} className={open ? 'main-nav open' : 'main-nav'} aria-label={pick(locale, 'Ana navigasyon', 'Primary navigation')}>
            {links.map(([path, label]) => <NavLink key={path} to={`/${locale}${path}`} end={path === ''} onClick={() => setOpen(false)}>{label[locale]}</NavLink>)}
          </nav>
          <div className="header-actions">
            <LocaleSwitch />
            <ThemeToggle />
            <button ref={menuButton} aria-controls="primary-navigation" className="menu-button" type="button" aria-label={pick(locale, 'Menüyü aç veya kapat', 'Toggle menu')} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>
      <main ref={main} tabIndex={-1} id="main-content"><RouteErrorBoundary key={location.pathname.replace(/^\/(en|tr)/, '')} locale={locale}><Suspense fallback={<div className="shell page-shell" role="status">{pick(locale, 'Sayfa yükleniyor…', 'Loading page…')}</div>}><Outlet />{location.pathname.includes('/learn') && <LearningStorageNotice />}</Suspense></RouteErrorBoundary></main>
      <footer className="site-footer">
        <div className="shell footer-inner"><div><strong>LLM / ATLAS</strong><p><a href="https://aserdargun.com/">aserdargun.com</a></p><p>{pick(locale, 'LLM çalışma zamanı ve sunum alan rehberi.', 'A field guide to LLM runtime and serving.')}</p></div><div className="footer-meta"><span>31 {pick(locale, 'çözüm', 'solutions')}</span><span>7 {pick(locale, 'katman', 'layers')}</span><span>{pick(locale, 'Kaynak erişim denetimi', 'Source endpoint review')}: {ATLAS_DATASET_REVIEWED_AT}</span></div></div>
      </footer>
    </div>
  )
}
