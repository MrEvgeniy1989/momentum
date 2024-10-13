import type { ReactNode } from "react";

import { useCallback } from "react";
import { toast } from "react-toastify";

import { PencilIcon } from "@/assets/icons/pencil-icon";
import { SoutheastArrowIcon } from "@/assets/icons/southeast-arrow-icon";
import { DropdownMenuSeparator } from "@/common/components/ui/dropdown";
import { EditLocationMenu } from "@/entities/weather/ui/edit-location-menu/edit-location-menu";

import s from "./dropdown-content.module.scss";

type DropdownContentProps = {
  city: string;
  description: string;
  icon: ReactNode;
  temperature: number;
  feelsLike: number;
  recentRain: number;
  wind_direction_10m: number;
  wind: number;
};

export function DropdownContent({
  city,
  description,
  icon,
  temperature,
  feelsLike,
  recentRain,
  wind_direction_10m,
  wind,
}: DropdownContentProps) {
  const onCLickEditCityHandler = useCallback(() => {
    toast.warn("Данная функция находится в разработке");
  }, []);

  return (
    <div className={s.dropdownMain}>
      <div className={s.dropdownMainHeader}>
        <div className={s.locationBlock}>
          <div className={s.locationWrapper}>
            <div className={s.location}>{city}</div>
            <div className={s.pencilIconWrapper}>
              <PencilIcon
                className={s.pencilIcon}
                onClick={onCLickEditCityHandler}
              />
            </div>
          </div>
          <div className={s.conditions}>{description}</div>
        </div>
        <EditLocationMenu onCLickEditCityHandler={onCLickEditCityHandler} />
      </div>
      <div className={s.mainBody}>
        <div className={s.mainBodyTemperatureBlock}>
          {icon}
          <span className={s.mainBodyTemperature}>
            {temperature}
            °
          </span>
        </div>
        <div className={s.mainBodyTemperatureDetailsBlock}>
          <div className={s.mainBodyTemperatureDetails}>
            <span className={s.mainBodyTemperatureDetailsTitle}>
              Feels like
              {" "}
            </span>
            {feelsLike}
            °
          </div>
          <div className={s.mainBodyTemperatureDetails}>
            <span className={s.mainBodyTemperatureDetailsTitle}>
              Recent rain
              {" "}
            </span>
            {recentRain}
            {" "}
            mm
          </div>
          <div className={s.mainBodyTemperatureDetails}>
            <span className={s.mainBodyTemperatureDetailsTitle}>
              Wind
              <SoutheastArrowIcon
                style={{ transform: `rotate(${wind_direction_10m}deg)` }}
              />
            </span>
            {wind}
            {" "}
            km/h
          </div>
        </div>
      </div>
      <DropdownMenuSeparator />
      <div className={s.mainFooter}></div>
    </div>
  );
}
