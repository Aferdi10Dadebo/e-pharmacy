import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",

  isAddProductLoading: false,
  isUpdatingVendorLoading: false,

  addProductMessage: "",
  updateVendorMessage: "",

  vendorProducts: [],
  vendorOrders: [],
  vendorMessages: [],
  vendorPromotions: [],

  vendorProductCount: 0,
  vendorOrderCount: 0,
  vendorMessageCount: 0,
  vendorPromotionCount: 0,
};

export const VendorReducer = createSlice({
  name: "vendor",
  initialState: INITIAL_STATE,
  reducers: {
    getAllVendorProducts: (state, action) => {
      state.ACTION_TYPE = getAllVendorProducts.toString();
      state.vendorProducts = action.payload;
      state.vendorProductCount = Object.keys(action.payload).length;
    },

    getAllVendorOrders: (state, action) => {
      state.ACTION_TYPE = getAllVendorOrders.toString();
      state.vendorOrders = action.payload;
      state.vendorOrderCount = Object.keys(action.payload).length;
    },

    getAllVendorMessages: (state, action) => {
      state.ACTION_TYPE = getAllVendorMessages.toString();
      state.vendorMessages = action.payload;
      state.vendorMessageCount = Object.keys(action.payload).length;
    },

    getAllVendorPromotions: (state, action) => {
      state.ACTION_TYPE = getAllVendorPromotions.toString();
      state.vendorPromotions = action.payload;
      state.vendorPromotionCount = action.payload.length;
    },

    createProductStart: (state) => {
      state.ACTION_TYPE = createProductStart.toString();
      state.isAddProductLoading = true;
      state.addProductMessage = "";
    },

    createProductSuccess: (state, action) => {
      state.ACTION_TYPE = createProductSuccess.toString();
      state.isAddProductLoading = false;
      state.addProductMessage = action.payload.message;
    },

    createProductError: (state, action) => {
      state.ACTION_TYPE = createProductError.toString();
      state.isAddProductLoading = false;
      state.addProductMessage = action.payload.message;
    },

    updateVendorStart: (state) => {
      state.ACTION_TYPE = updateVendorStart.toString();
      state.isUpdatingVendorLoading = true;
      state.updateVendorMessage = "";
    },

    updateVendorSuccess: (state, action) => {
      state.ACTION_TYPE = updateVendorSuccess.toString();
      state.isUpdatingVendorLoading = false;
      state.updateVendorMessage = action.payload.message;
    },

    updateVendorError: (state, action) => {
      state.ACTION_TYPE = updateVendorError.toString();
      state.isUpdatingVendorLoading = false;
      state.updateVendorMessage = action.payload.message;
    },

    resetActionType: (state, action) => {
      state.ACTION_TYPE = "";
    },

    clearVendor: (state) => {
      state.ACTION_TYPE = clearVendor.toString();
      state.vendorProducts = [];
      state.vendorOrders = [];
      state.vendorMessages = [];
      state.vendorPromotions = [];

      state.vendorProductCount = 0;
      state.vendorOrderCount = 0;
      state.vendorMessageCount = 0;
      state.vendorPromotionCount = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllVendorProducts,
  getAllVendorOrders,
  getAllVendorMessages,
  getAllVendorPromotions,
  createProductStart,
  createProductSuccess,
  createProductError,
  updateVendorStart,
  updateVendorSuccess,
  updateVendorError,
  resetActionType,
  clearVendor,
} = VendorReducer.actions;

export default VendorReducer.reducer;
