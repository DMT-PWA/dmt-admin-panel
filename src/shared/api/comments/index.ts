import { apiInstance } from "../base";

export const getComments = () => {
  return apiInstance.get("comment");
};

export const removeComment = (url: string) => {
  return apiInstance.delete(url);
};
