import React, { useState, useEffect } from "react";
import currentData from "./data/currentData";
import forecastData from "./data/forecastData";
import axios from "axios";
import * as Location from "expo-location";
import {
  getAllWeather,
  updateWeather,
  saveWeather,
  createWeatherTableTransaction,
} from "../storage/functions/weather";
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default () => {
  const latitude = useSelector((state) => state.currentLocation.latitude);
  const longitude = useSelector((state) => state.currentLocation.longitude);
  const [connectStatus, setConnectStatus] = useState(false);

  const [weather, setWeather] = useState({
    weather_id: [],
    city: [],
    currentWeather: [],
    currentDesc: [],
    currentTemp: [],
    currentIcon: [],
    forecastDayOne: [],
    forecastDayTwo: [],
    forecastDayThree: [],
    forecastDayFour: [],
    forecastDayFive: [],
    weather_default: [],
    latitude: [],
    longitude: [],
  });

  const [current, setCurrent] = useState({
    city: "",
    weather: "",
    desc: "",
    temp: "",
    icon: "",
  });

  const [action, setAction] = useState({
    status: "",
    num: 0,
  });

  const getData = async (lat, lon, bol, status, id) => {
    try {
      const city = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lon,
      });
      const current = currentData(lat, lon);
      const forecast = forecastData(lat, lon);

      current && forecast !== null
        ? axios
            .all([current, forecast])
            .then(
              axios.spread((...allData) => {
                const allCurrent = allData[0];
                const allForecast = allData[1];

                let dt = [];
                let weather = [];
                let desc = [];
                let temp = [];
                let icon = [];

                let dayOne = JSON.stringify(
                  new Date(new Date().setDate(new Date().getDate()))
                ).substring(1, 11);
                let dayTwo = JSON.stringify(
                  new Date(new Date().setDate(new Date().getDate() + 1))
                ).substring(1, 11);
                let dayThree = JSON.stringify(
                  new Date(new Date().setDate(new Date().getDate() + 2))
                ).substring(1, 11);
                let dayFour = JSON.stringify(
                  new Date(new Date().setDate(new Date().getDate() + 3))
                ).substring(1, 11);
                let dayFive = JSON.stringify(
                  new Date(new Date().setDate(new Date().getDate() + 4))
                ).substring(1, 11);

                let countOne = 0;
                let countTwo = 0;
                let countThree = 0;
                let countFour = 0;
                let countFive = 0;

                for (let i = 0; i < allForecast.data.list.length; i++) {
                  (dt[i] = allForecast.data.list[i].dt_txt),
                    (weather[i] = allForecast.data.list[i].weather[0].main),
                    (desc[i] = allForecast.data.list[i].weather[0].description),
                    (temp[i] = allForecast.data.list[i].main.temp),
                    (icon[
                      i
                    ] = `http://openweathermap.org/img/wn/${allForecast.data.list[i].weather[0].icon}@2x.png`);

                  if (allForecast.data.list[i].dt_txt.includes(dayOne)) {
                    countOne += 1;
                  }
                  if (allForecast.data.list[i].dt_txt.includes(dayTwo)) {
                    countTwo += 1;
                  }
                  if (allForecast.data.list[i].dt_txt.includes(dayThree)) {
                    countThree += 1;
                  }
                  if (allForecast.data.list[i].dt_txt.includes(dayFour)) {
                    countFour += 1;
                  }
                  if (allForecast.data.list[i].dt_txt.includes(dayFive)) {
                    countFive += 1;
                  }
                }

                const filtered = (arr, count) => {
                  return arr.splice(0, count);
                };

                const dayOneDate = filtered(dt, countOne);
                const dayOneWeather = filtered(weather, countOne);
                const dayOneDesc = filtered(desc, countOne);
                const dayOneTemp = filtered(temp, countOne);
                const dayOneIcon = filtered(icon, countOne);

                const dayTwoDate = filtered(dt, countTwo);
                const dayTwoWeather = filtered(weather, countTwo);
                const dayTwoDesc = filtered(desc, countTwo);
                const dayTwoTemp = filtered(temp, countTwo);
                const dayTwoIcon = filtered(icon, countTwo);

                const dayThreeDate = filtered(dt, countThree);
                const dayThreeWeather = filtered(weather, countThree);
                const dayThreeDesc = filtered(desc, countThree);
                const dayThreeTemp = filtered(temp, countThree);
                const dayThreeIcon = filtered(icon, countThree);

                const dayFourDate = filtered(dt, countFour);
                const dayFourWeather = filtered(weather, countFour);
                const dayFourDesc = filtered(desc, countFour);
                const dayFourTemp = filtered(temp, countFour);
                const dayFourIcon = filtered(icon, countFour);

                const dayFiveDate = filtered(dt, countFive);
                const dayFiveWeather = filtered(weather, countFive);
                const dayFiveDesc = filtered(desc, countFive);
                const dayFiveTemp = filtered(temp, countFive);
                const dayFiveIcon = filtered(icon, countFive);

                const one = {
                  date: dayOneDate,
                  weather: dayOneWeather,
                  desc: dayOneDesc,
                  temp: dayOneTemp,
                  icon: dayOneIcon,
                };

                const two = {
                  date: dayTwoDate,
                  weather: dayTwoWeather,
                  desc: dayTwoDesc,
                  temp: dayTwoTemp,
                  icon: dayTwoIcon,
                };

                const three = {
                  date: dayThreeDate,
                  weather: dayThreeWeather,
                  desc: dayThreeDesc,
                  temp: dayThreeTemp,
                  icon: dayThreeIcon,
                };

                const four = {
                  date: dayFourDate,
                  weather: dayFourWeather,
                  desc: dayFourDesc,
                  temp: dayFourTemp,
                  icon: dayFourIcon,
                };

                const five = {
                  date: dayFiveDate,
                  weather: dayFiveWeather,
                  desc: dayFiveDesc,
                  temp: dayFiveTemp,
                  icon: dayFiveIcon,
                };

                switch (status) {
                  case "view":
                    setTimeout(() => {
                      // For normal view
                      setCurrent({
                        city: city[0].city,
                        weather: allCurrent.data.weather[0].main,
                        desc: allCurrent.data.weather[0].description,
                        temp: allCurrent.data.main.temp,
                        icon: `http://openweathermap.org/img/wn/${allCurrent.data.weather[0].icon}@2x.png`,
                      });

                      setAction({ ...action, status: "", num: 0 });
                    }, 700);
                    break;

                  case "update":
                    setTimeout(() => {
                      updateWeather(
                        city[0].city,
                        allCurrent.data.weather[0].main,
                        allCurrent.data.weather[0].description,
                        allCurrent.data.main.temp,
                        `http://openweathermap.org/img/wn/${allCurrent.data.weather[0].icon}@2x.png`,
                        JSON.stringify(one),
                        JSON.stringify(two),
                        JSON.stringify(three),
                        JSON.stringify(four),
                        JSON.stringify(five),
                        lat,
                        lon,
                        id,
                        (isSuccess) => {
                          if (isSuccess) {
                            console.log("Weather data updated.");
                          } else {
                            console.log("Weather data not updated.");
                          }
                        }
                      );

                      // update then set
                      getAllWeather(setWeather);
                      setAction({ ...action, status: "", num: 0 });
                    }, 700);
                    break;

                  case "save":
                    setTimeout(() => {
                      saveWeather(
                        city[0].city,
                        allCurrent.data.weather[0].main,
                        allCurrent.data.weather[0].description,
                        allCurrent.data.main.temp,
                        `http://openweathermap.org/img/wn/${allCurrent.data.weather[0].icon}@2x.png`,
                        JSON.stringify(one),
                        JSON.stringify(two),
                        JSON.stringify(three),
                        JSON.stringify(four),
                        JSON.stringify(five),
                        bol,
                        lat,
                        lon,
                        (isSuccess) => {
                          if (isSuccess) {
                            console.log("Weather data saved.");
                          } else {
                            console.log("Weather data not saved.");
                          }
                        }
                      );

                      getAllWeather(setWeather);
                      setAction({ ...action, status: "", num: 0 });
                    }, 700);
                    break;

                  default:
                    break;
                }
                console.log("Success in getting data.");
              })
            )
            .catch((e) => {
              console.log(e.message);
            })
        : console.log("Failed in getting data.");
    } catch (error) {
      Alert.alert("Server Error", "Please try again later.", [
        {
          text: "OK",
          onPress: () => setAction({ ...action, status: "", num: 0 }),
        },
      ]);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectStatus(state.isConnected);
    });
    createWeatherTableTransaction();
    // To check first-timer, save as default and display the current weather
    getAllWeather((result) => {
      if (result.city.length == 0) {
        if (latitude != 0 && longitude != 0) {
          if (connectStatus) {
            setAction({ ...action, status: "save", num: 0 });
            getData(latitude, longitude, "true", "save", null);
          } else {
            Alert.alert(
              "Connection Error",
              "Please ensure there is internet connection.",
              [
                {
                  text: "OK",
                  onPress: () => setAction({ ...action, status: "", num: 0 }),
                },
              ]
            );
          }
        }
      } else {
        getAllWeather(setWeather);
      }
    });
    return () => unsubscribe();
  }, [latitude, longitude]);

  if (action.status === "update") {
    if (connectStatus) {
      if (action.num === 0) {
        const lat = latitude;
        const lon = longitude;
        const id = weather.weather_id[action.num];
        getData(lat, lon, null, action.status, id);
      } else {
        const lat = weather.latitude[action.num];
        const lon = weather.longitude[action.num];
        const id = weather.weather_id[action.num];
        getData(lat, lon, null, action.status, id);
      }
    } else {
      Alert.alert(
        "Connection Error",
        "Please ensure there is internet connection.",
        [
          {
            text: "OK",
            onPress: () => setAction({ ...action, status: "", num: 0 }),
          },
        ]
      );
    }
  }

  return [getData, weather, setWeather, current, action, setAction];
};
