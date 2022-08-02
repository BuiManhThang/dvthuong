import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Slide from '../../components/Slide/Slide'
import ProductCard from '../../components/ProductCard/ProductCard'
import Container from '../../components/Container/Container'
import Link from 'next/link'
import baseApi from '../../api/BaseApi'

import Img1 from '../../assets/images/sign-in-background.jpg'
import Img2 from '../../assets/images/slide/843017.jpg'
import Img3 from '../../assets/images/slide/69940876_p0.jpg'
import Img4 from '../../assets/images/slide/80678254_p0.png'
import Img5 from '../../assets/images/slide/90826733_p0.png'

const PRODUCTS_FOR_HOME = [
  {
    name: 'Honda',
    products: [
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
    ],
  },
  {
    name: 'Vinfast',
    products: [
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
      {
        banner: Img1,
        name: 'Honda R1',
        price: 1000000000,
        _id: 'abc',
      },
    ],
  },
]

const HomePage = ({ productsForHome }) => {
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

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Trang chủ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Container>
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
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                  {productGroup.products.map((product, productIdx) => (
                    <ProductCard key={productIdx} {...product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </Container>
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
      productsForHome,
    },
  }
}

export default HomePage
