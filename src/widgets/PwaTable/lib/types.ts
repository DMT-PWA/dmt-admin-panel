import { IAppCommon } from "src/shared/types/app.types";
import { AppDataFull } from "src/shared/types/commonTypes";

export type RowDefaultType = Pick<
  AppDataFull,
  "createdAt" | "_id" | "adminId" | "marketerTag" | "domain"
> & {
  displayId: string;
  displayName: string;
  appStatus: string;
  defaultNaming: string;
  domainApp: string;
  cloudflareId?: string;
};

export type ClonePwaPayload = {
  appId: IAppCommon["appId"];
  newAdminId: IAppCommon["adminId"];
};
