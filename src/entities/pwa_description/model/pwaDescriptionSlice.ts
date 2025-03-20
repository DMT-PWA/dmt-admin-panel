import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMainDescription, IDesrciption, IRating } from "./types";
import { format } from "date-fns";

type CombinedDescription = IMainDescription & IDesrciption & Partial<IRating>;

const defaultState: CombinedDescription = {
    age: null,
    title: "DMT apps",
    developer_name: "Dmt Apps Inc.",
    checkboxes_state: [],
    raiting: "4.7",
    review_count: "3.2",
    number_of_downloads: 100000000,
    description: "Описание приложение добавить Описание приложение добавитьОписание приложение добавитьОписание приложение добавить",
    last_update: "",
    release_date: "",
    grades: [{ id: 1, value: 90, raiting: 5 }, { id: 2, value: 40, raiting: 4 }, { id: 3, value: 6, raiting: 3 }, { id: 4, value: 4, raiting: 2 }, { id: 5, value: 8, raiting: 1 }]
}


const pwaDescriptionSlice = createSlice({
    name: "pwaDescription",
    initialState: defaultState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setDeveloperName: (state, action: PayloadAction<string>) => {
            state.developer_name = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setRaiting: (state, action: PayloadAction<string>) => {
            state.raiting = action.payload
        },
        setLastUpdate: (state, action: PayloadAction<string>) => {
            state.last_update = action.payload
        },
        setNumberOfDownloads: (state, action: PayloadAction<string>) => {
            state.number_of_downloads = action.payload
        },
        setReviewCount: (state, action: PayloadAction<string>) => {
            state.review_count = action.payload
        },
        setGrade: (state, action) => {
            state.grades[action.payload.index].value = action.payload.value
        }
    }
})

export const { setDeveloperName, setTitle, setDescription, setRaiting, setLastUpdate, setNumberOfDownloads, setReviewCount, setGrade } = pwaDescriptionSlice.actions

export default pwaDescriptionSlice.reducer