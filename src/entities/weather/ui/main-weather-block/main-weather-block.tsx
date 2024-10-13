import type { ReactNode } from "react";

import s from "./main-weather-block.module.scss";

type Props = {
  icon: ReactNode;
  temperature: number;
  city: string;
};

export function MainWeatherBlock({ icon, temperature, city }: Props) {
  return (
    <>
      <div className={s.temperatureBlock}>
        {icon}
        <span className={s.temperature}>
          {temperature}
          °
        </span>
      </div>
      <span className={s.location}>{city}</span>
    </>
  );
}
