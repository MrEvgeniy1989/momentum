import type { KeyboardEvent } from "react";

import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import type { TaskType } from "@/entities/tasks/model/tasks-api.types";

import { CloseIcon } from "@/assets/icons/close-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown";
import { useAppDispatch } from "@/common/hooks/use-app-dispatch";
import { selectorTasks } from "@/entities/tasks/model/tasks-selectors";
import {
  addTask,
  deleteCompletedTasks,
} from "@/entities/tasks/model/tasks-slice";
import { Task } from "@/entities/tasks/ui/task/task";
import s from "@/entities/tasks/ui/tasks.module.scss";

export function Tasks() {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const tasks = useSelector(selectorTasks);
  const dispatch = useAppDispatch();

  const handleAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (newTask.trim() === "") {
        setError("Task name cannot be empty.");
      }
      else {
        dispatch(addTask({ id: uuidv4(), title: newTask, isDone: false }));
        setNewTask("");
        setError(null);
      }
    }
  };

  const handleDeleteCompleted = () => {
    dispatch(deleteCompletedTasks());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={s.buttonTrigger}>
          Tasks
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={s.dropdownContent}>
        <div className={s.mainContent}>
          <div className={s.mainContentHeader}>
            <span className={s.mainContentHeaderToday}>Today</span>
            {tasks.length > 0 && (
              <button
                className={s.clearCompletedButton}
                onClick={handleDeleteCompleted}
                type="button"
              >
                Delete completed tasks
              </button>
            )}
          </div>
          {tasks.length === 0
            ? (
                <div className={s.mainContentWithoutTasksBody}>
                  <span>Add a task to get started</span>
                  {!showInput && (
                    <button
                      type="button"
                      className={s.mainContentWithoutTasksBodyButton}
                      onClick={() => setShowInput(true)}
                    >
                      New Task
                    </button>
                  )}
                </div>
              )
            : (
                <div className={s.tasks}>
                  <ul className={s.tasksList}>
                    {tasks.map((task: TaskType) => (
                      <Task key={task.id} task={task} />
                    ))}
                  </ul>
                </div>
              )}

          {error && <div className={s.errorMessage}>{error}</div>}

          <div className={s.mainContentFooter}>
            {(showInput || tasks.length > 0) && (
              <div className={s.inputBox}>
                <input
                  type="text"
                  className={s.input}
                  value={newTask}
                  onChange={(e) => {
                    setNewTask(e.target.value);
                    if (error)
                      setError(null);
                  }}
                  onKeyDown={handleAddTask}
                  placeholder="New Task"
                  autoFocus
                />
                {tasks.length === 0 && (
                  <button
                    className={s.buttonCloseIcon}
                    onClick={() => {
                      setShowInput(false);
                      setNewTask("");
                    }}
                    type="button"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
