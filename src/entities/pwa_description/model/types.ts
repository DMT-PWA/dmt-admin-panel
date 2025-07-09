import { IDescriptionAbout, IDescriptionMain } from "src/shared/types";

type grade = { id: number; value: number | string; raiting: number };

export interface IRating {
  raiting_second: string | null;
  grades: grade[];
}

export type CombinedDescription = IDescriptionMain &
  Partial<IRating> & { about_description: IDescriptionAbout };
