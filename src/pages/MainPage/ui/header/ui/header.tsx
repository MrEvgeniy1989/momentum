import { Weather } from "@/entities/weather/ui/weather";

import s from "./header.module.scss";

export function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerItems}>
        {/* <Links /> */}
        {/* <Pomodoro /> */}
      </div>
      <div className={s.headerItems}>
        {/* <FocusedToday /> */}
        <Weather />
      </div>
    </header>
  );
}
