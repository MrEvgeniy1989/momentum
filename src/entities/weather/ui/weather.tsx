import { PencilIcon } from "@/assets/icons/pencil-icon";
import { SoutheastArrowIcon } from "@/assets/icons/southeast-arrow-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown";
import { useCity } from "@/common/hooks/use-city";
import { useWeather } from "@/common/hooks/use-weather";
import { EditLocationMenu } from "@/entities/weather/ui/edit-location-menu/edit-location-menu";

import s from "./weather.module.scss";

export function Weather() {
  const { city } = useCity();
  // console.log(city);
  const { description, icon, temperature, feelsLike, recentRain, wind } = useWeather();
  // console.log(city, temperature, feelsLike, recentRain, wind, error);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={s.buttonTrigger}>
          <div className={s.temperatureBlock}>
            {icon}
            <span className={s.temperature}>
              {temperature}
              °
            </span>
          </div>
          <span className={s.location}>{city}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={s.dropdownMainContent}>
        <DropdownMenuLabel>
          <div className={s.dropdownMain}>
            <div className={s.dropdownMainHeader}>
              <div className={s.locationBlock}>
                <div className={s.locationWrapper}>
                  <div className={s.location}>{city}</div>
                  <div className={s.pencilIconWrapper}>
                    <PencilIcon className={s.pencilIcon} />
                  </div>
                </div>
                <div className={s.conditions}>{description}</div>
              </div>
              <EditLocationMenu />
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
                  <span className={s.mainBodyTemperatureDetailsTitle}>Feels like </span>
                  {feelsLike}
                  °
                </div>
                <div className={s.mainBodyTemperatureDetails}>
                  <span className={s.mainBodyTemperatureDetailsTitle}>Recent rain </span>
                  {recentRain}
                  {" "}
                  mm
                </div>
                <div className={s.mainBodyTemperatureDetails}>
                  <span className={s.mainBodyTemperatureDetailsTitle}>
                    Wind
                    <SoutheastArrowIcon />
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
        </DropdownMenuLabel>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
