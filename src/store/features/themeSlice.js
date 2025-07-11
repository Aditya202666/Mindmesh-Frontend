import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("mindmesh-theme") || "light", // Default theme

  bgColors: {
    Yellow: "bg-secondary",
    Emerald: "bg-emerald-300",
    Lavender: "bg-purple-300",
    Rose: "bg-rose-300",
    Blue: "bg-sky-300",
    Coral: "bg-orange-300",
    Grey: "bg-gray-300",
  },

  priorityBadges: {
    None: "bg-gray-300",
    Low: "bg-lime-300",
    Medium: "bg-orange-400",
    High: "bg-red-500",
  },

  statusBadges: {
    "To-do": "bg-gray-300",
    "In-Progress": "bg-lime-300",
    Completed: "bg-green-400",
  },
};
export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("mindmesh-theme", state.theme)
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
