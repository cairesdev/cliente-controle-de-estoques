import { Veiculo } from "@/types/entidade";
import styles from "@/styles/components/item_catalogo.module.css";
import { FaCarSide, FaTag } from "react-icons/fa";

export default function ItemVeiculo({ item }: { item: Veiculo }) {
  return (
    <div className={styles.container_veiculo}>
      <div className={styles.placa}>
        <FaTag size={14} />
        <span>{item.placa}</span>
      </div>

      <div className={styles.info}>
        <p className={styles.nome}>
          <FaCarSide size={14} />
          {item.nome}
        </p>
        <p className={styles.modelo}>
          {item.marca} / {item.modelo}
        </p>
      </div>

      <div className={styles.status}>{item.status}</div>
    </div>
  );
}
