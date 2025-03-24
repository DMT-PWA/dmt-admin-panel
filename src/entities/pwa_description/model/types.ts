import { checkbox } from "src/shared/types"

export interface IMainDescription {
    title: string;
    developer_name: string,
    checkboxes_state: Array<checkbox>,
    raiting: string | null,
    review_count: string | null,
    number_of_downloads: string | number | null,
    age: number | null,
}

type grade = { id: number, value: number | string, raiting: number }

export interface IRating {
    raiting_second: string | null,
    grades: grade[]
}