import React, { useEffect, useRef, useState } from 'react'
import styles from './InputField.module.scss'

const InputField = ({
  id = '',
  name = '',
  label = '',
  placeholder = '',
  icon = null,
  isAutoFocus = false,
  error = '',
  value = '',
  type = 'text',
  onInput = () => {},
}) => {
  const [inputFieldClass, setInputFieldClass] = useState('')
  const [inputFieldErrorClass, setInputFieldErrorClass] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isAutoFocus) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (error) {
      setInputFieldErrorClass('input-field--error')
    } else {
      setInputFieldErrorClass('')
    }
  }, [error])

  const handleInput = (e) => {
    if (e.target.value) {
      setInputFieldClass('input-field--active')
    } else {
      setInputFieldClass('')
    }
    onInput(e)
  }

  return (
    <div
      className={`${styles['input-field']} ${styles[inputFieldErrorClass]} ${styles[inputFieldClass]}`}
    >
      <div className={styles['input-field__container']}>
        <input
          ref={inputRef}
          className={styles['input-field__input']}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          onInput={handleInput}
          value={value}
        />
        <label className={styles['input-field__label']} htmlFor={id}>
          {label}
        </label>
        {icon && (
          <label className={styles['input-field__icon']} htmlFor={id}>
            {icon}
          </label>
        )}
      </div>
      {error && <div className={styles['input-field__error']}>{error}</div>}
    </div>
  )
}

export default InputField
