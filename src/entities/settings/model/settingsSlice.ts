import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Settings } from "./types"
import { SelectValueProp } from "src/shared/types"

const initialState: Settings = {
    domainApp: null,
    domainLanding: null,
    marketerTag: null
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setDomainApp: (state, action: PayloadAction<SelectValueProp>) => {
            state.domainApp = action.payload
        },

        setDomainLanding: (state, action: PayloadAction<SelectValueProp>) => {
            state.domainLanding = action.payload
        },

        setMartketerTag: (state, action: PayloadAction<SelectValueProp>) => {
            state.marketerTag = action.payload
        }
    }
})

export const { setDomainApp, setDomainLanding, setMartketerTag } = settingsSlice.actions

export default settingsSlice.reducer