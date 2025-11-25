import { ItemEstocado } from "@/types/commons";
import { LuCircleAlert } from "react-icons/lu";

import { transformData } from "@/utils";
import styles from "@/styles/components/item_estoque.module.css";

export default function ItemArmazenado({ item }: { item: ItemEstocado }) {
  const hoje = new Date();
  const dataVal = new Date(item.data_validade);

  const diffMs = dataVal.getTime() - hoje.getTime();
  const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.card}>
      <h4 className={styles.nome}>{item.nome}</h4>

      <div className={styles.info_row}>
        <div>
          <p className={styles.label}>Registrado em</p>
          <b className={styles.valor}>{transformData(item.data_entrada)}</b>
        </div>

        <div>
          <p className={styles.label}>Validade</p>
          <b className={styles.valor}>{transformData(item.data_validade)}</b>
        </div>
        <div>
          <p className={styles.label}>Disponível</p>
          <b className={styles.valor}>
            {item.qnt_disponivel} {item.und_medida}
          </b>
        </div>
      </div>

      <div className={styles.vencimento_container}>
        <div>
          <p className={styles.label}>Vencimento</p>
          <b className={styles.dias}>{diasRestantes} dias</b>
        </div>

        {diasRestantes <= 30 && (
          <div className={styles.alerta}>
            <span className={styles.alerta_icon}>
              <LuCircleAlert />
            </span>
            Atenção
          </div>
        )}
      </div>
    </div>
  );
}
