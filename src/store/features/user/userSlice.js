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
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        registerUserData: (state, action) => {
            return {...state, ...action.payload}
        },
    },
    updateUsername: () => {},
    updateProfession: () => {},
    updateProfilePic: () => {},
    updateIsVerified: () => {},
    addWorkspace: () => {},
    removeWorkspace: () => {},
});

export const {
    registerUserData,
    updateUsername,
    updateProfession,
    updateProfilePic,
    updateIsVerified,
    addWorkspace,
    removeWorkspace,
} = userSlice.actions;

export default userSlice.reducer;
