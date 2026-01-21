export type ItemBasic = {
  id: string;
  nome: string;
  status: number;
};

export type ItemUnidade = {
  id_tipo_unidade: number;
} & ItemBasic;

export type EntidadeDetalhe = {
  nome: string;
  status: number;
  endereco: string;
  bairro: string;
  cidade: string;
  email: string;
  telefone: string;
};

export type Modulos = { escolar: number; saude: number; combustivel: number };

export type UnidadeDetalhe = {
  nome: string;
  status: number;
  endereco: string;
  bairro: string;
  email: string;
  telefone: string;
  id_tipo_unidade: number;
};

export type Veiculo = {
  id: string;
  nome: string;
  marca: string;
  modelo: string;
  placa: string;
  status: string;
  cor: string;
};

export type Viagem = {
  id: string;
  unidade: string;
  placa: string;
  saida: string;
  chegada: string | null;
  motivo: string;
  motorista: string;
  responsavel: string;
  km_inicial: number;
  km_final: string | null;
};

export type Produto = {
  id: string;
  nome: string;
  und_medida: string;
  qnt_disponivel?: number;
};

export type Estoque = {
  id: string;
  codigo: string;
  nome_remessa: string;
  data_entrada: string;
  local_estocado: string;
  tipo_estoque: string;
  qnt_disponivel: number;
};

export type Usuario = {
  nome: string;
  descricao: string;
  nivel: number;
  login: string;
  id: string;
};
