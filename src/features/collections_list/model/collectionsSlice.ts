import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCollections } from "./collectionsThunk";
import { Collections } from "./types";
import { ICollection, CollectionResponse } from "src/entities/collection";
import { getPwaByIdAndLanguage } from "src/shared/api/create";

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
      action: PayloadAction<ICollection | ICollection["_id"] | null>
    ) => {
      const currentCollection = state.collectionsList.find(
        (item) => item._id === action.payload
      );

      if (currentCollection) {
        state.currentCollection = currentCollection;

        return;
      }

      if (action.payload === null) {
        state.currentCollection = null;
        return;
      }

      state.currentCollection = action.payload as ICollection;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.fulfilled, (state, action) => {
        action.payload.forEach((collection) => {
          state.collectionsList.push({
            _id: collection._id,
            collectionImage: collection.icon,
            images: collection.screenShots,
            collectionName: collection.name,
          });
        });
      })
      .addCase(getPwaByIdAndLanguage.fulfilled, (state, action) => {
        const { _id, icon, screenShots, name } = action.payload.collectionId;

        state.currentCollection = {
          _id,
          collectionImage: icon,
          images: screenShots,
          collectionName: name,
        };
      });
  },
});

export const { setCurrentCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
