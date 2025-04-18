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

export const finishCreatePWA = createAsyncThunk<any, CreateInitPayload>("create/createPWA", async (payload, { getState }) => {
    const { comments, metrics, pwa_description, pwa_design, settings } = getState() as RootState

    const { pwa_title, currentCollection } = pwa_design;

    const { descriptionId, title, developer_name } = pwa_description;

    const { selected_comment } = comments;

    const { facebookPixelList } = metrics;


    const fullPayload = {
        ...payload,
        isExist: true,
        appTitle: title,
        appSubTitle: developer_name,
        displayName: pwa_title,
        collectionId: currentCollection?._id,
        about: descriptionId,
        commentId: selected_comment,
        domain: "",
        subDomain: "",
        pixelId: facebookPixelList[0].pixel,
        accessToken: facebookPixelList[0].token,
        domainApp: "",
        domainLanding: "",
        keitaroDomain: "",
        keitaroCampaign: "",
        marketerTag: "",
        oneSignalApiKey: "",
        oneSignalAppId: "",
        casino: "",
        headerReviews: "",
        hundredPlus: "",
        aboutThisGame: "",
        updatedDate: "",
    }

    console.log({ NAME: fullPayload });


    const response = await updatePwa("pwa", fullPayload)

    return response
})

export const getPwaByIdAndLanguage = createAsyncThunk("create/getPwaByIdAndLanguage", async (payload: Partial<CreateInitPayload>) => {
    const response = await getPwa(`pwa/${payload.appId}/${payload.language}/${payload.country}`);

    return response
})