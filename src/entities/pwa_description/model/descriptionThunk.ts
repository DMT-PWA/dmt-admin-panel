import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDescriptionById,
  createDescription,
} from "src/shared/api/description";
import { CombinedDescription, DescriptionByIdResponse } from "./types";
import { UpdatePwaPayload } from "src/shared/types/createTypes";
import { updatePwa } from "src/shared/api/create";

export const fetchDescriptionInfoById = createAsyncThunk(
  "description/fetchDescriptionInfoById",
  async (id: string) => {
    const response = await getDescriptionById(`description/${id}`);

    if (!response) return;

    return response as DescriptionByIdResponse;
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
  UpdatePwaPayload,
  Partial<UpdatePwaPayload>
>("description/updateDescription", async (payload) => {
  const {
    adminId,
    language,
    appId,
    isExist,
    country,
    title,
    about_description,
    number_of_downloads,
    raiting,
    review_count,
    checkboxes_state,
  } = payload;

  const {
    release_date,
    last_update,
    android_version,
    description,
    version,
    whats_new,
  } = about_description;

  const fullPayload = {
    adminId,
    language,
    appId,
    isExist,
    country,
    appTitle: title,
    lastUpdate: last_update,
    releaseDate: release_date,
    downloadsCount: number_of_downloads,
    androidVersion: android_version,
    about: description,
    rating: raiting,
    reviewCount: review_count,
    isContainsAds: checkboxes_state[0].value,
    isEditorsChoice: checkboxes_state[1].value,
    isInAppPurchases: checkboxes_state[2].value,
    version: version,
    whatsNew: whats_new,
  };

  const response = await updatePwa("pwa", fullPayload);

  return response as UpdatePwaPayload;
});
