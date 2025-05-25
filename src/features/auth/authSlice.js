import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false, // for track user is authenticated or not
  user: null // information of user
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.status = true,
      state.user = action.payload.userData
    },
    logout: (state, _) => {
      state.status = false,
      state.user = null
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
