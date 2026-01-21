import { Veiculo } from "@/types/entidade";
import styles from "@/styles/components/item_catalogo.module.css";

export default function ItemVeiculo({ item }: { item: Veiculo }) {
  return (
    <div className={styles.container_veiculo}>
      <p className={styles.nome}>{item.nome}</p>
      <p className={styles.modelo}>
        {item.marca} / {item.modelo}
      </p>
      <p className={styles.placa}>{item.placa}</p>
      <p className={styles.status}>{item.status}</p>
    </div>
  );
}
