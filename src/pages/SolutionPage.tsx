import { ArrowLeft, BookOpen, CalendarCheck, CheckCircle2, Layers3, XCircle } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ExternalLink } from '@/components/ExternalLink'
import { LayerPosition } from '@/components/LayerPosition'
import { StatusBadge } from '@/components/StatusBadge'
import { Term } from '@/components/Term'
import { categories } from '@/data/categories'
import { concepts } from '@/data/concepts'
import { solutions } from '@/data/solutions'
import { isStale } from '@/features/freshness'
import { fieldTip } from '@/features/glossary'
import { layerColors } from '@/features/layers'
import { pick, useLocale } from '@/i18n/copy'

export function SolutionPage() {
  const locale = useLocale()
  const { slug } = useParams()
  const solution = solutions.find((item) => item.slug === slug)
  const learnConcepts = useMemo(
    () => concepts.filter((c) => c.relatedSolutions.includes(solution?.slug ?? '')),
    [solution?.slug],
  )
  if (!solution) return <div className="shell page-shell missing-page"><h1>{pick(locale, 'Çözüm bulunamadı', 'Solution not found')}</h1><p>{pick(locale, 'Bu kayıt atlas veri kümesinde yok.', 'This record is not in the atlas dataset.')}</p><Link className="button primary" to={`/${locale}/explore`}>{pick(locale, 'Keşfe dön', 'Back to Explore')}</Link></div>
  const category = categories.find(({ id }) => id === solution.primaryCategory)!
  return <article className="shell page-shell detail-page">
    <Link className="back-link" to={`/${locale}/explore`}><ArrowLeft size={17} />{pick(locale, 'Keşfe dön', 'Back to Explore')}</Link>
    <header className="detail-header"><div><span className="mono detail-code" style={{ color: layerColors[solution.primaryCategory] }}>{solution.primaryCategory} · {category.name[locale]}</span><h1>{solution.name}</h1><p>{solution.summary[locale]}</p></div><div className="detail-status"><StatusBadge status={solution.projectStatus} locale={locale} /><span><CalendarCheck size={17} />{pick(locale, 'Son doğrulama', 'Last verified')} {solution.lastVerified}</span></div></header>
    <LayerPosition current={solution.primaryCategory} />
    {solution.projectStatus === 'maintenance' && <div className="layer-warning" role="alert">{pick(locale, 'Bu proje bakım kipinde tutuluyor ve yeni dağıtımlar için varsayılan öneri değil.', 'This project is maintained in maintenance mode and is not the default recommendation for new deployments.')}</div>}
    {isStale(solution.lastVerified) && <div className="notice" role="status">{pick(locale, 'Bu kayıt yeniden doğrulama eşiğini aştı.', 'This record has passed the reverification threshold.')}</div>}
    <div className="detail-intro"><section><CheckCircle2 /><div><h2>{pick(locale, 'Ne yapar', 'What it does')}</h2><p>{solution.description[locale]}</p></div></section><section><XCircle /><div><h2>{pick(locale, 'Ne yapmaz', 'What it does not do')}</h2><p>{solution.notFor[locale]}</p></div></section></div>
    <div className="detail-columns"><section><h2>{pick(locale, 'Güçlü yönler', 'Strengths')}</h2><ul>{solution.strengths[locale].map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>{pick(locale, 'Sınırlamalar', 'Limitations')}</h2><ul>{solution.limitations[locale].map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>{pick(locale, 'İdeal kullanım', 'Ideal for')}</h2><ul>{solution.idealFor[locale].map((item) => <li key={item}>{item}</li>)}</ul></section></div>
    <section className="compatibility"><div className="section-heading"><Layers3 /><h2>{pick(locale, 'Uyumluluk görünümü', 'Compatibility view')}</h2></div><dl><div><dt><Term tip={fieldTip('hardware', locale)}>{pick(locale, 'Donanım', 'Hardware')}</Term></dt><dd>{solution.hardware.join(' · ')}</dd></div><div><dt><Term tip={fieldTip('backend', locale)}>{pick(locale, 'Arka uçlar', 'Backends')}</Term></dt><dd>{solution.executionBackends.join(' · ')}</dd></div><div><dt><Term tip={fieldTip('format', locale)}>{pick(locale, 'Model formatları', 'Model formats')}</Term></dt><dd>{solution.modelFormats.join(' · ')}</dd></div><div><dt><Term tip={fieldTip('protocol', locale)}>{pick(locale, 'API protokolleri', 'API protocols')}</Term></dt><dd>{solution.apiProtocols.join(' · ')}</dd></div><div><dt><Term tip={fieldTip('scope', locale)}>{pick(locale, 'Dağıtım', 'Deployment')}</Term></dt><dd>{solution.deploymentScopes.join(' · ')}</dd></div><div><dt><Term tip={fieldTip('license', locale)}>{pick(locale, 'Lisans', 'License')}</Term></dt><dd>{solution.license}</dd></div></dl></section>
    <section className="related"><h2>{pick(locale, 'Yakın alternatifler', 'Related alternatives')}</h2><div>{solution.alternatives.map((alt) => { const record = solutions.find((item) => item.slug === alt)!; return <Link key={alt} to={`/${locale}/solutions/${alt}`}><span className="mono">{record.primaryCategory}</span><strong>{record.name}</strong><small>{record.summary[locale]}</small></Link> })}</div></section>
    {learnConcepts.length > 0 ? (
      <section className="learn-related">
        <div className="section-heading"><BookOpen /><h2>{pick(locale, 'Bu çözümü öğren', 'Learn this solution')}</h2></div>
        <ul className="tag-pills">
          {learnConcepts.map((c) => (
            <li key={c.slug}>
              <Link to={`/${locale}/learn/concepts/${c.slug}`}>{c.name[locale]}</Link>
            </li>
          ))}
        </ul>
        <p className="learn-related__hint">{pick(locale, 'Bu kavramları okuyarak bu çözümün nasıl çalıştığını anlarsın.', 'Read these concepts to understand how this solution works.')}</p>
      </section>
    ) : null}
    <section className="sources"><h2>{pick(locale, 'Resmi kaynaklar', 'Official sources')}</h2>{solution.sources.map((source) => <ExternalLink key={source.url} href={source.url}><span><strong>{source.title}</strong><small>{source.publisher} · {source.sourceType} · {source.verifiedAt}</small></span></ExternalLink>)}</section>
  </article>
}
