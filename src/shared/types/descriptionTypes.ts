export type checkbox = { id: number, value: boolean }


export interface IAboutGameDescription {
    version: number | string | null;
    description: string,
    release_date: Date | null,
    last_update: Date | null,
    android_version: string | null;
    whats_new: string | null;
}