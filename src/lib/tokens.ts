/** Design tokens — single source of truth for all brand values */

export const colors = {
  cream: '#FBFAF7',
  ink: '#101414',
  teal: '#479E90',
  gold: '#D9AA66',
  red: '#DF1A23',
  orange: '#F68421',
  yellow: '#FECB02',
  darkTeal: '#016171',
  pink: '#EF1551',
  lime: '#A5CD2F',
} as const

export type BrandColor = typeof colors[keyof typeof colors]

/** Duration constants in seconds (for GSAP) */
export const duration = {
  micro: 0.25,
  standard: 0.9,
  slow: 1.1,
  hero: 1.6,
} as const

/** Stagger increments in seconds (for GSAP) */
export const stagger = {
  tight: 0.06,
  normal: 0.08,
  loose: 0.12,
} as const

/** GSAP easing strings */
export const ease = {
  out: 'expo.out',
  inOut: 'power3.inOut',
  in: 'power2.in',
  bounce: 'back.out(1.2)',
} as const

/** Pillar definitions for the hexagon */
export const pillars = [
  { id: 'tourism', label: 'Tourism', color: '#479E90', icon: '✦' },
  { id: 'exports', label: 'Exports', color: '#D9AA66', icon: '✦' },
  { id: 'governance', label: 'Governance', color: '#016171', icon: '✦' },
  { id: 'investment', label: 'Investment & Immigration', color: '#EF1551', icon: '✦' },
  { id: 'culture', label: 'Culture & Heritage', color: '#F68421', icon: '✦' },
  { id: 'people', label: 'People', color: '#A5CD2F', icon: '✦' },
] as const

export type PillarId = typeof pillars[number]['id']
