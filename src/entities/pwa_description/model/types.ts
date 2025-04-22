import { checkbox, IAboutGameDescription } from "src/shared/types";

export interface IMainDescription {
  title: string | null;
  developer_name: string;
  checkboxes_state: Array<checkbox>;
  raiting: string | null;
  review_count: string | null;
  number_of_downloads: string | number | null;
  age: number | null;
}

type grade = { id: number; value: number | string; raiting: number };

export interface IRating {
  raiting_second: string | null;
  grades: grade[];
}

export type CombinedDescription = IMainDescription &
  Partial<IRating> & { about_description: IAboutGameDescription } & {
    descriptionId: string | number | null;
  };

export type DescriptionByIdResponse = {
  about: string;
  rating: number | string;
  downloads: string;
  reviewCount: string;
  version: string;
  whats_new: string;
  androidVersion: string;
  lastUpdate: Date;
  releaseDate: Date;
  isContainsAds: boolean;
  isEditorsChoice: boolean;
  isInAppPurchases: boolean;
  name: string;
};
