import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import baseApi from '../api/BaseApi'
import Gallery from '../components/Gallery/Gallery'
import ManufacturerCard from '../components/ProductCard/ManufacturerCard'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'

const ManufacturerePage = () => {
  const [manufacturers, setManufacturers] = useState([])
  const [manufacturers2, setManufacturers2] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getPaging()
  }, [])

  const getPaging = async (query = 'pageSize=200&pageIndex=1&sort=name|1') => {
    setIsLoading(true)
    try {
      const res = await baseApi.get(`/manufacturers/query?${query}`)
      setManufacturers([...res.data.data.pageData])
      setManufacturers2([...res.data.data.pageData].slice(0, 7))

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

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
            {manufacturers2.map((m) => (
              <Link key={m._id} href={`/products?m=${m._id}`}>
                <a className="overflow-hidden">{m.name}</a>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <Gallery>
            {manufacturers.map((m) => {
              return <ManufacturerCard {...m} key={m._id} />
            })}
          </Gallery>
        </div>
      </main>
    </div>
  )
}

export default ManufacturerePage
