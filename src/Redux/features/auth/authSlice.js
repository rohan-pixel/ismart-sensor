// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // This will hold the authenticated user data
  isAuthenticated: false,
  userError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authenticated user
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    },
    // Action to clear the authenticated user
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
