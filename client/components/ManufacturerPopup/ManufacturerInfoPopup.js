import React, { useEffect, useState } from 'react'
import Popup from '../Popup/Popup'
import InputField from '../InputField/InputField'
import Button from '../Button/Button'

import { useValidate } from '../../hooks/validationHook'
import { useFetch } from '../../hooks/fetchHook'
import { TypeStyle } from '../InputField/InputField'
import { ButtonType } from '../Button/Button'
import { ToastMsgStatus } from '../../enums/ToastMsgEnum'

import { useDispatch } from 'react-redux'
import { openToastMsg } from '../../slices/toastMsgSlice'

const ManufacturerInfoPopup = ({ isActive, onClose = () => {} }) => {
  const [manufacturerName, setManufacturerName] = useState('')

  const { errors, validate, clearErrors, setServerErrors } = useValidate({
    name: {
      name: 'Tên nhà cung cấp',
      rules: ['required'],
    },
  })
  const { isLoading, post } = useFetch('/manufacturers')

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isActive) clearErrors()
  }, [isActive])

  const handleSaveManufacturer = async (e) => {
    e.preventDefault()
    const isValid = validate({
      name: manufacturerName,
    })
    if (isValid) {
      const res = await post({
        name: manufacturerName,
      })

      if (res.success) {
        dispatch(
          openToastMsg({
            msg: 'Lưu thông tin nhà cung cấp thành công',
            status: ToastMsgStatus.Success,
          })
        )
        onClose()
      } else {
        if (res.status === 400) {
          setServerErrors(res.data.errors)
        } else {
          dispatch(
            openToastMsg({
              msg: 'Có lỗi xảy ra',
              status: ToastMsgStatus.Error,
            })
          )
          console.log(res.data)
        }
      }
    }
  }

  return (
    <Popup title="Thêm nhà cung cấp" isLoading={isLoading} isActive={isActive} onClose={onClose}>
      <form autoComplete="off" noValidate onSubmit={handleSaveManufacturer}>
        <div className="w-96 mb-2">
          <InputField
            name="name"
            id="name"
            label="Tên nhà cung cấp"
            required={true}
            typeStyle={TypeStyle.Normal}
            value={manufacturerName}
            error={errors.name}
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
          >
            Lưu
          </Button>
        </div>
      </form>
    </Popup>
  )
}

export default ManufacturerInfoPopup
