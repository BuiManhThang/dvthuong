import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Slide from '../../components/Slide/Slide'
import ProductCard from '../../components/ProductCard/ProductCard'
import Link from 'next/link'
import Gallery from '../../components/Gallery/Gallery'
import baseApi from '../../api/BaseApi'

import Img1 from '../../assets/images/sign-in-background.jpg'
import Img2 from '../../assets/images/slide/843017.jpg'
import Img3 from '../../assets/images/slide/69940876_p0.jpg'
import Img4 from '../../assets/images/slide/80678254_p0.png'
import Img5 from '../../assets/images/slide/90826733_p0.png'

const HomePage = ({ productsForHome1 }) => {
  const items = [
    {
      src: Img1,
    },
    {
      src: Img2,
    },
    {
      src: Img3,
    },
    {
      src: Img4,
    },
    {
      src: Img5,
    },
  ]

  const [windowWidth, setWindowWidth] = useState(0)
  const [productsForHome, setProductsForHome] = useState([])

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const setWindowWidthFunc = () => {
      setWindowWidth(window.innerWidth)
    }

    const fetchData = async () => {
      const res = await baseApi.get('/cars/getCarsForHome')
      let productsForHome = []
      if (res.data.success) {
        productsForHome = res.data.data
      }

      setProductsForHome(productsForHome)
    }

    window.addEventListener('resize', setWindowWidthFunc)
    fetchData()

    return () => {
      window.removeEventListener('resize', setWindowWidthFunc)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Trang chủ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full">
        <div className="w-full">
          <Slide items={items} delay={3000} height={windowWidth <= 768 ? 300 : 500} />
        </div>
        <div className="container mx-auto">
          {productsForHome.map((productGroup, productGroupIdx) => (
            <div className="mt-10" key={productGroupIdx}>
              <h3 className="text-xl font-bold mb-4 flex items-end">
                {productGroup.name}
                <div className="block ml-3 text-base text-primary transition-all hover:underline">
                  <Link href={productGroup.name}>Xem tất cả</Link>
                </div>
              </h3>
              <Gallery>
                {productGroup.products.map((product, productIdx) => (
                  <ProductCard key={productIdx} {...product} />
                ))}
              </Gallery>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await baseApi.get('/cars/getCarsForHome')
  let productsForHome = []
  if (res.data.success) {
    productsForHome = res.data.data
  }

  return {
    props: {
      productsForHome1: productsForHome,
    },
  }
}

export default HomePage
