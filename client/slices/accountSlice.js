import { createSlice } from '@reduxjs/toolkit'
import baseApi from '../api/BaseApi.js'

const initialState = {
  accountInfo: {},
  isLoading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    fetchAccount: (state, action) => async () => {
      if (res.data.success) {
        state.accountInfo = {
          fullName: res.data.data.fullName,
          email: res.data.data.email,
          phoneNumber: res.data.data.phoneNumber,
          avatar: res.data.data.avatar,
          address: res.data.data.address,
          isAdmin: res.data.data.isAdmin,
        }
      }
    },

    setAccount: (state, action) => {
      state.accountInfo = {
        fullName: action.payload.fullName,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        avatar: action.payload.avatar,
        address: action.payload.address,
        isAdmin: action.payload.isAdmin,
      }
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { fetchAcount, setLoading, setAccount } = accountSlice.actions
export default accountSlice.reducer
