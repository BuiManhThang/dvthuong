import { useSelector, useDispatch } from 'react-redux'
import baseApi from '../api/BaseApi'
import { setAccount } from '../slices/accountSlice'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { setTotalNumber } from '../slices/cartSlice'

export const useAccount = () => {
  const accountInfo = useSelector((state) => state.account.accountInfo)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()

  const signOut = async () => {
    try {
      const res = await baseApi.get('/users/sign-out')
      if (res.data.success) {
        dispatch(setAccount(null))
        router.push('/sign-in')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signIn = async (email, password) => {
    try {
      const res = await baseApi.post('/users/sign-in', {
        email,
        password,
      })

      if (res.data.success) {
        dispatch(setAccount(res.data.data))
        initCart(res.data.data)
        if (res.data.data.isAdmin) {
          router.push('/admin/dashboard')
          return
        }
        router.push('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const register = async (email, password, confirmPassword) => {
    try {
      const res = await baseApi.post('users', {
        email,
        password,
        confirmPassword,
      })

      if (res.data.success) {
        dispatch(setAccount(res.data.data))
        router.push('/home')
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response)
        setErrors(error.response.data.errors)
      } else {
        console.log(error)
      }
    }
  }

  const initCart = (accountInfo) => {
    const products = [...accountInfo.products]
    const productNumbers = localStorage.getItem('cart')
    let formattedProductNumbers = []
    if (productNumbers) {
      formattedProductNumbers = JSON.parse(productNumbers)
    }

    let totalProducts = 0
    const formattedProducts = []
    products.forEach((productId) => {
      const productNumber = formattedProductNumbers.find((p) => p._id === productId)
      if (productNumber) {
        totalProducts += productNumber.number
        formattedProducts.push({ _id: productId, number: productNumber.number })
      } else {
        totalProducts += 1
        formattedProducts.push({ _id: productId, number: 1 })
      }
    })

    localStorage.setItem('cart', JSON.stringify(formattedProducts))
    dispatch(setTotalNumber(totalProducts))
  }

  return { accountInfo, errors, signOut, signIn, register, initCart }
}
