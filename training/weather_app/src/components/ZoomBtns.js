import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ZoomBtns = ({ zoomIn, zoomOut, theme }) => {
  return (
    <View
      style={{
        top: 180,
        right: 30,
        position: "absolute",
      }}
    >
      <TouchableOpacity style={styles.zoomBtn} onPress={zoomIn}>
        <Ionicons
          name="add-circle-outline"
          size={40}
          color={theme ? "white" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomBtn} onPress={zoomOut}>
        <Ionicons
          name="remove-circle-outline"
          size={40}
          color={theme ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ZoomBtns;

const styles = StyleSheet.create({
  zoomBtn: {
    height: 40,
    width: 50,
    left: 15,
    top: 5,
  },
});
