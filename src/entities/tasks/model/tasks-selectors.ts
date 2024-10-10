import type { AppRootStateType } from "@/app/store";
import type { TaskType } from "@/entities/tasks/model/tasks-api.types";

export const selectorTasks = (state: AppRootStateType): TaskType[] => state.tasks;
