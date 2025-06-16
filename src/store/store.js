import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import personalTaskReducer from "./features/personalTaskSlice";

export const store = configureStore({
    reducer: { user: userReducer, personalTask: personalTaskReducer },
});
