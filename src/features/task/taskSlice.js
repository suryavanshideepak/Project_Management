import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    editTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index >= 0) {
        state[index] = {...state[index], 
          ...action.payload,};
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    assignTaskToEmployee: (state, action) => {
      const { taskId, employeeId, managerId } = action.payload;
      return state.map(task => 
        task.id === taskId
          ? { ...task, assignedTo: employeeId, managerId }
          : task
      );
    },
  },
});

export const { addTask, editTask, deleteTask, assignTaskToEmployee } = taskSlice.actions;
export default taskSlice.reducer;
