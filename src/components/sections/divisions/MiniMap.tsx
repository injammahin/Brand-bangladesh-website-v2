/**
 * Mini SVG map highlighting one division on the Bangladesh outline.
 * Uses a simplified division path lookup.
 */

interface MiniMapProps {
  slug: string
  accent: string
}

// Very rough bounding box per division (normalized 0-1 in the Bangladesh bbox)
// Used to draw a highlighted region on the simplified map
const DIVISION_RECTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  dhaka:      { x: 0.42, y: 0.35, w: 0.20, h: 0.20 },
  chattogram: { x: 0.60, y: 0.45, w: 0.30, h: 0.40 },
  rajshahi:   { x: 0.10, y: 0.20, w: 0.32, h: 0.30 },
  khulna:     { x: 0.10, y: 0.55, w: 0.30, h: 0.30 },
  barishal:   { x: 0.35, y: 0.60, w: 0.22, h: 0.30 },
  sylhet:     { x: 0.62, y: 0.18, w: 0.28, h: 0.28 },
  rangpur:    { x: 0.08, y: 0.02, w: 0.30, h: 0.22 },
  mymensingh: { x: 0.38, y: 0.18, w: 0.25, h: 0.20 },
}

// Simplified Bangladesh outline points (0-100 viewport)
const BD_OUTLINE = '42,5 58,5 72,12 85,18 92,30 90,42 95,52 88,62 80,70 75,82 68,92 58,95 48,98 35,90 25,80 15,72 10,58 12,45 18,35 25,22 32,12'

export function MiniMap({ slug, accent }: MiniMapProps) {
  const region = DIVISION_RECTS[slug]

  return (
    <div className="w-32 h-40" aria-label={`Bangladesh map highlighting ${slug} division`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Bangladesh outline */}
        <polygon
          points={BD_OUTLINE}
          fill="none"
          stroke="#101414"
          strokeWidth="0.8"
          opacity={0.15}
        />
        <polygon
          points={BD_OUTLINE}
          fill="#E8E5DF"
          opacity={0.5}
        />

        {/* Division highlight */}
        {region && (
          <rect
            x={region.x * 100}
            y={region.y * 100}
            width={region.w * 100}
            height={region.h * 100}
            fill={accent}
            opacity={0.7}
            rx={2}
          />
        )}
      </svg>
    </div>
  )
}
