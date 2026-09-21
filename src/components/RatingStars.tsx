import { Star } from "lucide-react"

type RatingStarsProps = {
  rating: number
  className?: string
  size?: number
}

export default function RatingStars({
  rating,
  className,
  size = 3.5,
}: RatingStarsProps) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100))
  const starSize = `${size * 4}px`

  return (
    <div
      className={`relative inline-flex ${className ?? ""}`}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      <div className="flex gap-0.5 text-stone-300">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="fill-current" style={{ height: starSize, width: starSize }} />
        ))}
      </div>
      <div
        className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-stone-900"
        style={{ width: `${pct}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="shrink-0 fill-current"
            style={{ height: starSize, width: starSize }}
          />
        ))}
      </div>
    </div>
  )
}