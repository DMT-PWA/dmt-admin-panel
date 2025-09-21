import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { AppDataProps } from "src/shared/types";

export const addLanguageToPwa = createAsyncThunk<AppDataProps, string>(
  "pwa/addLanguageToPwa",
  async (payload) => await apiInstance.patch("pwa/addLanguage", payload)
);
