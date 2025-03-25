import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // appData: null,
  allApps: JSON.parse(window?.localStorage.getItem("allApps")) ?? {},
  // allApps: null,
  appData: JSON.parse(window?.localStorage.getItem("appData")) ?? {},
  completeAppData:
    JSON.parse(window?.localStorage.getItem("completeAppData")) ?? {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const appDataSlice = createSlice({
  name: "appData",
  initialState: initialState,
  reducers: {
    getApp(state, action) {
      state.appData = action.payload;
      localStorage.setItem("appData", JSON.stringify(action.payload));
    },
    getCompleteApp(state, action) {
      state.completeAppData = action.payload;
      localStorage.setItem("completeAppData", JSON.stringify(action.payload));
    },
    getAllApp(state, action) {
      state.allApps = action.payload;
      localStorage.setItem("allApps", JSON.stringify(action.payload));
    },
  },
});

export const { getApp, getCompleteApp, getAllApp } = appDataSlice.actions;

export default appDataSlice.reducer;
