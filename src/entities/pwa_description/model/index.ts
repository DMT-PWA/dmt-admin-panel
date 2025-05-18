export { default as pwaDescriptionReducer } from "./pwaDescriptionSlice";

export * from "./pwaDescriptionSlice";
export type { CombinedDescription } from "./types";
export {
  fetchDescriptionInfoById,
  createDescriptionById,
  updateDescription,
} from "./descriptionThunk";
