import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const AppSplash = ({ setSplash }) => {
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
        source={require("../../assets/splash.json")}
        style={{ height: 600, width: 600 }}
        autoPlay={true}
        loop={false}
        speed={1}
        renderMode={"SOFTWARE"}
        onAnimationFinish={() => setSplash(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    zIndex: 1,
  },
});

export default AppSplash;
