import { createSlice } from "@reduxjs/toolkit";

export const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: {
    latitude: 0,
    longitude: 0,
  },
  reducers: {
    updateLocation: (state, action) => {
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
  },
});

export const { updateLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;
