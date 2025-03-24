export type FacebookPixelField = { id: number, pixel: string | number | null, token: string | number | null }

export interface IMetrics {
    facebookPixelList: Array<FacebookPixelField>
}