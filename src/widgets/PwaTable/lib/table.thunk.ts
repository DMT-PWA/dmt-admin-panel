import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { RowDefaultType } from "./types";

export const getAllPwa = createAsyncThunk<RowDefaultType[]>(
  "table/getAllPwa",
  async () => {
    return await apiInstance.get("/pwa");
  }
);

export const deletePwa = createAsyncThunk<unknown, string>(
  "table/deletePwa",
  async (id) => await apiInstance.delete(`pwa/${id}`)
);
