import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
  tasksInProgress: [],
  completedTasks: [],
  pendingTasks: [],
  overdueTasks: [],

  projectTasks: [],

  overdueLastMonth: [],
  dueInSevenDays: [],
  inProgressTasks: [],
  recentTask: [],

  projects: [],

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
      const fetchedAllTasks = action.payload.allTasks;
      const taskDetails = action.payload.taskDetails;

      // console.log(taskDetails)
      state.allTasks = fetchedAllTasks;
      state.details.allTasks = taskDetails[0]?.totalTasks || 0;
    },
    addTasksInProgress: (state, action) => {
      const fetchedAllTasks = action.payload.allTasks;
      const taskDetails = action.payload.taskDetails;

      // console.log(taskDetails)
      state.tasksInProgress = fetchedAllTasks;
      state.details.inProgressTasks = taskDetails[0]?.totalTasks || 0;
    },
    addCompletedTasks: (state, action) => {
      const fetchedAllTasks = action.payload.allTasks;
      const taskDetails = action.payload.taskDetails;

      // console.log(taskDetails)
      state.completedTasks = fetchedAllTasks;
      state.details.completedTasks = taskDetails[0]?.totalTasks || 0;
    },
    addPendingTasks: (state, action) => {
      const fetchedAllTasks = action.payload.allTasks;
      const taskDetails = action.payload.taskDetails;

      // console.log(taskDetails)
      state.pendingTasks = fetchedAllTasks;
      state.details.pendingTasks = taskDetails[0]?.totalTasks || 0;
    },
    addOverdueTasks: (state, action) => {
      const fetchedAllTasks = action.payload.allTasks;
      const taskDetails = action.payload.taskDetails;

      // console.log(taskDetails)
      state.overdueTasks = fetchedAllTasks;
      state.details.overdueTasks = taskDetails[0]?.totalTasks || 0;
    },
    addProjectTasks: (state, action) => {
      const fetchedAllTasks = action.payload.allTasks;

      // console.log(taskDetails)
      state.projectTasks = fetchedAllTasks;
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
      const details = action.payload;
      state.details.allTasks = details.allTasks[0]?.count || 0;
      state.details.completedTasks = details.completedTasks[0]?.count || 0;
      state.details.inProgressTasks = details.inProgressTasks[0]?.count || 0;
      state.details.overdueTasks = details.overdueTasks[0]?.count || 0;
      state.details.pendingTasks = details.pendingTasks[0]?.count || 0;
    },

    addAllProjects: (state, action) => {
      state.projects = action.payload;
    },

    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
  },
});

export const {
  addAllTasks,
  addTasksInProgress,
  addCompletedTasks,
  addPendingTasks,
  addOverdueTasks,
  addInProgressTasks,
  addDueInSevenDays,
  addOverdueLastMonth,
  addRecentTask,
  addDetails,
  addAllProjects,
  addProject,
  addProjectTasks,
} = personalTaskSlice.actions;

export default personalTaskSlice.reducer;
