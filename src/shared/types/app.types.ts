import { LanguagesList } from "./designTypes";

type AppTypesFields =
  | "appId"
  | "adminId"
  | "language"
  | "country"
  | "defaultCountry"
  | "defaultLanguage"
  | "currentCountry"
  | "currentLanguage";

export interface IAppCommon extends Record<AppTypesFields, string> {
  languageList: LanguagesList;
}
