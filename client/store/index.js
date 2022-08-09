import { configureStore } from '@reduxjs/toolkit'
import accountReducers from '../slices/accountSlice'
import cartReducers from '../slices/cartSlice'
import toastMsgReducers from '../slices/toastMsgSlice'

const store = configureStore({
  reducer: {
    account: accountReducers,
    cart: cartReducers,
    toastMsg: toastMsgReducers,
  },
})

export default store
