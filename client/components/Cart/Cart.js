import React, { useEffect } from 'react'
import { useCart } from '../../hooks/cartHook'
import { convertPrice } from '../../js/commonFn'
import Popup from '../Popup/Popup'
import CartItem from './CartItem'
import LoadingItem from '../Loading/LoadingItem'
import Button from '../Button/Button'
import Image from 'next/image'

import EmptyCartImage from '../../assets/images/cart-empty.jpg'

const Cart = () => {
  const { products, totalNumber, totalMoney, isLoading, toggleCart, fetchCart } = useCart()

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <Popup title="Giỏ hàng" onClose={() => toggleCart(false)}>
      {isLoading ? (
        <div className="w-[500px]">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="flex border-b first:border-t border-gray-300 h-[137px] py-3 pr-3"
            >
              <LoadingItem className="w-28 h-28 rounded-md mr-6" />
              <div className="py-3 flex flex-col justify-between grow">
                <LoadingItem className="w-12 h-4 rounded-md" />
                <LoadingItem className="w-full h-4 rounded-md" />
                <LoadingItem className="w-24 h-4 rounded-md" />
              </div>
            </div>
          ))}
          <LoadingItem className="h-4 w-full mt-6 mb-3 rounded-md" />
          <LoadingItem className="h-5 w-full mb-6 rounded-md" />
          <LoadingItem className="h-[52px] w-full rounded-md" />
        </div>
      ) : products.length === 0 ? (
        <div className="w-[500px]">
          <div className="relative">
            <Image
              src={EmptyCartImage}
              width={500}
              height={411}
              objectFit="cover"
              objectPosition="center"
            />
            <div className="absolute w-full text-center bottom-3 left-1/2 -translate-x-1/2">
              <div className="text-xl text-primary/80">Giỏ hảng của bạn đang trống!</div>
              <div className="text-sm text-gray-500 pt-1">Nhấn nút để khám phát thêm sản phẩm</div>
            </div>
          </div>
          <Button
            style={{
              width: '100%',
              borderRadius: '8px',
              marginTop: '24px',
            }}
            onClick={() => toggleCart(false)}
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      ) : (
        <div>
          <div className="w-[500px] max-h-[411px] overflow-auto">
            {products.map((product) => {
              return <CartItem key={product._id} {...product} />
            })}
          </div>
          <div className="pt-6 pb-6 text-left">
            <div className="leading-none flex justify-between">
              <span>Số lượng sản phẩm</span>
              <span>{totalNumber}</span>
            </div>
            <div className="text-lg font-medium mt-3 leading-none flex justify-between">
              <span>Tạm tính</span>
              <span>{convertPrice(totalMoney)}</span>
            </div>
          </div>
          <div>
            <Button
              style={{
                borderRadius: '8px',
                width: '100%',
              }}
            >
              Đặt hàng
            </Button>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default Cart
