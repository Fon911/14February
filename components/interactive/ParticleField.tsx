'use client'

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  twinkleSpeed: number
}

interface ParticleFieldProps {
  density?: number
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
}

/**
 * ParticleField компонент
 *
 * Создаёт анимированное звёздное поле.
 * Используется на главной странице и финале.
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({
  density = 100,
  className = '',
  speed = 'normal',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const speedMultiplier = {
      slow: 0.3,
      normal: 1,
      fast: 2,
    }
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000) * (density / 100)

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.2 * speedMultiplier[speed],
          speedY: (Math.random() - 0.5) * 0.2 * speedMultiplier[speed],
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(11, 11, 18, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Twinkle effect
        particle.opacity += particle.twinkleSpeed
        if (particle.opacity > 0.8 || particle.opacity < 0.2) {
          particle.twinkleSpeed *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 245, 247, ${particle.opacity})`
        ctx.fill()

        // Soft glow for larger particles
        if (particle.size > 1.5) {
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 3
          )
          gradient.addColorStop(0, `rgba(242, 161, 179, ${particle.opacity * 0.3})`)
          gradient.addColorStop(1, 'rgba(242, 161, 179, 0)')
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [density, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
