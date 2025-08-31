import { IAppCommon } from "src/shared/types/app.types";
import { Notification } from "src/shared/types/notification.types";

export type RowDefaultType = Notification;

export type ClonePwaPayload = {
  appId: IAppCommon["appId"];
  newAdminId: IAppCommon["adminId"];
};
