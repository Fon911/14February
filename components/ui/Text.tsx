import React from 'react'

interface TextProps {
  children: React.ReactNode
  variant?: 'display' | 'xl' | 'lg' | 'heading' | 'body' | 'small'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
}

/**
 * Text компонент
 *
 * Использует design tokens через Tailwind классы.
 * Все размеры шрифтов через CSS variables.
 */
export const Text = React.forwardRef<any, TextProps>(({
  children,
  variant = 'body',
  as = 'p',
  className = '',
}, ref) => {
  const Component = as

  const variantStyles = {
    display: 'text-display font-thin leading-[var(--leading-tight)] tracking-tight',
    xl: 'text-xl font-light leading-[var(--leading-tight)]',
    lg: 'text-lg font-light leading-[var(--leading-normal)]',
    heading: 'text-xl font-light leading-[var(--leading-tight)]',
    body: 'text-base font-light leading-[var(--leading-relaxed)]',
    small: 'text-sm font-normal leading-[var(--leading-normal)]',
  }

  return (
    <Component ref={ref} className={`${variantStyles[variant]} text-text-primary ${className}`}>
      {children}
    </Component>
  )
})

Text.displayName = 'Text'
