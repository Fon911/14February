'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Section, Container } from '@/components/layout'
import { Text, Button } from '@/components/ui'
import { AdvancedParticleField } from '@/components/interactive/AdvancedParticleField'
import { MOMENTS_TEXT } from '@/content/text'
import { animateFadeIn } from '@/shared/animations'

export default function MomentsPage() {
  const titleRef = useRef<HTMLElement>(null)
  const momentRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (titleRef.current) {
      animateFadeIn(titleRef.current)
    }

    momentRefs.current.forEach((ref) => {
      if (ref) {
        animateFadeIn(ref)
      }
    })
  }, [])

  return (
    <main className="relative min-h-screen bg-bg-primary overflow-hidden">
      <AdvancedParticleField density={40} mouseInteraction={true} connectionDistance={100} />

      <Section spacing="lg" className="relative z-10">
        <Container size="lg" className="px-8 md:px-16">
          {/* Header */}
          <div className="text-center mb-24 md:mb-32 space-y-6">
            <Text variant="display" as="h1" ref={titleRef} className="font-extralight">
              {MOMENTS_TEXT.title}
            </Text>
            <Text variant="lg" className="text-text-muted font-light max-w-3xl mx-auto">
              {MOMENTS_TEXT.subtitle}
            </Text>
          </div>

          {/* Moments Grid */}
          <div className="grid gap-16 md:gap-24 max-w-5xl mx-auto">
            {MOMENTS_TEXT.moments.map((moment, index) => (
              <div
                key={index}
                ref={(el) => {
                  momentRefs.current[index] = el
                }}
                className="group relative"
              >
                {/* Emotion tag */}
                <div className="mb-6">
                  <span className="inline-block px-6 py-2 rounded-full bg-bg-secondary border border-accent-rose/20 text-accent-rose text-sm font-light tracking-wider uppercase">
                    {moment.emotion}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-6 pl-8 border-l-2 border-accent-rose/30 group-hover:border-accent-rose/60 transition-colors duration-500">
                  <Text variant="xl" as="h3" className="font-light">
                    {moment.title}
                  </Text>
                  <Text variant="lg" className="text-text-muted font-light leading-relaxed">
                    {moment.description}
                  </Text>
                </div>

                {/* Decorative glow */}
                <div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-accent-rose opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-32">
            <Link href="/story">
              <Button variant="ghost" size="md">
                История
              </Button>
            </Link>
            <Link href="/reflections">
              <Button variant="primary" size="md">
                Рефлексии
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  )
}
