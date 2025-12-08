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

export type Solicitacao = {
  id: string;
  nome: string;
  data_solicitacao: string;
  status: string;
  solicitante: string;
  unidade: string;
  id_unidade: string;
};

export type ProdutoSolicitacao = {
  id: string;
  qnt_solicitada: number;
  nome: string;
  und_medida: string;
};

export type DetalheSolicitacao = {
  solicitacao: Solicitacao;
  itens: ProdutoSolicitacao[];
};

export type LiberaProduto = {
  id_produto: string;
  disponiveis: ItemEstocadoDetalhe[];
} & ProdutoSolicitacao;

export type ItemEstocadoDetalhe = {
  id_estoque_origem: string;
} & ItemEstocado;
