import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { NotificationSettings } from "src/shared/types/notification.types";

export const getAllPwa = createAsyncThunk<NotificationSettings["pwas"]>(
  "table/getAllPwa",
  async () => {
    return await apiInstance.get("/pwa");
  }
);
