import { RotateCcw } from 'lucide-react'

export function EmptyState({ title, body, action, onAction }: { title: string; body: string; action: string; onAction: () => void }) {
  return <div className="empty-state"><h2>{title}</h2><p>{body}</p><button className="button secondary" type="button" onClick={onAction}><RotateCcw size={16} />{action}</button></div>
}
