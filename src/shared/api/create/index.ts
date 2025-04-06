import { apiInstance } from "../base";


export const updatePwa = async (url: string, data) => {
    return await apiInstance.patch(url, data)
}