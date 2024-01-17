import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Background = ({ theme }) => {
  const lottieRef = useRef(null);
  useEffect(() => {
    lottieRef.current?.reset();
    setTimeout(() => {
      lottieRef.current?.play();
    }, 100);
  }, []);

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        ref={lottieRef}
        source={
          theme
            ? require("../../assets/darkbg.json")
            : require("../../assets/lightbg.json")
        }
        autoPlay={true}
        loop={true}
        speed={1}
        renderMode={"SOFTWARE"}
        resizeMode={"cover"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

export default Background;
