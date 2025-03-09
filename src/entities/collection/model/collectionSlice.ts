import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICollection } from "./types"

const initialState: ICollection = {
    collectionImage: null,
    images: [null, null, null, null],
};


export const collectionSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        setCollectionImage: (state, action: PayloadAction<string | null>) => {
            state.collectionImage = action.payload;
        },
        removeCollectionImage: (state) => {
            state.collectionImage = null;
        },
        setImage: (state, action: PayloadAction<{ index: number; image: string | null }>) => {
            state.images[action.payload.index] = action.payload.image;
        },
        removeImage: (state, action: PayloadAction<number>) => {
            state.images[action.payload] = null;
        },
    },
});

export const { setCollectionImage, removeCollectionImage, setImage, removeImage } = collectionSlice.actions;
export default collectionSlice.reducer;