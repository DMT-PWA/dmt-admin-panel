import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDesign } from "./types";

const defaultState: IDesign = {
  pwa_interface_language: {},
  pwa_title: "",
  pwa_tags: [],
};

export const pwaDesignSlice = createSlice({
  name: "design",
  initialState: defaultState,
  reducers: {
    setPwaTitle(state, action: PayloadAction<string>) {
      state.pwa_title = action.payload;
    },
  },
});

export const { setPwaTitle } = pwaDesignSlice.actions;

export default pwaDesignSlice.reducer;
