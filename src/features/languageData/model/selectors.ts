import { createSelector } from "@reduxjs/toolkit";

export const selectComments = createSelector(
  (state: RootState) => state.comments,
  (comments) => comments
);

export const selectLanguage = createSelector(
  (state: RootState) => state.pwa_design,
  (language) => language.currentLanguage?.value
);

export const selectCurrentLanguageValue = createSelector(
  (state: RootState) => ({
    lang: state.pwa_design.currentLanguage,
    fullData: state.language_data.languagesData,
  }),
  (data) => {
    const { fullData, lang } = data;

    if (fullData) {
      return fullData.filter((el) => el.language?.value === lang?.value)[0]
        .value;
    }
  }
);
