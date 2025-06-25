import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTasks: [],
    dueInSevenDays: [],
    overdueLastMonth: [],
    recentTask: [],
};

const personalTaskSlice = createSlice({
    name: "personalTaskSlice",
    initialState,
    reducers: {
        addAllTasks: (state, action) => {
            state.tasks = action.payload;
        },
        addTask: (state, action) => {
            state.allTasks.push(action.payload);
        },
        removeTask: () => {},
    },
});

export const { addTask, addAllTasks, removeTask } = personalTaskSlice.actions;

export default personalTaskSlice.reducer;
