function polar(radius: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: 16 + radius * Math.cos(a), y: 16 + radius * Math.sin(a) }
}

function ring(radius: number, count: number, startDeg: number) {
  return Array.from({ length: count }, (_, i) =>
    polar(radius, startDeg + (i * 360) / count),
  )
}

function pseudo(seed: number) {
  return Math.abs(Math.sin(seed * 127.1) * 43758.5453) % 1
}

function blobPath(cx: number, cy: number, baseR: number, points: number) {
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2
    const r =
      baseR +
      0.35 * Math.sin(a * 3 + 1.2) +
      0.2 * Math.sin(a * 5 + 0.4) +
      0.08 * Math.sin(a * 7 + 2.2)
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  })
  const n = pts.length
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`
  }
  d += " Z"
  return d
}

const cookiePath = blobPath(16, 16, 13.8, 24)
const shadowPath = blobPath(16, 16.5, 14, 24)

function jitteredRing(
  radius: number,
  count: number,
  startDeg: number,
  baseScale: number,
  scaleSpread: number,
  seed: number,
) {
  return Array.from({ length: count }, (_, i) => {
    const angle = startDeg + (i * 360) / count + (pseudo(seed + i) - 0.5) * 24
    const r = radius + (pseudo(seed + 100 + i) - 0.5) * 2
    const pos = polar(r, angle)
    return {
      x: pos.x,
      y: pos.y,
      rotate: (pseudo(seed + 200 + i) - 0.5) * 120,
      scale: baseScale + pseudo(seed + 300 + i) * scaleSpread,
    }
  })
}

const chips = [
  ...jitteredRing(3.8, 3, 0, 0.5, 0.2, 1),
  ...jitteredRing(6.8, 5, 0, 0.85, 0.25, 11),
  ...jitteredRing(9.6, 7, 18, 1.2, 0.4, 21),
]

const crumbs = [
  ...ring(5.4, 4, 45),
  ...ring(8.2, 6, 30),
]

export default function CookieIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="cc-dough" cx="0.35" cy="0.3" r="1">
          <stop offset="0%" stopColor="#F9C98A" />
          <stop offset="70%" stopColor="#EFAE63" />
          <stop offset="100%" stopColor="#E09B4E" />
        </radialGradient>
        <radialGradient id="cc-chip" cx="0.35" cy="0.3" r="1.1">
          <stop offset="0%" stopColor="#7A4A28" />
          <stop offset="100%" stopColor="#46290F" />
        </radialGradient>
        <g id="cc-chip-shape">
          <path
            d="M0 -1.1 C0.7 -1.2 1.2 -0.7 1.2 0 C1.2 0.7 0.7 1.2 0 1.2 C-0.7 1.2 -1.2 0.7 -1.2 0 C-1.2 -0.7 -0.7 -1.2 0 -1.1 Z"
            fill="url(#cc-chip)"
          />
          <path
            d="M-0.5 -0.6 C-0.1 -0.8 0.4 -0.7 0.7 -0.3"
            fill="none"
            stroke="#8A5A33"
            strokeWidth="0.4"
            strokeLinecap="round"
          />
        </g>
      </defs>

      <path d={shadowPath} fill="#C4762C" opacity="0.4" />

      <path d={cookiePath} fill="url(#cc-dough)" />

      {crumbs.map((crumb) => (
        <circle
          key={`crumb-${crumb.x.toFixed(1)}-${crumb.y.toFixed(1)}`}
          cx={crumb.x}
          cy={crumb.y}
          r="0.6"
          fill="#DCA463"
          opacity="0.5"
        />
      ))}

      {chips.map((chip) => (
        <use
          key={`chip-${chip.x.toFixed(1)}-${chip.y.toFixed(1)}`}
          href="#cc-chip-shape"
          transform={`translate(${chip.x} ${chip.y}) rotate(${chip.rotate}) scale(${chip.scale})`}
        />
      ))}
    </svg>
  )
}