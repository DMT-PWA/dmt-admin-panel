import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDesign } from "./types";
import { fetchDesignInfo, fetchPwaInfo } from "./pwaDesignThunk";
import { languages, modifiedCountryList } from "../lib/const";
import { Language, ICollection, Country } from "src/shared/types/designTypes";

const defaultState: IDesign = {
  languages: languages,
  pwa_title: "",
  pwa_tags: [],
  collections: [],
  isChanged: false,
  appData: {},
  languagesList: null,
  currentCountry: null,
  currentLanguage: null,
  currentCollection: null,
};

export const pwaDesignSlice = createSlice({
  name: "design",
  initialState: defaultState,
  reducers: {
    setPwaTitle(state, action: PayloadAction<string>) {
      state.pwa_title = action.payload;
    },
    setCurrentCollection: (
      state,
      action: PayloadAction<
        ((ICollection & { _id: string }) | ICollection) | null
      >
    ) => {
      state.currentCollection = action.payload;
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
      switch (state.currentCountry.label.toLowerCase()) {
        case "egypt":
          state.languagesList = [
            { label: "Arabic", value: 0 },
          ];

          break;

        case "iraq":
          state.languagesList = [
            { label: "Arabic", value: 0 },
          ];
          break;
        case "saudi arabia":
          state.languagesList = [
            { label: "Arabic", value: 0 },
          ];
          break;
        case "germany":
          state.languagesList = [
            { label: "Dutch", value: 0 },
          ];
          break;
        case "netherlands":
          state.languagesList = [
            { label: "Dutch", value: 0 },
          ];
          break;
        case "hong kong":
          state.languagesList = [
            { label: "Chinese", value: 0 },
          ];
          break;
        case "china":
          state.languagesList = [
            { label: "Chinese", value: 0 },
          ];
          break;
        case "indonesia":
          state.languagesList = [
            { label: "Arabic", value: 0 },
          ];
          break;
        case "malaysia":
          state.languagesList = [
            { label: "Malay", value: 0 },
          ];

          break;
        case "singapore":
          state.languagesList = [
            { label: "Malay", value: 0 },
          ];

          break;
        case "unitedKingdom":
          state.languagesList = [{ label: "English", value: 0 }];
          break;
        case "pakistan":
          state.languagesList = [
            { label: "Urdu", value: 0 },
          ];
          break;
        case "russia":
          state.languagesList = [
            { label: "Russian", value: 0 },
          ];
          break;
        case "senegal":
          state.languagesList = [
            { label: "French", value: 0 },
          ];
          break;
        case "south Korea":
          state.languagesList = [
            { label: "Korean", value: 0 },
          ];
          break;
        case "turkey":
          state.languagesList = [
            { label: "Turkish", value: 0 },
          ];
          break;
        case "lithuania":
          state.languagesList = [
            { label: "Lithuanian", value: 0 },
          ];
          break;
        default:
          break;
      }
    },
    updateLanguagesList: (state, action) => {
      state.languagesList = action.payload
    },
    addLanguage: (state, action: PayloadAction<Language>) => {
      state.languagesList?.push(action.payload)
    },
    removeLanguage: (state) => {
      state.languagesList?.pop()
    },
    setCountry: (state, action: PayloadAction<Country>) => {
      state.currentCountry = action.payload;
    },
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
  setCurrentCollection,
  addLanguage,
  removeLanguage,
  updateLanguagesList
} = pwaDesignSlice.actions;

export default pwaDesignSlice.reducer;
