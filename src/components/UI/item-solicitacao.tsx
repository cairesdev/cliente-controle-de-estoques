"use client";
import { ProdutoSolicitacao } from "@/types/commons";
import styles from "@/styles/components/item_solicitacao.module.css";
import styles2 from "@/styles/homepage.module.css";

export function ItensSolicitacao({ item }: { item: ProdutoSolicitacao }) {
  return (
    <div key={item.id} className={styles.card}>
      <h4 className={styles.nome}>{item.nome}</h4>
      <div className={styles.info_row}>
        <div>
          <p className={styles.label}>Quantidade Solicitada</p>
          <b className={styles.valor}>
            {item.qnt_solicitada} {item.und_medida}
          </b>
        </div>
      </div>
    </div>
  );
}
