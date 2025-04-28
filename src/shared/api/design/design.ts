import { apiInstance } from "../base";

export interface IDesign {
  title: string;
  id: number;
}

export interface IPwaInfo {
  apiId: string;
  language: string;
  country: string;
}

export const getDesignInfo = (url: string): Promise<IDesign[]> => {
  return apiInstance.get(`${url}`);
};

export const getPwaInfo = (appId: string, language: string, country: string): Promise<IPwaInfo[]> => {
  return apiInstance.get(`pwa/${appId}/${language}/${country}`)
}