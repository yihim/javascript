import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeFormat } from "../redux/reducers/tempFormatSlice";
import { changeTheme } from "../redux/reducers/themeSlice";
import { changeTime } from "../redux/reducers/timeFormatSlice";
import { changeText } from "../redux/reducers/textStyleSlice";
import Background from "../components/Background";
import TempSwitch from "../components/TempSwitch";
import ThemeSwitch from "../components/ThemeSwitch";
import TimeSwitch from "../components/TimeSwitch";
import TextSwitch from "../components/TextSwitch";
import { saveSettingsData } from "../hooks/settings/saveAndReadSettings";

const SettingScreen = () => {
  const temp = useSelector((state) => state.tempFormat.value);
  const theme = useSelector((state) => state.theme.value);
  const time = useSelector((state) => state.time.value);
  const text = useSelector((state) => state.textStyle.value);
  const [themeClicked, setThemeClicked] = useState(theme);
  const [tempClicked, setTempClicked] = useState(temp);
  const [timeClicked, setTimeClicked] = useState(time);
  const [textClicked, setTextClicked] = useState(text);
  const dispatch = useDispatch();

  const textFormat = (theme, text) => {
    return theme
      ? text
        ? [styles.darkTheme, { fontStyle: "italic" }]
        : styles.darkTheme
      : text
      ? [styles.lightTheme, { fontStyle: "italic" }]
      : styles.lightTheme;
  };

  const settingsData = {
    theme: themeClicked,
    temp: tempClicked,
    time: timeClicked,
    text: textClicked,
  };

  useEffect(() => {
    saveSettingsData(settingsData);
  }, [themeClicked, tempClicked, timeClicked, textClicked]);

  return (
    <>
      <Background theme={theme} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.container}>
          <Text style={textFormat(theme, text)}>
            {theme
              ? "App Theme" + "\t\t--\tDark"
              : "App Theme" + "\t\t--\tLight"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setThemeClicked(!themeClicked);
              dispatch(changeTheme());
            }}
          >
            <ThemeSwitch themeClicked={themeClicked} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={textFormat(theme, text)}>
            {temp
              ? "Temperature" + "\t\t--\t(°F)"
              : "Temperature" + "\t\t--\t(°C)"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setTempClicked(!tempClicked);
              dispatch(changeFormat());
            }}
          >
            <TempSwitch tempClicked={tempClicked} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={textFormat(theme, text)}>
            {time ? "Time Format" + "\t\t--\t12" : "Time Format" + "\t\t--\t24"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setTimeClicked(!timeClicked);
              dispatch(changeTime());
            }}
          >
            <TimeSwitch timeClicked={timeClicked} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={textFormat(theme, text)}>
            {text
              ? "Text Style" + "\t\t--\tItalic"
              : "Text Style" + "\t\t--\tNormal"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setTextClicked(!textClicked);
              dispatch(changeText());
            }}
          >
            <TextSwitch textClicked={textClicked} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
