import gsap from 'gsap'

/**
 * Hero анимации
 *
 * Анимации для главной страницы.
 * Постепенное появление текста построчно.
 */

export const animateHeroText = (lines: HTMLElement[]) => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  lines.forEach((line, index) => {
    tl.from(
      line,
      {
        opacity: 0,
        y: 30,
        duration: 1.2,
      },
      index * 0.5
    )
  })

  return tl
}

export const animateHeroImage = (element: HTMLElement) => {
  return gsap.from(element, {
    opacity: 0,
    scale: 1.1,
    duration: 2,
    ease: 'power2.out',
  })
}
