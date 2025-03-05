import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const create_stages = [
  "design",
  "description",
  "comments",
  "setting",
  "metrics",
];

const initialState = {
  currentStage: "design",
};

const pwaCreateSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    setCurrentStage(state, action: PayloadAction<string>) {
      state.currentStage = action.payload;
    },
  },
});

export const { setCurrentStage } = pwaCreateSlice.actions;
export default pwaCreateSlice.reducer;
