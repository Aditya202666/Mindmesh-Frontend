import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTasks: [],
    completedTasks:[],
    pendingTasks:[],
    overdueTasks:[],

    dueInSevenDays: [],
    overdueLastMonth: [],
    recentTask: [],
    details:{
        allTasks:0,
        completedTasks:0,
        pendingTasks:0,
        overdueTasks:0,
    }
};

const personalTaskSlice = createSlice({
    name: "personalTaskSlice",
    initialState,
    reducers: {
        addAllTasks: (state, action) => {
            state.allTasks = action.payload;
        },
        addTask: (state, action) => {
            state.allTasks.push(action.payload);
        },
        addDueInSevenDays: (state, action) => {
            state.dueInSevenDays = action.payload;
        },
        addRecentTask: (state, action) => {
            state.recentTask = action.payload;
        },
        addOverdueLastMonth: (state, action) => {
            state.overdueLastMonth = action.payload;
            // console.log(action.payload)
        },
        addDetails:(state,action)=>{
            state.details = action.payload
        },
        removeTask: () => {},
    },
});

export const {
    addTask,
    addAllTasks,
    removeTask,
    addDueInSevenDays,
    addOverdueLastMonth,
    addRecentTask,
    addDetails,
} = personalTaskSlice.actions;

export default personalTaskSlice.reducer;
