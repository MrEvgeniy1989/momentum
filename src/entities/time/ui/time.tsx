import s from "./time.module.scss";

type Props = {
  time: Date;
};

export function Time({ time }: Props) {
  const formatTime = (date: Date): string[] => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return [hours, minutes, seconds];
  };

  const formatDate = (date: Date): string => {
    const day = date.toLocaleDateString("ru-RU", { day: "2-digit" });
    const month = date
      .toLocaleDateString("ru-RU", { day: "2-digit", month: "long" })
      .split(" ")[1];
    const weekday = date.toLocaleDateString("ru-RU", { weekday: "long" });
    return `${day} ${month}, ${weekday}`;
  };

  const [hours, minutes, seconds] = formatTime(time);
  const formattedDate = formatDate(time);

  return (
    <div className={s.clockAndDate}>
      <div className={s.time}>
        <div className={s.timeBlock}>{hours}</div>
        <div className={s.dots}>
          <span className={s.dot}></span>
          <span className={s.dot}></span>
        </div>
        <div className={s.timeBlock}>{minutes}</div>
        <div className={s.dots}>
          <span className={s.dot}></span>
          <span className={s.dot}></span>
        </div>
        <div className={s.timeBlock}>{seconds}</div>
      </div>
      <div>
        <div className={s.date}>{formattedDate}</div>
      </div>
    </div>
  );
}
