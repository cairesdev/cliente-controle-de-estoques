import styles from "@/styles/components/solicitacao.module.css";
import { Solicitacao } from "@/types/commons";
import { transformData } from "@/utils";
import Link from "next/link";

export default function RegistroSolicitacao({
  item,
  tipo,
  idOrigem,
}: {
  item: Solicitacao;
  tipo: "recebidas" | "enviadas";
  idOrigem: string;
}) {
  return (
    <Link
      className={styles.item_solicitacao}
      href={
        tipo === "recebidas"
          ? `/entidade/solicitacao/${item.id}?trackId=${idOrigem}&unId=${item.id_unidade}&view=${tipo}`
          : `/comprovante/solicitacao/${item.id}?trackId=${idOrigem}&unId=${item.id_unidade} `
      }
      target="_top"
    >
      <div>
        <h2>{item.nome}</h2>
        <h4>Unidade Solicitante: {item.unidade}</h4>
        <p>Responsável: {item.solicitante}</p>
      </div>
      <h4>Status: {item.status}</h4>
      <p>Tipo: {item.tipo_solicitacao}</p>
      <p>Enviada em: {transformData(item.data_solicitacao)}</p>
    </Link>
  );
}
