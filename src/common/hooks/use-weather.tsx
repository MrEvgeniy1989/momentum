import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { weatherApi } from "@/entities/weather/api/weather-api";

type LocationInfo = {
  latitude: number;
  longitude: number;
};

const DEFAULT_LOCATION: LocationInfo = {
  latitude: 45.039268,
  longitude: 38.987221,
};

export function useWeather() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>(DEFAULT_LOCATION);
  const [city, setCity] = useState<string>("Krasnodar");

  useEffect(() => {
    const storedCity = localStorage.getItem("weatherCity");
    if (storedCity) {
      setCity(storedCity);
    }
    else {
      setCity("Krasnodar");
    }

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.", { position: "top-center" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (res: GeolocationPosition) => {
        const newLocation: LocationInfo = {
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        };
        setLocationInfo(newLocation);
      },
      () => toast.error("Geolocation permission denied, using default location."),
    );
  }, []);

  useEffect(() => {
    if (city) {
      localStorage.setItem("weatherCity", city);
    }
  }, [city]);

  const updateCity = useCallback((newCity: string) => {
    if (newCity !== city) {
      setCity(newCity);
      localStorage.setItem("weatherCity", newCity);
    }
  }, [city]);

  const { data: fetchedCity, isLoading: isCityLoading } = useQuery({
    queryKey: ["city", locationInfo.latitude, locationInfo.longitude],
    queryFn: async () => await weatherApi.getCityByCoordinates(locationInfo.latitude, locationInfo.longitude),
    staleTime: 15 * 60 * 1000,
    enabled: !!locationInfo.latitude && !!locationInfo.longitude,
  });

  useEffect(() => {
    if (fetchedCity) {
      updateCity(fetchedCity);
    }
  }, [fetchedCity, updateCity]);

  const { data: weather, isLoading: isWeatherLoading, error: weatherError } = useQuery({
    queryKey: ["weather", locationInfo],
    queryFn: async () => await weatherApi.fetchWeatherByCoords(locationInfo.latitude, locationInfo.longitude),
    staleTime: 15 * 60 * 1000,
    enabled: !!city && !!locationInfo.latitude && !!locationInfo.longitude && !!fetchedCity,
  });

  if (weatherError) {
    toast.error("Error when retrieving weather.");
  }

  const temperature = Math.round(weather?.current.temperature_2m ?? 0);
  const feelsLike = weather?.current.apparent_temperature ?? 0;
  const recentRain = weather?.current.precipitation ?? 0;
  const wind = weather?.current.wind_speed_10m ?? 0;
  const wind_direction_10m = weather?.current.wind_direction_10m ?? 0;
  const weather_code = weather?.current.weather_code ?? 0;

  return {
    city,
    temperature,
    feelsLike,
    recentRain,
    wind,
    wind_direction_10m,
    weather_code,
    isCityLoading,
    isWeatherLoading,
  };
}
