import React from 'react'
import Image from 'next/image'

/**
 * Convert Price
 * @param {number} price
 * @returns formatted price
 */
const convertPrice = (price) => {
  if (price) {
    const priceStr = price.toString()
    let priceArr = priceStr.split('')
    const newPriceArr = []
    const priceArrLength = priceArr.length - 1
    let i = 0
    for (let index = priceArrLength; index >= 0; index--) {
      const character = priceArr[index]
      newPriceArr.unshift(character)
      i += 1
      if (i === 3 && index !== 0) {
        newPriceArr.unshift('.')
        i = 0
      }
    }
    return `${newPriceArr.join('')}đ`
  }
  return ''
}

const ProductCard = ({ name, image, price, url }) => {
  const formattedPrice = convertPrice(price)
  return (
    <div className="group w-full rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all">
      <div className="relative w-full h-64">
        <div className="absolute z-10 w-full h-full flex items-center justify-center">
          <div
            className="relative w-[80px] h-[80px] rounded-full bg-primary text-white scale-0 opacity-0 text-lg font-medium flex items-center justify-center text-center overflow-hidden
              transition-all duration-300 group-hover:opacity-100 group-hover:scale-100
              before:absolute before:w-[200%] before:h-[130%] before:bg-[rgba(255,255,255,0.2)] before:rotate-45 before:left-[95%] before:top-[-40%] before:transition-all before:duration-300
              hover:before:left-[-80%]"
            style={{
              boxShadow: '0 0 25px 5px rgba(255, 255, 255, 0.6)',
            }}
          >
            Chi tiết
          </div>
        </div>
        <Image
          className="object-cover object-center group-hover:scale-125 transition-all duration-300"
          layout="fill"
          src={image}
        />
      </div>
      <div className="text-left px-2 flex items-center justify-between">
        <div>
          <div className="mt-2 font-medium text-sm">{name}</div>
          <div className="mb-2 text-sm">Giá từ: {formattedPrice}</div>
        </div>
        <div
          className="relative flex items-center px-2 py-2 bg-primary gap-x-2 rounded-lg overflow-hidden
            before:absolute before:w-[200%] before:h-[400%] before:bg-[rgba(255,255,255,0.2)] before:rotate-45 before:left-[45%] before:top-[-300%] before:transition-all before:duration-300
            hover:before:left-[-80%]"
        >
          <span className="text-white font-medium text-xs">Thêm vào giỏ hàng</span>
          <div className="fill-white">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="M4.25 21.15q-1.425 0-2.412-1-.988-1-.988-2.4V6.25q0-1.4.988-2.4.987-1 2.412-1h15.5q1.425 0 2.413 1 .987 1 .987 2.4v11.5q0 1.4-.987 2.4-.988 1-2.413 1ZM12 14.3l7.75-5V6.25L12 11.3 4.25 6.25V9.3Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
