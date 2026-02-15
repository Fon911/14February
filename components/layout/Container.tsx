import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

/**
 * Container компонент
 *
 * Контейнер с максимальной шириной и центрированием.
 * Использует design tokens для размеров.
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'max-w-[var(--container-sm)]',
    md: 'max-w-[var(--container-md)]',
    lg: 'max-w-[var(--container-lg)]',
    xl: 'max-w-[var(--container-xl)]',
    full: 'max-w-full',
  }

  return (
    <div className={`${sizeStyles[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
