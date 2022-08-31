import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",

  isSignupLoading: false,
  signupMessage: "",
 

  devices: [],
  deviceCount: 0,
  vendors: [],
  vendorCount: 0,
  promotionRequests: [],
  promotionRequestCount: 0,
};