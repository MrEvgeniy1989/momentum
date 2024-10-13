import { useQuery } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

import { PencilIcon } from "@/assets/icons/pencil-icon";
import { SoutheastArrowIcon } from "@/assets/icons/southeast-arrow-icon";
import { CloudyIcon } from "@/assets/icons/weather-icons/cloudy-icon";
import { RainHeavyIcon } from "@/assets/icons/weather-icons/rain-heavy-icon";
import { RainIcon } from "@/assets/icons/weather-icons/rain-icon";
import { RainLightIcon } from "@/assets/icons/weather-icons/rain-light-icon";
import { SnowfallHeavyIcon } from "@/assets/icons/weather-icons/snowfall-heavy-icon";
import { SnowfallIcon } from "@/assets/icons/weather-icons/snowfall-icon";
import { SunnyIcon } from "@/assets/icons/weather-icons/sunny-icon";
import { ThunderstormIcon } from "@/assets/icons/weather-icons/thunderstorm-icon";
import { ThunderstormWithHeavyHailIcon } from "@/assets/icons/weather-icons/thunderstorm-with-heavy-hail-icon";
import { ThunderstormWithLightHailIcon } from "@/assets/icons/weather-icons/thunderstorm-with-light-hail-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown";
import { weatherApi } from "@/entities/weather/api/weather-api";
import { EditLocationMenu } from "@/entities/weather/ui/edit-location-menu/edit-location-menu";

import s from "./weather.module.scss";

type LocationInfo = {
  accuracy: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  latitude: number;
  longitude: number;
  speed?: number | null;
};

const defaultLocation: LocationInfo = {
  accuracy: 46927.8,
  latitude: 45.039268,
  longitude: 38.987221,
};

export function Weather() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>(defaultLocation);

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error("Геолокация не поддерживается данным браузером.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const successFn = (res: GeolocationPosition) => {
      setLocationInfo(res.coords);
    };

    const errorFn = (res: GeolocationPositionError) => {
      toast.error(res.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    };

    navigator.geolocation.getCurrentPosition(successFn, errorFn);
  }, []);

  const { data: city } = useQuery({
    queryKey: ["city", locationInfo.latitude, locationInfo.longitude],
    queryFn: () => weatherApi.getCityByCoordinates(locationInfo.latitude, locationInfo.longitude),
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });

  const { data, error } = useQuery({
    queryKey: ["weather", locationInfo],
    queryFn: async () => weatherApi.fetchWeatherByCoords(locationInfo.latitude, locationInfo.longitude),
  });

  if (error instanceof Error) {
    console.error(error.message);
  }

  const temperature = Math.round(data?.current?.temperature_2m);
  const feelsLike = data?.current?.apparent_temperature;
  const recentRain = data?.current?.precipitation;
  const wind = data?.current?.wind_speed_10m;
  const wind_direction_10m = data?.current?.wind_direction_10m;

  const weatherConditions: Record<number, { description: string; icon: ReactNode }> = {
    0: { description: "Clear sky", icon: <SunnyIcon /> },
    1: { description: "Mainly clear", icon: <SunnyIcon /> },
    2: { description: "Partly cloudy", icon: <CloudyIcon /> },
    3: { description: "Overcast", icon: <CloudyIcon /> },
    45: { description: "Fog", icon: <CloudyIcon /> },
    48: { description: "Depositing rime fog", icon: <CloudyIcon /> },
    51: { description: "Light drizzle", icon: <RainLightIcon /> },
    53: { description: "Moderate drizzle", icon: <RainLightIcon /> },
    55: { description: "Dense drizzle", icon: <RainLightIcon /> },
    56: { description: "Light freezing drizzle", icon: <RainLightIcon /> },
    57: { description: "Dense freezing drizzle", icon: <RainLightIcon /> },
    61: { description: "Slight rain", icon: <RainLightIcon /> },
    63: { description: "Moderate rain", icon: <RainIcon /> },
    65: { description: "Heavy rain", icon: <RainHeavyIcon /> },
    66: { description: "Light freezing rain", icon: <RainLightIcon /> },
    67: { description: "Heavy freezing rain", icon: <RainHeavyIcon /> },
    71: { description: "Slight snowfall", icon: <SnowfallIcon /> },
    73: { description: "Moderate snowfall", icon: <SnowfallIcon /> },
    75: { description: "Heavy snowfall", icon: <SnowfallHeavyIcon /> },
    77: { description: "Snow grains", icon: <SnowfallHeavyIcon /> },
    80: { description: "Slight rain showers", icon: <RainLightIcon /> },
    81: { description: "Moderate rain showers", icon: <RainIcon /> },
    82: { description: "Violent rain showers", icon: <RainHeavyIcon /> },
    85: { description: "Slight snow showers", icon: <SnowfallIcon /> },
    86: { description: "Heavy snow showers", icon: <SnowfallHeavyIcon /> },
    95: { description: "Thunderstorm", icon: <ThunderstormIcon /> },
    96: { description: "Thunderstorm with light hail", icon: <ThunderstormWithLightHailIcon /> },
    99: { description: "Thunderstorm with heavy hail", icon: <ThunderstormWithHeavyHailIcon /> },
  };

  const weatherCode = data?.current?.weather_code;
  const defaultWeather = { description: "Unknown", icon: <CloudyIcon /> };

  const { description, icon } = weatherCode ? weatherConditions[weatherCode] || defaultWeather : defaultWeather;

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
              <input type="text" list="mycoollist" />
              <datalist id="mycoollist">
                <option>i want to kill you</option>
                <option>i will kill you</option>
                <option>you will die</option>
                <option>i will be killed</option>
                <option>i will be dead</option>
              </datalist>
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
                    <SoutheastArrowIcon style={{ transform: `rotate(${wind_direction_10m}deg)` }} />
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
