import { createSelector } from "@reduxjs/toolkit";

const selectBase = createSelector((state: RootState) => state, (state) => state.pwa_design);

export const selectPwaDesignLanguages = createSelector(selectBase, (state) => state.languages);
