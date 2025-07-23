import { createSlice } from "@reduxjs/toolkit";

const initialState = {

        id: "",
        username: "",
        fullname: "",
        email: "",
        profession: "",
        profilePic: {
            url: "",
            id: "",
        },
        isVerified: false,
        isSigningUp: false,
        isLoading: true
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        registerUserData: (state, action) => {
            return { ...state, ...action.payload , isSigningUp: false, isLoading: false};
        },
        removeUserData: () => {
            return {...initialState, isLoading: false};
        },
        

        setIsSigningUpFalse: (state) => {
            state.isSigningUp = false;
        },
        
        setIsSigningUpTrue: (state) => {
            state.isSigningUp = true;
        },
        setIsLoadingFalse: (state) => {
            state.isLoading = false;
        },
        // updateUsername: () => {},
        // updateProfession: () => {},
        // updateProfilePic: () => {},
        // addWorkspace: () => {},
        // removeWorkspace: () => {},
    },
});

export const {
    registerUserData,
    setIsSigningUpFalse,
    setIsSigningUpTrue,
    setIsLoadingFalse,
    removeUserData,
    // updateUsername,
    // updateProfession,
    // updateProfilePic,
    // addWorkspace,
    // removeWorkspace,
} = userSlice.actions;

export default userSlice.reducer;
