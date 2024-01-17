import * as React from "react";
import {
  Linking,
  NativeModules,
  Platform,
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
} from "react-native";
import Permission from "../components/Permission";
import Background from "../components/Background";

const { RNAndroidOpenSettings } = NativeModules;

export default class App extends React.Component {
  openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      RNAndroidOpenSettings.appDetailsSettings();
    }
  };

  const;

  render() {
    return (
      <>
        <View style={styles.container}>
          <Background theme={false} />
          <View style={{ bottom: 130 }}>
            <Permission />
          </View>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Please enable device location for this app and restart the app after
            enabling it in order to use, Thank you.
          </Text>
          <TouchableHighlight
            onPress={this.openAppSettings}
            style={styles.button}
          >
            <Text style={styles.buttonText}>APP SETTINGS</Text>
          </TouchableHighlight>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },

  button: {
    width: 240,
    height: 44,
    marginTop: 20,
    backgroundColor: "#949494",
    borderRadius: 15,
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
