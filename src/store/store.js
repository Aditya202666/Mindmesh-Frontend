import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import personalTaskReducer from "./features/personalTaskSlice";
import themeReducer from "./features/themeSlice";
import filterReducer from "./features/filterSlice";

export const store = configureStore({
    reducer: { user: userReducer, personalTask: personalTaskReducer, theme: themeReducer, filter: filterReducer },
});
