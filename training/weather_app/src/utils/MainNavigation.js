import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import SettingScreen from "../screens/SettingScreen";

const Tab = createMaterialBottomTabNavigator();

const focus = (focused) => {
  return focused ? "white" : "black";
};

export default MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarLabel: false }}
      initialRouteName="Home"
      barStyle={{
        flex: 1,
        height: "9.5%",
        width: "65%",
        position: "absolute",
        bottom: 40,
        paddingHorizontal: 15,
        left: 75,
        elevation: 0,
        backgroundColor: "rgba(0, 0, 0,0)",
        borderRadius: 15,
        flexDirection: "column",
        ...styles.shadow,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconView}>
              <Ionicons name="home" size={40} color={focus(focused)} />
              <Text
                style={{
                  color: focus(focused),
                  ...styles.iconText,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconView}>
              <Ionicons name="map" size={40} color={focus(focused)} />
              <Text
                style={{
                  color: focus(focused),
                  ...styles.iconText,
                }}
              >
                Map
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconView}>
              <Ionicons name="settings" size={40} color={focus(focused)} />
              <Text
                style={{
                  color: focus(focused),
                  ...styles.iconText,
                }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#67656e",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  iconView: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 40,
  },
  iconText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
