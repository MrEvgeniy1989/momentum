import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown";
import { useWeather } from "@/common/hooks/use-weather";
import { useWeatherDescription } from "@/common/hooks/use-weather-description";
import { DropdownContent } from "@/entities/weather/ui/dropdown-content/dropdown-content";
import { MainWeatherBlock } from "@/entities/weather/ui/main-weather-block/main-weather-block";

import s from "./weather.module.scss";

export function Weather() {
  const {
    city,
    temperature,
    feelsLike,
    recentRain,
    wind,
    wind_direction_10m,
    weather_code,
    isCityLoading,
    isWeatherLoading,
  } = useWeather();
  const { description, icon } = useWeatherDescription(weather_code);

  if (isCityLoading || isWeatherLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={s.buttonTrigger}>
          <MainWeatherBlock icon={icon} temperature={temperature} city={city} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={s.dropdownMainContent}>
        <DropdownMenuLabel>
          <DropdownContent
            city={city}
            description={description}
            icon={icon}
            temperature={temperature}
            feelsLike={feelsLike}
            recentRain={recentRain}
            wind_direction_10m={wind_direction_10m}
            wind={wind}
          />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
