import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    ACTION_TYPE: "",
};

export const navigationSlice = createSlice({
    name: "navigation",
    initialState: INITIAL_STATE,
    reducers: {
        goToLoadingScreen: (state) => {
            state.ACTION_TYPE = goToLoadingScreen.toString();
        },

        goToLoginScreen: (state) => {
            state.ACTION_TYPE = goToLoginScreen.toString();
        },


        goToHomeScreen: (state) => {
            state.ACTION_TYPE = goToHomeScreen.toString();
        },
    },
});

// Action creators are generated for each case reducer function
export const { goToLoadingScreen, goToLoginScreen, goToHomeScreen } =
    navigationSlice.actions;

export default navigationSlice.reducer;