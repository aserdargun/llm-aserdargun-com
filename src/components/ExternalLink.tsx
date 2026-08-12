import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

export function ExternalLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return <a {...props} target="_blank" rel="noreferrer noopener">{children}<ExternalLinkIcon size={14} aria-hidden="true" /></a>
}
