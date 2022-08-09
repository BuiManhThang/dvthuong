import React, { useState } from 'react'

import Head from 'next/head'
import Button from '../../components/Button/Button'
import ManufacturerInfoPopup from '../../components/ManufacturerPopup/ManufacturerInfoPopup'

const ManufacturersAdmin = () => {
  const [isActivePopupAdd, setIsActivePopupAdd] = useState(false)

  return (
    <div className="container mx-auto px-6 mt-6">
      <Head>
        <title>Nhà cung cấp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full">
        <Button onClick={() => setIsActivePopupAdd(true)}>Thêm nhà cung cấp</Button>
      </main>

      <ManufacturerInfoPopup
        isActive={isActivePopupAdd}
        onClose={() => setIsActivePopupAdd(false)}
      />
    </div>
  )
}

export default ManufacturersAdmin
