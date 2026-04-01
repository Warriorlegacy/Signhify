import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder:text-dark-400',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all',
        className
      )}
      {...props}
    />
  )
}