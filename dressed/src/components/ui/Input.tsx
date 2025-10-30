import React from 'react'
import { InputProps } from '../../types'
import { cn } from '../../utils/cn'

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  success,
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        'input',
        error && 'input-error',
        success && 'input-success',
        className
      )}
      {...props}
    />
  )
}

export default Input
