import { useQuery } from "@tanstack/react-query";

import { useGeolocation } from "@/common/hooks/use-geolocation";
import { weatherApi } from "@/entities/weather/api/weather-api";

export function useCity(latitude?: number, longitude?: number) {
  const { locationInfo } = useGeolocation();
  // console.log(locationInfo);
  const { data: city } = useQuery({
    queryKey: ["city", latitude, longitude],
    queryFn: () => {
      if (!locationInfo?.latitude || !locationInfo?.longitude) {
        throw new Error("Coordinates not transmitted");
      }
      return weatherApi.getCityByCoordinates(locationInfo?.latitude, locationInfo?.longitude);
    },
    enabled: !!locationInfo?.latitude && !!locationInfo?.longitude,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });

  // console.log(city, locationInfo?.latitude, locationInfo?.longitude);
  return { city };
}
