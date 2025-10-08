import { createSelector } from "@reduxjs/toolkit";
import { SelectValueProp } from "src/shared/types";

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
