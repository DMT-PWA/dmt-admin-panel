export {
  default as languageDataReducer,
  setLanguageData,
  updateLanguageData,
} from "./model/languageDataSlice";

export { selectLanguage, selectCurrentLanguageValue } from "./model/selectors";

export type { DataByLanguage } from "./model/types";
