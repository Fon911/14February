'use client'

import { useEffect, useRef } from 'react'

interface ParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal' | 'both'
}

/**
 * Use Parallax Hook
 *
 * Создаёт 3D parallax эффект на элементах.
 * Элементы двигаются с разной скоростью при движении мыши.
 *
 * @param speed - Скорость параллакса (0.1 - медленно, 1 - быстро)
 * @param direction - Направление движения
 */
export const useParallax = <T extends HTMLElement>(
  options: ParallaxOptions = {}
) => {
  const { speed = 0.3, direction = 'both' } = options
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window

        // Нормализуем координаты от -1 до 1
        const x = (clientX / innerWidth - 0.5) * 2
        const y = (clientY / innerHeight - 0.5) * 2

        let translateX = 0
        let translateY = 0

        if (direction === 'both' || direction === 'horizontal') {
          translateX = x * speed * 50
        }

        if (direction === 'both' || direction === 'vertical') {
          translateY = y * speed * 50
        }

        element.style.transform = `translate(${translateX}px, ${translateY}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed, direction])

  return elementRef
}
