import { createAsyncThunk } from "@reduxjs/toolkit";

import { updatePwa, getPwa } from "src/shared/api/create"

import { CreateInitPayload, UpdatePwaPayload, UpdatePwaResponse } from "./types"
import { RootState } from "src/shared/lib/store";

export const updatePwaByLang = createAsyncThunk<UpdatePwaResponse, Partial<UpdatePwaPayload>>("create/updatePwaByLang", async (payload) => {
    const response = await updatePwa("pwa", payload);


    return response;
})

export const getPwaById = createAsyncThunk("create/getPwaById", async (id: string) => {

    const response = await getPwa(`pwa/${id}`);


    return response
})

export const createPWA = createAsyncThunk<any, CreateInitPayload>("create/createPWA", async (payload, { getState }) => {
    const { comments, metrics, pwa_description, pwa_design, settings } = getState() as RootState

    const { pwa_title, currentCollection } = pwa_design;

    const { descriptionId } = pwa_description;

    const { comment } = comments;

    const { facebookPixelList } = metrics;



    const fullPayload = {
        ...payload,
        isExist: true,
        appTitle: pwa_title,
        collectionId: currentCollection?._id,
        about: descriptionId,
        commentId: comment.commentId

    }

    const response = await updatePwa("pwa", fullPayload)

    return response
})