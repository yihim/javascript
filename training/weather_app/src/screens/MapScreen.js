import { StyleSheet, View, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import ZoomBtns from "../components/ZoomBtns";
import SearchBar from "../components/SearchBar";
import useData from "../hooks/useData";
import DetailScreen from "./DetailScreen";
import { useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

const MapScreen = () => {
  const latitude = useSelector((state) => state.currentLocation.latitude);
  const longitude = useSelector((state) => state.currentLocation.longitude);
  const temp = useSelector((state) => state.tempFormat.value);
  const theme = useSelector((state) => state.theme.value);
  const text = useSelector((state) => state.textStyle.value);
  const [connectStatus, setConnectStatus] = useState(false);
  const [getData, weather, setWeather, current, action, setAction] = useData();
  const [visible, setVisible] = useState(false);
  const [loc, setLoc] = useState({
    latitude: 0,
    longitude: 0,
  });

  // For zoom in and zoom out
  const [deltas, setDeltas] = useState({
    latDelta: 0.005,
    longDelta: 0.005,
  });

  const zoomIn = () => {
    const { latDelta, longDelta } = deltas;
    const currLatDelta = latDelta / 3;
    const currLonDelta = longDelta / 3;
    setDeltas({ ...deltas, latDelta: currLatDelta, longDelta: currLonDelta });
  };

  const zoomOut = () => {
    const { latDelta, longDelta } = deltas;
    if (latDelta <= 60 && longDelta <= 60) {
      const currLatDelta = latDelta * 3;
      const currLonDelta = longDelta * 3;
      setDeltas({ ...deltas, latDelta: currLatDelta, longDelta: currLonDelta });
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectStatus(state.isConnected);
    });
    setLoc({
      latitude: latitude,
      longitude: longitude,
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        userInterfaceStyle={theme ? "dark" : "light"}
        style={styles.map}
        region={{
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: deltas.latDelta,
          longitudeDelta: deltas.longDelta,
        }}
        initialRegion={{
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: deltas.latDelta,
          longitudeDelta: deltas.longDelta,
        }}
      >
        <Marker
          draggable={true}
          coordinate={{
            latitude: loc.latitude,
            longitude: loc.longitude,
          }}
          onDragEnd={(event) => {
            const { coordinate } = event.nativeEvent;
            const { latitude, longitude } = coordinate;
            setLoc({
              latitude: latitude,
              longitude: longitude,
            });

            console.log("New Location.", loc);
          }}
        >
          <Callout
            onPress={() => {
              setAction({ ...action, status: "view", num: 0 });
              getData(loc.latitude, loc.longitude, null, "view", null);
              setVisible(true);
            }}
          >
            <Text
              style={
                text
                  ? [styles.calloutText, { fontStyle: "italic" }]
                  : styles.calloutText
              }
            >
              Click to view info
            </Text>
          </Callout>
        </Marker>
        <Circle
          center={{
            latitude: loc.latitude,
            longitude: loc.longitude,
          }}
          radius={100}
          fillColor={"rgba(73, 152, 191,0.3)"}
        />
      </MapView>
      <SearchBar setLoc={setLoc} />
      <ZoomBtns zoomIn={zoomIn} zoomOut={zoomOut} theme={theme} />
      <DetailScreen
        visible={visible}
        setVisible={setVisible}
        current={current}
        getData={() =>
          getData(loc.latitude, loc.longitude, "false", "save", null)
        }
        setWeather={setWeather}
        temp={temp}
        action={action}
        connectStatus={connectStatus}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
