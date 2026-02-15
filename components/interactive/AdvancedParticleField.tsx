'use client'

import React, { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  twinkleSpeed: number
  velX: number
  velY: number
}

interface AdvancedParticleFieldProps {
  density?: number
  className?: string
  mouseInteraction?: boolean
  connectionDistance?: number
}

/**
 * Продвинутая система частиц
 *
 * - Реакция на движение мыши
 * - Связи между частицами
 * - Parallax эффект
 * - Динамические цвета
 */
export const AdvancedParticleField: React.FC<AdvancedParticleFieldProps> = ({
  density = 80,
  className = '',
  mouseInteraction = true,
  connectionDistance = 150,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = []
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000) * (density / 100)

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height

      particlesRef.current.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        velX: 0,
        velY: 0,
      })
    }
  }, [density])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(11, 11, 18, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Обновление и отрисовка частиц
      particles.forEach((particle, index) => {
        // Обычное движение
        particle.baseX += particle.speedX
        particle.baseY += particle.speedY

        // Wrap around
        if (particle.baseX < 0) particle.baseX = canvas.width
        if (particle.baseX > canvas.width) particle.baseX = 0
        if (particle.baseY < 0) particle.baseY = canvas.height
        if (particle.baseY > canvas.height) particle.baseY = 0

        // Mouse interaction
        if (mouseInteraction) {
          const dx = mouse.x - particle.baseX
          const dy = mouse.y - particle.baseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = mouse.radius

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            const angle = Math.atan2(dy, dx)
            particle.velX -= Math.cos(angle) * force * 2
            particle.velY -= Math.sin(angle) * force * 2
          }
        }

        // Apply velocity
        particle.velX *= 0.95
        particle.velY *= 0.95
        particle.x = particle.baseX + particle.velX
        particle.y = particle.baseY + particle.velY

        // Twinkle
        particle.opacity += particle.twinkleSpeed
        if (particle.opacity > 0.8 || particle.opacity < 0.2) {
          particle.twinkleSpeed *= -1
        }

        // Рисуем частицу
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 245, 247, ${particle.opacity})`
        ctx.fill()

        // Glow для больших частиц
        if (particle.size > 1.8) {
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 4
          )
          gradient.addColorStop(0, `rgba(242, 161, 179, ${particle.opacity * 0.4})`)
          gradient.addColorStop(1, 'rgba(242, 161, 179, 0)')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        // Связи между частицами
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2
            ctx.beginPath()
            ctx.strokeStyle = `rgba(242, 161, 179, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [density, mouseInteraction, connectionDistance, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
