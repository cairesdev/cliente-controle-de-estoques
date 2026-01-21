import { DiasAteVencer, transformData } from "@/utils";
import styles from "@/styles/sample/item.module.css";
import { ItemEstocado } from "@/types/commons";
import { DeleteItem } from "@/components/action-buttons";
import { NIVEIS_USUARIO } from "@/constants/type-guard";

export default function ItemProduto({
  item,
  token,
  nivel,
}: {
  item: ItemEstocado;
  token?: string;
  nivel?: number;
}) {
  const dias = DiasAteVencer(item.data_validade);

  const status =
    dias < 0 ? styles.vencido : dias <= 7 ? styles.alerta : styles.ok;

  const statusLabel =
    dias < 0
      ? "Vencido"
      : dias <= 7
        ? "Perto do vencimento"
        : "Dentro da validade";

  return (
    <div className={styles.item_estoque}>
      <div className={styles.header}>
        <h4 className={styles.nome}>{item.nome}</h4>
        <span className={`${styles.badge} ${status}`}>{statusLabel}</span>
      </div>

      <div className={styles.quantidades}>
        <div className={styles.qtd}>
          <strong>Cadastrado</strong>
          <div>
            {item.qnt_entrada} {item.und_medida}
          </div>
        </div>

        <div className={styles.qtd}>
          <strong>Disponível</strong>
          <div>
            {item.qnt_disponivel} {item.und_medida}
          </div>
        </div>
        {nivel! >= NIVEIS_USUARIO.GERENCIA && (
          <DeleteItem token={token!} id={item.id} />
        )}
      </div>

      <div className={styles.info}>
        <p>Validade: {transformData(item.data_validade)}</p>
        <p>Dias restantes: {dias}</p>
        {item.data_entrada && (
          <p>Registrado em: {transformData(item.data_entrada)}</p>
        )}
      </div>

      {item.origem && (
        <div className={styles.footer}>
          <span>
            Origem: {item.origem.nome} / {item.origem.codigo}
          </span>
        </div>
      )}
    </div>
  );
}
