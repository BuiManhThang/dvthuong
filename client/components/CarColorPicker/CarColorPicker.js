import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import CarColorItem from './CarColorItem'

const CarColorPicker = ({
  value,
  required = false,
  width = null,
  height = null,
  onChange = () => {},
}) => {
  const [colorList, setColorList] = useState(value)

  useEffect(() => {
    setColorList(value)
  }, [value])

  const addColorItem = () => {
    onChange([
      ...colorList,
      {
        colorName: '',
        color: '#000000',
        images: [],
      },
    ])
  }

  const handleChange = (e, idx) => {
    const newVal = JSON.parse(JSON.stringify(colorList))
    newVal.splice(idx, 1, { ...e })
    onChange(newVal)
  }

  const handleRemoveItem = (idx) => {
    const newVal = JSON.parse(JSON.stringify(colorList))
    newVal.splice(idx, 1)
    onChange(newVal)
  }

  return (
    <div>
      <div className="block w-max text-sm pb-1 relative" onClick={addColorItem}>
        <span className="mr-1">Chọn màu xe</span>
        {required && <span className="text-red-600">*</span>}
        <span className="absolute text-lg -right-6 leading-none text-black hover:text-primary transition-all hover:scale-110 origin-center cursor-pointer">
          <i className="fa-solid fa-circle-plus"></i>
        </span>
      </div>
      <div
        style={{
          width,
          height,
        }}
      >
        <ul className="h-full px-2 pt-2 border border-gray-300 rounded-md overflow-y-auto">
          {colorList.map((colorItem, idx) => {
            return (
              <CarColorItem
                key={idx}
                idx={idx}
                value={colorItem}
                onChange={handleChange}
                onRemove={handleRemoveItem}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CarColorPicker
