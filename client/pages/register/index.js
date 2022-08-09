import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/SignIn.module.scss'
import InputField from '../../components/InputField/InputField'
import PasswordField from '../../components/PasswordField/PasswordField'
import Button from '../../components/Button/Button'
import { validateEmail, validateEmpty, validatePassword } from '../../js/commonFn'
import { useAccount } from '../../hooks/accountHook'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { register, errors: serverErrors } = useAccount()

  useEffect(() => {
    const currentErrors = { ...errors }
    serverErrors.map((err) => {
      currentErrors[err.param] = err.msg
    })

    setErrors(currentErrors)
  }, [serverErrors])

  const handleSubmit = (e) => {
    e.preventDefault()

    const currentError = {
      email: '',
      password: '',
      confirmPassword: '',
    }

    if (!validateEmpty(email)) {
      currentError.email = 'Email không được để trống'
    } else if (!validateEmail(email)) {
      currentError.email = 'Email sai định dạng'
    }

    if (!validateEmpty(password)) {
      currentError.password = 'Mật khẩu không được để trống'
    } else if (!validatePassword(password)) {
      currentError.password = 'Mật khẩu phải có ít nhất 6 ký tự gồm chữ và số'
    }

    if (!validateEmpty(confirmPassword)) {
      currentError.confirmPassword = 'Xác nhận mật khẩu không được để trống'
    } else if (password !== confirmPassword) {
      currentError.confirmPassword = 'Mật khẩu không trùng khớp'
    }

    if (
      currentError.email === '' &&
      currentError.password === '' &&
      currentError.confirmPassword === ''
    ) {
      register(email, password, confirmPassword)
      setErrors(currentError)
      return
    }

    setErrors(currentError)
  }

  return (
    <div className={styles['sign-in']}>
      <Head>
        <title>Đăng ký</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles['main']}>
        <a className={styles['main__logo']} href="/">
          <div className={styles['icon']} />
          <div className={styles['text']}>Mua ô tô</div>
        </a>

        <div className={styles['main__container']}>
          <h1 className={styles['main__title']}>
            Tạo tài khoản mới
            <span></span>
          </h1>

          <div className={styles['main__subtitle']}>
            Bạn đã có tài khoản?
            <Link href="/sign-in">Đăng nhập</Link>
          </div>

          <form className={styles['main__form']} autoComplete="off" onSubmit={handleSubmit}>
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
              error={errors.email}
            />
            <PasswordField
              name="password"
              id="password"
              label="Mật khẩu"
              value={password}
              onInput={(e) => setpassword(e.target.value)}
              error={errors.password}
            />
            <PasswordField
              name="cfPassword"
              id="cfPassword"
              label="Xác nhận mật khẩu"
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
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
              Đăng ký
            </Button>
          </form>
        </div>
      </main>

      <div className={styles['background']}></div>
    </div>
  )
}

export default Register
