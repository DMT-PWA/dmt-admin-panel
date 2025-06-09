import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const API_URL = import.meta.env.VITE_BACKEND_URL;

class ApiInstance {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(endpoint, options);
    return response.data;
  }

  async post<T, D>(
    endpoint: string,
    data: D,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(
      endpoint,
      data,
      options
    );

    return response.data;
  }

  async delete(endpoint: string) {
    const response = await this.axios.delete(endpoint);

    return response.data;
  }

  async patch(endpoint: string, options) {
    const response = await this.axios.patch(endpoint, options);

    return response.data;
  }
}

export const apiInstance = new ApiInstance();
