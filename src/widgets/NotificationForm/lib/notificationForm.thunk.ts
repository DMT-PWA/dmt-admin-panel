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
  isActive: NotificationSettings["isActive"];
  category: string;
  schedules: {
    days: NotificationTime["days"];
    isRecurring: NotificationTime["isRecurring"];
    time: string;
  }[];
};

type UpdateNotificationResponse = {
  messages: NotificationMessage[];
  adminId: string;
  appIds: NotificationSettings["pwas"];
  title: NotificationSettings["title"];
  defaultLanguage: NotificationSettings["defaultLanguage"];
  isActive: NotificationSettings["isActive"];
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

export const updateNotification = createAsyncThunk<
  unknown,
  { payload: CreateNotificationPayload; id: string }
>(
  "notification/updateNotification",
  async ({ id, payload }) =>
    await apiInstance.patch(`/notifications/${id}`, payload)
);

export const getNotificationsById = createAsyncThunk<
  UpdateNotificationResponse,
  string
>(
  "notification/getNotificationsById",
  async (id: string) => await apiInstance.get(`/notifications/${id}`)
);
