import { StyleSheet } from "react-native";
import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";

const TextSwitch = ({ textClicked }) => {
  const animation = useRef(null);
  const isFirstRun = useRef(true);
  const text = useSelector((state) => state.textStyle.value);

  useEffect(() => {
    if (isFirstRun.current) {
      if (text) {
        animation.current.play(36, 36);
      } else {
        animation.current.play(0, 0);
      }
      isFirstRun.current = false;
    } else if (textClicked) {
      animation.current.play(0, 36);
    } else {
      animation.current.play(37, 92);
    }
  }, [textClicked]);

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

export default TextSwitch;

const styles = StyleSheet.create({});
