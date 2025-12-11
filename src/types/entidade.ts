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
