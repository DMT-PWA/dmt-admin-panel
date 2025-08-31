import { createSlice } from "@reduxjs/toolkit";
import {
  Notification,
  NotificationMessage,
  NotificationSettings,
  NotificationTime,
} from "src/shared/types/notification.types";

export const pushNotificationSlice = createSlice({
  name: "pushNotification",
  initialState: {},
});
