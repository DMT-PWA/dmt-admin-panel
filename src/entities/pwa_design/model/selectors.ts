import { createSelector } from "@reduxjs/toolkit";
import { countryToLanguageMap } from "../lib/const";
import { countries_list } from "src/shared/lib/translations";

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
    return countries_list.map((item) => {
      const formattedLabel = item
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      return {
        value: item,
        label: formattedLabel,
      };
    });
  }
);
