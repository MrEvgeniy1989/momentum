import { Time } from "@/entities/time/ui/time";

import s from "./main-content.module.scss";

type Props = {
  time: Date;
};

export function MainContent({ time }: Props) {
  return (
    <section className={s.mainContent}>
      <Time time={time} />
    </section>
  );
}
