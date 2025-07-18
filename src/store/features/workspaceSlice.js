import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentWorkspace: {
    _id: "",
    name: "",
    title: "",
    description: "",
    createdBy: {},
    admins: [],
    members: [],
  },

  workspaces: [],

};

export const workspaceSlice = createSlice({
  name: "workspaceSlice",
  initialState,
  reducers: {

    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
      console.log(state.workspaces)
      console.log("added workspace");
      console.log(action.payload);
    },

  },
});

export const { addWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
