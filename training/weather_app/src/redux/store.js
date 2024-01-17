import { configureStore } from "@reduxjs/toolkit";
import tempFormatReducer from "./reducers/tempFormatSlice";
import themeReducer from "./reducers/themeSlice";
import currentLocationReducer from "./reducers/currentLocationSlice";
import currentLocationPermissionReducer from "./reducers/currentLocationPermissionSlice";
import timeReducer from "./reducers/timeFormatSlice";
import textStyleReducer from "./reducers/textStyleSlice";

export default configureStore({
  reducer: {
    tempFormat: tempFormatReducer,
    theme: themeReducer,
    currentLocation: currentLocationReducer,
    currentLocationPermission: currentLocationPermissionReducer,
    time: timeReducer,
    textStyle: textStyleReducer,
  },
});
