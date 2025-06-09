import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../base";
import { UpdatePwaPayload } from "../../types/createTypes";
import { AppDataProps } from "src/shared/types/commonTypes";

export const updatePwa = async (url: string, data) => {
  return await apiInstance.patch(url, data);
};

export const getPwa = async (url: string) => {
  return await apiInstance.get(url);
};

export const getPwaById = createAsyncThunk<UpdatePwaPayload, string>(
  "create/getPwaById",
  async (id) => {
    return await apiInstance.get(`pwa/${id}`);
  }
);

export const getPwaByIdAndLanguage = createAsyncThunk<
  AppDataProps,
  Partial<UpdatePwaPayload>
>("create/getPwaByIdAndLanguage", async (payload) => {
  const response = await apiInstance.get<AppDataProps>(
    `pwa/${payload.appId}/${payload.language}/${payload.country}`
  );

  return response;
});
