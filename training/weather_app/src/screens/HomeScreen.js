import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import useData from "../hooks/useData";
import currentLocation from "../hooks/location/currentLocation";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import WeatherScreenSelector from "../components/WeatherScreenSelector";
import WeatherScreen from "../components/WeatherScreen";
import AppLoader from "../components/AppLoader";
import Background from "../components/Background";
import { deleteWeather, getAllWeather } from "../storage/functions/weather";
import { readSettingsData } from "../hooks/settings/saveAndReadSettings";
import { changeTheme } from "../redux/reducers/themeSlice";
import { changeTime } from "../redux/reducers/timeFormatSlice";
import { changeText } from "../redux/reducers/textStyleSlice";
import { changeFormat } from "../redux/reducers/tempFormatSlice";

const HomeScreen = () => {
  const locationPermission = currentLocation();
  const [getData, weather, setWeather, current, action, setAction] = useData();
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [num, setNum] = useState(0);
  const temp = useSelector((state) => state.tempFormat.value);
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let savedSettingsData = await readSettingsData();
      if (savedSettingsData != null) {
        if (savedSettingsData.theme) {
          dispatch(changeTheme());
        }
        if (savedSettingsData.temp) {
          dispatch(changeFormat());
        }
        if (savedSettingsData.time) {
          dispatch(changeTime());
        }
        if (savedSettingsData.text) {
          dispatch(changeText());
        }
      }
    })();
  }, []);

  return (
    <>
      <Background theme={theme} />
      {action.status == "update" || action.status == "save" ? (
        <AppLoader />
      ) : (
        <View style={styles.page}>
          <WeatherScreenSelector
            selectorVisible={selectorVisible}
            setSelectorVisible={setSelectorVisible}
            data={weather.city}
            setNum={setNum}
          />
          <View
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <WeatherScreen
              num={num}
              action={action}
              setAction={setAction}
              weather={weather}
              temp={temp}
            />
          </View>
          <View style={styles.button}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ right: 140 }}>
                {num != 0 ? (
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "Delete Confirmation",
                        `Delete ${weather.city[num]} ?`,
                        [
                          {
                            text: "Cancel",
                          },
                          {
                            text: "Confirm",
                            onPress: () =>
                              deleteWeather(
                                weather.weather_id[num],
                                (isSuccess) => {
                                  if (isSuccess) {
                                    Alert.alert(
                                      "Weather Deleted Successfully",
                                      `${weather.city[num]} has been removed from the favourite list.`
                                    );
                                    getAllWeather(setWeather);
                                    setNum(0);
                                    console.log("Weather data deleted");
                                  } else {
                                    console.log("Weather data not deleted");
                                  }
                                }
                              ),
                          },
                        ]
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name="delete-circle-outline"
                      size={40}
                      color="red"
                    />
                  </TouchableOpacity>
                ) : (
                  <MaterialCommunityIcons
                    name="delete-circle-outline"
                    size={40}
                    color="rgba(0,0,0,0)"
                  />
                )}
              </View>

              <View style={{ left: 140 }}>
                <TouchableOpacity
                  onPress={() => setSelectorVisible(!selectorVisible)}
                >
                  <Ionicons
                    name="ellipsis-horizontal-circle-outline"
                    size={40}
                    color={theme ? "white" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    top: 70,
  },
});
