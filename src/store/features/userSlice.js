import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    userData: {
        id: "",
        username: "",
        fullname: "",
        email: "",
        profession: "",
        profilePic: "",
        isVerified: false,
        workspaces: [],
    },
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        registerUserData: (state, action) => {
            state.userData = action.payload;
            state.isLoading = false;
        },
        removeUserData: () => {
            return initialState;
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
    removeUserData,
    updateUsername,
    updateProfession,
    updateProfilePic,
    addWorkspace,
    removeWorkspace,
} = userSlice.actions;

export default userSlice.reducer;
