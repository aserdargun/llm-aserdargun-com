export type ConceptVisualKey =
  | 'token-grid'
  | 'kv-cache'
  | 'pipeline'
  | 'quantize'
  | 'attention'
  | 'context-window'
  | 'embedding'
  | 'gpu-mesh'
  | 'batching'
  | 'tree'

/**
 * Inline SVG visuals for the concept glossary. All visuals share the Atlas
 * palette: --action blue, --petroleum teal, --ink dark, --border light.
 * They are intentionally schematic — clarity over decoration.
 */
export function ConceptVisual({ kind, label }: { kind: ConceptVisualKey; label?: string }) {
  const common = { width: '100%', height: 220, role: 'img' as const, 'aria-label': label ?? kind }
  switch (kind) {
    case 'token-grid':
      return <TokenGrid common={common} />
    case 'kv-cache':
      return <KvCache common={common} />
    case 'pipeline':
      return <Pipeline common={common} />
    case 'quantize':
      return <Quantize common={common} />
    case 'attention':
      return <Attention common={common} />
    case 'context-window':
      return <ContextWindow common={common} />
    case 'embedding':
      return <Embedding common={common} />
    case 'gpu-mesh':
      return <GpuMesh common={common} />
    case 'batching':
      return <Batching common={common} />
    case 'tree':
      return <Tree common={common} />
  }
}

type Common = { width: string; height: number; role: 'img'; 'aria-label': string }

const STROKE = 'var(--ink)'
const ACTION = 'var(--action)'
const PETRO = 'var(--petroleum)'
const BORDER = 'var(--border-strong)'

function TokenGrid({ common }: { common: Common }) {
  const tokens = ['The', 'cat', 'sat', 'on', 'the', 'mat']
  const ids = [101, 2401, 812, 19, 2401, 6022]
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      {tokens.map((t, i) => (
        <g key={i} transform={`translate(${30 + i * 90} 70)`}>
          <rect width="80" height="90" rx="10" fill="#fff" stroke={BORDER} />
          <text x="40" y="32" textAnchor="middle" fontFamily="Manrope" fontSize="14" fill="var(--ink)">{t}</text>
          <line x1="10" y1="44" x2="70" y2="44" stroke={BORDER} />
          <text x="40" y="68" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="13" fill={ACTION}>{ids[i]}</text>
        </g>
      ))}
      <text x="300" y="195" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">Tokenization: metin → sayı</text>
    </svg>
  )
}

function KvCache({ common }: { common: Common }) {
  const cols = ['k₁', 'k₂', 'k₃', 'k₄', 'k₅']
  const rows = ['q₁', 'q₂', 'q₃', 'q₄', 'q₅']
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      <text x="50" y="30" fontFamily="IBM Plex Mono" fontSize="11" fill={PETRO}>Q (sorgu)</text>
      <text x="320" y="30" fontFamily="IBM Plex Mono" fontSize="11" fill={PETRO}>K önbelleği</text>
      {rows.map((r, i) => (
        <text key={i} x="40" y={70 + i * 24} textAnchor="end" fontFamily="IBM Plex Mono" fontSize="12" fill="var(--ink)">{r}</text>
      ))}
      {cols.map((c, i) => (
        <text key={i} x={310 + i * 50} y="50" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="12" fill="var(--ink)">{c}</text>
      ))}
      {rows.map((_, r) =>
        cols.map((__, c) => {
          const fill = (r + c) % 3 === 0 ? ACTION : (r === c ? PETRO : 'transparent')
          const op = (r + c) % 3 === 0 ? 0.85 : (r === c ? 0.6 : 1)
          return <rect key={`${r}-${c}`} x={290 + c * 50} y={60 + r * 24} width="48" height="22" fill={fill} fillOpacity={op} stroke={BORDER} />
        }),
      )}
      <text x="300" y="200" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">KV cache: önceki tokenların anahtar/değer çiftleri</text>
    </svg>
  )
}

function Pipeline({ common }: { common: Common }) {
  const steps = ['Girdi', 'Tokenize', 'Model', 'Decode', 'Çıktı']
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={30 + i * 110} y="80" width="90" height="60" rx="10" fill="#fff" stroke={i === 2 ? ACTION : BORDER} strokeWidth={i === 2 ? 2 : 1} />
          <text x={75 + i * 110} y="115" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--ink)">{s}</text>
          {i < steps.length - 1 ? (
            <path d={`M ${120 + i * 110} 110 L ${150 + i * 110} 110`} stroke={ACTION} strokeWidth="2" markerEnd="url(#arrow)" />
          ) : null}
        </g>
      ))}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={ACTION} />
        </marker>
      </defs>
      <text x="300" y="195" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">LLM çıkarım boru hattı</text>
    </svg>
  )
}

function Quantize({ common }: { common: Common }) {
  const levels = [
    { label: 'FP32', bits: 32, h: 80, color: ACTION },
    { label: 'FP16', bits: 16, h: 60, color: ACTION },
    { label: 'INT8', bits: 8, h: 40, color: PETRO },
    { label: 'INT4', bits: 4, h: 24, color: PETRO },
  ]
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      {levels.map((l, i) => (
        <g key={i} transform={`translate(${60 + i * 130} 60)`}>
          <rect x="0" y={130 - l.h} width="100" height={l.h} fill={l.color} fillOpacity={0.85} stroke={BORDER} />
          <text x="50" y="160" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="13" fill="var(--ink)">{l.label}</text>
          <text x="50" y="180" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill="var(--muted)">{l.bits} bit</text>
        </g>
      ))}
      <text x="300" y="210" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">Nicemleme: bit sayısı azalır, bellek düşer</text>
    </svg>
  )
}

function Attention({ common }: { common: Common }) {
  const tokens = ['The', 'cat', 'sat']
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      {tokens.map((t, i) => (
        <g key={i}>
          <circle cx={150 + i * 150} cy="100" r="34" fill="#fff" stroke={ACTION} strokeWidth="2" />
          <text x={150 + i * 150} y="105" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--ink)">{t}</text>
        </g>
      ))}
      {/* attention lines: cat attends to The (strong) and sat (medium) */}
      <line x1="300" y1="100" x2="150" y2="100" stroke={ACTION} strokeWidth="3" />
      <line x1="300" y1="100" x2="450" y2="100" stroke={PETRO} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="300" y="180" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">Attention: "cat" diğer tokenlara farklı ağırlıklarla dikkat eder</text>
    </svg>
  )
}

function ContextWindow({ common }: { common: Common }) {
  const cells = Array.from({ length: 32 }, (_, i) => i)
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      <rect x="40" y="60" width="520" height="80" fill="#fff" stroke={BORDER} rx="8" />
      {cells.map((i) => {
        const x = 50 + i * 16
        const isContext = i < 24
        return <rect key={i} x={x} y="80" width="14" height="40" fill={isContext ? ACTION : BORDER} fillOpacity={isContext ? 0.85 : 0.4} stroke="none" />
      })}
      <line x1="40" y1="130" x2="424" y2="130" stroke={ACTION} strokeWidth="1" />
      <text x="232" y="148" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill={ACTION}>context 24/32</text>
      <line x1="424" y1="130" x2="560" y2="130" stroke={BORDER} strokeWidth="1" strokeDasharray="3 3" />
      <text x="492" y="148" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill="var(--muted)">kırpıldı</text>
      <text x="300" y="190" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">Context window: modelin tek seferde görebildiği token sınırı</text>
    </svg>
  )
}

function Embedding({ common }: { common: Common }) {
  const words = ['kedi', 'köpek', 'araba', 'masa', 'sandalye']
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      {words.map((w, i) => {
        // "kedi" ve "köpek" yakın (hayvan grubu)
        const cx = i < 2 ? 180 + i * 40 : 360 + (i - 2) * 60
        const cy = i < 2 ? 100 + i * 20 : 100 + (i - 2) * 30
        return <g key={i}>
          <circle cx={cx} cy={cy} r="22" fill={i < 2 ? ACTION : PETRO} fillOpacity="0.85" />
          <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="Manrope" fontSize="11" fill="#fff">{w}</text>
        </g>
      })}
      <text x="300" y="195" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">Embedding: benzer anlamlı kelimeler vektör uzayında yakın</text>
    </svg>
  )
}

function GpuMesh({ common }: { common: Common }) {
  const cols = 4, rows = 3
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      <rect x="100" y="50" width="400" height="120" rx="12" fill="#fff" stroke={BORDER} />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const x = 130 + c * 90
          const y = 70 + r * 32
          return <rect key={`${r}-${c}`} x={x} y={y} width="70" height="22" fill={ACTION} fillOpacity="0.7" stroke="#fff" />
        }),
      )}
      <text x="300" y="195" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">GPU mesh: yüzlerce paralel çekirdek aynı anda çalışır</text>
    </svg>
  )
}

function Batching({ common }: { common: Common }) {
  const reqs = ['req₁', 'req₂', 'req₃', 'req₄']
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      {reqs.map((r, i) => (
        <g key={i}>
          <rect x={50 + i * 60} y="50" width="40" height="20" fill="#fff" stroke={BORDER} />
          <text x={70 + i * 60} y="64" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill="var(--ink)">{r}</text>
          <path d={`M ${70 + i * 60} 70 L ${70 + i * 60} 90`} stroke={STROKE} strokeWidth="1" />
        </g>
      ))}
      <rect x="60" y="95" width="280" height="40" fill={ACTION} fillOpacity="0.85" />
      <text x="200" y="120" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="#fff">Batch (4 istek birlikte)</text>
      <path d="M 200 135 L 200 155" stroke={STROKE} strokeWidth="1" />
      <rect x="60" y="160" width="280" height="20" fill={PETRO} fillOpacity="0.7" />
      <text x="200" y="175" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill="#fff">4× yanıt</text>
      <text x="460" y="100" fontFamily="Manrope" fontSize="12" fill="var(--muted)">Batching</text>
      <text x="460" y="118" fontFamily="Manrope" fontSize="12" fill="var(--muted)">verimi</text>
      <text x="460" y="136" fontFamily="Manrope" fontSize="12" fill="var(--muted)">artırır.</text>
    </svg>
  )
}

function Tree({ common }: { common: Common }) {
  // Top-p (nucleus) sampling: küçük olasılıklar elenir
  const tokens = [
    { p: 0.5, keep: true },
    { p: 0.2, keep: true },
    { p: 0.15, keep: true },
    { p: 0.1, keep: true },
    { p: 0.04, keep: false },
    { p: 0.01, keep: false },
  ]
  return (
    <svg viewBox="0 0 600 220" {...common}>
      <rect x="0" y="0" width="600" height="220" fill="var(--canvas)" />
      <text x="300" y="28" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="12" fill={PETRO}>p = 0.95 nucleus</text>
      {tokens.map((t, i) => {
        const x = 50 + i * 90
        const w = Math.max(20, t.p * 200)
        return <g key={i} transform={`translate(${x} 60)`}>
          <rect x="0" y="0" width={w} height="24" fill={t.keep ? ACTION : BORDER} fillOpacity={t.keep ? 0.85 : 0.5} />
          <text x={w / 2} y="16" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill={t.keep ? '#fff' : 'var(--muted)'}>{t.p}</text>
          <text x={w / 2} y="50" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="11" fill={t.keep ? 'var(--ink)' : 'var(--muted)'}>{t.keep ? 'seçilebilir' : 'elenir'}</text>
        </g>
      })}
      <text x="300" y="200" textAnchor="middle" fontFamily="Manrope" fontSize="13" fill="var(--muted)">Top-p: kümülatif olasılık eşiğine kadar olan tokenlar aday olur</text>
    </svg>
  )
}
