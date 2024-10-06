import { Time } from "@/entities/time/ui/time";

import s from "./main-content.module.scss";

export function MainContent() {
  return (
    <section className={s.mainContent}>
      <Time />
    </section>
  );
}
