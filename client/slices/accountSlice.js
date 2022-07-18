import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accountInfo: {},
  isLoading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    fetchAcount: (state) => {
      state.accountInfo = {
        fullName: 'Arthuria',
        email: 'bmthang@gmail.com',
        phoneNumber: '0967079850',
        avatar: 'test.png',
        address: {
          landmark: 'Đông Sơn, Thủy Nguyên',
          city: 'Hải Phòng',
        },
        isAdmin: true,
      }
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { fetchAcount, setLoading } = accountSlice.actions
export default accountSlice.reducer
