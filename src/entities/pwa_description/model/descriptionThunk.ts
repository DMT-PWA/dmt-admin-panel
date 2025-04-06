import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDescriptionById, createDescription } from "src/shared/api/description";
import { CombinedDescription } from "./types"
import { DescriptionResponse, DescriptionPayload } from "src/shared/types";
import { updatePwa } from "src/shared/api/create";

export const fetchDescriptionInfoById = createAsyncThunk("description/fetchDescriptionInfoById", async (data) => {

    const response = await getDescriptionById(`description/${data._id}`)

    if (!response) return;

    return response
})

export const createDescriptionById = createAsyncThunk<Promise<any>, { adminId: string, language: string }>("description/createDescriptionById", async (payload, { getState }) => {


    const state = getState().pwa_description as CombinedDescription;

    const { title, about_description, } = state;



    const fullPayload = {
        ...payload,
        name: title,
        about: about_description.description,
    }



    const response = await createDescription("description", fullPayload);

    return response
})

export const updateDescription = createAsyncThunk("description/updateDescription", async (payload, { getState }) => {

    const state = getState().pwa_description as CombinedDescription;

    const { descriptionId } = state;


    const fullPayload = {
        ...payload,
        descriptionId,
    }

    const response = await updatePwa('pwa', fullPayload);

    return response
})