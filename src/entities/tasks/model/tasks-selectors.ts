import type { AppRootStateType } from "@/app/store";
import type { TaskType } from "@/entities/tasks/model/tasks-api.types";

export function selectorTasks(state: AppRootStateType): TaskType[] {
  return state.tasks;
}
