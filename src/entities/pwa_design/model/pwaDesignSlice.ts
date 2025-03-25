import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDesign } from "./types";
import { fetchDesignInfo, fetchPwaInfo } from "./pwaDesignThunk";
import { languages } from "../lib/const"
import { Language, ICollection } from "src/shared/types/designTypes"

const defaultState: IDesign = {
  languages: languages,
  pwa_title: "",
  pwa_tags: [],
  collections: [],
  isChanged: false,
  appData: {},
  currentLanguage: languages.find(item => Object.values(item)[0] === "english")
};

export const pwaDesignSlice = createSlice({
  name: "design",
  initialState: defaultState,
  reducers: {
    setPwaTitle(state, action: PayloadAction<string>) {
      state.pwa_title = action.payload;
    },
    addCollection: (state, action: PayloadAction<ICollection>) => {
      state.collections.push(action.payload);
    },
    removeCollection: (state, action: PayloadAction<number>) => {
      state.collections.splice(action.payload, 1);
    },
    setChanged: (state, action: PayloadAction<boolean>) => {
      state.isChanged = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDesignInfo.fulfilled, (state, action) => {
      state.languages = [...action.payload].map((item) => ({
        value: item.id,
        label: item.title,
      }));
    });
    builder.addCase(fetchPwaInfo.fulfilled, (state, action) => {

      state.appData = action.payload
    })
  }

});

export const { setPwaTitle, addCollection, removeCollection, setChanged, setLanguage } =
  pwaDesignSlice.actions;

export default pwaDesignSlice.reducer;
