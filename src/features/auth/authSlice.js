import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // for track user is authenticated or not
  user: null, // information of user
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.status = true,
      state.user = action.payload.userData;
      console.table("Login", [state.status, state.user]);
    },
    logout: (state, _) => {
      state.status = false,
      state.user = null;
      console.table("Logout", [state.status, state.user]);
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
