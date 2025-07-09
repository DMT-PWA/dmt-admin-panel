import { ICommentsState } from "src/entities/comments";
import { CombinedDescription } from "src/entities/pwa_description";
import { ICollection, Language } from "src/shared/types";

type DataByLanguage = {
  language: Language | null;
  value: {
    descriptionState: CombinedDescription;
    commentState: ICommentsState;
    collectionState: ICollection | null;
  };
};

interface UpdateFieldPayload {
  state: "descriptionState" | "commentState" | "collectionState";
  payload:
    | Partial<CombinedDescription>
    | Partial<ICommentsState>
    | Partial<ICollection>
    | null;
  currentLanguage: string;
}

type StateType = {
  languagesData: DataByLanguage[] | null;
  currentLanguageData: DataByLanguage | null;
};

export type { DataByLanguage, UpdateFieldPayload, StateType };
