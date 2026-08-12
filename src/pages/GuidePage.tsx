import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { solutions } from '@/data/solutions'
import { matchGuide, type GuideAnswers } from '@/features/guide/matcher'
import { pick, useLocale } from '@/i18n/copy'

type AnswerKey = keyof GuideAnswers
type Question = { key: AnswerKey; tr: string; en: string; options: { value: string; tr: string; en: string }[] }
const questions: Question[] = [
  { key: 'hardware', tr: 'Hangi donanım başlangıç noktanız?', en: 'What hardware are you starting with?', options: [{ value: 'apple', tr: 'Apple Silicon', en: 'Apple Silicon' }, { value: 'nvidia', tr: 'NVIDIA GPU', en: 'NVIDIA GPU' }, { value: 'cpu', tr: 'Yalnızca CPU', en: 'CPU only' }, { value: 'edge', tr: 'Mobil / uç cihaz', en: 'Mobile / edge device' }] },
  { key: 'scope', tr: 'Çalıştırma kapsamınız nedir?', en: 'What is your execution scope?', options: [{ value: 'local', tr: 'Yerel geliştirme', en: 'Local development' }, { value: 'production', tr: 'Üretim servisi', en: 'Production service' }, { value: 'device', tr: 'Cihaz içinde', en: 'On device' }] },
  { key: 'interface', tr: 'Hangi deneyime ihtiyacınız var?', en: 'What experience do you need?', options: [{ value: 'desktop', tr: 'Grafik masaüstü', en: 'Desktop GUI' }, { value: 'developer', tr: 'CLI / geliştirici', en: 'CLI / developer' }, { value: 'api', tr: 'API servisi', en: 'API service' }, { value: 'app', tr: 'Uygulamaya gömülü', en: 'Embedded in an app' }] },
  { key: 'scale', tr: 'Beklenen ölçek nedir?', en: 'What scale do you expect?', options: [{ value: 'single', tr: 'Tek kullanıcı / cihaz', en: 'Single user / device' }, { value: 'multi', tr: 'Çoklu eşzamanlı istek', en: 'Concurrent requests' }, { value: 'cluster', tr: 'Çok düğümlü küme', en: 'Multi-node cluster' }] },
  { key: 'platform', tr: 'Hangi platform tercihiniz var?', en: 'What platform do you prefer?', options: [{ value: 'none', tr: 'Özel platform yok', en: 'No platform preference' }, { value: 'server', tr: 'Sunucu / container', en: 'Server / container' }, { value: 'kubernetes', tr: 'Kubernetes', en: 'Kubernetes' }, { value: 'browser', tr: 'Tarayıcı', en: 'Browser' }] },
]

export function GuidePage() {
  const locale = useLocale()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<GuideAnswers>>({})
  const complete = step >= questions.length
  const choose = (key: AnswerKey, value: string) => { setAnswers((current) => ({ ...current, [key]: value })); setStep((current) => current + 1) }
  const restart = () => { setAnswers({}); setStep(0) }
  const matches = complete ? matchGuide(answers as GuideAnswers) : []
  return <div className="shell page-shell guide-page">
    <div className="page-heading"><div><h1>{pick(locale, 'Yığınınızı seçin', 'Choose your stack')}</h1><p>{pick(locale, 'Beş soruda tek bir “kazanan” değil, gerekçeli bir kısa liste oluşturun.', 'Build a justified shortlist—not a single “winner”—in five questions.')}</p></div></div>
    {!complete ? <section className="question-card"><div className="progress-line"><span className="mono">{pick(locale, `Soru ${step + 1} / 5`, `Question ${step + 1} of 5`)}</span><div><i style={{ width: `${((step + 1) / 5) * 100}%` }} /></div></div><h2>{questions[step]![locale]}</h2><div className="answer-grid">{questions[step]!.options.map((option) => <button key={option.value} type="button" onClick={() => choose(questions[step]!.key, option.value)}>{option[locale]}<ArrowRight size={18} /></button>)}</div>{step > 0 && <button className="text-button back-question" type="button" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={16} />{pick(locale, 'Önceki soru', 'Previous question')}</button>}</section> : <section className="guide-results"><div className="results-title"><span className="mono">{pick(locale, 'GEREKÇELİ KISA LİSTE', 'JUSTIFIED SHORTLIST')}</span><h2>{pick(locale, 'Senaryonuza uyan yollar', 'Paths that fit your scenario')}</h2><button className="button secondary" type="button" onClick={restart}><RotateCcw size={17} />{pick(locale, 'Yeniden başla', 'Start over')}</button></div><div className="recommendations">{matches.map((match, index) => { const solution = solutions.find((item) => item.slug === match.slug)!; return <article key={match.slug}><span className="mono">0{index + 1} · {solution.primaryCategory}</span><h3>{solution.name}</h3><p>{match.reason[locale]}</p><small><strong>{pick(locale, 'Dikkat:', 'Caveat:')}</strong> {match.caveat[locale]}</small><div><Link className="text-link" to={`/${locale}/solutions/${solution.slug}`}>{pick(locale, 'Profili aç', 'Open profile')}<ArrowRight size={16} /></Link><Link className="text-link" to={`/${locale}/compare?compare=${matches.map(({ slug }) => slug).join(',')}`}>{pick(locale, 'Kısa listeyi karşılaştır', 'Compare shortlist')}</Link></div></article> })}</div></section>}
  </div>
}
