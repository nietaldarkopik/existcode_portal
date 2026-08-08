import axios, { type AxiosInstance } from "axios";
import type { ApiErrorResponse } from "@existcode/types";

export interface CreateApiClientOptions {
  baseURL: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly errors?: Record<string, string[]> | undefined;

  constructor(status: number, body: ApiErrorResponse) {
    super(body.message);
    this.name = "ApiError";
    this.status = status;
    this.errors = body.errors;
  }
}

export function createApiClient({ baseURL }: CreateApiClientOptions): AxiosInstance {
  const client = axios.create({
    baseURL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
      Accept: "application/json"
    }
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(new ApiError(error.response.status, error.response.data as ApiErrorResponse));
      }
      return Promise.reject(error);
    }
  );

  return client;
}
