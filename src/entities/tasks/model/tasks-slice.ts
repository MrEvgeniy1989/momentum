import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import type { TaskType } from "@/entities/tasks/model/tasks-api.types";

const initialState: TaskType[] = JSON.parse(localStorage.getItem("tasks") || "[]");

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
        localStorage.setItem("tasks", JSON.stringify(state));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const newState = state.filter(task => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    deleteCompletedTasks: (state) => {
      const newState = state.filter(task => !task.isDone);
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addTask, toggleTask, deleteTask, deleteCompletedTasks } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
