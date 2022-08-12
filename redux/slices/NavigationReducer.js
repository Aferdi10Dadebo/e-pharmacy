import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: INITIAL_STATE,
  reducers: {
    goToLoading: (state) => {
      state.ACTION_TYPE = goToLoading.toString();
    },

    goToAuth: (state) => {
      state.ACTION_TYPE = goToAuth.toString();
    },

    goToAdmin: (state) => {
      state.ACTION_TYPE = goToAdmin.toString();
    },

    goToVendor: (store) => {
      store.ACTION_TYPE = goToVendor.toString();
    },

    goToMainApp: (store) => {
      store.ACTION_TYPE = goToMainApp.toString();
    },
  },
});

// Action creators are generated for each case reducer function
export const { goToLoading, goToAuth, goToAdmin, goToVendor, goToMainApp } =
  navigationSlice.actions;

export default navigationSlice.reducer;
