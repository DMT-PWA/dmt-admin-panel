import { createAsyncThunk } from "@reduxjs/toolkit";
import { CollectionResponse } from "src/entities/collection";
import { apiInstance } from "src/shared/api/base";
import { ICollection } from "src/shared/types";
import { IAppCommon } from "src/shared/types/app.types";

export const getAllCollections = createAsyncThunk(
  "collections/getAllCollecttions",
  async () => {
    const response: Array<CollectionResponse> = await apiInstance.get(
      "collection"
    );

    return response;
  }
);

export const createCollection = createAsyncThunk<
  Pick<CollectionResponse, "_id" | "icon" | "name" | "screenShots">,
  Omit<ICollection, "_id"> & Pick<IAppCommon, "adminId">
>(
  "collections/createCollection",
  async ({ adminId, collectionImage, collectionName, images }) =>
    await apiInstance.post("collection", {
      adminId,
      name: collectionName,
      icon: collectionImage,
      screenShots: images,
    })
);
