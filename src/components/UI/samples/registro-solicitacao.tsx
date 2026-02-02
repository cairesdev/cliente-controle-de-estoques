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
          : `/comprovante/solicitacao/${item.id}?trackId=${idOrigem}&unId=${item.id_unidade}`
      }
      target="_top"
    >
      <div className={styles.main}>
        <h2>{item.nome}</h2>
        <span className={styles.unidade}>
          Unidade solicitante: {item.unidade}
        </span>
        <p>Responsável: {item.solicitante}</p>
      </div>

      <div className={styles.meta}>
        <span className={styles.status}>{item.status}</span>
        <span className={styles.tipo}>{item.tipo_solicitacao}</span>
        <span className={styles.data}>
          {transformData(item.data_solicitacao)}
        </span>
      </div>
    </Link>
  );
}
