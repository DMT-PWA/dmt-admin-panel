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

export const { setAppId, setCommentId, setDescriptionId } =
  pwaCreateSlice.actions;
export default pwaCreateSlice.reducer;
