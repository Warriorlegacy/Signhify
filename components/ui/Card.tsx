import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
}

export function Card({ className, hover = true, glow = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-dark-900/50 border border-dark-700/50 rounded-2xl p-6 transition-all duration-300',
        hover && 'hover:border-brand-500/30 hover:-translate-y-1 hover:shadow-2xl',
        glow && 'hover:shadow-glow',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}