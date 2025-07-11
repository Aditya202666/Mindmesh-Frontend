import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const today = new Date();
const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

// Format to yyyy-mm-dd in local time
const yyyy = firstOfMonth.getFullYear();
const mm = String(firstOfMonth.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const dd = String(firstOfMonth.getDate()).padStart(2, "0");

const formattedDate = `${yyyy}-${mm}-${dd}`;



const initialState = {

    refreshToken:0,
    ascending: false,
    fromDate: formattedDate, // First day of the current month in yyyy-mm-dd format
    status: "All",
    priority: "All",
    page: 1, // Default page number
    limit: 10, // Default number of tasks per page
};

const filterSlice = createSlice({
    name: "filterSlice",
    initialState,
    reducers: {
        setOrderBy: (state, action) => {
            state.ascending = action.payload;
        },
        setFromDate: (state, action) => {
            // const selectedDate = new Date(action.payload)
            state.fromDate = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setPriority: (state, action) => {
            state.priority = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            // Ensure limit is a positive integer
            if (typeof action.payload !== "number" || action.payload <= 0) {
                toast.error("Limit must be a positive integer");
            }
            else if (action.payload > 50) {
                toast.error("Limit cannot exceed 50 tasks per page");
            }else{
                state.limit = action.payload;
            }
           
        },
        resetFilters: () => initialState,
        
        increaseRefreshToken: (state) =>{

            state.refreshToken = state.refreshToken + 1
            console.log(state.refreshToken)

        }
    },
});

export const {
    setOrderBy,
    increaseRefreshToken,
    setFromDate,
    setStatus,
    setPriority,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;