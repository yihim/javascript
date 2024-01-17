import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import ForecastList from "./ForecastList";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ForecastWeatherDetails = ({
  setForecastDataVisible,
  forecastDataVisible,
  num,
  day,
  setDay,
  data,
}) => {
  const theme = useSelector((state) => state.theme.value);

  if (data.city.length != 0) {
    if (day.one) {
      data = data.forecastDayOne[num];
    }
    if (day.two) {
      data = data.forecastDayTwo[num];
    }
    if (day.three) {
      data = data.forecastDayThree[num];
    }
    if (day.four) {
      data = data.forecastDayFour[num];
    }
    if (day.five) {
      data = data.forecastDayFive[num];
    }
  }

  return (
    <Modal transparent visible={forecastDataVisible} animationType="fade">
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
          <TouchableOpacity
            onPress={() => {
              setDay({
                ...day,
                one: false,
                two: false,
                three: false,
                four: false,
                five: false,
              });
              setForecastDataVisible(false);
            }}
          >
            <Ionicons
              name="close-circle-outline"
              size={40}
              color={theme ? "white" : "black"}
            />
          </TouchableOpacity>
          <View style={{ marginVertical: 5 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data.date}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={({ item, index }) => (
                <ForecastList
                  item={item}
                  weather={data.weather}
                  desc={data.desc}
                  temperature={data.temp}
                  icon={data.icon}
                  index={index}
                />
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ForecastWeatherDetails;

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
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 15,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
