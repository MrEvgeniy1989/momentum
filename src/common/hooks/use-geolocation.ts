import { useEffect, useState } from "react";

type LocationInfo = {
  accuracy: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  latitude: number;
  longitude: number;
  speed?: number | null;
};

export function useGeolocation() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  // console.log(locationInfo);
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Геолокация не поддерживается данным браузером.");
      return;
    }

    const successFn = (res: GeolocationPosition) => {
      setLocationInfo(res.coords);
    };

    const errorFn = (res: GeolocationPositionError) => {
      setLocationInfo({
        accuracy: 46927.8,
        latitude: 45.039268,
        longitude: 38.987221,
      });
      setLocationError(res.message);
    };

    navigator.geolocation.getCurrentPosition(successFn, errorFn);
  }, []);

  return { locationInfo, locationError };
}
