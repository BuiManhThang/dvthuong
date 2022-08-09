import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/SignIn.module.scss'
import InputField from '../../components/InputField/InputField'
import PasswordField from '../../components/PasswordField/PasswordField'
import Button from '../../components/Button/Button'
import { useAccount } from '../../hooks/accountHook'
import { validateEmail, validateEmpty } from '../../js/commonFn'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isTheFirstValidation, setIsTheFirstValidation] = useState(true)
  const { signIn } = useAccount()

  useEffect(() => {
    if (!isTheFirstValidation) {
      if (!validateEmpty(email)) {
        setEmailError('Bắt buộc nhập email')
      } else if (!validateEmail(email)) {
        setEmailError('Email không đúng định dạng')
      } else {
        setEmailError('')
      }
    }
  }, [email])

  useEffect(() => {
    if (!isTheFirstValidation) {
      if (validateEmpty(password)) {
        setPasswordError('')
      } else {
        setPasswordError('Bắt buộc nhập mật khẩu')
      }
    }
  }, [password])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsTheFirstValidation(false)
    let isValid = true
    if (!validateEmpty(email)) {
      setEmailError('Bắt buộc nhập email')
      isValid = false
    }
    if (!validateEmpty(password)) {
      setPasswordError('Bắt buộc nhập mật khẩu')
      isValid = false
    }
    if (!isValid) {
      return
    }
    if (!validateEmail(email)) {
      setEmailError('Email không đúng định dạng')
      return
    }

    signIn(email, password)
  }

  return (
    <div className={styles['sign-in']}>
      <Head>
        <title>Đăng Nhập</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles['main']}>
        <Link href="/">
          <a className={styles['main__logo']}>
            <div className={styles['icon']} />
            <div className={styles['text']}>Mua ô tô</div>
          </a>
        </Link>

        <div className={styles['main__container']}>
          <h1 className={styles['main__title']}>
            Đăng nhập hệ thống
            <span></span>
          </h1>

          <div className={styles['main__subtitle']}>
            Bạn chưa có tài khoản?
            <Link href="/register">Đăng ký</Link>
          </div>

          <form
            className={styles['main__form']}
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
          >
            <InputField
              isAutoFocus={true}
              name="email"
              id="email"
              label="Email"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                  <path d="M4.25 21.15q-1.425 0-2.412-1-.988-1-.988-2.4V6.25q0-1.4.988-2.4.987-1 2.412-1h15.5q1.425 0 2.413 1 .987 1 .987 2.4v11.5q0 1.4-.987 2.4-.988 1-2.413 1ZM12 14.3l7.75-5V6.25L12 11.3 4.25 6.25V9.3Z" />
                </svg>
              }
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              error={emailError}
            />
            <PasswordField
              name="password"
              id="password"
              label="Mật khẩu"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
              error={passwordError}
            />
            <Button
              style={{
                width: '100%',
                marginTop: '50px',
                height: '62px',
                borderRadius: '36px',
              }}
              type="submit"
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </main>

      <div className={styles['background']}></div>
    </div>
  )
}

export default SignIn
