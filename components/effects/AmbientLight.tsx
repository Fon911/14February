'use client'

import { useEffect, useRef } from 'react'

/**
 * Ambient Light Effect
 *
 * Создаёт динамичное розовое свечение, которое следует за курсором.
 * Добавляет глубину и атмосферу всему сайту.
 */
export const AmbientLight: React.FC = () => {
  const lightRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (!lightRef.current) return

      // Smooth following с easing
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.1
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.1

      lightRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={lightRef}
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-0"
      style={{
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(242, 161, 179, 0.15) 0%, rgba(242, 161, 179, 0.08) 30%, transparent 70%)',
        filter: 'blur(40px)',
        willChange: 'transform',
      }}
    />
  )
}
