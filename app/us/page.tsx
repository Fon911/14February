'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Section, Container } from '@/components/layout'
import { Text, Button } from '@/components/ui'
import { AmbientLight, GlassCard } from '@/components/effects'
import { Constellation } from '@/components/scenes/Constellation'
import { ASTROLOGY_TEXT } from '@/content/text'
import { useScrollReveal } from '@/shared/hooks'

export default function UsPage() {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>()
  const { elementRef: connectionRef, isVisible: connectionVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <main className="relative min-h-screen bg-bg-primary">
      <AmbientLight />

      <Section spacing="lg" className="relative z-10">
        <Container size="lg">
          {/* Header */}
          <div
            ref={titleRef}
            className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Text
              variant="display"
              as="h1"
              className="drop-shadow-[0_0_30px_rgba(245,245,247,0.3)]"
            >
              {ASTROLOGY_TEXT.title}
            </Text>
          </div>

          {/* Portraits */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
            {/* Nikita */}
            <div className="space-y-6 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src="/images/nikita-portrait.jpg"
                  alt={ASTROLOGY_TEXT.nikita.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <GlassCard intensity="light" className="p-6">
                <div className="text-center space-y-2">
                  <Text variant="heading" as="h2">
                    {ASTROLOGY_TEXT.nikita.name}
                  </Text>
                  <Text variant="body" className="text-accent-rose">
                    {ASTROLOGY_TEXT.nikita.sign} · {ASTROLOGY_TEXT.nikita.date}
                  </Text>
                  <Text variant="body" className="text-text-muted">
                    {ASTROLOGY_TEXT.nikita.description}
                  </Text>
                </div>
              </GlassCard>
            </div>

            {/* Ksusha */}
            <div className="space-y-6 group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src="/images/ksusha-portrait.jpg"
                  alt={ASTROLOGY_TEXT.ksusha.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <GlassCard intensity="light" className="p-6">
                <div className="text-center space-y-2">
                  <Text variant="heading" as="h2">
                    {ASTROLOGY_TEXT.ksusha.name}
                  </Text>
                  <Text variant="body" className="text-accent-rose">
                    {ASTROLOGY_TEXT.ksusha.sign} · {ASTROLOGY_TEXT.ksusha.date}
                  </Text>
                  <Text variant="body" className="text-text-muted">
                    {ASTROLOGY_TEXT.ksusha.description}
                  </Text>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Constellations */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
            <div className="space-y-4">
              <Text variant="body" className="text-center text-accent-rose">
                Телец
              </Text>
              <Constellation type="taurus" />
            </div>
            <div className="space-y-4">
              <Text variant="body" className="text-center text-accent-rose">
                Весы
              </Text>
              <Constellation type="libra" />
            </div>
          </div>

          {/* Connection */}
          <div
            ref={connectionRef}
            className={`text-center mb-16 space-y-4 transition-all duration-1000 ${
              connectionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <Text
              variant="heading"
              as="p"
              className="text-accent-soft drop-shadow-[0_0_25px_rgba(247,203,214,0.5)]"
            >
              {ASTROLOGY_TEXT.connection}
            </Text>
            <Text variant="body" className="text-text-muted">
              {ASTROLOGY_TEXT.connectionDate}
            </Text>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            <Link href="/story">
              <Button variant="ghost" size="md">
                Назад
              </Button>
            </Link>
            <Link href="/path">
              <Button variant="primary" size="md">
                Далее
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  )
}
