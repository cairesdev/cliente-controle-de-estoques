export interface BackendFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  body?: Record<string, unknown>;
  cache?: RequestCache;
  token?: string;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export type BackendFetchResponse<T> = {
  message?: string;
  res?: T;
};

export type ItemEstocado = {
  id: string;
  nome: string;
  data_validade: string;
  qnt_entrada: number;
  qnt_disponivel: number;
  und_medida: string;
  data_entrada: string;
};
