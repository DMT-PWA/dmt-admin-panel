import { Country, LanguagesList } from "src/shared/types/designTypes";
import {
  AppDataProps,
  ICollection,
  LanguagesListValue,
  SelectValueProp,
} from "src/shared/types";

export interface IDesign {
  pwa_title: string | null;
  languages: Array<LanguagesListValue>;
  pwa_tags: string;
  collections: ICollection[];
  isChanged: boolean;
  appData: AppDataProps;
  languagesList: LanguagesList;
  currentCountry: Country | undefined;
  currentLanguage: LanguagesListValue | null;
  displayId: string;
  countriesList: Array<SelectValueProp>;
}
