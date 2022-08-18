import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'




const IntroPage = () => {
  return (
    <div>
      <Head>
        <title>Hãng xe - Công ty CP Việt Hưng</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-6 ms:px-0">
      <div className={styles.menu}>
		<div className={styles.title_menu}>Thương hiệu xe nổi bật</div>
		<div className={styles.menu_item}>
			<a href="#">Honda</a>
			<a href="#">Toyota</a>
			<a href="#">Vinfast</a>
			<a href="#">Ford</a>
			<a href="#">Ferrari</a>
			<a href="#">Audi</a>
			<a href="#">Mercedes</a>
		</div>
	</div>
  <div className={styles.title}>
    Honda
  </div>
  <div className={styles.title}>
    Vinfast
  </div>
  <div className={styles.title}>
    Toyota
  </div>
      </main>
    </div>
  )
}

export default IntroPage
