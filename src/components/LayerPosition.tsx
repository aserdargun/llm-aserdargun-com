import type { CSSProperties } from 'react'
import { categories } from '@/data/categories'
import { layerColors } from '@/features/layers'
import { pick, useLocale } from '@/i18n/copy'
import type { CategoryId } from '@/types/atlas'

export function LayerPosition({ current }: { current: CategoryId }) {
  const locale = useLocale()
  const currentCategory = categories.find((category) => category.id === current)!
  return (
    <section className="layer-position" aria-label={pick(locale, 'Katman konumu', 'Layer position')}>
      <div className="layer-position-head">
        <span className="mono">{pick(locale, 'YIĞININ NERESİNDE', 'WHERE IN THE STACK')}</span>
        <strong style={{ color: layerColors[current] }}>{currentCategory.name[locale]}</strong>
      </div>
      <div className="layer-position-bar">
        {categories.map((category) => (
          <div key={category.id} className={category.id === current ? 'is-current' : ''} title={category.name[locale]} style={{ '--layer-color': layerColors[category.id] } as CSSProperties}>
            <span className="mono">{category.id}</span>
          </div>
        ))}
      </div>
      <p className="layer-position-caption">{pick(locale, 'Bu araç', 'This tool works in the')} <strong style={{ color: layerColors[current] }}>{currentCategory.name[locale]}</strong> {pick(locale, 'katmanında çalışır. Diğer katmanlar farklı işler yapar.', 'layer. The other layers do different jobs.')}</p>
    </section>
  )
}
