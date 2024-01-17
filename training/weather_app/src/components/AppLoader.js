import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const AppLoader = () => {
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
        source={require("../../assets/loading.json")}
        autoPlay={true}
        loop={true}
        speed={1}
        renderMode={"SOFTWARE"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});

export default AppLoader;
