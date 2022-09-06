import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",

  isAddProductLoading: false,
  isDeleteProductLoading: false,
  isUpdatingVendorLoading: false,
  isApproveOrderLoading: false,
  isADelcineOrderLoading: false,

  addProductMessage: "",
  deleteProductMessage: "",
  updateVendorMessage: "",
  orderMessage: "",

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

    approveOrderStart: (state) => {
      state.ACTION_TYPE = approveOrderStart.toString();
      state.isApproveOrderLoading = true;
      state.orderMessage = "";
    },

    approveOrderSuccess: (state, action) => {
      state.ACTION_TYPE = approveOrderSuccess.toString();
      state.isApproveOrderLoading = false;
      state.orderMessage = action.payload.message;
    },

    approveOrderError: (state, action) => {
      state.ACTION_TYPE = approveOrderError.toString();
      state.isApproveOrderLoading = false;
      state.orderMessage = action.payload.message;
    },

    declineOrderStart: (state) => {
      state.ACTION_TYPE = declineOrderStart.toString();
      state.isADelcineOrderLoading = true;
      state.orderMessage = "";
    },

    declineOrderSuccess: (state, action) => {
      state.ACTION_TYPE = declineOrderSuccess.toString();
      state.isADelcineOrderLoading = false;
      state.orderMessage = action.payload.message;
    },

    declineOrderError: (state, action) => {
      state.ACTION_TYPE = declineOrderError.toString();
      state.isADelcineOrderLoading = false;
      state.orderMessage = action.payload.message;
    },

    deleteProductStart: (state) => {
      state.ACTION_TYPE = deleteProductStart.toString();
      state.isDeleteProductLoading = true;
      state.deleteProductMessage = "";
    },

    deleteProductSuccess: (state, action) => {
      state.ACTION_TYPE = deleteProductSuccess.toString();
      state.isDeleteProductLoading = false;
      state.deleteProductMessage = action.payload.message;
    },

    deleteProductError: (state, action) => {
      state.ACTION_TYPE = deleteProductError.toString();
      state.isDeleteProductLoading = false;
      state.deleteProductMessage = action.payload.message;
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
  approveOrderStart,
  approveOrderSuccess,
  approveOrderError,
  declineOrderStart,
  declineOrderSuccess,
  declineOrderError,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductError,
} = VendorReducer.actions;

export default VendorReducer.reducer;
