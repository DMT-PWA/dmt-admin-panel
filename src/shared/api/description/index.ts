import { apiInstance } from "../base";

export const getDescriptionById = (url: string) => {
    return apiInstance.get(`${url}`);
};

export const createDescription = async (url: string, data) => {
    const response = await apiInstance.post(`${url}`, data);

    return response;
}; 