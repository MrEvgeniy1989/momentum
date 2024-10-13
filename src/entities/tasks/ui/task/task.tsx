import { clsx } from "clsx";

import type { TaskType } from "@/entities/tasks/model/tasks-api.types";

import { TrashIcon } from "@/assets/icons/trash-icon";
import { useAppDispatch } from "@/common/hooks/use-app-dispatch";
import { deleteTask, toggleTask } from "@/entities/tasks/model/tasks-slice";
import s from "@/entities/tasks/ui/task/task.module.scss";

type TaskProps = {
  task: TaskType;
};

export function Task({ task }: TaskProps) {
  const dispatch = useAppDispatch();

  const handleToggleTask = () => {
    dispatch(toggleTask(task.id));
  };

  return (
    <li className={s.task}>
      <div className={s.checkboxAndSpan}>
        <input
          type="checkbox"
          className={s.checkbox}
          checked={task.isDone}
          onChange={handleToggleTask}
        />
        <span
          className={clsx(s.title, task.isDone && s.completed)}
          onClick={handleToggleTask}
        >
          {task.title}
        </span>
      </div>
      <button
        className={s.deleteButton}
        onClick={() => dispatch(deleteTask(task.id))}
        type="button"
      >
        <TrashIcon />
      </button>
    </li>
  );
}
