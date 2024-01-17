import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ForecastWeatherDetails from "./ForecastWeatherDetails";
import { useSelector } from "react-redux";
import { toDate, to12Format } from "../hooks/time/timeConversion";
import { kToC, kToF } from "../hooks/temperature/tempConversion";
import Weather from "./Weather";

const ForecastScreen = ({ num, weather, temp }) => {
  const theme = useSelector((state) => state.theme.value);
  const time = useSelector((state) => state.time.value);
  const text = useSelector((state) => state.textStyle.value);
  const [forecastDataVisible, setForecastDataVisible] = useState(false);
  const [day, setDay] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

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
    <View>
      <ForecastWeatherDetails
        setForecastDataVisible={setForecastDataVisible}
        forecastDataVisible={forecastDataVisible}
        num={num}
        day={day}
        setDay={setDay}
        data={weather}
      />
      <View
        style={{
          paddingBottom: 100,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: theme
                ? "rgb(84, 110, 122)"
                : "rgb(162, 162, 162)",
            },
          ]}
        >
          <TouchableOpacity
            style={styles.details}
            onPress={() => {
              setDay({
                ...day,
                one: true,
              });
              setForecastDataVisible(true);
            }}
          >
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayOne[num]
                ? toDate(
                    weather.forecastDayOne[num].date[0].split(" ").shift()
                  ) +
                  (time
                    ? to12Format(
                        weather.forecastDayOne[num].date[0]
                          .split(" ")
                          .pop()
                          .substring(0, 5)
                      )
                    : weather.forecastDayOne[num].date[0]
                        .split(" ")
                        .pop()
                        .substring(0, 5) + "\t\t")
                : null}
            </Text>
            <View style={styles.icon}>
              {weather.forecastDayOne[num] ? (
                <Weather icon={weather.forecastDayOne[num].icon[0]} />
              ) : null}
            </View>
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayOne[num]
                ? temp
                  ? "\t" + kToF(weather.forecastDayOne[num].temp[0])
                  : "\t" + kToC(weather.forecastDayOne[num].temp[0])
                : null}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.container,
            {
              backgroundColor: theme
                ? "rgb(84, 110, 122)"
                : "rgb(162, 162, 162)",
            },
          ]}
        >
          <TouchableOpacity
            style={styles.details}
            onPress={() => {
              setDay({
                ...day,
                two: true,
              });
              setForecastDataVisible(true);
            }}
          >
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayTwo[num]
                ? toDate(
                    weather.forecastDayTwo[num].date[0].split(" ").shift()
                  ) +
                  (time
                    ? to12Format(
                        weather.forecastDayTwo[num].date[0]
                          .split(" ")
                          .pop()
                          .substring(0, 5)
                      )
                    : weather.forecastDayTwo[num].date[0]
                        .split(" ")
                        .pop()
                        .substring(0, 5) + "\t\t")
                : null}
            </Text>
            <View style={styles.icon}>
              {weather.forecastDayTwo[num] ? (
                <Weather icon={weather.forecastDayTwo[num].icon[0]} />
              ) : null}
            </View>
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayTwo[num]
                ? temp
                  ? "\t" + kToF(weather.forecastDayTwo[num].temp[0])
                  : "\t" + kToC(weather.forecastDayTwo[num].temp[0])
                : null}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.container,
            {
              backgroundColor: theme
                ? "rgb(84, 110, 122)"
                : "rgb(162, 162, 162)",
            },
          ]}
        >
          <TouchableOpacity
            style={styles.details}
            onPress={() => {
              setDay({
                ...day,
                three: true,
              });
              setForecastDataVisible(true);
            }}
          >
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayThree[num]
                ? toDate(
                    weather.forecastDayThree[num].date[0].split(" ").shift()
                  ) +
                  (time
                    ? to12Format(
                        weather.forecastDayThree[num].date[0]
                          .split(" ")
                          .pop()
                          .substring(0, 5)
                      )
                    : weather.forecastDayThree[num].date[0]
                        .split(" ")
                        .pop()
                        .substring(0, 5) + "\t\t")
                : null}
            </Text>
            <View style={styles.icon}>
              {weather.forecastDayThree[num] ? (
                <Weather icon={weather.forecastDayThree[num].icon[0]} />
              ) : null}
            </View>
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayThree[num]
                ? temp
                  ? "\t" + kToF(weather.forecastDayThree[num].temp[0])
                  : "\t" + kToC(weather.forecastDayThree[num].temp[0])
                : null}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.container,
            {
              backgroundColor: theme
                ? "rgb(84, 110, 122)"
                : "rgb(162, 162, 162)",
            },
          ]}
        >
          <TouchableOpacity
            style={styles.details}
            onPress={() => {
              setDay({
                ...day,
                four: true,
              });
              setForecastDataVisible(true);
            }}
          >
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayFour[num]
                ? toDate(
                    weather.forecastDayFour[num].date[0].split(" ").shift()
                  ) +
                  (time
                    ? to12Format(
                        weather.forecastDayFour[num].date[0]
                          .split(" ")
                          .pop()
                          .substring(0, 5)
                      )
                    : weather.forecastDayFour[num].date[0]
                        .split(" ")
                        .pop()
                        .substring(0, 5) + "\t\t")
                : null}
            </Text>
            <View style={styles.icon}>
              {weather.forecastDayFour[num] ? (
                <Weather icon={weather.forecastDayFour[num].icon[0]} />
              ) : null}
            </View>
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayFour[num]
                ? temp
                  ? "\t" + kToF(weather.forecastDayFour[num].temp[0])
                  : "\t" + kToC(weather.forecastDayFour[num].temp[0])
                : null}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.container,
            {
              backgroundColor: theme
                ? "rgb(84, 110, 122)"
                : "rgb(162, 162, 162)",
            },
          ]}
        >
          <TouchableOpacity
            style={styles.details}
            onPress={() => {
              setDay({
                ...day,
                five: true,
              });
              setForecastDataVisible(true);
            }}
          >
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayFive[num]
                ? toDate(
                    weather.forecastDayFive[num].date[0].split(" ").shift()
                  ) +
                  (time
                    ? to12Format(
                        weather.forecastDayFive[num].date[0]
                          .split(" ")
                          .pop()
                          .substring(0, 5)
                      )
                    : weather.forecastDayFive[num].date[0]
                        .split(" ")
                        .pop()
                        .substring(0, 5) + "\t\t")
                : null}
            </Text>
            <View style={styles.icon}>
              {weather.forecastDayFive[num] ? (
                <Weather icon={weather.forecastDayFive[num].icon[0]} />
              ) : null}
            </View>
            <Text style={textFormat(theme, text)}>
              {weather.forecastDayFive[num]
                ? temp
                  ? "\t" + kToF(weather.forecastDayFive[num].temp[0])
                  : "\t" + kToC(weather.forecastDayFive[num].temp[0])
                : null}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForecastScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 15,
    bottom: 100,
  },
  details: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  darkTheme: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  lightTheme: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    height: 55,
    width: 55,
  },
});
