import { configureStore } from "@reduxjs/toolkit";

import { tasksReducer } from "@/entities/tasks/model/tasks-slice";

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
