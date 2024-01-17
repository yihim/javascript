import openweathermap from "../../api/openweathermap";
import { WEATHER_API_KEY } from "@env";

export default forecastData = (lat, lon) => {
  const forecast = openweathermap.get("/forecast?", {
    params: {
      lat: lat,
      lon: lon,
      appid: WEATHER_API_KEY,
    },
  });

  return forecast;
};
