import React, { useEffect } from "react";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { updateLocation } from "../../redux/reducers/currentLocationSlice";
import { updatePermission } from "../../redux/reducers/currentLocationPermissionSlice";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        dispatch(updatePermission());
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      dispatch(updateLocation(location.coords));
    })();
  }, []);
};
