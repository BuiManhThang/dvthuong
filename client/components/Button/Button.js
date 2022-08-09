import React from 'react'
import styles from './Button.module.scss'

export const ButtonType = {
  Primary: 'primary',
  Secondary: 'secondary',
}

const Button = ({
  children,
  type,
  style,
  buttonType = ButtonType.Primary,
  className = '',
  onClick = () => {},
}) => {
  if (buttonType === ButtonType.Secondary) {
    let btnClassName = `h-11 min-w-[140px] font-bold outline-none flex items-center justify-center border text-gray-500 border-gray-300 hover:bg-gray-300 hover:text-black focus:bg-gray-300 focus:text-black transition-colors duration-300 ${className}`
    return (
      <button type={type} style={style} className={btnClassName} onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <button
      style={style}
      type={type}
      className={`${styles['button']} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
