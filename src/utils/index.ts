import { ReadonlyURLSearchParams } from "next/navigation";

export function formatSeconds(totalSeconds: number) {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export function tituloPagina(
  nivel: number,
  entidade_nome: string,
  unidade_nome: string
) {
  switch (nivel) {
    case 0:
      return "Auditor / Visitante";
    case 1:
      return unidade_nome;
    case 2:
      return entidade_nome;
    case 3:
      return "Dashboard Administrativo";
    default:
      return "Dashboard do Desenvolvedor";
  }
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function normalizeSearch(str: string) {
  return str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export function transformData(dataString: string): string {
  const data = new Date(dataString);
  data.setMinutes(data.getTimezoneOffset());
  return data.toLocaleDateString("pt-BR");
}
