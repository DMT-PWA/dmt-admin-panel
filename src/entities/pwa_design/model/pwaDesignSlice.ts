import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDesign } from "./types";
import { fetchDesignInfo } from "./pwaDesignThunk";

const defaultState: IDesign = {
  languages: [],
  pwa_title: "",
  pwa_tags: [],
  collections: [],
};

export const pwaDesignSlice = createSlice({
  name: "design",
  initialState: defaultState,
  reducers: {
    setPwaTitle(state, action: PayloadAction<string>) {
      state.pwa_title = action.payload;
    },
    addCollection: (state, action: PayloadAction<object>) => {
      state.collections.push(action.payload);
    },
    removeCollection: (state, action: PayloadAction<number>) => {
      state.collections.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchDesignInfo.fulfilled, (state, action) => {
      state.languages = [...action.payload].map((item) => ({
        value: item.id,
        label: item.title,
      }));
    }),
});

export const { setPwaTitle, addCollection, removeCollection } =
  pwaDesignSlice.actions;

export default pwaDesignSlice.reducer;
