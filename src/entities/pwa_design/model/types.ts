import { Language, Country, LanguagesList } from "src/shared/types/designTypes";
import { ICollection } from "src/shared/types";

export interface IDesign {
  pwa_title: string | null;
  languages: object[];
  pwa_tags: object[];
  collections: ICollection[] | { collectionId: string & ICollection[] };
  isChanged: boolean;
  appData: object;
  languagesList: LanguagesList;
  currentCountry: Country;
  currentLanguage: Language | null;
  currentCollection: (ICollection & { _id: string }) | null;
}
