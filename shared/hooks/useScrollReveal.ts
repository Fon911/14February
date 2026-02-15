'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  delay?: number
  once?: boolean
}

/**
 * Use Scroll Reveal Hook
 *
 * Элемент появляется с анимацией при скролле в видимую область.
 *
 * @param threshold - Процент видимости для триггера (0-1)
 * @param delay - Задержка перед анимацией в мс
 * @param once - Анимировать только один раз
 */
export const useScrollReveal = <T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) => {
  const { threshold = 0.2, delay = 0, once = true } = options
  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
              if (once) {
                observer.unobserve(element)
              }
            }, delay)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, delay, once])

  return { elementRef, isVisible }
}
