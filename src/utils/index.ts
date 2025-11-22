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
    default:
      return "Dashboard Administrativo";
  }
}
