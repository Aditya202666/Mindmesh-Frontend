import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import personalTaskReducer from "./features/personalTask/personalTaskSlice"

export const store = configureStore({
    reducer: { userReducer, personalTaskReducer },
});
