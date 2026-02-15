'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface ConstellationProps {
  type: 'taurus' | 'libra'
  className?: string
}

/**
 * Constellation component
 *
 * Рисует созвездия Тельца или Весов с помощью SVG.
 * Анимирует появление звёзд и линий.
 */
export const Constellation: React.FC<ConstellationProps> = ({ type, className = '' }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  const taurusStars = [
    { x: 50, y: 30 },
    { x: 70, y: 20 },
    { x: 90, y: 35 },
    { x: 100, y: 50 },
    { x: 85, y: 65 },
    { x: 60, y: 60 },
    { x: 40, y: 50 },
  ]

  const libraStars = [
    { x: 30, y: 40 },
    { x: 50, y: 30 },
    { x: 70, y: 40 },
    { x: 90, y: 30 },
    { x: 60, y: 60 },
  ]

  const stars = type === 'taurus' ? taurusStars : libraStars

  useEffect(() => {
    if (!svgRef.current) return

    const circles = svgRef.current.querySelectorAll('circle')
    const lines = svgRef.current.querySelectorAll('line')

    // Animate stars
    gsap.from(circles, {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out',
    })

    // Animate lines
    gsap.from(lines, {
      strokeDashoffset: 100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 90"
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lines connecting stars */}
      {stars.map((star, index) => {
        if (index < stars.length - 1) {
          return (
            <line
              key={`line-${index}`}
              x1={star.x}
              y1={star.y}
              x2={stars[index + 1].x}
              y2={stars[index + 1].y}
              stroke="var(--color-accent-rose)"
              strokeWidth="0.5"
              strokeDasharray="100"
              opacity="0.6"
            />
          )
        }
        return null
      })}

      {/* Stars */}
      {stars.map((star, index) => (
        <g key={`star-${index}`}>
          {/* Glow */}
          <circle
            cx={star.x}
            cy={star.y}
            r="4"
            fill="var(--color-accent-glow)"
            opacity="0.3"
          />
          {/* Star */}
          <circle
            cx={star.x}
            cy={star.y}
            r="1.5"
            fill="var(--color-text-primary)"
          />
        </g>
      ))}
    </svg>
  )
}
