import { createSlice } from "@reduxjs/toolkit";

export const tempFormatSlice = createSlice({
  name: "tempFormat",
  initialState: {
    value: false,
  },
  reducers: {
    changeFormat: (state) => {
      return { ...state, value: !state.value };
    },
  },
});

export const { changeFormat } = tempFormatSlice.actions;

export default tempFormatSlice.reducer;
