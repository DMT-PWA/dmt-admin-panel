import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "src/shared/api/base";
import {
  NotificationMessage,
  NotificationSettings,
  NotificationTime,
} from "src/shared/types/notification.types";

export const getAllPwa = createAsyncThunk<NotificationSettings["pwas"]>(
  "table/getAllPwa",
  async () => {
    return await apiInstance.get("/pwa");
  }
);

type CreateNotificationPayload = {
  messages: NotificationMessage[];
  adminId: string;
  appIds: Array<string>;
  title: NotificationSettings["title"];
  defaultLanguage: NotificationSettings["defaultLanguage"];
  category: string;
  schedules: {
    days: NotificationTime["days"];
    isRecurring: NotificationTime["isRecurring"];
    time: string;
  }[];
};

export const createNotification = createAsyncThunk<
  unknown,
  CreateNotificationPayload
>("notification/createNotification", async (payload) => {
  return await apiInstance.post("/notifications", payload);
});
