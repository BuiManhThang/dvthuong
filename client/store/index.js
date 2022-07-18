import { configureStore } from '@reduxjs/toolkit'
import accountReducers from '../slices/accountSlice'

const store = configureStore({
  reducer: {
    account: accountReducers,
  },
})

export default store
