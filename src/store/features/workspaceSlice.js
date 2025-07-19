import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentWorkspace: {
    _id: "",
    name: "",
    title: "",
    description: "",
    createdBy: {},
  },

  authority: "",

  members: [],
  projects:[],

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

    addAllWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },

    setWorkspaceDetails: (state, action) => {
      state.currentWorkspace = action.payload.workspace;
      state.projects = action.payload.projects
      state.authority = action.payload.authority
      // console.log(state.currentWorkspace)
    },

  },
});

export const { addWorkspace, addAllWorkspaces, setWorkspaceDetails } = workspaceSlice.actions;

export default workspaceSlice.reducer;
