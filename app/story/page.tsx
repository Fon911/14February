'use client'

import Link from 'next/link'
import { Section, Container } from '@/components/layout'
import { Text, Button } from '@/components/ui'
import { AmbientLight } from '@/components/effects'
import { TimelineEvent } from '@/components/scenes/TimelineEvent'
import { STORY_TEXT } from '@/content/text'

export default function StoryPage() {
  return (
    <main className="relative min-h-screen bg-bg-primary">
      <AmbientLight />

      <Section spacing="lg" className="relative z-10">
        <Container size="md">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <Text
              variant="display"
              as="h1"
              className="mb-4 drop-shadow-[0_0_30px_rgba(245,245,247,0.3)]"
            >
              {STORY_TEXT.title}
            </Text>
          </div>

          {/* Timeline с вертикальной линией */}
          <div className="relative">
            {/* Vertical Progress Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-rose/30 to-transparent hidden md:block" />

            <div className="space-y-16 md:space-y-24">
              {STORY_TEXT.events.map((event, index) => (
                <TimelineEvent
                  key={index}
                  date={event.date}
                  title={event.title}
                  description={event.description}
                  image={event.image}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-16 md:mt-24 gap-4">
            <Link href="/">
              <Button variant="ghost" size="md">
                Назад
              </Button>
            </Link>
            <Link href="/us">
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
