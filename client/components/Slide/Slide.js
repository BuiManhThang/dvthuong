import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const Slide = ({ items = [], height = 500, delay = 0, isPagination = true }) => {
  const [value, setValue] = useState(1)
  const [timeoutFunc, setTimeoutFunc] = useState(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const containerRef = useRef(null)
  const sliderRef = useRef(null)

  useEffect(() => {
    let width = containerWidth
    if (!containerWidth) {
      width = parseInt(containerRef.current.getBoundingClientRect().width)
      sliderRef.current.style.transform = `translateX(-${value * width}px)`
      setContainerWidth(width)
    }
    if (delay) {
      clearTimeout(timeoutFunc)
      const timeout = setTimeout(() => {
        const newVal = value + 1
        goToSlide(newVal, width)
      }, delay)
      setTimeoutFunc(timeout)
    }
  }, [value])

  const formattedItems = [...items]
  if (items.length) {
    formattedItems.push(items[0])
    formattedItems.unshift(items[items.length - 1])
  }

  const goToSlide = (newVal, containerWidthProp = 0) => {
    let currentContainerWidth = containerWidth
    if (containerWidthProp) {
      currentContainerWidth = containerWidthProp
    }
    sliderRef.current.style.transform = `translateX(-${newVal * currentContainerWidth}px)`
    sliderRef.current.style.transition = 'transform 0.3s linear'
    setValue(newVal)
  }

  const nextItem = () => {
    const newVal = value + 1
    goToSlide(newVal)
  }

  const prevItem = () => {
    const newVal = value - 1
    goToSlide(newVal)
  }

  const handleTransitionEnd = () => {
    if (value >= formattedItems.length - 1) {
      const newVal = 1
      sliderRef.current.style.transform = `translateX(-${newVal * containerWidth}px)`
      sliderRef.current.style.transition = 'none'
      setValue(newVal)
    } else if (value <= 0) {
      const newVal = formattedItems.length - 2
      sliderRef.current.style.transform = `translateX(-${newVal * containerWidth}px)`
      sliderRef.current.style.transition = 'none'
      setValue(newVal)
    }
  }

  const handleClickPaging = (idx) => {
    const newVal = idx + 1
    goToSlide(newVal)
  }

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden"
      style={{
        height: height,
      }}
    >
      <div
        className="group absolute top-1/2 left-4 -translate-y-1/2 z-10 fill-white h-14 w-14 rounded-full flex justify-center items-center bg-blue-200 overflow-hidden cursor-pointer hover:bg-blue-500 transition-colors shadow-md border border-white border-solid"
        onClick={prevItem}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          className="relative left-[6px] scale-75 group-hover:scale-90 transition-all"
        >
          <path d="M21.2 45.2 0 24 21.2 2.8l4 4.05L8.05 24 25.2 41.15Z" />
        </svg>
      </div>
      <div
        className="group absolute top-1/2 right-4 -translate-y-1/2 z-10 fill-white h-14 w-14 rounded-full flex justify-center items-center bg-blue-200 overflow-hidden cursor-pointer hover:bg-blue-500 transition-colors shadow-md border border-white border-solid"
        onClick={nextItem}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="48"
          className="relative left-[2px] scale-75 group-hover:scale-90 transition-all"
        >
          <path d="m15.2 45.1-4-4.05L28.35 23.9 11.2 6.75l4-4.05 21.2 21.2Z" />
        </svg>
      </div>

      {isPagination && (
        <div className="absolute z-10 bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-4">
          {items.map((_, idx) => {
            let className =
              'w-3 h-3 flex items-center justify-center bg-blue-200 hover:bg-blue-500 hover:scale-125 transition-all cursor-pointer rounded-full shadow-md border border-white border-solid'
            if (value === idx + 1) {
              className += ' bg-blue-500 scale-125'
            }
            return <div className={className} key={idx} onClick={() => handleClickPaging(idx)} />
          })}
        </div>
      )}

      <ul
        ref={sliderRef}
        className={`p-0 m-0 list-none h-full flex`}
        style={{
          width: `${containerWidth * formattedItems.length}px`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {formattedItems.map((item, idx) => {
          const className = `relative h-full`
          return (
            <li
              key={idx}
              style={{
                width: `${containerWidth}px`,
              }}
              className={className}
            >
              <Image className="object-cover object-center" layout="fill" src={item.src} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Slide
