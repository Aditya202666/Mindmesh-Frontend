import { createSlice } from "@reduxjs/toolkit";

const initialState = {

        id: "",
        username: "",
        fullname: "",
        email: "",
        profession: "",
        profilePic: "",
        isVerified: false,
        workspaces: [],
        isLoading: true
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        registerUserData: (state, action) => {
            return { ...state, ...action.payload , isLoading: false };
        },
        removeUserData: () => {
            return initialState;
        },
        setIsLoadingFalse: (state) => {
            state.isLoading = false;
        },
        setIsLoadingTrue: (state) => {
            state.isLoading = true;
        },
        updateUsername: () => {},
        updateProfession: () => {},
        updateProfilePic: () => {},
        addWorkspace: () => {},
        removeWorkspace: () => {},
    },
});

export const {
    registerUserData,
    setIsLoadingFalse,
    setIsLoadingTrue,
    removeUserData,
    updateUsername,
    updateProfession,
    updateProfilePic,
    addWorkspace,
    removeWorkspace,
} = userSlice.actions;

export default userSlice.reducer;
