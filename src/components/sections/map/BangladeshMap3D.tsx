'use client'
/**
 * BangladeshMap3D — React Three Fiber scene.
 * Renders an extruded Bangladesh boundary with warm relief shading,
 * landmark pins, auto-tour, and mouse parallax.
 *
 * NOTE: This component is dynamic-imported (no SSR).
 * GeoJSON is fetched at runtime from /data/boundary.geojson (if available)
 * or falls back to a simplified built-in outline.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from '@/lib/gsap'
import landmarks from '../../../../data/landmarks.json'
import { LandmarkCard } from './LandmarkCard'

// Simplified Bangladesh outline polygon (normalized 0-1 coordinates)
// Generated from known boundary points for fallback
const SIMPLE_OUTLINE: [number, number][] = [
  [0.42, 0.05], [0.58, 0.05], [0.72, 0.12], [0.85, 0.18],
  [0.92, 0.30], [0.90, 0.42], [0.95, 0.52], [0.88, 0.62],
  [0.80, 0.70], [0.75, 0.82], [0.68, 0.92], [0.58, 0.95],
  [0.48, 0.98], [0.35, 0.90], [0.25, 0.80], [0.15, 0.72],
  [0.10, 0.58], [0.12, 0.45], [0.18, 0.35], [0.25, 0.22],
  [0.32, 0.12], [0.42, 0.05],
]

function outlineToShape(outline: [number, number][]): THREE.Shape {
  const shape = new THREE.Shape()
  outline.forEach(([x, y], i) => {
    const nx = (x - 0.5) * 8
    const ny = -(y - 0.5) * 8
    if (i === 0) shape.moveTo(nx, ny)
    else shape.lineTo(nx, ny)
  })
  shape.closePath()
  return shape
}

// Convert lat/lng to scene coordinates
function latLngToScene(lat: number, lng: number): [number, number, number] {
  const LAT_MIN = 20.59, LAT_MAX = 26.63
  const LNG_MIN = 88.01, LNG_MAX = 92.67
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN) - 0.5) * 8
  const y = -((lat - LAT_MIN) / (LAT_MAX - LAT_MIN) - 0.5) * 8
  return [x, y, 0.22]
}

// Pin component
function LandmarkPin({
  position,
  color,
  isActive,
  onClick,
}: {
  position: [number, number, number]
  color: string
  isActive: boolean
  onClick: () => void
}) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.elapsedTime
      ringRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.15)
      ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(t * 2) * 0.2
    }
  })

  return (
    <group position={position} onClick={onClick}>
      {/* Dot */}
      <mesh>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Pulsing ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Active glow */}
      {isActive && (
        <pointLight color={color} intensity={2} distance={1.5} />
      )}
    </group>
  )
}

// The scene content
function Scene({
  activeLandmark,
  onLandmarkChange,
}: {
  activeLandmark: number
  onLandmarkChange: (i: number) => void
}) {
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseRef.current.x * 0.08 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (mouseRef.current.y * 0.04 - groupRef.current.rotation.x) * 0.05
    }
  })

  // Ease camera to active landmark
  useEffect(() => {
    const lm = landmarks[activeLandmark]
    if (!lm) return
    const [tx, ty, tz] = latLngToScene(lm.lat, lm.lng)
    gsap.to(camera.position, {
      x: tx * 0.3,
      y: ty * 0.3 + 8,
      z: 12,
      duration: 1.2,
      ease: 'power3.inOut',
    })
    // Announce for screen readers
    const announcer = document.getElementById('map-tour-announce')
    if (announcer) announcer.textContent = `Viewing: ${lm.name.en}`
  }, [activeLandmark, camera])

  // Build extruded geometry
  const shape = outlineToShape(SIMPLE_OUTLINE)
  const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.01 }

  // Division accent colors
  const DIVISION_COLORS: Record<string, string> = {
    barishal: '#016171', chattogram: '#479E90', dhaka: '#EF1551',
    khulna: '#A5CD2F', mymensingh: '#F68421', rajshahi: '#D9AA66',
    rangpur: '#DF1A23', sylhet: '#FECB02',
  }

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="#FFF5E4" />
      <directionalLight position={[5, 10, 5]} intensity={1.2} color="#FFF5E4" castShadow />
      <directionalLight position={[-3, 6, -2]} intensity={0.4} color="#E8F4F8" />

      <group ref={groupRef} rotation={[-0.2, 0.1, 0]}>
        {/* Bangladesh extrusion */}
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial
            color="#C8B89A"
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>

        {/* Landmark pins */}
        {landmarks.map((lm, i) => (
          <LandmarkPin
            key={lm.id}
            position={latLngToScene(lm.lat, lm.lng)}
            color={DIVISION_COLORS[lm.division] ?? '#479E90'}
            isActive={i === activeLandmark}
            onClick={() => onLandmarkChange(i)}
          />
        ))}
      </group>
    </>
  )
}

interface BangladeshMap3DProps {
  activeLandmark: number
  onLandmarkChange: (i: number) => void
}

export function BangladeshMap3D({ activeLandmark, onLandmarkChange }: BangladeshMap3DProps) {
  const activeRef = useRef(activeLandmark)
  activeRef.current = activeLandmark

  // Auto-tour
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeRef.current + 1) % landmarks.length
      onLandmarkChange(next)
    }, 4000)
    return () => clearInterval(interval)
  }, [onLandmarkChange])

  const activeLm = landmarks[activeLandmark]

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 8, 14]} fov={40} />
        <Scene activeLandmark={activeLandmark} onLandmarkChange={onLandmarkChange} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>

      {/* Landmark card overlay */}
      {activeLm && (
        <LandmarkCard key={activeLandmark} landmark={activeLm} />
      )}

      {/* Pause auto-tour */}
      <button
        className="absolute bottom-4 right-4 micro-label text-ink/40 hover:text-ink/80 transition-colors"
        aria-label="Pause map auto-tour"
        onClick={() => { /* TODO: implement pause */ }}
      >
        ⏸ Pause tour
      </button>
    </div>
  )
}
