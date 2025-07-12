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
      const fetchedAllTasks = action.payload

      // console.log(fetchedAllTasks)
      state.allTasks = fetchedAllTasks;
      state.details.allTasks = fetchedAllTasks.length
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
      const details = action.payload
      state.details.allTasks = details.allTasks[0].count
      state.details.completedTasks = details.completedTasks[0].count
      state.details.inProgressTasks = details.inProgressTasks[0].count
      state.details.overdueTasks = details.overdueTasks[0].count
      state.details.pendingTasks = details.pendingTasks[0].count

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
