import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CombinedDescription } from "./types";
import {
  checkbox,
  IAboutGameDescription,
  DescriptionResponse,
} from "src/shared/types";
import {
  fetchDescriptionInfoById,
  createDescriptionById,
  updateDescription,
} from "./descriptionThunk";
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
  review_count: "3.2",
  number_of_downloads: 100000000,
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
    version: 1.5,
    whats_new: null,
  },
};

const handleCheckboxes = (
  state: CombinedDescription,
  action: PayloadAction<checkbox>
) => {
  const { id, value } = action.payload;

  state.checkboxes_state = state.checkboxes_state.map((checkbox) =>
    checkbox.id === id ? { ...checkbox, value: value } : checkbox
  );
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
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDeveloperName: (state, action: PayloadAction<string>) => {
      state.developer_name = action.payload;
    },
    setRaiting: (state, action: PayloadAction<string>) => {
      state.raiting = action.payload;
    },
    setLastUpdate: (state, action: PayloadAction<Date | null>) => {
      state.about_description.last_update = action.payload;
    },
    setReleaseDate: (state, action: PayloadAction<Date | null>) => {
      state.about_description.release_date = action.payload;
    },
    setNumberOfDownloads: (state, action: PayloadAction<string>) => {
      state.number_of_downloads = action.payload;
    },
    setReviewCount: (state, action: PayloadAction<string>) => {
      state.review_count = action.payload;
    },
    setGrade: (state, action) => {
      state.grades[action.payload.index].value = action.payload.value;
    },
    toggleCheckbox: (state, action) => handleCheckboxes(state, action),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDescriptionInfoById.fulfilled, (state, action) => {
      if (!action.payload) return;

      const {
        about,
        rating,
        downloads,
        reviewCount,
        version,
        whatsNew,
        androidVersion,
        lastUpdate,
        releaseDate,
        isContainsAds,
        isEditorsChoice,
        isInAppPurchases,
        name,
      } = action.payload;
      state.title = name;
      state.raiting = rating;
      state.number_of_downloads = downloads;
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
    });

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

export const {
  updateAboutDescription,
  setDeveloperName,
  setTitle,
  setRaiting,
  setLastUpdate,
  setNumberOfDownloads,
  setReviewCount,
  setGrade,
  toggleCheckbox,
  setReleaseDate,
  batchUpdate,
} = pwaDescriptionSlice.actions;

export default pwaDescriptionSlice.reducer;
