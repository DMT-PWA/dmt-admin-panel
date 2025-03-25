import { appData } from "src/shared/lib/data"

export type Language = {
    value: keyof typeof appData,
    label: string
}
export interface ICollection {
    collectionImage: string | null;
    images: (string | null)[];
    collectionName: string | null;
}
