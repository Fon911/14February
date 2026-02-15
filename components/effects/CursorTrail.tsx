'use client'

import { useEffect, useRef } from 'react'

interface TrailParticle {
  x: number
  y: number
  size: number
  opacity: number
  life: number
  maxLife: number
  vx: number
  vy: number
}

/**
 * Cursor Trail Effect
 *
 * Магический светящийся след из частиц за курсором.
 * Частицы появляются при движении мыши и плавно исчезают.
 */
export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<TrailParticle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x
      mouseRef.current.prevY = mouseRef.current.y
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // Добавляем частицы при движении
      const dx = mouseRef.current.x - mouseRef.current.prevX
      const dy = mouseRef.current.y - mouseRef.current.prevY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 2) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 10,
            y: mouseRef.current.y + (Math.random() - 0.5) * 10,
            size: Math.random() * 3 + 1,
            opacity: 1,
            life: 0,
            maxLife: Math.random() * 30 + 20,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
          })
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life++
        particle.x += particle.vx
        particle.y += particle.vy
        particle.opacity = 1 - particle.life / particle.maxLife

        if (particle.life >= particle.maxLife) {
          return false
        }

        // Рисуем частицу
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        )
        gradient.addColorStop(0, `rgba(242, 161, 179, ${particle.opacity * 0.8})`)
        gradient.addColorStop(0.5, `rgba(247, 203, 214, ${particle.opacity * 0.4})`)
        gradient.addColorStop(1, 'rgba(242, 161, 179, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
