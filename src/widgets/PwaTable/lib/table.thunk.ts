import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { ClonePwaPayload, RowDefaultType } from "./types";

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

export const clonePwa = createAsyncThunk<RowDefaultType, ClonePwaPayload>(
  "table/clonePwa",
  async ({ appId, newAdminId }) => {
    return await apiInstance.post(`pwa/clonePwa`, { appId, newAdminId });
  }
);

export const getPwaByDisplayId = createAsyncThunk<RowDefaultType, string>(
  "pwa/getPwaById",
  async (id: string) => await apiInstance.get(`pwa/getPwaByDisplayId/${id}`)
);
