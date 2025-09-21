import { createSelector } from "@reduxjs/toolkit";
import { countries_list } from "src/shared/lib/translations";
import { SelectValueProp } from "src/shared/types";

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

export const modifiedLanguagesList = createSelector(
  (state: RootState) => {
    return {
      allLanguages: state.pwa_design.languages,
      selectedLanguages: state.pwa_design.languagesList || [],
    };
  },
  (languages): Array<SelectValueProp> => {
    const { allLanguages, selectedLanguages } = languages;
    const selectedValues = new Set(selectedLanguages.map((lang) => lang.value));

    return allLanguages
      .filter((lang) => !selectedValues.has(lang.value))
      .map((lang) => ({
        value: lang.value,
        label: lang.en,
      }));
  }
);
