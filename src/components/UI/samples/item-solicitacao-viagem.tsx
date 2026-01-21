import styles from "@/styles/sample/item_solicitacao_viagem.module.css";
import { SolicitacaoViagem } from "@/types/entidade";
import { transformData } from "@/utils";
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
    <div className={styles.container}>
      {/* STATUS */}
      <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
        <FaInfoCircle size={12} />
        {item.status}
      </span>

      {/* MOTIVO */}
      <div className={styles.motivo}>
        <FaClipboardList />
        <div>
          <strong>{item.motivo}</strong>
          <span>Viagem: {transformData(item.data_viagem)}</span>
        </div>
      </div>

      {/* VEÍCULO */}
      <div className={styles.veiculo}>
        <FaCarSide />
        <strong>{item.placa}</strong>
        <span>{item.veiculo}</span>
      </div>

      {/* RESPONSÁVEL */}
      <div className={styles.responsavel}>
        <FaUser />
        <span>{item.responsavel}</span>
      </div>
    </div>
  );
}
