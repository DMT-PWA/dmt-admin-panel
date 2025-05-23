import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CombinedDescription } from "./types";
import { IAboutGameDescription, DescriptionResponse } from "src/shared/types";
import { createDescriptionById, updateDescription } from "./descriptionThunk";
import { UpdateFieldPayload } from "src/shared/lib/store";

const defaultState: CombinedDescription = {
  descriptionId: null,
  age: null,
  title: null,
  developer_name: "",
  checkboxes_state: [
    { id: 0, value: false },
    { id: 1, value: false },
    { id: 2, value: false },
  ],
  raiting: null,
  review_count: "",
  number_of_downloads: "",
  grades: [
    { id: 1, value: 90, raiting: 5 },
    { id: 2, value: 40, raiting: 4 },
    { id: 3, value: 6, raiting: 3 },
    { id: 4, value: 4, raiting: 2 },
    { id: 5, value: 8, raiting: 1 },
  ],
  about_description: {
    description: "",
    android_version: "Android 6.0 and up",
    last_update: null,
    release_date: null,
    version: "",
    whats_new: null,
  },
};

const handleUpdate = (
  state: CombinedDescription,
  action: PayloadAction<Partial<CombinedDescription>>
) => {
  return { ...state, ...action.payload };
};

const pwaDescriptionSlice = createSlice({
  name: "pwaDescription",
  initialState: defaultState,
  reducers: {
    batchUpdate: (state, action) => handleUpdate(state, action),
    updateAboutDescription: (
      state,
      action: PayloadAction<UpdateFieldPayload<IAboutGameDescription>>
    ) => {
      const { field, value } = action.payload;

      state.about_description[field] = value as never;
    },

    setGrade: (state, action) => {
      state.grades[action.payload.index].value = action.payload.value;
    },

    resetState: () => defaultState,
  },
  extraReducers: (builder) => {
    /*  builder.addCase(getPwaByIdAndLanguage.fulfilled, (state, action) => {
      if (!action.payload) return;

      const {
        about,
        rating,
        downloadsCount,
        reviewCount,
        version,
        whatsNew,
        androidVersion,
        lastUpdate,
        releaseDate,
        isContainsAds,
        isEditorsChoice,
        isInAppPurchases,
        appTitle,
        appSubTitle,
      } = action.payload;

      state.title = appTitle;
      state.developer_name = appSubTitle;
      state.raiting = rating;
      state.number_of_downloads = downloadsCount;
      state.review_count = reviewCount;
      state.about_description = {
        description: about,
        last_update: lastUpdate,
        release_date: releaseDate,
        android_version: androidVersion,
        version,
        whats_new: whatsNew,
      };

      state.checkboxes_state[0].value = isContainsAds;
      state.checkboxes_state[1].value = isInAppPurchases;
      state.checkboxes_state[2].value = isEditorsChoice;
    }); */

    builder.addCase(
      createDescriptionById.pending,
      (state, action: PayloadAction<DescriptionResponse>) => {
        state.descriptionId = action.payload._id;
      }
    );

    builder.addCase(updateDescription.fulfilled, (state, action) => {
      state.descriptionId = action.payload._id;
    });
  },
});

export const { updateAboutDescription, setGrade, batchUpdate, resetState } =
  pwaDescriptionSlice.actions;

export default pwaDescriptionSlice.reducer;
