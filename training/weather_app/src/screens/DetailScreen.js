import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { getAllWeather } from "../storage/functions/weather";
import { useSelector } from "react-redux";
import AppLoader from "../components/AppLoader";
import { kToC, kToF } from "../hooks/temperature/tempConversion";
import Weather from "../components/Weather";

const DetailScreen = ({
  visible,
  setVisible,
  current,
  getData,
  setWeather,
  temp,
  action,
  connectStatus,
}) => {
  const theme = useSelector((state) => state.theme.value);
  const text = useSelector((state) => state.textStyle.value);
  const textFormat = (theme, text) => {
    return theme
      ? text
        ? [styles.darkTheme, { fontStyle: "italic" }]
        : styles.darkTheme
      : text
      ? [styles.lightTheme, { fontStyle: "italic" }]
      : styles.lightTheme;
  };
  return (
    <Modal transparent visible={visible} animationType="fade">
      {action.status == "view" ? (
        <AppLoader />
      ) : (
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
            <View
              style={[
                styles.detailsContainer,
                {
                  backgroundColor: theme
                    ? "rgba(69, 90, 100, 0.2)"
                    : "rgba(84, 84, 84,0.2)",
                },
              ]}
            >
              <View style={styles.details}>
                <Text style={textFormat(theme, text)}>
                  {connectStatus ? current.city : null}
                </Text>
                <Text style={textFormat(theme, text)}>
                  {connectStatus ? current.weather + "-" : null}
                </Text>
                <Text style={textFormat(theme, text)}>
                  {connectStatus ? current.desc : null}
                </Text>
                <Text style={textFormat(theme, text)}>
                  {connectStatus
                    ? temp
                      ? kToF(current.temp)
                      : kToC(current.temp)
                    : null}
                </Text>
              </View>

              <View style={styles.icon}>
                {connectStatus ? <Weather icon={current.icon} /> : null}
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                top: 15,
              }}
            >
              <TouchableOpacity
                style={{ paddingRight: 100 }}
                onPress={() => setVisible(false)}
              >
                <Ionicons name="close-circle-outline" size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  connectStatus
                    ? getAllWeather((result) => {
                        if (result.city.includes(current.city)) {
                          Alert.alert(
                            `Duplicate City Found - (${current.city})`,
                            "This city has been saved.",
                            [
                              {
                                text: "OK",
                                onPress: () => setVisible(false),
                              },
                            ]
                          );
                        } else {
                          Alert.alert(
                            "Save Confirmation",
                            `Save ${current.city} as favourtie ?`,
                            [
                              {
                                text: "Cancel",
                              },
                              {
                                text: "Confirm",
                                onPress: () => {
                                  getData();
                                  getAllWeather(setWeather);
                                  Alert.alert(
                                    `${current.city} Saved Successfully`,
                                    "Please refresh before viewing it at the home screen.",
                                    [
                                      {
                                        text: "OK",
                                        onPress: () => setVisible(false),
                                      },
                                    ]
                                  );
                                },
                              },
                            ]
                          );
                        }
                      })
                    : Alert.alert(
                        "Connection Error",
                        "Unable to validate weather data.",
						[
                          {
                            text: "OK",
                            onPress: () => setVisible(false),
                          },
                        ]
                      );
                }}
              >
                <Ionicons name="heart-circle-outline" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "30%",
    width: "75%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  darkTheme: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  lightTheme: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    height: 70,
    width: 70,
    left: 170,
    bottom: 60,
  },
  details: {
    alignItems: "center",
    right: 45,
    top: 18,
  },
  detailsContainer: {
    height: 120,
    width: 250,
    borderRadius: 15,
  },
});
