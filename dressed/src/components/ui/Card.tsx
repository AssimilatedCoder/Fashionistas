import React from 'react'
import { CardProps } from '../../types'
import { cn } from '../../utils/cn'

const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  variant = 'default',
  selected = false,
  ...props
}) => {
  const variantClasses = {
    default: 'card',
    elevated: 'card-elevated',
    outfit: selected ? 'card-outfit card-outfit-selected' : 'card-outfit'
  }
  
  return (
    <div
      className={cn(
        variantClasses[variant],
        onClick && 'cursor-pointer hover:shadow-medium hover:-translate-y-1 transition-all duration-250',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
