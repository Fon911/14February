'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Section, Container } from '@/components/layout'
import { Text, Button } from '@/components/ui'
import { AdvancedParticleField } from '@/components/interactive/AdvancedParticleField'
import { REFLECTIONS_TEXT } from '@/content/text'
import { animateFadeIn } from '@/shared/animations'

export default function ReflectionsPage() {
  const titleRef = useRef<HTMLElement>(null)
  const reflectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (titleRef.current) {
      animateFadeIn(titleRef.current)
    }

    reflectionRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          animateFadeIn(ref)
        }, index * 200)
      }
    })
  }, [])

  return (
    <main className="relative min-h-screen bg-bg-primary overflow-hidden">
      <AdvancedParticleField density={50} mouseInteraction={true} connectionDistance={140} />

      <Section spacing="lg" className="relative z-10">
        <Container size="lg" className="px-8 md:px-16">
          {/* Header */}
          <div className="text-center mb-32 md:mb-40 space-y-8">
            <Text variant="display" as="h1" ref={titleRef} className="font-extralight">
              {REFLECTIONS_TEXT.title}
            </Text>
            <Text variant="xl" className="text-text-muted font-light max-w-3xl mx-auto">
              {REFLECTIONS_TEXT.subtitle}
            </Text>
          </div>

          {/* Reflections */}
          <div className="space-y-24 md:space-y-32 max-w-4xl mx-auto">
            {REFLECTIONS_TEXT.reflections.map((reflection, index) => (
              <div
                key={index}
                ref={(el) => {
                  reflectionRefs.current[index] = el
                }}
                className="relative group"
              >
                {/* Number */}
                <div className="absolute -left-16 top-0 text-6xl md:text-8xl font-thin text-accent-rose/10 group-hover:text-accent-rose/20 transition-colors duration-700">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="space-y-8">
                  <Text variant="xl" as="h2" className="text-accent-soft font-light">
                    {reflection.title}
                  </Text>
                  <Text variant="lg" className="text-text-primary font-light leading-loose">
                    {reflection.text}
                  </Text>
                </div>

                {/* Divider */}
                {index < REFLECTIONS_TEXT.reflections.length - 1 && (
                  <div className="mt-16 h-px bg-gradient-to-r from-transparent via-accent-rose/20 to-transparent" />
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-32">
            <Link href="/moments">
              <Button variant="ghost" size="md">
                Моменты
              </Button>
            </Link>
            <Link href="/final">
              <Button variant="primary" size="md">
                Финал
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  )
}
