import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const WeatherList = ({ onPress, item, index }) => {
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
    <TouchableOpacity onPress={onPress}>
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
        <Text style={textFormat(theme, text)}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(106, 106, 106, 0.3)",
    borderRadius: 15,
    marginBottom: 10,
    height: 30,
  },
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
