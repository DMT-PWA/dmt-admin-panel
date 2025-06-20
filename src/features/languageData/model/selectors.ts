import { createSelector } from "@reduxjs/toolkit";

export const selectComments = createSelector(
  (state: RootState) => state.comments,
  (comments) => comments
);

export const selectLanguage = createSelector(
  (state: RootState) => state.pwa_design,
  (language) => language.currentLanguage?.label
);

export const selectCurrentLanguageValue = createSelector(
  (state: RootState) => state.language_data.currentLanguageData,
  (currentLanguageData) => currentLanguageData?.value ?? null
);
