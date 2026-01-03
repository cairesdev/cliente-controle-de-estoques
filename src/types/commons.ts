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
  id_tipo_estoque?: number;
  origem?: { codigo: string; nome: string };
};

export type SampleEstoque = {
  codigo: string;
  data_entrada: string;
  local_estocado: string;
  nome: string;
  qnt_registrada: number | null;
  nome_estoque: string;
  qnt_entrada: number;
  qnt_disponivel: number;
  tipo_estoque: string;
  data_solicitacao: string;
  data_encerramento: string;
  solicitante: string;
};

export type ComprovanteCriacao = {
  itens: ItemEstocado[];
  estoque: {
    data_solicitacao: string;
    qnt_disponivel: number;
    qnt_entrada: number;
    status: string;
    despachante: string;
    solicitante: string;
  } & SampleEstoque;
};

export type Solicitacao = {
  id: string;
  nome: string;
  data_solicitacao: string;
  solicitante: string;
  unidade: string;
  id_unidade: string;
  tipo_solicitacao?: string;
  data_encerramento?: string;
} & IStatusSolicitacao;

export type ProdutoSolicitacao = {
  id: string;
  qnt_solicitada: number;
  nome: string;
  und_medida: string;
  disponiveis: ItemEstocado[];
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
  codigo: string;
} & ItemEstocado;

export interface ResumoRemessa {
  remessa: SampleEstoque;
  itens: ItemEstocado[];
}

export interface IStatusSolicitacao {
  status: "Liberado" | "Enviado" | "Pendente" | "Recebido" | "Cancelado";
}
