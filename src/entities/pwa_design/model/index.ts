export {
  default as pwaDesignReducer,
  addCollection,
  setPwaTitle,
  removeCollection,
  setChanged,
  setLanguage,
  setLanguagesList,
  setCountry,
  setCurrentCollection,
  addLanguage,
  removeLanguage,
  updateLanguagesList
} from "./pwaDesignSlice";

export { fetchDesignInfo, fetchPwaInfo } from "./pwaDesignThunk";
