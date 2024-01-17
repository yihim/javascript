import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { toDate, to12Format } from "../hooks/time/timeConversion";
import { kToC, kToF } from "../hooks/temperature/tempConversion";
import Weather from "./Weather";

const ForecastList = ({ item, weather, desc, temperature, icon, index }) => {
  const temp = useSelector((state) => state.tempFormat.value);
  const theme = useSelector((state) => state.theme.value);
  const time = useSelector((state) => state.time.value);
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
    <View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme
              ? "rgba(69, 90, 100, 0.2)"
              : "rgba(84, 84, 84,0.2)",
          },
        ]}
      >
        <View style={styles.details}>
          <Text style={textFormat(theme, text)}>
            {toDate(item.split(" ").shift()) +
              (time
                ? to12Format(item.split(" ").pop())
                : "\t" + item.split(" ").pop().substring(0, 5))}
          </Text>
          <Text style={textFormat(theme, text)}>{weather[index] + " - "}</Text>
          <Text style={textFormat(theme, text)}>{desc[index]}</Text>
          <Text style={textFormat(theme, text)}>
            {temp ? kToF(temperature[index]) : kToC(temperature[index])}
          </Text>
          <View style={styles.icon}>
            <Weather icon={icon[index]} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForecastList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginVertical: 10,
    height: 100,
    width: 300,
  },
  darkTheme: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  lightTheme: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  details: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    right: 70,
    top: 35,
    width: "45%",
    height: "30%",
  },
  icon: {
    height: 70,
    width: 70,
    left: 140,
    bottom: 75,
  },
});
