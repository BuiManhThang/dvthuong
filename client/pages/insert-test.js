import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField/InputField'
import Button from '../components/Button/Button'
import ImageUploader from '../components/ImageUploader/ImageUploader'
import baseApi from '../api/BaseApi'

const InsertManufacturer = () => {
  const [name, setName] = useState('')
  const [manufacturers, setManufacturers] = useState([])

  const [productData, setProductData] = useState({
    name: '',
    manufacturer: '',
    number: 0,
    price: 0,
    image: '',
    cylinderCapacity: 0,
    fuelCapacity: 0,
    consumption: 0,
    size: {
      length: 0,
      width: 0,
      height: 0,
    },
    colors: [],
    gallery: [],
    detail: {
      numberOfSeats: 0,
      weight: 0,
      engineType: '',
      energySystem: '',
      frontBrake: 0,
      backBrake: 0,
      powerSupport: false,
      eco: false,
      warningSystem: false,
    },
  })

  useEffect(() => {
    const getManufacturers = async () => {
      const res = await baseApi.get('manufacturers')
      if (res.data.success) {
        setManufacturers(res.data.data)
      }
    }

    getManufacturers()
  }, [])

  const handleSaveManufacturer = async (e) => {
    e.preventDefault()
    try {
      const res = await baseApi.post('manufacturers', {
        name,
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    try {
      const res = await baseApi.post('cars', {
        ...productData,
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {/* Manufacturer */}
      <div>
        <h1 className="text-center text-2xl my-6">Insert Manufacturer</h1>
        <form onSubmit={handleSaveManufacturer}>
          <div className="flex flex-col items-center gap-2">
            <InputField
              id="name"
              name="name"
              label="Tên nhà cung cấp"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
            <Button type="submit">Lưu</Button>
          </div>
        </form>
      </div>

      {/* Product */}
      <div>
        <h1 className="text-center text-2xl my-6">Insert Product</h1>
        <form onSubmit={handleSaveProduct}>
          <div className="flex flex-col items-center gap-2">
            <InputField
              id="product-name"
              name="product-name"
              label="Tên sản phẩm"
              value={productData.name}
              onInput={(e) => setProductData({ ...productData, name: e.target.value })}
            />

            <div>
              <label htmlFor="manufacturer">Nhà cung cấp</label>
              <select
                name="manufacturer"
                id="manufacturer"
                value={productData.manufacturer}
                onChange={(e) => setProductData({ ...productData, manufacturer: e.target.value })}
              >
                <option value="">None</option>
                {manufacturers.map((mnu) => (
                  <option key={mnu._id} value={mnu._id}>
                    {mnu.name}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              id="number"
              name="number"
              type="number"
              label="Số lượng"
              value={productData.number}
              onInput={(e) => setProductData({ ...productData, number: parseInt(e.target.value) })}
            />

            <InputField
              id="price"
              name="price"
              type="number"
              label="Đơn giá"
              value={productData.price}
              onInput={(e) => setProductData({ ...productData, price: parseInt(e.target.value) })}
            />

            <ImageUploader
              id="image"
              name="image"
              text="Avatar sản phẩm"
              value={productData.image}
              onChange={(e) => setProductData({ ...productData, image: e })}
            />

            <InputField
              id="cylinderCapacity"
              name="cylinderCapacity"
              type="number"
              label="Dung tích xi lanh"
              value={productData.cylinderCapacity}
              onInput={(e) =>
                setProductData({ ...productData, cylinderCapacity: parseInt(e.target.value) })
              }
            />

            <InputField
              id="fuelCapacity"
              name="fuelCapacity"
              type="number"
              label="Dung tích nhiên liệu"
              value={productData.fuelCapacity}
              onInput={(e) =>
                setProductData({ ...productData, fuelCapacity: parseInt(e.target.value) })
              }
            />

            <InputField
              id="consumption"
              name="consumption"
              type="number"
              label="Mức tiêu thụ"
              value={productData.consumption}
              onInput={(e) =>
                setProductData({ ...productData, consumption: parseInt(e.target.value) })
              }
            />

            <InputField
              id="length"
              name="length"
              type="number"
              label="Dài"
              value={productData.size.length}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  size: { ...productData.size, length: parseInt(e.target.value) },
                })
              }
            />

            <InputField
              id="width"
              name="width"
              type="number"
              label="Rộng"
              value={productData.size.width}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  size: { ...productData.size, width: parseInt(e.target.value) },
                })
              }
            />

            <InputField
              id="height"
              name="height"
              type="number"
              label="Cao"
              value={productData.size.height}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  size: { ...productData.size, height: parseInt(e.target.value) },
                })
              }
            />

            <InputField
              id="numberOfSeats"
              name="numberOfSeats"
              type="number"
              label="Số ghế"
              value={productData.detail.numberOfSeats}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  detail: {
                    ...productData.detail,
                    numberOfSeats: parseInt(e.target.value),
                  },
                })
              }
            />

            <InputField
              id="weight"
              name="weight"
              type="number"
              label="Trọng lượng"
              value={productData.detail.weight}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  detail: {
                    ...productData.detail,
                    weight: parseInt(e.target.value),
                  },
                })
              }
            />

            <InputField
              id="engineType"
              name="engineType"
              label="Kiểu động cơ"
              value={productData.detail.engineType}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  detail: {
                    ...productData.detail,
                    engineType: e.target.value,
                  },
                })
              }
            />

            <InputField
              id="energySystem"
              name="energySystem"
              label="Hệ thống nhiên liệu"
              value={productData.detail.energySystem}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  detail: {
                    ...productData.detail,
                    energySystem: e.target.value,
                  },
                })
              }
            />

            <InputField
              id="frontBrake"
              name="frontBrake"
              type="number"
              label="Phanh trước"
              value={productData.detail.frontBrake}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  detail: {
                    ...productData.detail,
                    frontBrake: parseInt(e.target.value),
                  },
                })
              }
            />

            <InputField
              id="backBrake"
              name="backBrake"
              type="number"
              label="Phanh sau"
              value={productData.detail.backBrake}
              onInput={(e) =>
                setProductData({
                  ...productData,
                  detail: {
                    ...productData.detail,
                    backBrake: parseInt(e.target.value),
                  },
                })
              }
            />

            <div className="flex gap-x-4">
              <div>Trợ lực</div>
              <div className="flex">
                <label htmlFor="powerSupport-true">Có</label>
                <input
                  type="radio"
                  name="powerSupport"
                  id="powerSupport-true"
                  checked={productData.detail.powerSupport}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      detail: {
                        ...productData.detail,
                        powerSupport: e.target.checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex">
                <label htmlFor="powerSupport-false">Không</label>
                <input
                  type="radio"
                  name="powerSupport"
                  id="powerSupport-false"
                  checked={!productData.detail.powerSupport}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      detail: {
                        ...productData.detail,
                        powerSupport: !e.target.checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-x-4">
              <div>Eco</div>
              <div className="flex">
                <label htmlFor="powerSupport-true">Có</label>
                <input
                  type="radio"
                  name="eco"
                  id="eco-true"
                  checked={productData.detail.eco}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      detail: {
                        ...productData.detail,
                        eco: e.target.checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex">
                <label htmlFor="eco-false">Không</label>
                <input
                  type="radio"
                  name="eco"
                  id="eco-false"
                  checked={!productData.detail.eco}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      detail: {
                        ...productData.detail,
                        eco: !e.target.checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-x-4">
              <div>Hệ thống cảnh báo</div>
              <div className="flex">
                <label htmlFor="powerSupport-true">Có</label>
                <input
                  type="radio"
                  name="warningSystem"
                  id="warningSystem-true"
                  checked={productData.detail.warningSystem}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      detail: {
                        ...productData.detail,
                        warningSystem: e.target.checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex">
                <label htmlFor="warningSystem-false">Không</label>
                <input
                  type="radio"
                  name="warningSystem"
                  id="warningSystem-false"
                  checked={!productData.detail.warningSystem}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      detail: {
                        ...productData.detail,
                        warningSystem: !e.target.checked,
                      },
                    })
                  }
                />
              </div>
            </div>

            <Button type="submit">Lưu</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InsertManufacturer
