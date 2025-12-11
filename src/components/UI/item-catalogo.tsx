import { Produto } from "@/types/entidade";
import styles from "@/styles/components/item_catalogo.module.css";

export default function ItemCatalogo({ item }: { item: Produto }) {
  return (
    <div className={styles.item_container}>
      <p>{item.nome}</p>
      <p>{item.und_medida}</p>
    </div>
  );
}
