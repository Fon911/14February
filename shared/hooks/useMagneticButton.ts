'use client'

import { useEffect, useRef } from 'react'

interface MagneticOptions {
  strength?: number
  range?: number
}

/**
 * Use Magnetic Button Hook
 *
 * Создаёт эффект магнитной кнопки - кнопка притягивается к курсору.
 *
 * @param strength - Сила притяжения (0.1 - слабо, 1 - сильно)
 * @param range - Радиус действия эффекта в пикселях
 */
export const useMagneticButton = <T extends HTMLElement>(
  options: MagneticOptions = {}
) => {
  const { strength = 0.3, range = 100 } = options
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance < range) {
          const pull = (range - distance) / range
          const moveX = deltaX * strength * pull
          const moveY = deltaY * strength * pull

          element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`
        } else {
          element.style.transform = 'translate(0px, 0px) scale(1)'
        }
      })
    }

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId)
      element.style.transform = 'translate(0px, 0px) scale(1)'
    }

    document.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [strength, range])

  return elementRef
}
