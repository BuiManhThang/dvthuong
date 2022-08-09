import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ButtonType } from '../Button/Button'
import { TypeStyle } from '../InputField/InputField'
import { useValidate } from '../../hooks/validationHook'
import { openToastMsg } from '../../slices/toastMsgSlice'
import { ToastMsgStatus } from '../../enums/ToastMsgEnum'
import baseApi from '../../api/BaseApi'

import Popup from '../Popup/Popup'
import InputField from '../InputField/InputField'
import Button from '../Button/Button'
import Combobox from '../Combobox/Combobox'
import InputFieldNumber from '../InputField/InputFieldNumber'
import ImageUploader from '../ImageUploader/ImageUploader'
import CarColorPicker from '../CarColorPicker/CarColorPicker'
import RadioGroup from '../Radio/RadioGroup'

const INITIAL_PRODUCT_DATA = {
  code: '',
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
    frontBrake: 1,
    backBrake: 1,
    powerSupport: false,
    eco: false,
    warningSystem: false,
  },
}

const BRAKE_OPTIONS = [
  {
    _id: 1,
    name: 'Phanh đĩa',
  },
  {
    _id: 2,
    name: 'Phanh tang trống',
  },
]

const TRUE_FALSE_OPTIONS = [
  {
    _id: true,
    name: 'Có',
  },
  {
    _id: false,
    name: 'Không',
  },
]

const ProductInfoPopup = ({ isActive = false, onClose = () => {} }) => {
  const [productData, setProductData] = useState(JSON.parse(JSON.stringify(INITIAL_PRODUCT_DATA)))

  const { errors, validate, clearErrors, setServerErrors } = useValidate({
    name: {
      name: 'Tên sản phẩm',
      rules: ['required'],
    },
    manufacturer: {
      name: 'Nhà cung cấp',
      rules: ['required'],
    },
    number: {
      name: 'Số lượng',
      rules: ['required'],
    },
    price: {
      name: 'Giá',
      rules: ['required'],
    },
    image: {
      name: 'Hình ảnh',
      rules: ['required'],
    },
    cylinderCapacity: {
      name: 'Dung tích xi lanh (cm3)',
      rules: ['required'],
    },
    fuelCapacity: {
      name: 'Dung tích thùng nhiên liệu (lít)',
      rules: ['required'],
    },
    consumption: {
      name: 'Dung tích tiêu thụ (lít/100km)',
      rules: ['required'],
    },
    length: {
      name: 'Dài (mm)',
      rules: ['required'],
      parent: 'size',
    },
    width: {
      name: 'Rộng (mm)',
      rules: ['required'],
      parent: 'size',
    },
    height: {
      name: 'Cao (mm)',
      rules: ['required'],
      parent: 'size',
    },
    numberOfSeats: {
      name: 'Số ghế',
      rules: ['required'],
      parent: 'detail',
    },
    weight: {
      name: 'Cân nặng (kg)',
      rules: ['required'],
      parent: 'detail',
    },
    engineType: {
      name: 'Kiều động cơ',
      rules: ['required'],
      parent: 'detail',
    },
    energySystem: {
      name: 'Hệ thống nhiên liệu',
      rules: ['required'],
      parent: 'detail',
    },
    colors: {
      name: 'Màu xe',
      rules: ['isColors'],
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isFirstValidate, setIsFirstValidate] = useState(true)
  const [manufacturerList, setManufacturerList] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isActive) {
      setProductData(JSON.parse(JSON.stringify(INITIAL_PRODUCT_DATA)))
      setIsFirstValidate(true)
      clearErrors()
    } else {
      const getInitialData = async () => {
        setIsLoading(true)
        try {
          const [resManufacturers, resNewCode] = await Promise.all([
            baseApi.get('/manufacturers'),
            baseApi.get('/cars/newCode'),
          ])
          if (resManufacturers.data.success) {
            setManufacturerList(resManufacturers.data.data)
          }
          if (resNewCode.data.success) {
            setProductData((prev) => {
              return {
                ...prev,
                code: resNewCode.data.data,
              }
            })
          }
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      }

      getInitialData()
    }
  }, [isActive])

  useEffect(() => {
    if (!isFirstValidate) {
      validate(productData)
    }
  }, [productData])

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    setIsFirstValidate(false)
    if (validate(productData)) {
      console.log('success')
      setIsLoading(true)
      try {
        const res = await baseApi.post('cars', productData)
        if (res.data.success) {
          setIsLoading(false)
          dispatch(
            openToastMsg({
              status: ToastMsgStatus.Success,
              msg: `Lưu thành công thông tin sản phẩm với mã <${productData.code}>`,
            })
          )
          onClose()
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error.response)
        if (error.response.status === 400) {
          setServerErrors(error.response.data.errors)
        }
        console.log(error)
        dispatch(
          openToastMsg({
            status: ToastMsgStatus.Error,
            msg: 'Có lỗi xảy ra',
          })
        )
      }
    }
  }

  return (
    <Popup
      title="Thêm sản phẩm"
      isLoading={isLoading}
      isActive={isActive}
      onClose={onClose}
      footer={
        <div className="py-4 flex items-center justify-end gap-x-2 px-6">
          <Button
            style={{
              height: 44,
              borderRadius: 6,
            }}
            buttonType={ButtonType.Secondary}
            onClick={(e) => {
              e.preventDefault()
              onClose()
            }}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            style={{
              height: 44,
              borderRadius: 6,
            }}
            onClick={handleSaveProduct}
          >
            Lưu
          </Button>
        </div>
      }
    >
      <div className="max-h-[calc(100vh_-_204px)]">
        <div>
          <h2 className="text-lg font-medium leading-none mb-4">Thông tin chung</h2>
          <div className="mb-2 flex items-center gap-x-4">
            <div className="w-96">
              <InputField
                name="code"
                id="code"
                label="Mã sản phẩm"
                required={true}
                typeStyle={TypeStyle.Normal}
                value={productData.code}
                error={errors.code}
                disabled={true}
              />
            </div>
            <div className="w-96">
              <InputField
                name="productName"
                id="productName"
                label="Tên sản phẩm"
                required={true}
                typeStyle={TypeStyle.Normal}
                value={productData.name}
                error={errors.name}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    name: e.target.value,
                  })
                }
                isAutoFocus={true}
              />
            </div>
          </div>

          <div className="mb-2 flex items-center gap-x-4">
            <div className="w-96">
              <Combobox
                id="manufacturer"
                name="manufacturer"
                label="Nhà cung cấp"
                required
                items={manufacturerList}
                value={productData.manufacturer}
                error={errors.manufacturer}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    manufacturer: e,
                  })
                }
              />
            </div>
            <div className="w-96">
              <InputFieldNumber
                name="price"
                id="price"
                label="Giá cơ bản"
                required={true}
                value={productData.price}
                error={errors.price}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    price: e,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-2 flex items-center gap-x-4">
            <div className="w-[184px]">
              <InputFieldNumber
                name="number"
                id="number"
                label="Số lượng"
                required={true}
                value={productData.number}
                error={errors.number}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    number: e,
                  })
                }
              />
            </div>
            <div className="w-[184px]">
              <InputFieldNumber
                name="cylinderCapacity"
                id="cylinderCapacity"
                label="Dung tích xi lanh (cm3)"
                required={true}
                value={productData.cylinderCapacity}
                error={errors.cylinderCapacity}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    cylinderCapacity: e,
                  })
                }
              />
            </div>
            <div className="w-[184px]">
              <InputFieldNumber
                name="fuelCapacity"
                id="fuelCapacity"
                label="Dung tích nhiên liệu (lít)"
                required={true}
                value={productData.fuelCapacity}
                error={errors.fuelCapacity}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    fuelCapacity: e,
                  })
                }
              />
            </div>
            <div className="w-[184px]">
              <InputFieldNumber
                name="consumption"
                id="consumption"
                label="Mức tiêu thụ (lít/100km)"
                required={true}
                value={productData.consumption}
                error={errors.consumption}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    consumption: e,
                  })
                }
              />
            </div>
          </div>

          <div className="mb-2 flex items-center gap-x-4">
            <div className="w-[117px]">
              <InputFieldNumber
                name="length"
                id="length"
                label="Dài"
                required={true}
                value={productData.size.length}
                error={errors.length}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    size: {
                      ...productData.size,
                      length: e,
                    },
                  })
                }
              />
            </div>
            <div className="w-[117px]">
              <InputFieldNumber
                name="width"
                id="width"
                label="Rộng"
                required={true}
                value={productData.size.width}
                error={errors.width}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    size: {
                      ...productData.size,
                      width: e,
                    },
                  })
                }
              />
            </div>
            <div className="w-[117px]">
              <InputFieldNumber
                name="height"
                id="height"
                label="Cao"
                required={true}
                value={productData.size.height}
                error={errors.height}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    size: {
                      ...productData.size,
                      height: e,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="mb-2 flex items-center gap-x-4">
            <div className="w-96">
              <ImageUploader
                id="image"
                name="image"
                label="Hình đại diện sản phẩm"
                width={384}
                height={384}
                required
                value={productData.image}
                error={errors.image}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    image: e,
                  })
                }
              />
            </div>

            <div className="w-96">
              <CarColorPicker
                value={productData.colors}
                required
                width={384}
                height={384}
                error={errors.colors}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    colors: e,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium leading-none mb-4">Thông tin chi tiết</h2>
          <div className="mb-2 flex items-center gap-x-4">
            <div className="w-96">
              <InputField
                name="engineType"
                id="engineType"
                label="Kiểu động cơ"
                required={true}
                typeStyle={TypeStyle.Normal}
                value={productData.detail.engineType}
                error={errors.engineType}
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
            </div>
            <div className="w-96">
              <InputField
                name="energySystem"
                id="energySystem"
                label="Hệ thống nhiên liệu"
                required={true}
                typeStyle={TypeStyle.Normal}
                value={productData.detail.energySystem}
                error={errors.energySystem}
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
            </div>
          </div>

          <div className="mb-2 flex items-center gap-x-4">
            <div className="w-[184px]">
              <InputFieldNumber
                name="numberOfSeats"
                id="numberOfSeats"
                label="Số ghế"
                required={true}
                value={productData.detail.numberOfSeats}
                error={errors.numberOfSeats}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    detail: {
                      ...productData.detail,
                      numberOfSeats: e,
                    },
                  })
                }
              />
            </div>
            <div className="w-[184px]">
              <InputFieldNumber
                name="weight"
                id="weight"
                label="Cân nặng (kg)"
                required={true}
                value={productData.detail.weight}
                error={errors.weight}
                onInput={(e) =>
                  setProductData({
                    ...productData,
                    detail: {
                      ...productData.detail,
                      weight: e,
                    },
                  })
                }
              />
            </div>

            <div className="w-[184px]">
              <Combobox
                id="frontBrake"
                name="frontBrake"
                label="Phanh trước"
                items={BRAKE_OPTIONS}
                value={productData.detail.frontBrake}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    detail: {
                      ...productData.detail,
                      frontBrake: e,
                    },
                  })
                }
              />
            </div>
            <div className="w-[184px]">
              <Combobox
                id="backBrake"
                name="backBrake"
                label="Phanh sau"
                items={BRAKE_OPTIONS}
                value={productData.detail.backBrake}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    detail: {
                      ...productData.detail,
                      backBrake: e,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="mb-2 flex items-center gap-x-4">
            <div className="w-[184px]">
              <RadioGroup
                name="powerSupport"
                id="powerSupport"
                label="Hệ thống trợ lực"
                items={TRUE_FALSE_OPTIONS}
                value={productData.detail.powerSupport}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    detail: {
                      ...productData.detail,
                      powerSupport: e,
                    },
                  })
                }
              />
            </div>
            <div className="w-[184px]">
              <RadioGroup
                name="eco"
                id="eco"
                label="Eco"
                items={TRUE_FALSE_OPTIONS}
                value={productData.detail.eco}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    detail: {
                      ...productData.detail,
                      eco: e,
                    },
                  })
                }
              />
            </div>
            <div className="w-[184px]">
              <RadioGroup
                name="warningSystem"
                id="warningSystem"
                label="Hệ thống cảnh báo"
                items={TRUE_FALSE_OPTIONS}
                value={productData.detail.warningSystem}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    detail: {
                      ...productData.detail,
                      warningSystem: e,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="mb-2">
            <ImageUploader
              name="gallery"
              id="gallery"
              label="Thư viện hình ảnh"
              value={productData.gallery}
              isMultiple
              onChange={(e) =>
                setProductData({
                  ...productData,
                  gallery: e,
                })
              }
            />
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default ProductInfoPopup
