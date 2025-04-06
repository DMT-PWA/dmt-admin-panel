import { createAsyncThunk } from "@reduxjs/toolkit";

import { updatePwa } from "src/shared/api/create"

import { UpdatePwaPayload, UpdatePwaResponse } from "./types"

export const updatePwaByLang = createAsyncThunk<UpdatePwaResponse, UpdatePwaPayload>("create/updatePwaByLang", async (payload) => {
    const response = await updatePwa("pwa", payload);


    return response;
})