import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: {
        title: "aditya"
    }
}


const personalTaskSlice = createSlice({
    name: "personalTaskSlice",
    initialState,
    reducers :{
        removeTask : () =>{}
    }
})


export const {removeTask} = personalTaskSlice.actions

export default personalTaskSlice.reducer