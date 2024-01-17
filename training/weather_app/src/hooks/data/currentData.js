import openweathermap from "../../api/openweathermap";
import { WEATHER_API_KEY } from "@env";

export default currentData = (lat, lon) => {
  const current = openweathermap.get("/weather?", {
    params: {
      lat: lat,
      lon: lon,
      appid: WEATHER_API_KEY,
    },
  });

  return current;
};
