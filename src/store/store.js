import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import personalTaskReducer from "./features/personalTaskSlice";
import themeReducer from "./features/themeSlice";
import filterReducer from "./features/filterSlice";
import workspaceReducer from "./features/workspaceSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    filter: filterReducer,
    user: userReducer,
    personalTask: personalTaskReducer,
    workspace: workspaceReducer,
  },
});
