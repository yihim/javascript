import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";

const Weather = ({ icon }) => {
  let condition = icon.split("/").pop().split(".").shift().replace("@2x", "");
  //console.log(condition);

  var display = null;
  if (condition == "01d") {
    display = require("../../assets/day-clear-sky.json");
  } else if (condition == "01n") {
    display = require("../../assets/night-clear-sky.json");
  } else if (condition == "02d" || condition == "03d" || condition == "04d") {
    display = require("../../assets/day-cloud-sky.json");
  } else if (condition == "02n" || condition == "03n" || condition == "04n") {
    display = require("../../assets/night-cloud-sky.json");
  } else if (condition == "09d" || condition == "10d") {
    display = require("../../assets/day-rain.json");
  } else if (condition == "09n" || condition == "10n") {
    display = require("../../assets/night-rain.json");
  } else if (condition == "11d") {
    display = require("../../assets/day-thunderstorm.json");
  } else if (condition == "11n") {
    display = require("../../assets/night-thunderstorm.json");
  } else if (condition == "13d") {
    display = require("../../assets/day-snow.json");
  } else if (condition == "13n") {
    display = require("../../assets/night-snow.json");
  } else if (condition == "50d") {
    display = require("../../assets/day-mist.json");
  } else if (condition == "50n") {
    display = require("../../assets/night-mist.json");
  } else {
    display = require("../../assets/loading.json");
  }

  const lottieRef = useRef(null);
  useEffect(() => {
    lottieRef.current?.reset();
    setTimeout(() => {
      lottieRef.current?.play();
    }, 100);
    display = null;
  }, []);
  return (
    <LottieView
      ref={lottieRef}
      source={display}
      autoPlay={true}
      loop={true}
      speed={1}
      renderMode={"SOFTWARE"}
      resizeMode={"contain"}
    />
  );
};

export default Weather;
