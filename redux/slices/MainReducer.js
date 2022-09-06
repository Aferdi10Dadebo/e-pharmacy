import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",

  isAddToCartLoading: false,
  isCheckOutLoading: false,

  addToCartMessage: "",
  checkOutMessage: "",

  cart: [],
  notfications: [],
};

const MainReducer = createSlice({
  name: "main",
  initialState: INITIAL_STATE,
  reducers: {
    addToCartStart: (state) => {
      state.ACTION_TYPE = addToCartStart.toString();
      state.isAddToCartLoading = true;
      state.addToCartMessage = "";
    },

    addToCartSuccess: (state, action) => {
      state.ACTION_TYPE = addToCartSuccess.toString();
      state.isAddToCartLoading = false;
      state.cart = action.payload;
    },

    addToCartError: (state, action) => {
      state.ACTION_TYPE = addToCartError.toString();
      state.isAddToCartLoading = false;
    },

    addNotifcations: (state, action) => {
      state.ACTION_TYPE = addNotifcations.toString();
      state.notfications = action.payload;
    },

    checkOutStart: (state, action) => {
      state.ACTION_TYPE = checkOutStart.toString();
      state.isCheckOutLoading = true;
      state.checkOutMessage = "";
    },

    checkOutSuccess: (state, action) => {
      state.ACTION_TYPE = checkOutSuccess.toString();
      state.isCheckOutLoading = false;
      state.checkOutMessage = action.payload.message;
    },

    checkOutError: (state, action) => {
      state.ACTION_TYPE = checkOutError.toString();
      state.isCheckOutLoading = false;
      state.checkOutMessage = action.payload.message;
    },

    resetActionType: (state, action) => {
      state.ACTION_TYPE = "";
    },
  },
});

export const {
  addToCartStart,
  addToCartSuccess,
  addToCartError,
  addNotifcations,
  checkOutStart,
  checkOutError,
  checkOutSuccess,
  resetActionType,
} = MainReducer.actions;

export default MainReducer.reducer;
