interface Props {
  value: number // 0-100
  color?: string
  height?: string
  showLabel?: boolean
}

export default function ProgressBar({ value, color = 'bg-brand-500', height = 'h-2', showLabel = false }: Props) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1 text-right">{clamped.toFixed(0)}%</p>
      )}
    </div>
  )
}
