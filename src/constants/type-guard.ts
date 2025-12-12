import { API_URL } from "./enverioments";

export const isBackendError = (
  error: unknown
): error is { error: boolean; message: string; status: number } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error &&
    typeof (error as any).message === "string" &&
    typeof (error as any).status === "number"
  );
};

export enum NIVEIS_USUARIO {
  VISITANTE,
  RESPONSAVEL,
  ALMOXARIFADO,
  GERENCIA,
  DEVELOPER = 10,
}

export const TipoUsuario = [
  { nome: "Gerente de aplicação", id: NIVEIS_USUARIO.GERENCIA },
  { nome: "Almoxarifado da entidade", id: NIVEIS_USUARIO.ALMOXARIFADO },
  { nome: "Representante de unidade", id: NIVEIS_USUARIO.RESPONSAVEL },
];

export const API_ROUTES = {
  lista_unidades: "v1/unidades/",
  lista_entidades: "v1/entidades",
  cadastro_entidade: "v1/entidade",
  cadastro_modulo: "v1/modulos",
  entidade: "v1/entidade/",
  lista_itens_entidade: "v1/armazem/estoque/",
  solicitacoes: "v1/solicitacoes/",
  solicitacao: "v1/solicitacao/",
  comprovante: "v1/armazem/estoque/comprovante/",
  armazem_estoque: "v1/armazem/estoque/",
  xlsx: API_URL + "v1/armazem/xlsx/",
  resumo_estoque: "v1/armazem/estoque/resumo/",
  delete_item: "v1/armazem/estoque/item/",
  lista_produtos: "v1/armazem/estoque/produtos",
  lista_estoque: "v1/armazem/estoque/remessa/",
  cadastro_produto_individual: "v1/armazem/individual/",
  cadastro_unidade: "v1/unidade/",
  entidade_estoque: "v1/entidade/estoque/disponivel/",
  cadastro_solicitacao: "v1/solicitacao/",
  cadastro_representante: "v1/usuario/perfil",
};

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACEPTABLE: 406,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export enum CATEGORIA_ITEM {
  ALIMENTOS_BEBIDAS = 1,
  MEDICAMENTOS = 2,
  HIGIENE_LIMPEZA = 3,
  OUTROS = 4,
}

export const CategoriaItens = [
  { nome: "Alimentos e Bebidas", id: CATEGORIA_ITEM.ALIMENTOS_BEBIDAS },
  { nome: "Medicamentos", id: CATEGORIA_ITEM.MEDICAMENTOS },
  { nome: "Higiene e Limpeza", id: CATEGORIA_ITEM.HIGIENE_LIMPEZA },
  { nome: "Outros", id: CATEGORIA_ITEM.OUTROS },
];

export const CategoriaUnidade = [
  { nome: "Escolar", id: 1 },
  { nome: "Saúde", id: 2 },
  { nome: "Secretaria", id: 3 },
  { nome: "ONG", id: 4 },
  { nome: "Outros", id: 5 },
];

export enum TipoVisualizacao {
  DETALHAR,
  EDITAR,
  IMPRIMIR,
}
