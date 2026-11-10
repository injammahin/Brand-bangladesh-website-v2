/**
 * Builds public/data/bangladesh-divisions.json — the 8 division polygons for the Regions map.
 * Source: geoBoundaries gbOpen BGD ADM1 (simplified), CC BY 4.0 — https://www.geoboundaries.org
 *
 * Usage: npm run fetch-geodata
 * - maps source names → site slugs
 * - rewinds rings so d3-geo (spherical) treats each polygon as the small area
 * - rounds coordinates to 3 decimals (~100 m) to keep the file small
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { geoArea } from 'd3-geo'

const SRC = 'https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BGD/ADM1/geoBoundaries-BGD-ADM1_simplified.geojson'
const SLUG = {
  'BD-A': 'barishal', 'BD-B': 'chattogram', 'BD-C': 'dhaka', 'BD-D': 'khulna',
  'BD-E': 'rajshahi', 'BD-F': 'rangpur', 'BD-G': 'sylhet', 'BD-H': 'mymensingh',
}

const round = (c) => [Math.round(c[0] * 1000) / 1000, Math.round(c[1] * 1000) / 1000]
const fixPolygon = (rings) => {
  let r = rings.map((ring) => ring.map(round))
  if (geoArea({ type: 'Polygon', coordinates: r }) > 2 * Math.PI) r = r.map((ring) => [...ring].reverse())
  return r
}

const res = await fetch(SRC)
if (!res.ok) throw new Error(`Download failed: ${res.status}`)
const src = await res.json()

const features = src.features.map((f) => {
  const slug = SLUG[f.properties.shapeISO]
  if (!slug) throw new Error(`Unknown division ${f.properties.shapeISO}`)
  const g = f.geometry
  const geometry = g.type === 'Polygon'
    ? { type: 'Polygon', coordinates: fixPolygon(g.coordinates) }
    : { type: 'MultiPolygon', coordinates: g.coordinates.map(fixPolygon) }
  return { type: 'Feature', properties: { slug }, geometry }
})

if (features.length !== 8) throw new Error(`Expected 8 divisions, got ${features.length}`)

await mkdir('public/data', { recursive: true })
await writeFile('public/data/bangladesh-divisions.json', JSON.stringify({
  type: 'FeatureCollection',
  attribution: 'geoBoundaries (CC BY 4.0)',
  features,
}))
console.log('Wrote public/data/bangladesh-divisions.json —', features.map((f) => f.properties.slug).join(', '))
