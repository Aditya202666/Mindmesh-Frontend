import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const today = new Date();
const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

// Format to yyyy-mm-dd in local time
const yyyy = firstOfMonth.getFullYear();
const mm = String(firstOfMonth.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const dd = String(firstOfMonth.getDate()).padStart(2, "0");

const formattedDate = `${yyyy}-${mm}-${dd}`;

const initialState = {
  refreshToken: 0,
  workspaceRefreshToken: 0,
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    increaseRefreshToken: (state) => {
      state.refreshToken = state.refreshToken + 1;
      // console.log(state.refreshToken)
    },

    increaseWorkspaceRefreshToken: (state) => {
      state.workspaceRefreshToken = state.workspaceRefreshToken + 1;
      // console.log(state.workspaceRefreshToken)
    },
  },
});

export const {
  increaseRefreshToken,
  increaseWorkspaceRefreshToken
} = filterSlice.actions;

export default filterSlice.reducer;
