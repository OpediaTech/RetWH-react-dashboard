import { createSlice } from "@reduxjs/toolkit";

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    userInfo: null,
  },
  reducers: {
    loading: (state, action) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = null;
    },
  },
});

export const { loading, login, logout } = authSlice.actions;
export default authSlice.reducer;
