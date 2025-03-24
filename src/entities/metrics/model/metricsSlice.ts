import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMetrics, FacebookPixelField } from "src/shared/types"

const initialState: IMetrics = {
    facebookPixelList: [{ id: 0, pixel: null, token: null }]
}

const metricsSlice = createSlice({
    name: "metrics",
    initialState,
    reducers: {
        addFacebookPixelField: (state, action: PayloadAction<FacebookPixelField>) => {
            state.facebookPixelList.push(action.payload)
        },

        removeFacebookPixelField: (state, action: PayloadAction<number>) => {
            state.facebookPixelList = state.facebookPixelList.filter((item, index) => index !== action.payload)
        },

        setPixelValue: (state, action: PayloadAction<{ id: number, value: string | number }>) => {
            state.facebookPixelList[action.payload.id].pixel = action.payload.value;
        },

        setTokenValue: (state, action: PayloadAction<{ id: number, value: string | number }>) => {
            state.facebookPixelList[action.payload.id].token = action.payload.value;
        }
    }
})


export const { addFacebookPixelField, removeFacebookPixelField, setPixelValue, setTokenValue } = metricsSlice.actions;

export default metricsSlice.reducer