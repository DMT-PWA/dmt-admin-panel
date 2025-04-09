import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDescriptionById,
  createDescription,
} from "src/shared/api/description";
import { CombinedDescription } from "./types";
import { DescriptionResponse, DescriptionPayload } from "src/shared/types";
import { updatePwa } from "src/shared/api/create";
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

  const { title, about_description } = state;

  const fullPayload = {
    ...payload,
    name: title,
    about: about_description.description,
  };

  const response = await createDescription("description", fullPayload);

  return response;
});

export const updateDescription = createAsyncThunk<
  unknown,
  Partial<UpdatePwaPayload>,
  { state: RootState }
>("description/updateDescription", async (payload, { getState }) => {
  const state = getState().pwa_description as CombinedDescription;

  const { descriptionId, about_description } = state;

  const { last_update } = about_description;

  const fullPayload = {
    ...payload,
    descriptionId,
    last_update,
  };

  const response = await updatePwa("pwa", fullPayload);

  return response;
});
