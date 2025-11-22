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
};
