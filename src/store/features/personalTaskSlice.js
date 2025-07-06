import { createSlice } from "@reduxjs/toolkit";

// todo: add in progress tasks complete setup

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
    addTask: (state, action) => {
      const newTask = action.payload;
      let newTaskDueDate = null;
      let nextSevenDay = null;

      if (newTask.dueDate) {
        newTaskDueDate = new Date(newTask.dueDate);
        nextSevenDay = new Date(newTaskDueDate); // create a copy of dueDate
        nextSevenDay.setDate(newTaskDueDate.getDate() + 7);
      }
      //--add to details all task
      //--add to recent tasks
      //--check and add to completed
      //--check and add to pending
      //--check and add to due in seven days
      //--check and add to in-progress

      state.allTasks.unshift(newTask);
      state.recentTask.unshift(newTask);
      state.details.allTasks += 1;

      if (newTask.status === "Completed") {
        state.completedTasks.unshift(newTask);
        state.details.completedTasks += 1;
    }
    if (newTask.status !== "Completed") {
        state.pendingTasks.push(newTask);
        state.pendingTasks.sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate))
        state.details.pendingTasks += 1;
    }

    if(newTask.status !== "Completed" && newTask.dueDate && newTaskDueDate <= nextSevenDay ){
        state.dueInSevenDays.push(newTask)
        state.dueInSevenDays.sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate))
    }
    
    
    if (newTask.status === "In-Progress") {
        state.inProgressTasks.push(newTask);
        state.inProgressTasks.sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate))
        state.details.inProgressTasks += 1;
      }
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
    removeTask: () => {},
  },
});

export const {
  addTask,
  addAllTasks,
  addInProgressTasks,
  removeTask,
  addDueInSevenDays,
  addOverdueLastMonth,
  addRecentTask,
  addDetails,
} = personalTaskSlice.actions;

export default personalTaskSlice.reducer;
