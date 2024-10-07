import s from "./time.module.scss";

type Props = {
  time: Date;
};

export function Time({ time }: Props) {
  const formatTime = (date: Date): string[] => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return [hours, minutes];
  };

  const [hours, minutes] = formatTime(time);

  return (
    <div className={s.time}>
      <div className={s.timeBlock}>{hours}</div>
      <div className={s.dots}>
        <span className={s.dot}></span>
        <span className={s.dot}></span>
      </div>
      <div className={s.timeBlock}>{minutes}</div>
    </div>
  );
}
