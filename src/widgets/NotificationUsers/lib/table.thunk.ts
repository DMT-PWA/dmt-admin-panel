import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { ClonePwaPayload, RowDefaultType } from "./types";

export const getAllUsers = createAsyncThunk<RowDefaultType[]>(
  "table/getAllUsers",
  async () => {
    return await apiInstance.get("/user/getAllUsers");
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
