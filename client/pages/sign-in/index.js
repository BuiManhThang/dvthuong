import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/SignIn.module.scss'
import InputField from '../../components/InputField/InputField'
import PasswordField from '../../components/PasswordField/PasswordField'
import Button from '../../components/Button/Button'

const SignIn = () => {
  return (
    <div className={styles['sign-in']}>
      <Head>
        <title>Đăng Nhập</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles['navbar']}>
        <a className={styles['navbar__logo']} href="/">
          <div className={styles['icon']} />
          <div className={styles['text']}>Mua ô tô</div>
        </a>
      </nav>

      <main className={styles['main']}>
        <div className={styles['main__container']}>
          <h1 className={styles['main__title']}>
            Tạo tài khoản mới
            <span></span>
          </h1>

          <div className={styles['main__subtitle']}>
            Bạn chưa có tài khoản?
            <Link href="/">Đăng ký</Link>
          </div>

          <form className={styles['main__form']} autoComplete="off">
            <div className={styles['form-input']}>
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
              />
            </div>
            <div className={styles['form-input']}>
              <PasswordField name="password" id="password" label="Mật khẩu" />
            </div>
            <Button
              style={{
                width: '100%',
                marginTop: '40px',
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
    </div>
  )
}

export default SignIn
