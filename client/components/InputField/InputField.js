import React, { useEffect, useRef, useState } from 'react'
import styles from './InputField.module.scss'

const InputField = ({
  id = '',
  name = '',
  label = '',
  placeholder = '',
  icon = null,
  isAutoFocus = false,
}) => {
  const [inputFieldClass, setInputFieldClass] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isAutoFocus) {
      inputRef.current.focus()
    }
  }, [])

  const handleInput = (e) => {
    if (e.target.value) {
      setInputFieldClass('input-field--active')
    } else {
      setInputFieldClass('')
    }
  }

  return (
    <div className={`${styles['input-field']} ${styles[inputFieldClass]}`}>
      <div className={styles['input-field__container']}>
        <input
          ref={inputRef}
          className={styles['input-field__input']}
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          onInput={handleInput}
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
    </div>
  )
}

export default InputField
