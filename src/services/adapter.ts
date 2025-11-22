"use server";
import { API_URL } from "@/constants/enverioments";
import { isBackendError } from "@/constants/type-guard";
import { BackendFetchOptions, BackendFetchResponse } from "@/types/commons";

export async function backendFetch<T>({
  url = "/api",
  body,
  next,
  cache = "no-store",
  method = "GET",
  token = "",
}: BackendFetchOptions): Promise<{
  status: number;
  body: BackendFetchResponse<T>;
}> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Authorization: `Bearer ${token}`,
  };

  const requestOptions: RequestInit = {
    method,
    headers,
    cache,
    next: next || {},
    priority: "high",
    referrerPolicy: "no-referrer",
  };

  if (body && ["POST", "PUT", "PATCH"].includes(method)) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${url}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || "Erro ao buscar dados do backend",
      };
    }

    return {
      status: response.status,
      body: data,
    };
  } catch (error) {
    const message =
      (error as Error)?.message ||
      "Erro desconhecido ao buscar dados do backend";

    if (isBackendError(error)) {
      return {
        status: error.status,
        body: {
          message: error.message,
        } as BackendFetchResponse<T>,
      };
    }

    return {
      status: 500,
      body: {
        message,
      } as BackendFetchResponse<T>,
    };
  }
}
