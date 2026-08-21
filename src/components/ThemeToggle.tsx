import { Moon, Sun } from 'lucide-react'
import { useLocale } from '@/i18n/copy'
import { useTheme } from '@/theme/theme-context'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const locale = useLocale()
  const isDark = theme === 'dark'
  const label = locale === 'tr'
    ? (isDark ? 'Aydınlık temaya geç' : 'Karanlık temaya geç')
    : (isDark ? 'Switch to light theme' : 'Switch to dark theme')
  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <Sun className="theme-toggle-sun" size={13} aria-hidden="true" />
      <Moon className="theme-toggle-moon" size={13} aria-hidden="true" />
      <span className="theme-toggle-thumb" aria-hidden="true" />
    </button>
  )
}
