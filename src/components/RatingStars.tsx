import { Star } from "lucide-react"

type RatingStarsProps = {
  rating: number
  className?: string
}

export default function RatingStars({ rating, className }: RatingStarsProps) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100))

  return (
    <div
      className={`relative inline-flex ${className ?? ""}`}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      <div className="flex gap-0.5 text-stone-300">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
      <div
        className="absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden text-stone-900"
        style={{ width: `${pct}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 shrink-0 fill-current" />
        ))}
      </div>
    </div>
  )
}