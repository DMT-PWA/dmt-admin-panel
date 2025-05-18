export { CollectionsList } from "./ui";

export { getAllCollections } from "./model/collectionsThunk";

export {
  default as collectionsReducer,
  setCurrentCollection,
} from "./model/collectionsSlice";
