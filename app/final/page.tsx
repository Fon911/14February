'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ParticleField } from '@/components/interactive'
import { AmbientLight, CursorTrail } from '@/components/effects'
import { Section, Container } from '@/components/layout'
import { Text, Button } from '@/components/ui'
import { FINAL_TEXT } from '@/content/text'
import { animateHeroText, animateHeroImage } from '@/shared/animations'
import { useParallax } from '@/shared/hooks'

export default function FinalPage() {
  const [clicked, setClicked] = useState(false)
  const message1Ref = useRef<HTMLElement>(null)
  const message2Ref = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const parallaxRef = useParallax<HTMLDivElement>({ speed: 0.15, direction: 'both' })

  useEffect(() => {
    const elements = [message1Ref.current, message2Ref.current].filter(
      (el): el is HTMLElement => el !== null
    )

    if (elements.length > 0) {
      animateHeroText(elements)
    }

    if (imageRef.current) {
      animateHeroImage(imageRef.current)
    }
  }, [])

  const handleClick = () => {
    setClicked(true)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary">
      <ParticleField density={80} speed="slow" />
      <AmbientLight />
      <CursorTrail />

      <Section spacing="lg" className="relative z-10">
        <Container size="lg">
          <div className="flex min-h-screen flex-col items-center justify-center space-y-12 text-center">
            {/* Hero Image с Parallax */}
            <div
              ref={(node) => {
                imageRef.current = node
                // @ts-ignore
                parallaxRef.current = node
              }}
              className="relative h-72 w-72 md:h-96 md:w-96 transition-transform duration-100 ease-out"
            >
              <div className="absolute inset-0 rounded-full bg-accent-glow blur-[80px] opacity-70 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-rose/30 to-accent-soft/20 blur-3xl" />
              <Image
                src="/images/hero-us.jpg"
                alt="Ксюша и Никита"
                fill
                className="rounded-full object-cover opacity-50 shadow-[0_20px_80px_rgba(242,161,179,0.4)]"
                priority
                sizes="(max-width: 768px) 288px, 384px"
              />
            </div>

            {/* Messages */}
            <div className="space-y-8 max-w-2xl">
              <Text
                variant="display"
                as="p"
                ref={message1Ref}
                className="text-accent-rose drop-shadow-[0_0_30px_rgba(242,161,179,0.6)]"
              >
                {FINAL_TEXT.message1}
              </Text>
              <Text
                variant="heading"
                as="p"
                ref={message2Ref}
                className="text-text-muted drop-shadow-[0_0_20px_rgba(179,179,194,0.2)]"
              >
                {FINAL_TEXT.message2}
              </Text>
            </div>

            {/* Button */}
            <div ref={buttonRef}>
              {!clicked ? (
                <Button variant="primary" size="lg" onClick={handleClick}>
                  {FINAL_TEXT.buttonText}
                </Button>
              ) : (
                <div className="space-y-6">
                  <Text variant="heading" className="text-accent-soft">
                    Я тоже всегда выбираю тебя
                  </Text>
                  <Link href="/">
                    <Button variant="ghost" size="md">
                      Начать заново
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
