import React, { useEffect, useState } from 'react'
import Popup from '../Popup/Popup'
import InputField from '../InputField/InputField'
import Button from '../Button/Button'
import PopupMsg from '../Popup/PopupMsg'

import { useValidate } from '../../hooks/validationHook'
import { TypeStyle } from '../../enums/InputFieldEnum'
import { ButtonType } from '../../enums/ButtomEnum'
import { ToastMsgStatus } from '../../enums/ToastMsgEnum'
import baseApi from '../../api/BaseApi'

import { useDispatch } from 'react-redux'
import { openToastMsg } from '../../slices/toastMsgSlice'

const ManufacturerInfoPopup = ({ isActive, edittingId = '', onClose = () => {} }) => {
  const [manufacturerCode, setManufacturerCode] = useState('')
  const [manufacturerName, setManufacturerName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingConfirmPopup, setIsLoadingConfirmPopup] = useState(false)
  const [isActiveConfirmPopup, setIsActiveConfirmPopup] = useState(false)
  const [isFirstValidate, setIsFirstValidate] = useState(true)

  const { errors, validate, clearErrors, setServerErrors } = useValidate({
    name: {
      name: 'Tên nhà cung cấp',
      rules: ['required'],
    },
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isActive) {
      clearErrors()
      setManufacturerCode('')
      setManufacturerName('')
      setIsFirstValidate(true)
    } else {
      const getInitialData = async () => {
        setIsLoading(true)
        try {
          const res = await baseApi.get('/manufacturers/newCode')
          setManufacturerCode(res.data.data)
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      }

      const getInitialDataWithId = async (id) => {
        setIsLoading(true)
        try {
          const res = await baseApi.get(`/manufacturers/${id}`)
          if (res.data.success) {
            setManufacturerCode(res.data.data.code)
            setManufacturerName(res.data.data.name)
          }
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
      }

      if (edittingId) {
        getInitialDataWithId(edittingId)
      } else {
        getInitialData()
      }
    }
  }, [isActive])

  useEffect(() => {
    if (!isFirstValidate) {
      validate({
        name: manufacturerName,
      })
    }
  }, [manufacturerName])

  const handleOpenConfirmPopup = () => {
    setIsFirstValidate(false)
    const isValid = validate({
      name: manufacturerName,
    })
    if (isValid) {
      setIsActiveConfirmPopup(true)
    }
  }

  const handleSaveManufacturer = async (e) => {
    e.preventDefault()
    setIsLoadingConfirmPopup(true)
    try {
      let res = null
      if (edittingId) {
        res = await baseApi.put(`/manufacturers/${edittingId}`, {
          name: manufacturerName,
          code: manufacturerCode,
        })
      } else {
        res = await baseApi.post('manufacturers', {
          name: manufacturerName,
          code: manufacturerCode,
        })
      }
      if (res.data.success) {
        dispatch(
          openToastMsg({
            msg: 'Lưu thông tin nhà cung cấp thành công',
            status: ToastMsgStatus.Success,
          })
        )
        setIsLoadingConfirmPopup(false)
        setIsActiveConfirmPopup(false)
        onClose(true)
      }
    } catch (error) {
      setIsLoadingConfirmPopup(false)
      setIsActiveConfirmPopup(false)
      if (error.response.status === 400) {
        setServerErrors(error.response.data.errors)
      } else {
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
    <Popup title="Thêm nhà cung cấp" isLoading={isLoading} isActive={isActive} onClose={onClose}>
      <div onSubmit={handleSaveManufacturer}>
        <div className="w-96 mb-2">
          <InputField
            name="code"
            id="code"
            label="Mã nhà cung cấp"
            disabled
            required={true}
            typeStyle={TypeStyle.Normal}
            value={manufacturerCode}
            error={errors.code}
            onInput={(e) => setManufacturerCode(e.target.value)}
          />
        </div>
        <div className="w-96 mb-2">
          <InputField
            name="manufacturerName"
            id="manufacturerName"
            label="Tên nhà cung cấp"
            required={true}
            typeStyle={TypeStyle.Normal}
            value={manufacturerName}
            error={errors.name}
            isAutoFocus
            onInput={(e) => setManufacturerName(e.target.value)}
          />
        </div>

        <div className="pt-4 flex items-center justify-end gap-x-2">
          <Button
            style={{
              height: 44,
              borderRadius: 6,
            }}
            buttonType={ButtonType.Secondary}
            onClick={() => onClose()}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            style={{
              height: 44,
              borderRadius: 6,
            }}
            onClick={handleOpenConfirmPopup}
          >
            Lưu
          </Button>
        </div>

        <PopupMsg
          isActive={isActiveConfirmPopup}
          isLoading={isLoadingConfirmPopup}
          isActiveLoadingScreen={false}
          title="Xác nhận"
          msg={
            <div>
              <span>Bạn có chắc chắn muốn lưu thông nhà sản xuất với mã </span>
              <span className="font-medium">{manufacturerCode}</span>?
            </div>
          }
          textAgreeBtn="Đồng ý"
          textCloseBtn="Hủy"
          onClose={() => setIsActiveConfirmPopup(false)}
          onAgree={handleSaveManufacturer}
        />
      </div>
    </Popup>
  )
}

export default ManufacturerInfoPopup
