import { AppDataFull } from "src/shared/types/commonTypes";

export type RowDefaultType = Pick<
  AppDataFull,
  "createdAt" | "_id" | "adminId" | "marketerTag" | "domain"
> & {
  displayId: string;
  displayName: string;
  landingStatus: string;
  defaultNaming: string;
};
