'use client'

import React from 'react'
import { useMagneticButton } from '@/shared/hooks'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  magnetic?: boolean
}

/**
 * Button компонент
 *
 * Использует design tokens через Tailwind классы.
 * Минимальный размер для touch targets: 44px
 * Опционально поддерживает магнитный эффект
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  magnetic = true,
}) => {
  const magneticRef = useMagneticButton<HTMLButtonElement>({
    strength: 0.4,
    range: 120
  })

  const baseStyles = 'font-light transition-all duration-[var(--duration-normal)] rounded-full relative overflow-hidden'

  const variantStyles = {
    primary: 'bg-accent-rose text-bg-primary hover:bg-accent-soft hover:shadow-[0_0_30px_rgba(242,161,179,0.4)] active:scale-95',
    secondary: 'bg-bg-secondary text-text-primary hover:bg-bg-primary border border-text-muted hover:border-accent-rose',
    ghost: 'bg-transparent text-text-primary hover:text-accent-rose',
  }

  const sizeStyles = {
    sm: 'px-8 py-3 text-base min-h-[48px]',
    md: 'px-10 py-4 text-lg min-h-[56px]',
    lg: 'px-14 py-5 text-xl min-h-[64px]',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      ref={magnetic && !disabled ? magneticRef : null}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </button>
  )
}
