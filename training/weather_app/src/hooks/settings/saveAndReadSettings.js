import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSettingsData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("settings", jsonValue);
  } catch (e) {
    console.log("Async Storage - Error in saving data", e.message);
  }
};

export const readSettingsData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("settings");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Async Storage - Error in reading data", e.message);
  }
};
