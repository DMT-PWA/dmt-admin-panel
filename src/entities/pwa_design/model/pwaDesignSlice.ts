import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDesign } from "./types";
import {
  fetchCountries,
  fetchLanguages,
  fetchPreviewContent,
} from "./pwaDesignThunk";
import { Country } from "src/shared/types/designTypes";
import { getPwaById, getPwaByIdAndLanguage } from "src/shared/api/create";
import { LanguagesListValue } from "src/shared/types";

const initialState: IDesign = {
  languages: [],
  pwa_title: null,
  pwa_tags: "",
  collections: [],
  isChanged: false,
  appData: {} as IDesign["appData"],
  languagesList: null,
  currentCountry: null,
  currentLanguage: null,
  displayId: "",
  countriesList: [],
};

export const pwaDesignSlice = createSlice({
  name: "design",
  initialState,
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

    setChanged: (state, action: PayloadAction<boolean>) => {
      state.isChanged = action.payload;
    },
    setLanguage: (state, action: PayloadAction<LanguagesListValue>) => {
      state.currentLanguage = action.payload;
    },
    updateLanguagesList: (state, action) => {
      state.languagesList = action.payload;
    },
    setCountry: (state, action: PayloadAction<Country>) => {
      state.currentCountry = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLanguages.fulfilled, (state, action) => {
      const { languagesResponse } = action.payload;

      state.languages = languagesResponse;

      const defaultLang = state.languages.find(
        (el) => el.value === "english"
      ) as LanguagesListValue;

      if (!state.currentLanguage) {
        state.currentLanguage = defaultLang;
      }
    });
    builder
      .addCase(getPwaById.fulfilled, (state, action) => {
        const { currentCountry, currentLanguage, defaultLanguage } =
          action.payload;

        const lang = state.languages.find(
          (el) => el.en.toLowerCase() === defaultLanguage.toLowerCase()
        );

        if (!currentCountry || !currentLanguage || !lang) return;

        state.currentCountry = { label: currentCountry, value: currentCountry };
        state.currentLanguage = lang;
      })
      .addCase(getPwaByIdAndLanguage.fulfilled, (state, action) => {
        const { displayName, marketerTag, displayId } = action.payload;

        state.appData = action.payload;

        if (!displayName) return;

        state.pwa_title = displayName;

        if (marketerTag) state.pwa_tags = marketerTag;

        if (displayId) state.displayId = displayId;
      });

    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countriesList = action.payload.map((el) => ({
        label: el.en,
        value: el.value,
      }));
    });

    builder.addCase(fetchPreviewContent.fulfilled, (state, action) => {
      state.appData = action.payload;
    });
  },
});

export const {
  setPwaTitle,
  addCollection,
  setChanged,
  setLanguage,
  setCountry,
  setMarketerTag,
  updateLanguagesList,
  resetState,
} = pwaDesignSlice.actions;

export default pwaDesignSlice.reducer;
