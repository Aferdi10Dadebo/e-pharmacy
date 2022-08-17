import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {

    ACTION_TYPE: "",

    devices: [],
    deviceCount: 0,
    vendors: [],
    vendorCount: 0,
    promotionRequests: [],
    promotionRequestCount: 0,
}

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
        }
    }

});


// Action creators are generated for each case reducer function
export const { getAllDecives, getAllVendors, getAllPromotionRequests } = AdminReducer.actions;

export default AdminReducer.reducer;