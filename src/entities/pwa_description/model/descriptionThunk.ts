import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDescriptionById,
  createDescription,
} from "src/shared/api/description";
import { CombinedDescription } from "./types";
import { RootState } from "src/shared/lib/store";
import { UpdatePwaPayload } from "src/shared/types/createTypes";

export const fetchDescriptionInfoById = createAsyncThunk(
  "description/fetchDescriptionInfoById",
  async (data: unknown) => {
    const response = await getDescriptionById(`description/${data._id}`);

    if (!response) return;

    return response;
  }
);

export const createDescriptionById = createAsyncThunk<
  unknown,
  { adminId: string; language: string },
  {
    state: RootState;
  }
>("description/createDescriptionById", async (payload, { getState }) => {
  const state = getState().pwa_description as CombinedDescription;

  const { title, descriptionId } = state;

  const fullPayload = {
    ...payload,
    name: title,
    about: descriptionId,
  };

  const response = await createDescription("description", fullPayload);

  return response;
});

export const updateDescription = createAsyncThunk<
  unknown,
  Partial<UpdatePwaPayload>,
  { state: RootState }
>("description/updateDescription", async (payload, { getState, dispatch }) => {
  const state = getState().pwa_description as CombinedDescription;

  const { adminId, language, appId, isExist, country } = payload;

  const {
    title,
    about_description,
    number_of_downloads,
    raiting,
    review_count,
    checkboxes_state,
  } = state;

  const { release_date, last_update, android_version, description } =
    about_description;

  const fullPayload = {
    adminId, language, appId, isExist, country,
    name: title,
    lastUpdate: last_update,
    releaseDate: release_date,
    downloads: number_of_downloads,
    androidVersion: android_version,
    about: description,
    raiting,
    reviewCount: review_count,
    isContainsAds: checkboxes_state[0].value,
    isEditorsChoice: checkboxes_state[1].value,
    isInAppPurchases: checkboxes_state[2].value,
  };

  const response = await createDescription("description", fullPayload);

  return response;
});
