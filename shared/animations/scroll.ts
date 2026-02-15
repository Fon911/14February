import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Scroll анимации
 *
 * Анимации, привязанные к скроллу страницы.
 * Используются для таймлайна истории.
 */

export const animateTimelineEvent = (element: HTMLElement, index: number) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    x: index % 2 === 0 ? -50 : 50,
    duration: 1,
    ease: 'power2.out',
  })
}

export const animateTimelineImage = (element: HTMLElement) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    ease: 'power2.out',
  })
}

export const animateFadeIn = (element: HTMLElement) => {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out',
  })
}
