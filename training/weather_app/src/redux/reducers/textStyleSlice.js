import { createSlice } from "@reduxjs/toolkit";

export const textStyleSlice = createSlice({
  name: "textStyle",
  initialState: {
    value: false,
  },
  reducers: {
    changeText: (state) => {
      return { value: !state.value };
    },
  },
});

export const { changeText } = textStyleSlice.actions;

export default textStyleSlice.reducer;
