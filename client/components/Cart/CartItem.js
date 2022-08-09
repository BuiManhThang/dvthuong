import React from 'react'
import { convertPrice } from '../../js/commonFn'
import Image from 'next/image'
import NumberChanger from '../NumberChanger/NumberChanger'
import { useCart } from '../../hooks/cartHook'
import { useRouter } from 'next/router'

const CartItem = ({ name, price, number, _id, image }) => {
  const { addProduct, minusProduct, deleteProduct, toggleCart } = useCart()
  const router = useRouter()

  const handleChangeNumber = (newNumber) => {
    if (newNumber > number) {
      addProduct(_id)
    } else {
      if (newNumber > 0) {
        minusProduct(_id)
      }
    }
  }

  const handleClickItem = () => {
    toggleCart(false)
    router.replace(`/products/${_id}`)
  }

  return (
    <div className="first:border-t pr-3 flex w-full justify-between border-b border-gray-300 py-3">
      <div className="relative mr-6 w-28 h-28 rounded-md overflow-hidden border border-gray-300">
        <Image src={image} objectFit="contain" objectPosition="center" width={128} height={128} />
      </div>
      <div className="flex flex-col justify-between grow py-3">
        <div className="flex items-center justify-between w-full">
          <span
            className="text-lg text-gray-700 font-medium leading-none hover:text-primary/80 transition-colors cursor-pointer"
            onClick={handleClickItem}
          >
            {name}
          </span>
          <span className="font-medium leading-none">{convertPrice(price * number)}</span>
        </div>
        <div className="text-sm text-gray-500 leading-none">Giá: {convertPrice(price)}</div>
        <div className="flex items-center justify-between">
          <div>
            <NumberChanger value={number} onChange={handleChangeNumber} />
          </div>
          <div
            className="text-gray-500 cursor-pointer hover:text-primary/80 transition-colors"
            onClick={() => deleteProduct(_id)}
          >
            <i className="fa-solid fa-trash"></i>
            <span className="pl-2 text-sm">Xóa</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
