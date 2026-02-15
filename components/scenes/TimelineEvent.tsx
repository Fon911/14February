'use client'

import Image from 'next/image'
import { Text } from '@/components/ui'
import { GlassCard } from '@/components/effects'
import { useScrollReveal } from '@/shared/hooks'

interface TimelineEventProps {
  date: string
  title: string
  description: string
  image?: string
  index: number
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  date,
  title,
  description,
  image,
  index,
}) => {
  const { elementRef, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
    delay: index * 100,
  })

  return (
    <div
      ref={elementRef}
      className={`
        relative
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      {/* Timeline Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-4 md:top-1/2 md:-translate-y-1/2 z-10">
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-accent-rose shadow-[0_0_20px_rgba(242,161,179,0.6)]" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-accent-rose animate-ping opacity-75" />
        </div>
      </div>

      <div
        className={`flex flex-col md:flex-row gap-6 md:gap-12 items-center ${
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        {/* Content */}
        <div className="flex-1">
          <GlassCard intensity="medium" className="p-6 md:p-8">
            <div className="space-y-4">
              <Text variant="small" className="text-accent-rose uppercase tracking-wider font-medium">
                {date}
              </Text>
              <Text variant="heading" as="h3" className="text-text-primary">
                {title}
              </Text>
              <Text variant="body" className="text-text-muted leading-relaxed">
                {description}
              </Text>
            </div>
          </GlassCard>
        </div>

        {/* Image */}
        {image ? (
          <div className="flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  )
}
