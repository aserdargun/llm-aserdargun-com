import { Component, type ReactNode } from 'react'
import type { Locale } from '@/types/atlas'

export class RouteErrorBoundary extends Component<{ children: ReactNode; locale: Locale }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    const tr = this.props.locale === 'tr'
    return <section className="shell page-shell" role="alert">
      <h1>{tr ? 'Sayfa açılamadı' : 'Could not open this page'}</h1>
      <p>{tr ? 'Bağlantınızı kontrol edip yeniden deneyin. Kaydedilmiş öğrenme ilerlemeniz korunur.' : 'Check your connection and try again. Your saved learning progress is preserved.'}</p>
      <button className="button primary" type="button" onClick={() => window.location.reload()}>{tr ? 'Yeniden dene' : 'Try again'}</button>
    </section>
  }
}
