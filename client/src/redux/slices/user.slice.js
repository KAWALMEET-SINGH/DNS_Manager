import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state, action) => {
      state.loading = true;
    },
    signOutUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
