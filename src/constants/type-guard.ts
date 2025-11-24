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

export const API_ROUTES = {
  lista_unidades: "v1/unidades/",
  lista_entidades: "v1/entidades",
  cadastro_entidade: "v1/entidade",
  cadastro_modulo: "v1/modulos",
  entidade: "v1/entidade/",
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
