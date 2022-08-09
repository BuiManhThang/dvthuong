import { useDispatch, useSelector } from 'react-redux'
import { setProducts, setTotalNumber, toggleLoading, togglePopup } from '../slices/cartSlice'
import baseApi from '../api/BaseApi'
import { useAccount } from './accountHook'

export const useCart = () => {
  const products = useSelector((state) => state.cart.products)
  const totalNumber = useSelector((state) => state.cart.totalNumber)
  const totalMoney = useSelector((state) => state.cart.totalMoney)
  const isActivePopup = useSelector((state) => state.cart.isActivePopup)
  const isLoading = useSelector((state) => state.cart.isLoading)

  const { accountInfo } = useAccount()

  const dispatch = useDispatch()

  const addProduct = (productId) => {
    const cart = localStorage.getItem('cart')
    const currentProducts = cart ? JSON.parse(cart) : []
    const foundedProduct = currentProducts.find((p) => p._id === productId)

    if (!foundedProduct) {
      // Add new
      currentProducts.push({ _id: productId, number: 1 })
      updateCart(currentProducts)
    } else {
      // Plus
      foundedProduct.number += 1
    }
    localStorage.setItem('cart', JSON.stringify(currentProducts))

    if (isActivePopup) {
      const clonedPoducts = JSON.parse(JSON.stringify(products))
      const foundedProductInStore = clonedPoducts.find((p) => p._id === productId)
      if (foundedProductInStore) {
        foundedProductInStore.number += 1
      }
      dispatch(setProducts(clonedPoducts))
    } else {
      const totalNumber = currentProducts.reduce((pre, cur) => {
        return (pre += cur.number)
      }, 0)
      dispatch(setTotalNumber(totalNumber))
    }
  }

  const minusProduct = (productId) => {
    const cart = localStorage.getItem('cart')
    const currentProducts = cart ? JSON.parse(cart) : []
    const foundedProduct = currentProducts.find((p) => p._id === productId)

    if (foundedProduct) {
      foundedProduct.number -= 1
      localStorage.setItem('cart', JSON.stringify(currentProducts))
    }

    const clonedPoducts = JSON.parse(JSON.stringify(products))
    const foundedProductInStore = clonedPoducts.find((p) => p._id === productId)
    if (foundedProductInStore) {
      foundedProductInStore.number -= 1
      dispatch(setProducts(clonedPoducts))
    }
  }

  const deleteProduct = (productId) => {
    const cart = localStorage.getItem('cart')
    const currentProducts = cart ? JSON.parse(cart) : []
    const newStoredProducts = currentProducts.filter((p) => p._id !== productId)

    localStorage.setItem('cart', JSON.stringify(newStoredProducts))
    updateCart(newStoredProducts)

    const clonedPoducts = JSON.parse(JSON.stringify(products))
    const newProductsInStore = clonedPoducts.filter((p) => p._id !== productId)
    dispatch(setProducts(newProductsInStore))
  }

  const updateCart = async (products) => {
    try {
      const formattedProducts = products.map((p) => p._id)
      await baseApi.post('/carts/updateByUserId', {
        userId: accountInfo._id,
        products: formattedProducts,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const toggleCart = (state) => {
    dispatch(togglePopup(state))
  }

  const fetchCart = async () => {
    dispatch(toggleLoading(true))
    try {
      const res = await baseApi.post('/carts/getByUserId', {
        userId: accountInfo._id,
      })
      if (res.data.success) {
        const storedProducts = localStorage.getItem('cart')
        const storedProductsJson = storedProducts ? JSON.parse(storedProducts) : []
        const fetchProducts = res.data.data.cars.map((product) => {
          const foundedProduct = storedProductsJson.find((p) => p._id === product._id)
          return {
            ...product,
            number: foundedProduct?.number || 1,
          }
        })

        dispatch(setProducts(fetchProducts))
      }
      dispatch(toggleLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(toggleLoading(false))
    }
  }

  return {
    products,
    totalNumber,
    totalMoney,
    isActivePopup,
    isLoading,
    addProduct,
    minusProduct,
    deleteProduct,
    toggleCart,
    fetchCart,
  }
}
