import { BASE_URL } from "../utils/apiPaths";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod,
    body?: Record<string, unknown> | FormData
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const options: RequestInit = {
      method,
      credentials: "include",
    };

    if (body) {
      if (body instanceof FormData) {
        options.body = body;
      } else {
        options.headers = {
          "Content-Type": "application/json",
        };
        options.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, options);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "An error occurred");
    }

    return data.data as T;
  }
  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "GET");
  }

  post<T>(
    endpoint: string,
    body?: Record<string, unknown> | FormData
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", body);
  }

  put<T>(
    endpoint: string,
    body?: Record<string, unknown> | FormData
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", body);
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, "DELETE");
  }
}

// Export a singleton instance
export const api = new ApiClient(BASE_URL);
