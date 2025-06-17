import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light", // Default theme
};
export const themeSlice = createSlice({
    name: "themeSlice",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;