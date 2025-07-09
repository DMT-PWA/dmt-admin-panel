import { AdminId } from "src/shared/types/commonTypes";

export type CollectionResponse = AdminId & {
  screenShots: Array<string | null>;
  icon: string;
} & Record<"createdAt" | "name" | "updatedAt" | "__v" | "_id", string>;
