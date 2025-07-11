import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  allTasks: [],
  completedTasks: [],
  pendingTasks: [],
  overdueTasks: [],
  
  inProgressTasks: [],

  dueInSevenDays: [],
  overdueLastMonth: [],
  recentTask: [],

  details: {
    allTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    inProgressTasks: 0,
  },
};

const personalTaskSlice = createSlice({
  name: "personalTaskSlice",
  initialState,
  reducers: {
    addAllTasks: (state, action) => {
      state.allTasks = action.payload;
    },

    addDueInSevenDays: (state, action) => {
      state.dueInSevenDays = action.payload;
    },
    addInProgressTasks: (state, action) => {
      state.inProgressTasks = action.payload;
    },
    addRecentTask: (state, action) => {
      state.recentTask = action.payload;
    },
    addOverdueLastMonth: (state, action) => {
      state.overdueLastMonth = action.payload;
      // console.log(action.payload)
    },
    addDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const {
  addAllTasks,
  addInProgressTasks,
  addDueInSevenDays,
  addOverdueLastMonth,
  addRecentTask,
  addDetails,
} = personalTaskSlice.actions;

export default personalTaskSlice.reducer;
