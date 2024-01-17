import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import WeatherList from "./WeatherList";
import { useSelector } from "react-redux";

const WeatherScreenSelector = ({
  selectorVisible,
  setSelectorVisible,
  data,
  setNum,
}) => {
  const theme = useSelector((state) => state.theme.value);

  return (
    <Modal transparent visible={selectorVisible} animationType="fade">
      <View style={styles.modalBackground}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme
                ? "rgb(84, 110, 122)"
                : "rgb(148, 148, 148)",
            },
          ]}
        >
          <TouchableOpacity onPress={() => setSelectorVisible(false)}>
            <Ionicons
              name="close-circle-outline"
              size={40}
              color={theme ? "white" : "black"}
            />
          </TouchableOpacity>
          <View style={{ marginVertical: 5 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={({ item, index }) => (
                <WeatherList
                  item={item}
                  index={index}
                  onPress={() => {
                    setNum(index);
                    setSelectorVisible(false);
                  }}
                />
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WeatherScreenSelector;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "35%",
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
