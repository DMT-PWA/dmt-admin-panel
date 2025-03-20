export interface IMainDescription {
    title: string;
    developer_name: string,
    checkboxes_state: object[],
    raiting: string | null,
    review_count: string | null,
    number_of_downloads: string | number | null,
    age: number | null,
}

export interface IDesrciption {
    description: string,
    release_date: string | number | Date,
    last_update: string | undefined,
}

type grade = { id: number, value: number | string, raiting: number }

export interface IRating {
    raiting_second: string | null,
    grades: grade[]
}