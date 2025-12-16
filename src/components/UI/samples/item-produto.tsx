import { DiasAteVencer, transformData } from "@/utils";
import styles from "@/styles/sample/item.module.css";
import { ItemEstocado } from "@/types/commons";

export default function ItemProduto({ item }: { item: ItemEstocado }) {
  return (
    <div className={styles.item_estoque}>
      <h4>{item.nome}</h4>
      <p>
        Cadastrado: {item.qnt_entrada} {item.und_medida}
      </p>
      <p>
        Disponível: {item.qnt_disponivel} {item.und_medida}
      </p>
      {item.data_entrada && (
        <p>Registrado em: {transformData(item.data_entrada)}</p>
      )}
      <p>Validade: {transformData(item.data_validade)}</p>
      <p>Dias até o vencimento: {DiasAteVencer(item.data_validade)}</p>
    </div>
  );
}
