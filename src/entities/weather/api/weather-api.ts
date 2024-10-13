import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

type NominatimResponse = {
  address: {
    city?: string;
  };
};

type WeatherData = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    precipitation: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
  };
};

export const weatherApi = {
  async getCityByCoordinates(latitude: number, longitude: number) {
    const response = await axios.get<NominatimResponse>(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat: latitude,
          lon: longitude,
        },
        headers: {
          "accept-language": "en-US", // Укажите нужный код языка
        },
      },
    );

    if (response.data && response.data.address && response.data.address.city) {
      return response.data.address.city;
    }
    else {
      throw new Error("Не удалось определить город по геолокации (API)");
    }
  },

  async fetchWeatherByCoords(latitude: number, longitude: number) {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m`,
    );
    return response.data;
  },
};
