import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  appId: "",
  currentStage: "design",
  isChanged: false,
};

const pwaCreateSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    setCurrentStage(state, action: PayloadAction<string>) {
      state.currentStage = action.payload;
    },
    setChanged: (state, action: PayloadAction<boolean>) => {
      state.isChanged = action.payload;
    },
    setAppId: (state, action: PayloadAction<string>) => {
      state.appId = action.payload
    }
  },
});

export const { setCurrentStage, setChanged, setAppId } = pwaCreateSlice.actions;
export default pwaCreateSlice.reducer;
