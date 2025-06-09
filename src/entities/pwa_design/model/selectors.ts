import { createSelector } from "@reduxjs/toolkit";
import { countryList, countryToLanguageMap } from "../lib/const";

export const selectLanguagesList = createSelector(
  (state: RootState) => state.pwa_design.currentCountry,
  (currentCountry) => {
    if (!currentCountry) return;
    const countryKey = currentCountry.label.toLocaleLowerCase();

    return countryToLanguageMap[countryKey];
  }
);

export const modifiedCountryList = createSelector(
  (state: RootState) => state,
  (): Array<{ value: string; label: string }> => {
    return countryList.map((item) => ({
      value: item,
      label: item,
    }));
  }
);
