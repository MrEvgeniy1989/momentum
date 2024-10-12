import type { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

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
import { useGeolocation } from "@/common/hooks/use-geolocation";
import { weatherApi } from "@/entities/weather/api/weather-api";

export function useWeather() {
  // const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  //
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setCoords({ latitude, longitude });
  //       },
  //       (error: GeolocationPositionError) => {
  //         console.error(error.message);
  //       },
  //     );
  //   }
  //   else {
  //     console.error("Geolocation is not supported by your browser");
  //   }
  // }, []);

  const { locationInfo } = useGeolocation();

  // Запрос погоды
  const { data, error } = useQuery({
    queryKey: ["weather", locationInfo],
    queryFn: async () => {
      const latitude = locationInfo ? locationInfo.latitude : 45.039268;
      const longitude = locationInfo ? locationInfo.longitude : 38.987221;

      return await weatherApi.fetchWeatherByCoords(latitude, longitude);
    },
    // enabled: !!locationInfo,
  });

  // Обработка ошибки, если необходимо
  if (error instanceof Error) {
    console.error(error.message);
  }

  const temperature = Math.round(data?.current?.temperature_2m);
  const feelsLike = data?.current?.apparent_temperature;
  const recentRain = data?.current?.precipitation;
  const wind = data?.current?.wind_speed_10m;

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
  // console.log(data?.current?.weather_code);

  return { description, icon, temperature, feelsLike, recentRain, wind, error };
}
