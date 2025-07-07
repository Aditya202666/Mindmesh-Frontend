import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // Default theme

  bgColors: {
    Yellow: "bg-secondary",
    Emerald: "bg-emerald-300",
    Lavender: "bg-purple-300",
    Rose: "bg-rose-300",
    Blue: "bg-primary",
    Coral: "bg-accent",
    Grey: "bg-neutral",
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
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
