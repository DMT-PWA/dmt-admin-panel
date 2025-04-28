import { AdminId, Icon } from "src/shared/types/commonTypes";

export type CollectionResponse = AdminId &
  Icon & { screenShots: Array<Icon> } & Record<
    "createdAt" | "name" | "updatedAt" | "__v" | "_id",
    string
  >;

export interface ICollection {
  _id: string;
  collectionImage: string | null;
  images: (string | null)[];
  collectionName: string | null;
}
