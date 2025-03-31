import { appData } from "src/shared/lib/data"

export type Language = {
    value: number,
    label: string,
}

export type LanguagesList = [Language, Language] | [Language]

export type Country = { value: number, label: string } | null;
export interface ICollection {
    collectionImage: string | null;
    images: (string | null)[];
    collectionName: string | null;
}
