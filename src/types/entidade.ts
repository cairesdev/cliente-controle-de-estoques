export type ItemBasic = {
  id: string;
  nome: string;
  status: number;
};

export type EntidadeDetalhe = {
  nome: string;
  status: number;
  endereco: string;
  bairro: string;
  cidade: string;
  email: string;
  telefone: string;
};

export type Produto = {
  id: string;
  nome: string;
  und_medida: string;
};

export type Estoque = {
  id: string;
  codigo: string;
  nome_remessa: string;
  data_entrada: string;
  local_estocado: string;
  tipo_estoque: string;
};
