import { createSlice } from "@reduxjs/toolkit";

export const currentLocationPermissionSlice = createSlice({
  name: "currentLocationPermission",
  initialState: {
    value: true,
  },
  reducers: {
    updatePermission: (state) => {
      return { ...state, value: !state.value };
    },
  },
});

export const { updatePermission } = currentLocationPermissionSlice.actions;

export default currentLocationPermissionSlice.reducer;
