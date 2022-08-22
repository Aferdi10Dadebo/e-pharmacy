import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",

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
      state.vendorProductCount = action.payload.length;
    },

    getAllVendorOrders: (state, action) => {
      state.ACTION_TYPE = getAllVendorOrders.toString();
      state.vendorOrders = action.payload;
      state.vendorOrderCount = action.payload.length;
    },

    getAllVendorMessages: (state, action) => {
      state.ACTION_TYPE = getAllVendorMessages.toString();
      state.vendorMessages = action.payload;
      state.vendorMessageCount = action.payload.length;
    },

    getAllVendorPromotions: (state, action) => {
      state.ACTION_TYPE = getAllVendorPromotions.toString();
      state.vendorPromotions = action.payload;
      state.vendorPromotionCount = action.payload.length;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllVendorProducts,
  getAllVendorOrders,
  getAllVendorMessages,
  getAllVendorPromotions,
} = VendorReducer.actions;

export default VendorReducer.reducer;
