import { apiInstance } from "../base";

export interface IDesign {
  title: string;
  id: number;
}

export interface IKek {
  apiId: string;
  language: string;
  country: string;
}

export const getDesignInfo = (url: string): Promise<IDesign[]> => {
  return apiInstance.get(`${url}`);
};

export const getKek = (appId: string, language: string, country: string): Promise<IKek[]> => {
  return apiInstance.get(`pwa/${appId}/${language}/${country}`)
}