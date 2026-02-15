import React from 'react'

interface SectionProps {
  children: React.ReactNode
  spacing?: 'sm' | 'md' | 'lg'
  className?: string
  id?: string
}

/**
 * Section компонент
 *
 * Основной layout компонент для секций страницы.
 * Использует design tokens для spacing.
 */
export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'md',
  className = '',
  id,
}) => {
  const spacingStyles = {
    sm: 'py-section-sm',
    md: 'py-section-md',
    lg: 'py-section-lg',
  }

  return (
    <section id={id} className={`${spacingStyles[spacing]} ${className}`}>
      {children}
    </section>
  )
}
