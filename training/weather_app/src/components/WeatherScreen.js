import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import React from "react";
import ForecastScreen from "./ForecastScreen";
import { kToC, kToF } from "../hooks/temperature/tempConversion";
import { useSelector } from "react-redux";
import Weather from "./Weather";

const WeatherScreen = ({ num, action, setAction, weather, temp }) => {
  const theme = useSelector((state) => state.theme.value);
  const text = useSelector((state) => state.textStyle.value);

  const textFormat = (theme, text) => {
    return theme
      ? text
        ? [styles.darkTheme, { fontStyle: "italic" }]
        : styles.darkTheme
      : text
      ? [styles.lightTheme, { fontStyle: "italic" }]
      : styles.lightTheme;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <RefreshControl
        onRefresh={() => setAction({ ...action, status: "update", num: num })}
      />
      <View style={{ paddingTop: StatusBar.currentHeight + 10 }}>
        <View
          style={{
            height: 100,
            width: 100,
            top: 108,
            left: 250,
          }}
        >
          {weather.currentIcon[num] ? (
            <Weather icon={weather.currentIcon[num]} />
          ) : null}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "35%",
            width: "60%",
            borderRadius: 15,
            left: "6%",
          }}
        >
          {num == 0 ? (
            <Text style={textFormat(theme, text)}>My City:</Text>
          ) : (
            <Text style={textFormat(theme, text)}>City:</Text>
          )}
          <Text style={textFormat(theme, text)}>
            {weather.city[num] ? weather.city[num] : null}
          </Text>
          <Text style={textFormat(theme, text)}>
            {weather.currentWeather[num]
              ? weather.currentWeather[num] + " - "
              : null}
          </Text>
          <Text style={textFormat(theme, text)}>
            {weather.currentWeather[num] ? weather.currentDesc[num] : null}
          </Text>
          <Text style={textFormat(theme, text)}>
            {weather.currentTemp
              ? temp
                ? kToF(weather.currentTemp[num])
                : kToC(weather.currentTemp[num])
              : null}
          </Text>
        </View>
      </View>
      <ForecastScreen num={num} weather={weather} temp={temp} />
    </ScrollView>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  darkTheme: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  lightTheme: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
