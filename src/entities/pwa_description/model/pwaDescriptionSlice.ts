import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMainDescription, IRating } from "./types";
import { checkbox, IAboutGameDescription } from "src/shared/types"
type CombinedDescription = IMainDescription & Partial<IRating> & { about_description: IAboutGameDescription };

const defaultState: CombinedDescription = {
    age: null,
    title: "DMT apps",
    developer_name: "Dmt Apps Inc.",
    checkboxes_state: [],
    raiting: "4.7",
    review_count: "3.2",
    number_of_downloads: 100000000,
    grades: [{ id: 1, value: 90, raiting: 5 }, { id: 2, value: 40, raiting: 4 }, { id: 3, value: 6, raiting: 3 }, { id: 4, value: 4, raiting: 2 }, { id: 5, value: 8, raiting: 1 }],
    about_description: {
        description: "Описание приложение добавить Описание приложение добавитьОписание приложение добавитьОписание приложение добавить",
        android_version: "Android 6.0 and up",
        last_update: null,
        release_date: null,
        version: 1.50,
        whats_new: null
    }
}


const pwaDescriptionSlice = createSlice({
    name: "pwaDescription",
    initialState: defaultState,
    reducers: {
        updateAboutDescription: (state, action) => {
            const { key, value } = action.payload

            state.about_description[key as keyof IAboutGameDescription] = value
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setDeveloperName: (state, action: PayloadAction<string>) => {
            state.developer_name = action.payload
        },
        setRaiting: (state, action: PayloadAction<string>) => {
            state.raiting = action.payload
        },
        setLastUpdate: (state, action: PayloadAction<Date | null>) => {
            state.about_description.last_update = action.payload
        },
        setReleaseDate: (state, action: PayloadAction<Date | null>) => {
            state.about_description.release_date = action.payload
        },
        setNumberOfDownloads: (state, action: PayloadAction<string>) => {
            state.number_of_downloads = action.payload
        },
        setReviewCount: (state, action: PayloadAction<string>) => {
            state.review_count = action.payload
        },
        setGrade: (state, action) => {
            state.grades[action.payload.index].value = action.payload.value
        },
        toggleCheckbox: (state, action: PayloadAction<checkbox>) => {
            const { id, value } = action.payload;

            const existingIndex = state.checkboxes_state.findIndex((item) => item.id === id);

            if (existingIndex !== -1) {
                state.checkboxes_state = state.checkboxes_state.filter((el) => el.id !== action.payload.id);
            } else {
                state.checkboxes_state.push({ id, value });
            }
        },
    }
})

export const { updateAboutDescription, setDeveloperName, setTitle, setRaiting, setLastUpdate, setNumberOfDownloads, setReviewCount, setGrade, toggleCheckbox, setReleaseDate } = pwaDescriptionSlice.actions

export default pwaDescriptionSlice.reducer