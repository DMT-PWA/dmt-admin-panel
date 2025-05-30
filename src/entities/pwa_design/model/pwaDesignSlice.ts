import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDesign } from "./types";
import { fetchDesignInfo, fetchPwaInfo } from "./pwaDesignThunk";
import { languages } from "../lib/const";
import { Language, Country } from "src/shared/types/designTypes";
import { getPwaById, getPwaByIdAndLanguage } from "src/shared/api/create";
import { selectLanguagesList } from "./selectors";

const defaultState: IDesign = {
  languages: languages,
  pwa_title: "",
  pwa_tags: "",
  collections: [],
  isChanged: false,
  appData: {},
  languagesList: null,
  currentCountry: null,
  currentLanguage: null,
};

export const pwaDesignSlice = createSlice({
  name: "design",
  initialState: defaultState,
  reducers: {
    setPwaTitle(state, action: PayloadAction<string>) {
      state.pwa_title = action.payload;
    },

    setMarketerTag: (state, action: PayloadAction<string>) => {
      state.pwa_tags = action.payload;
    },

    addCollection: (state, action) => {
      state.collections.push(action.payload);
    },
    removeCollection: (state, action: PayloadAction<number>) => {
      state.collections.splice(action.payload, 1);
    },
    setChanged: (state, action: PayloadAction<boolean>) => {
      state.isChanged = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },
    setLanguagesList: (state) => {
      state.languagesList = selectLanguagesList(state.currentCountry);
    },
    updateLanguagesList: (state, action) => {
      state.languagesList = action.payload;
    },
    addLanguage: (state, action: PayloadAction<Language>) => {
      state.languagesList?.push(action.payload);
    },
    removeLanguage: (state) => {
      state.languagesList?.pop();
    },
    setCountry: (state, action: PayloadAction<Country>) => {
      state.currentCountry = action.payload;
    },
    resetState: () => defaultState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDesignInfo.fulfilled, (state, action) => {
      state.languages = [...action.payload].map((item) => ({
        value: item.id,
        label: item.title,
      }));
    });
    builder.addCase(fetchPwaInfo.fulfilled, (state, action) => {
      state.appData = action.payload;
    });
    builder
      .addCase(getPwaById.fulfilled, (state, action) => {
        const {
          currentCountry,
          currentLanguage,
          languageList,
          defaultLanguage,
        } = action.payload;

        if (!currentCountry || !currentLanguage) return;

        state.currentCountry = { label: currentCountry, value: 0 };
        state.currentLanguage = { label: defaultLanguage, value: 0 };
        state.languagesList = languageList;
      })
      .addCase(getPwaByIdAndLanguage.fulfilled, (state, action) => {
        const { displayName } = action.payload;

        if (!displayName) return;

        state.pwa_title = displayName;
      });
  },
});

export const {
  setPwaTitle,
  addCollection,
  removeCollection,
  setChanged,
  setLanguage,
  setLanguagesList,
  setCountry,
  setMarketerTag,
  addLanguage,
  removeLanguage,
  updateLanguagesList,
  resetState,
} = pwaDesignSlice.actions;

export default pwaDesignSlice.reducer;
