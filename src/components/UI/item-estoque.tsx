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
        {item.data_entrada ? (
          <div>
            <p className={styles.label}>Registrado em</p>
            <b className={styles.valor}>{transformData(item.data_entrada)}</b>
          </div>
        ) : null}

        <div>
          <p className={styles.label}>Validade</p>
          <b className={styles.valor}>
            {item.data_validade
              ? transformData(item.data_validade)
              : "Indeterminado"}
          </b>
        </div>
        <div>
          <p className={styles.label}>Disponível</p>
          <b className={styles.valor}>
            {item.qnt_disponivel ?? item.qnt_entrada} {item.und_medida}
          </b>
        </div>
      </div>

      <div className={styles.vencimento_container}>
        <div>
          <b className={styles.dias}>
            {item.data_validade
              ? `Dias até o vencimento: ${diasRestantes}`
              : "Indeterminado"}
          </b>
        </div>

        {item.data_validade && diasRestantes <= 30 && (
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
