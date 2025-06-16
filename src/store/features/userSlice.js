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
            return { ...state, ...action.payload };
        },
        logoutUser: () =>{
            
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
    updateUsername,
    updateProfession,
    updateProfilePic,
    addWorkspace,
    removeWorkspace,
} = userSlice.actions;

export default userSlice.reducer;
