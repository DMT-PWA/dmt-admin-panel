import { createAsyncThunk } from "@reduxjs/toolkit";
import { CollectionResponse } from "src/entities/collection"
import { apiInstance } from "src/shared/api/base"

export const getAllCollections = createAsyncThunk('collections/getAllCollecttions', async () => {
    const response = await apiInstance.get('collection');


    return response as Array<CollectionResponse>
})