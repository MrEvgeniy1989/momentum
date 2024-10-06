import { Tasks } from "@/entities/tasks/ui/tasks";
import { Settings } from "@/features/settings/ui/settings";

import s from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={s.footer}>
      <Settings />
      <Tasks />
    </footer>
  );
}
