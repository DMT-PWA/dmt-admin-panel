import { createSelector } from "@reduxjs/toolkit";

export const selectBase = createSelector(
  (state: RootState) => state,
  (state) => state.pwa_description
);

/* export const descriptionStates = createSelector(
    selectBase,
) */
