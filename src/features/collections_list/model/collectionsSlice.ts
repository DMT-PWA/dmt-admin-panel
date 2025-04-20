import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCollections } from "./collectionsThunk";
import { Collections } from "./types";
import { ICollection, CollectionResponse } from "src/entities/collection";

type InitialStateType = {
  collectionsList: Collections;
  currentCollection: ICollection | null;
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    collectionsList: [],
    currentCollection: null,
  } as InitialStateType,
  reducers: {
    setCurrentCollection: (
      state,
      action: PayloadAction<ICollection["_id"]>
    ) => {
      const currentCollection = state.collectionsList.find(
        (item) => item._id === action.payload
      );

      if (currentCollection) {
        state.currentCollection = currentCollection;
      }
    },
    getCollection: (state, action: PayloadAction<CollectionResponse>) => {
      state.currentCollection = {
        _id: action.payload._id,
        collectionImage: action.payload.icon,
        collectionName: action.payload.name,
        images: action.payload.screenShots,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCollections.fulfilled, (state, action) => {
      action.payload.forEach((collection) => {
        state.collectionsList.push({
          _id: collection._id,
          collectionImage: collection.icon,
          images: collection.screenShots,
          collectionName: collection.name,
        });
      });
    });
  },
});

export const { setCurrentCollection, getCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
