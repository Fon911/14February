'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AdvancedParticleField } from '@/components/interactive/AdvancedParticleField'
import { AmbientLight, CursorTrail } from '@/components/effects'
import { Section, Container } from '@/components/layout'
import { Text, Button } from '@/components/ui'
import { HERO_TEXT } from '@/content/text'
import { animateHeroText, animateHeroImage } from '@/shared/animations'
import { useParallax } from '@/shared/hooks'

export default function HomePage() {
  const line1Ref = useRef<HTMLElement>(null)
  const line2Ref = useRef<HTMLElement>(null)
  const line3Ref = useRef<HTMLElement>(null)
  const line4Ref = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Parallax для изображения (медленное движение)
  const parallaxRef = useParallax<HTMLDivElement>({ speed: 0.2, direction: 'both' })

  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current].filter(
      (el): el is HTMLElement => el !== null
    )

    if (lines.length > 0) {
      animateHeroText(lines)
    }

    if (imageRef.current) {
      animateHeroImage(imageRef.current)
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary">
      {/* Эффекты */}
      <AdvancedParticleField density={70} mouseInteraction={true} connectionDistance={120} />
      <AmbientLight />
      <CursorTrail />

      <Section spacing="lg" className="relative z-10">
        <Container size="full" className="px-8 md:px-16 lg:px-24">
          <div className="flex min-h-screen flex-col items-center justify-center space-y-20 text-center">
            {/* Hero Image с Parallax */}
            <div
              ref={(node) => {
                imageRef.current = node
                // @ts-ignore
                parallaxRef.current = node
              }}
              className="relative h-80 w-80 md:h-[28rem] md:w-[28rem] lg:h-[36rem] lg:w-[36rem] transition-transform duration-100 ease-out"
            >
              <div className="absolute inset-0 rounded-full bg-accent-glow blur-[100px] opacity-60 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-rose/20 to-accent-soft/10 blur-3xl" />
              <Image
                src="/images/hero-us.jpg"
                alt="Ксюша и Никита"
                fill
                className="rounded-full object-cover opacity-40 shadow-[0_20px_80px_rgba(242,161,179,0.3)]"
                priority
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 448px, 576px"
              />
            </div>

            {/* Hero Text */}
            <div className="space-y-8 md:space-y-12 max-w-6xl">
              <Text
                variant="display"
                as="h1"
                ref={line1Ref}
                className="text-text-primary font-extralight tracking-tight drop-shadow-[0_0_30px_rgba(245,245,247,0.3)]"
              >
                {HERO_TEXT.line1}
              </Text>
              <Text
                variant="xl"
                as="p"
                ref={line2Ref}
                className="text-text-muted font-light drop-shadow-[0_0_20px_rgba(179,179,194,0.2)]"
              >
                {HERO_TEXT.line2}
              </Text>
              <Text
                variant="xl"
                as="p"
                ref={line3Ref}
                className="text-text-muted font-light drop-shadow-[0_0_20px_rgba(179,179,194,0.2)]"
              >
                {HERO_TEXT.line3}
              </Text>
              <Text
                variant="xl"
                as="p"
                ref={line4Ref}
                className="text-accent-rose font-normal drop-shadow-[0_0_25px_rgba(242,161,179,0.5)]"
              >
                {HERO_TEXT.line4}
              </Text>
            </div>

            {/* CTA */}
            <Link href="/story" className="mt-12">
              <Button variant="primary" size="lg" className="text-lg px-12 py-6">
                Начать путь
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  )
}
