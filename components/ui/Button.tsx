import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
  children: React.ReactNode
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  asChild,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-full whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow hover:shadow-glow hover:-translate-y-0.5',
    secondary:
      'bg-dark-800 text-white hover:bg-dark-700 border border-dark-700',
    outline:
      'bg-transparent border border-dark-600 text-white hover:border-brand-500 hover:text-brand-500',
    ghost:
      'bg-transparent text-white hover:bg-white/10',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const sharedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  )

  // If asChild, render children directly with the className passed through
  // The child is expected to be a single element (anchor, etc.)
  if (asChild) {
    return React.cloneElement(
      React.Children.only(children) as React.ReactElement<any>,
      {
        className: sharedClassName,
      }
    )
  }

  return (
    <button
      className={sharedClassName}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
