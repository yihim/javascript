import React, { useRef, useState, useEffect } from "react";
import { AppState } from "react-native";
import MainNavigation from "./src/utils/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import PermissionScreen from "./src/screens/PermissionScreen";
import AppSplash from "./src/components/AppSplash";

function App() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [splash, setSplash] = useState(true);
  const theme = useSelector((state) => state.theme.value);
  const permission = useSelector(
    (state) => state.currentLocationPermission.value
  );

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive | background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground.");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);

    console.log("AppState: ", appState.current);
  };

  return (
    <NavigationContainer>
      <StatusBar style={theme ? "light" : "dark"} />
      {splash ? <AppSplash setSplash={setSplash} /> : null}
      {permission ? <MainNavigation /> : <PermissionScreen />}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
