import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",

  isCreateVendorLoading: false,
  isDeactivateVendorLoading: false,

  createVendorMessage: "",
  deactivateVendorMessage: "",

  devices: [],
  deviceCount: 0,
  vendors: [],
  vendorCount: 0,
  promotionRequests: [],
  promotionRequestCount: 0,
};

export const AdminReducer = createSlice({
  name: "admin",
  initialState: INITIAL_STATE,
  reducers: {
    getAllDecives: (state, action) => {
      state.ACTION_TYPE = getAllDecives.toString();
      state.devices = action.payload;
      state.deviceCount = action.payload.length;
    },

    getAllVendors: (state, action) => {
      state.ACTION_TYPE = getAllVendors.toString();
      state.vendors = action.payload;
      state.vendorCount = action.payload.length;
    },
    getAllPromotionRequests: (state, action) => {
      state.ACTION_TYPE = getAllPromotionRequests.toString();
      state.promotionRequests = action.payload;
      state.promotionRequestCount = action.payload.length;
    },

    createVendorStart: (state) => {
      state.ACTION_TYPE = createVendorStart.toString();
      state.isCreateVendorLoading = true;
      state.createVendorMessage = "";
    },

    createVendorSuccess: (state, action) => {
      state.ACTION_TYPE = createVendorSuccess.toString();
      state.isCreateVendorLoading = false;
      state.createVendorMessage = action.payload.message;
    },

    createVendorError: (state, action) => {
      state.ACTION_TYPE = createVendorError.toString();
      state.isCreateVendorLoading = false;
      state.createVendorMessage = action.payload.message;
    },

    deactivateVendorStart: (state) => {
      state.ACTION_TYPE = deactivateVendorStart.toString();
      state.isDeactivateVendorLoading = true;
      state.deactivateVendorMessage = "";
    },

    deactivateVendorSuccess: (state, action) => {
      state.ACTION_TYPE = deactivateVendorSuccess.toString();
      state.isDeactivateVendorLoading = false;
      state.deactivateVendorMessage = action.payload.message;
    },

    deactivateVendorError: (state, action) => {
      state.ACTION_TYPE = deactivateVendorError.toString();
      state.isDeactivateVendorLoading = false;
      state.deactivateVendorMessage = action.payload.message;
    },

    resetActionType: (state) => {
      state.ACTION_TYPE = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllDecives,
  getAllVendors,
  getAllPromotionRequests,
  createVendorStart,
  createVendorSuccess,
  createVendorError,
  deactivateVendorStart,
  deactivateVendorSuccess,
  deactivateVendorError,
  resetActionType,
} = AdminReducer.actions;

export default AdminReducer.reducer;
