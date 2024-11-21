// src/features/projectSlice.js
import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    addProject: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    editProject: (state, action) => {
      const index = state.findIndex((project) => project.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    deleteProject: (state, action) => {
      return state.filter((project) => project.id !== action.payload);
    },
  },
});

export const { addProject, editProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
