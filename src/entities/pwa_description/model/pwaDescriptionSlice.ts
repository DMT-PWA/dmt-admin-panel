import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CombinedDescription } from "./types";
import { IDescriptionAbout } from "src/shared/types";
import { UpdateFieldPayload } from "src/shared/lib/store";

const defaultState: CombinedDescription = {
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
      action: PayloadAction<UpdateFieldPayload<IDescriptionAbout>>
    ) => {
      const { field, value } = action.payload;

      state.about_description[field] = value as never;
    },

    setGrade: (state, action) => {
      if (!state.grades) return;
      state.grades[action.payload.index].value = action.payload.value;
    },

    resetState: () => defaultState,
  },
});

export const { updateAboutDescription, setGrade, batchUpdate, resetState } =
  pwaDescriptionSlice.actions;

export default pwaDescriptionSlice.reducer;
