import { StyleSheet } from "react-native";
import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";

const TimeSwitch = ({ timeClicked }) => {
  const animation = useRef(null);
  const isFirstRun = useRef(true);
  const time = useSelector((state) => state.time.value);

  useEffect(() => {
    if (isFirstRun.current) {
      if (time) {
        animation.current.play(36, 36);
      } else {
        animation.current.play(0, 0);
      }
      isFirstRun.current = false;
    } else if (timeClicked) {
      animation.current.play(0, 36);
    } else {
      animation.current.play(37, 92);
    }
  }, [timeClicked]);
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

export default TimeSwitch;

const styles = StyleSheet.create({});
