import { createSelector } from "@reduxjs/toolkit";

const countryToLanguageMap: Record<string, { label: string; value: number }> = {
  algeria: { label: "Arabic", value: 0 },
  egypt: { label: "Arabic", value: 0 },
  iraq: { label: "Arabic", value: 0 },
  "saudi arabia": { label: "Arabic", value: 0 },
  germany: { label: "Dutch", value: 0 },
  netherlands: { label: "Dutch", value: 0 },
  "hong kong": { label: "Chinese", value: 0 },
  china: { label: "Chinese", value: 0 },
  indonesia: { label: "Arabic", value: 0 },
  malaysia: { label: "Malay", value: 0 },
  singapore: { label: "Malay", value: 0 },
  unitedKingdom: { label: "English", value: 0 },
  pakistan: { label: "Urdu", value: 0 },
  russia: { label: "Russian", value: 0 },
  senegal: { label: "French", value: 0 },
  "south korea": { label: "Korean", value: 0 },
  turkey: { label: "Turkish", value: 0 },
  lithuania: { label: "Lithuanian", value: 0 },
};

export const selectLanguagesList = createSelector(
  (state: RootState) => state.pwa_design.currentCountry,
  (currentCountry) => {
    if (!currentCountry) return;
    const countryKey = currentCountry.label.toLocaleLowerCase();

    return countryToLanguageMap[countryKey]
      ? [countryToLanguageMap[countryKey]]
      : null;
  }
);
