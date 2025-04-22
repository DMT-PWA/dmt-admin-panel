export {
  default as settingsReducer,
  setDomainApp,
  setDomainLanding,
  setMartketerTag,
  updateSettingField,
} from "./model/settingsSlice";

export { updateSettings } from "./model/settingsThunk";

export type { Settings } from "./model/types";
