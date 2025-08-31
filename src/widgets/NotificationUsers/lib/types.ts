import { IAppCommon } from "src/shared/types/app.types";
import { User } from "src/shared/types/user.types";

export type RowDefaultType = User;

export type ClonePwaPayload = {
  appId: IAppCommon["appId"];
  newAdminId: IAppCommon["adminId"];
};
