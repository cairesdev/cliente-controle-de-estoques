import { ItemBasic } from "@/types/entidade";
import styles from "@/styles/sample/item.module.css";
import { DeleteItemTipo } from "@/components/action-buttons";

export default function ItemTipo({
  item,
  tipo,
  token,
}: {
  item: ItemBasic;

  token: string;
  tipo: "unidade" | "estoque";
}) {
  return (
    <div className={styles.item_tipo_categoria}>
      <p>{item.id}</p>
      <h2>{item.nome}</h2>
      <DeleteItemTipo id={item.id} tipo={tipo} token={token} />
    </div>
  );
}
