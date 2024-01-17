import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    value: false,
  },
  reducers: {
    changeTime: (state) => {
      return { value: !state.value };
    },
  },
});

export const { changeTime } = timeSlice.actions;

export default timeSlice.reducer;
