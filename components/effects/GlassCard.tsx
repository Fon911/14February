'use client'

import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
}

/**
 * Glass Card Component
 *
 * Создаёт стеклянный эффект с размытием фона (glassmorphism).
 * Идеально для карточек, модальных окон и секций.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  intensity = 'medium',
}) => {
  const intensityStyles = {
    light: 'bg-white/5 backdrop-blur-sm border-white/10',
    medium: 'bg-white/10 backdrop-blur-md border-white/20',
    strong: 'bg-white/15 backdrop-blur-lg border-white/30',
  }

  return (
    <div
      className={`
        rounded-lg border
        ${intensityStyles[intensity]}
        shadow-[0_8px_32px_0_rgba(242,161,179,0.1)]
        transition-all duration-300
        hover:bg-white/[0.15] hover:shadow-[0_8px_32px_0_rgba(242,161,179,0.2)]
        ${className}
      `}
    >
      {children}
    </div>
  )
}
