import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PwaCreate } from "./types";
const initialState: PwaCreate = {
  appId: null,
  currentStage: "design",
  isChanged: false,
  commentId: null,
  descriptionId: null,
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
      state.appId = action.payload;
    },
    setCommentId: (state, action: PayloadAction<string>) => {
      state.commentId = action.payload;
    },
    setDescriptionId: (state, action: PayloadAction<string>) => {
      state.descriptionId = action.payload;
    },
  },
});

export const {
  setCurrentStage,
  setChanged,
  setAppId,
  setCommentId,
  setDescriptionId,
} = pwaCreateSlice.actions;
export default pwaCreateSlice.reducer;
