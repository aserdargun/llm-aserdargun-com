export interface ProgressRingProps {
  /** Value between 0 and 1 (e.g. 0.42 = 42%). */
  value: number
  size?: number
  thickness?: number
  label?: string
  caption?: string
}

export function ProgressRing({ value, size = 88, thickness = 8, label, caption }: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(1, value))
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped)
  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} role="img" aria-label={label ?? `${Math.round(clamped * 100)}%`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--action)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring__label">
        <strong>{label ?? `${Math.round(clamped * 100)}%`}</strong>
        {caption ? <small>{caption}</small> : null}
      </div>
    </div>
  )
}
