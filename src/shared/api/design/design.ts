import { apiInstance } from "../base";

export interface IDesign {
  title: string;
  id: number;
}

export const getDesignInfo = (url: string): Promise<IDesign[]> => {
  return apiInstance.get(`${url}`);
};
