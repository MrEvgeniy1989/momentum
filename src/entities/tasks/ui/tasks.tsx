import { useState } from "react";

import { CloseIcon } from "@/assets/icons/close-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown";
import s from "@/entities/tasks/ui/tasks.module.scss";

export function Tasks() {
  const [showInput, setShowInput] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={s.buttonTrigger}>Tasks</button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={s.dropdownContent}>
        <div className={s.mainContentWithoutTasks}>
          <div className={s.mainContentWithoutTasksHeader}>
            <span>Today</span>
          </div>
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
          <div className={s.mainContentWithoutTasksFooter}>
            {showInput && (
              <div className={s.inputBox}>
                <input type="text" className={s.input} placeholder="New Task" autoFocus />
                <button
                  className={s.buttonCloseIcon}
                  onClick={() => { setShowInput(false); }}
                  type="button"
                >
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
