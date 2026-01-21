import { ReadonlyURLSearchParams } from "next/navigation";

export function formatSeconds(totalSeconds: number) {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export function tituloPagina(
  nivel: number,
  entidade_nome: string,
  unidade_nome: string,
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
  params: URLSearchParams | ReadonlyURLSearchParams,
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

export function transformData(dataString: string | null): string {
  if (!dataString) return "Indeterminado";
  const data = new Date(dataString);
  const possuiHorario = /\d{2}:\d{2}/.test(dataString);
  const dataFormatada = data.toLocaleDateString("pt-BR");
  if (!possuiHorario) {
    return dataFormatada;
  }
  const horaFormatada = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dataFormatada} ${horaFormatada}`;
}

export function DiasAteVencer(data: string): number {
  if (data == null) return 0;
  const hoje = new Date();
  const dataVal = new Date(data);
  const diffMs = dataVal.getTime() - hoje.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
