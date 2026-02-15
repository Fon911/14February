import gsap from 'gsap'

/**
 * Interactive анимации
 *
 * Анимации для интерактивных элементов.
 * Используются для вопросов и вариантов ответов.
 */

export const animateCorrectAnswer = (element: HTMLElement) => {
  const tl = gsap.timeline()

  // Glow effect
  tl.to(element, {
    boxShadow: '0 0 30px var(--color-accent-glow)',
    backgroundColor: 'var(--color-accent-rose)',
    color: 'var(--color-bg-primary)',
    duration: 0.4,
    ease: 'power2.out',
  })

  // Pulse
  tl.to(element, {
    scale: 1.05,
    duration: 0.2,
    ease: 'power2.out',
  })
  tl.to(element, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.in',
  })

  return tl
}

export const animateIncorrectAnswer = (element: HTMLElement) => {
  const tl = gsap.timeline()

  // Subtle shake
  tl.to(element, {
    x: -5,
    duration: 0.1,
  })
  tl.to(element, {
    x: 5,
    duration: 0.1,
  })
  tl.to(element, {
    x: 0,
    duration: 0.1,
  })

  // Fade
  tl.to(element, {
    opacity: 0.5,
    duration: 0.3,
  })

  return tl
}

export const animateQuestionAppear = (element: HTMLElement, index: number) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: index * 0.1,
    ease: 'power2.out',
  })
}
