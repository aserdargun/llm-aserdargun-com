import { useRef, useState } from 'react'
import type { ReactNode } from 'react'

const TOOLTIP_WIDTH = 280
const GAP = 8
const ESTIMATED_HEIGHT = 80

/**
 * Jargon terimini noktalı alt çizgiyle işaretler ve üzerine gelindiğinde
 * (veya klavyeyle odaklanıldığında) kısa bir açıklama balonu gösterir.
 * Balon `position: fixed` ile görünüm alanına göre konumlanır, böylece
 * `overflow` içeren tablo ve filtre kaplarında bile kırpılmaz.
 */
export function Term({ children, tip }: { children: ReactNode; tip: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [state, setState] = useState({ shown: false, top: 0, left: 0 })

  const show = () => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    let left = rect.left
    if (left + TOOLTIP_WIDTH > viewportWidth - GAP) left = Math.max(GAP, viewportWidth - TOOLTIP_WIDTH - GAP)
    let top = rect.bottom + GAP
    if (top + ESTIMATED_HEIGHT > viewportHeight) top = Math.max(GAP, rect.top - ESTIMATED_HEIGHT - GAP)
    setState({ shown: true, top, left })
  }
  const hide = () => setState((current) => ({ ...current, shown: false }))

  return (
    <span className="term" ref={ref} tabIndex={0} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      <span className={state.shown ? 'term-tooltip is-visible' : 'term-tooltip'} role="tooltip" style={{ top: state.top, left: state.left }}>{tip}</span>
    </span>
  )
}
