import { StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";

const ThemeSwitch = ({ themeClicked }) => {
  const animation = useRef(null);
  const isFirstRun = useRef(true);
  const theme = useSelector((state) => state.theme.value);

  useEffect(() => {
    if (isFirstRun.current) {
      if (theme) {
        animation.current.play(36, 36);
      } else {
        animation.current.play(0, 0);
      }
      isFirstRun.current = false;
    } else if (themeClicked) {
      animation.current.play(0, 36);
    } else {
      animation.current.play(37, 92);
    }
  }, [themeClicked]);
  return (
    <LottieView
      ref={animation}
      style={{ height: 60, width: 100 }}
      source={require("../../assets/switch.json")}
      autoPlay={false}
      loop={false}
      speed={2}
      renderMode={"SOFTWARE"}
    />
  );
};

export default ThemeSwitch;

const styles = StyleSheet.create({});
