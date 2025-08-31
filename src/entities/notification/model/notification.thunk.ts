import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import { Notification } from "src/shared/types/notification.types";

export const getAllNotifications = createAsyncThunk<Notification[]>(
  "notification/getAllNotifications",
  async () => {
    return await apiInstance.get("/notifications");
  }
);
