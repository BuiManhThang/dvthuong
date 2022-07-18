import React from 'react'
import styles from './Button.module.scss'

const Button = ({ children, type, style }) => {
  return (
    <button style={style} type={type} className={styles['button']}>
      {children}
    </button>
  )
}

export default Button
