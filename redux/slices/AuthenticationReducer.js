import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  ACTION_TYPE: "",

  isLoginLoading: false,
  isSignupLoading: false,
  isLogoutLoading: false,
  isForgotPasswordLoading: false,
  isGetUserDetailsLoading: false,
  isUpdateUserLoading: false,

  loginMessage: "",
  signupMessage: "",
  logoutMessage: "",
  forgotPasswordMessage: "",
  getUserDetailsMessage: "",
  updateUserMessage: "",

  user: {},

  isLoggedIn: false,
};

export const AuthenticateMiddleware = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    // login
    loginStart: (state) => {
      state.ACTION_TYPE = loginStart.toString();
      state.isLoginLoading = true;
      state.loginMessage = "";
    },

    loginSuccess: (state, action) => {
      state.ACTION_TYPE = loginSuccess.toString();
      state.isLoginLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    },

    loginError: (state, action) => {
      state.ACTION_TYPE = loginError.toString();
      state.isLoginLoading = false;
      state.user = {};
      state.loginMessage = action.payload.message;
    },

    // signup
    signupStart: (state) => {
      state.ACTION_TYPE = signupStart.toString();
      state.isSignupLoading = true;
      state.signupMessage = "";
    },

    signupSuccess: (state, action) => {
      state.ACTION_TYPE = signupSuccess.toString();
      state.isSignupLoading = false;
      state.signupMessage = action.payload.message;
    },

    signupError: (state, action) => {
      state.ACTION_TYPE = signupError.toString();
      state.isSignupLoading = false;
      state.signupMessage = action.payload.message;
    },

    // logout
    logoutStart: (state) => {
      state.ACTION_TYPE = logoutStart.toString();
      state.isLogoutLoading = true;
      state.logoutMessage = "";
    },

    logoutSuccess: (state, action) => {
      state.ACTION_TYPE = logoutSuccess.toString();
      state.isLogoutLoading = false;
      state.isLoggedIn = false;
      state.user = {};
    },

    logoutError: (state, action) => {
      state.ACTION_TYPE = logoutError.toString();
      state.isLogoutLoading = false;
      state.logoutMessage = action.payload.message;
    },

    // forgot password
    forgotPasswordStart: (state) => {
      state.ACTION_TYPE = forgotPasswordStart.toString();
      state.isForgotPasswordLoading = true;
      state.forgotPasswordMessage = "";
    },

    forgotPasswordSuccess: (state, action) => {
      state.ACTION_TYPE = forgotPasswordSuccess.toString();
      state.isForgotPasswordLoading = false;
      state.forgotPasswordMessage = action.payload.message;
    },

    forgotPasswordError: (state, action) => {
      state.ACTION_TYPE = forgotPasswordError.toString();
      state.isForgotPasswordLoading = false;
      state.forgotPasswordMessage = action.payload.message;
    },

    // get user details
    getUserDetailsStart: (state) => {
      state.ACTION_TYPE = getUserDetailsStart.toString();
      state.isGetUserDetailsLoading = true;
      state.getUserDetailsMessage = "";
    },

    getUserDetailsSuccess: (state, action) => {
      state.ACTION_TYPE = getUserDetailsSuccess.toString();
      state.isGetUserDetailsLoading = false;
      state.user = action.payload;
    },

    getUserDetailsError: (state, action) => {
      state.ACTION_TYPE = getUserDetailsError.toString();
      state.isGetUserDetailsLoading = false;
      state.getUserDetailsMessage = action.payload.message;
    },

    updateUserStart: (state) => {
      state.ACTION_TYPE = updateUserStart.toString();
      state.isUpdateUserLoading = true;
      state.updateUserMessage = "";
    },

    updateUserSuccess: (state, action) => {
      state.ACTION_TYPE = updateUserSuccess.toString();
      state.isUpdateUserLoading = false;
      state.updateUserMessage = action.payload.message;
      state.user = action.payload.user;
    },

    updatePasswordSuccess: (state, action) => {
      state.ACTION_TYPE = updatePasswordSuccess.toString();
      state.isUpdateUserLoading = false;
      state.updateUserMessage = action.payload.message;
    },

    updateUserError: (state, action) => {
      state.ACTION_TYPE = updateUserError.toString();
      state.isUpdateUserLoading = false;
      state.updateUserMessage = action.payload.message;
    },

    // resetActionType
    resetActionType: (state) => {
      state.ACTION_TYPE = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginStart,
  loginSuccess,
  loginError,
  signupStart,
  signupSuccess,
  signupError,
  logoutStart,
  logoutSuccess,
  logoutError,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordError,
  getUserDetailsStart,
  getUserDetailsSuccess,
  getUserDetailsError,
  updateUserStart,
  updateUserSuccess,
  updatePasswordSuccess,
  updateUserError,
  resetActionType,
} = AuthenticateMiddleware.actions;

export default AuthenticateMiddleware.reducer;
