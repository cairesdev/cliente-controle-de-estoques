import styles from "@/styles/sample/item_solicitacao_viagem.module.css";
import { SolicitacaoViagem } from "@/types/entidade";
import { transformData } from "@/utils";
import Link from "next/link";
import {
  FaCarSide,
  FaUser,
  FaClipboardList,
  FaInfoCircle,
} from "react-icons/fa";

export default function ItemSolicitacaoViagem({
  item,
}: {
  item: SolicitacaoViagem;
}) {
  return (
    <Link
      href={`/entidade/solicitacao/veiculo/${item.id}`}
      target="_top"
      className={styles.container}
    >
      <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
        <FaInfoCircle size={12} />
        {item.status}
      </span>

      <div className={styles.motivo}>
        <FaClipboardList />
        <div>
          <strong>{item.resumo}</strong>
          <span>Viagem: {transformData(item.data_viagem)}</span>
        </div>
      </div>

      <div className={styles.veiculo}>
        <FaCarSide />
        <strong>{item.placa}</strong>
        <span>{item.veiculo}</span>
      </div>

      <div className={styles.responsavel}>
        <FaUser />
        <span>{item.responsavel}</span>
      </div>
    </Link>
  );
}
