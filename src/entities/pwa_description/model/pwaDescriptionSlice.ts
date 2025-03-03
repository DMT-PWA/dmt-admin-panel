import { createSlice } from "@reduxjs/toolkit";
import { IMainDescription, IDesrciption } from "./types";

type CombinedDescription = IMainDescription & IDesrciption;

const defaultState: CombinedDescription = {
    age: null,
    title: "",
    developer_name: "",
    checkboxes_state: [],
    raiting: null,
    review_count: null,
    number_of_downloads: null,
    description: ""
}


const pwaDescriptionSlice = createSlice({
    name: "pwaDescription",
    initialState: defaultState,
    reducers: {

    }
})

export default pwaDescriptionSlice.reducer