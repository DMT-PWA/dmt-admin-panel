export {
  default as languageDataReducer,
  setLanguageData,
  updateCurrentLanguageData,
  updateLanguageData,
} from "./model/languageDataSlice";

export { selectLanguage, selectCurrentLanguageValue } from "./model/selectors";

export type { DataByLanguage } from "./model/types";
