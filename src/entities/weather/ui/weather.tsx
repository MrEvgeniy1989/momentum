import { CloudyIcon } from "@/assets/icons/cloudy-icon";
import { PencilIcon } from "@/assets/icons/pencil-icon";
import { SoutheastArrowIcon } from "@/assets/icons/southeast-arrow-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown";
import { EditLocationMenu } from "@/entities/weather/ui/edit-location-menu/edit-location-menu";

import s from "./weather.module.scss";

export function Weather() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={s.buttonTrigger}>
          <div className={s.temperatureBlock}>
            <CloudyIcon className={s.cloudyIcon} />
            <span className={s.temperature}>8°</span>
          </div>
          <span className={s.location}>Smolensk</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={s.dropdownMainContent}>
        <DropdownMenuLabel>
          <div className={s.dropdownMain}>
            <div className={s.dropdownMainHeader}>
              <div className={s.locationBlock}>
                <div className={s.locationWrapper}>
                  <div className={s.location}>Smolensk</div>
                  <div className={s.pencilIconWrapper}>
                    <PencilIcon className={s.pencilIcon} />
                  </div>
                </div>
                <div className={s.conditions}>Cloudy</div>
              </div>
              <EditLocationMenu />
            </div>
            <div className={s.mainBody}>
              <div className={s.mainBodyTemperatureBlock}>
                <CloudyIcon width={100} height={100} />
                <span className={s.mainBodyTemperature}>8°</span>
              </div>
              <div className={s.mainBodyTemperatureDetailsBlock}>
                <div className={s.mainBodyTemperatureDetails}>
                  <span className={s.mainBodyTemperatureDetailsTitle}>Feels like </span>
                  11°
                </div>
                <div className={s.mainBodyTemperatureDetails}>
                  <span className={s.mainBodyTemperatureDetailsTitle}>Recent rain </span>
                  0 mm
                </div>
                <div className={s.mainBodyTemperatureDetails}>
                  <span className={s.mainBodyTemperatureDetailsTitle}>
                    Wind
                    <SoutheastArrowIcon />
                  </span>
                  7 km/h
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
