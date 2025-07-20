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
    },

    addProject: (state, action) => {
      state.projects.push(action.payload);
    },

    addAllWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },

    setWorkspaceDetails: (state, action) => {
      state.currentWorkspace = action.payload.workspace;
      state.projects = action.payload.projects
      state.authority = action.payload.authority
      state.members = action.payload.members
      // console.log(state.currentWorkspace)
    },

  },
});

export const { addWorkspace, addProject, addAllWorkspaces, setWorkspaceDetails } = workspaceSlice.actions;

export default workspaceSlice.reducer;
