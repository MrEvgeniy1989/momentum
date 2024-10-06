import { Weather } from "@/entities/weather/ui/weather";
import { FocusedToday } from "@/features/focused-today/ui/focused-today";
import { Links } from "@/features/links/ui/links";
import { Pomodoro } from "@/features/pomodoro/ui/pomodoro";

import s from "./header.module.scss";

export function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerItems}>
        <Links />
        <Pomodoro />
      </div>
      <div className={s.headerItems}>
        <FocusedToday />
        <Weather />
      </div>
    </header>
  );
}
