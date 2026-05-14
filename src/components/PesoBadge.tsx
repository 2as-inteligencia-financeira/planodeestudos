import type { QuadrixPeso } from '../data/sedes2026_data'

interface ColorSet {
  background: string
  color: string
  border: string
}

const colorMap: Record<QuadrixPeso, ColorSet> = {
  MUITO_ALTO: { background: '#fff3cd', color: '#92400e', border: '1px solid #fde68a' },
  ALTO:       { background: '#fed7aa', color: '#7c2d12', border: '1px solid #fdba74' },
  MEDIO:      { background: '#fef9c3', color: '#713f12', border: '1px solid #fef08a' },
  BAIXO:      { background: '#f4f4f2', color: '#606060', border: '1px solid #e2e2dc' },
}

const labels: Record<QuadrixPeso, string> = {
  MUITO_ALTO: 'Muito Alto',
  ALTO: 'Alto',
  MEDIO: 'Médio',
  BAIXO: 'Baixo',
}

interface Props {
  peso: QuadrixPeso
  size?: 'sm' | 'md'
}

export default function PesoBadge({ peso, size = 'sm' }: Props) {
  const c = colorMap[peso]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: '"DM Mono", monospace',
        fontWeight: 600,
        fontSize: size === 'sm' ? '0.65rem' : '0.75rem',
        padding: size === 'sm' ? '2px 7px' : '4px 10px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        background: c.background,
        color: c.color,
        border: c.border,
      }}
    >
      {labels[peso]}
    </span>
  )
}
