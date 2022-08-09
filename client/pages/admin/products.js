import React, { useState } from 'react'
import Head from 'next/head'

import Button from '../../components/Button/Button'
import ProductInfoPopup from '../../components/ProductPopup/ProductInfoPopup'

const ProductsAdmin = () => {
  const [isActivePopupAdd, setIsActivePopupAdd] = useState(false)

  return (
    <div className="container mx-auto px-6 mt-6">
      <Head>
        <title>Sản phẩm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <Button onClick={() => setIsActivePopupAdd(true)}>Thêm sản phẩm</Button>
      </main>

      <ProductInfoPopup isActive={isActivePopupAdd} onClose={() => setIsActivePopupAdd(false)} />
    </div>
  )
}

export default ProductsAdmin
