"use client";
import { ProdutoSolicitacao, Solicitacao } from "@/types/commons";
import { transformData } from "@/utils";
import styles from "@/styles/components/item_solicitacao.module.css";
import styles2 from "@/styles/homepage.module.css";

import Link from "next/link";

export function SolicitacaoItem({
  data,
  track,
  trackId,
}: {
  data: Solicitacao;
  track: "entidade" | "unidade";
  trackId: string;
}) {
  return (
    <div className={styles.card}>
      <Link
        href={
          track === "entidade"
            ? `/${track}/solicitacao/${data.id}?trackId=${trackId}&unId=${data.id_unidade}&view=${track}`
            : `/comprovante/solicitacao/${data.id}?trackId=${trackId}&unId=${data.id_unidade} `
        }
      >
        {track !== "unidade" && <h4 className={styles.nome}>{data.unidade}</h4>}
        <div className={styles.info_row}>
          <div>
            <p className={styles.label}>Nome</p>
            <b className={styles.valor}>{data.nome}</b>
          </div>
          <div>
            <p className={styles.label}>Responsável</p>
            <b className={styles.valor}>{data.solicitante}</b>
          </div>
        </div>
        <div className={styles.vencimento_container}>
          <div>
            <p className={styles.label}>Registrado em</p>
            <b className={styles.valor}>
              {transformData(data.data_solicitacao)}
            </b>
          </div>

          <div>
            <p className={styles.label}>Tipo</p>
            <b className={styles.valor}>{data.tipo_solicitacao}</b>
          </div>
          <div>
            <p className={styles.label}>Status</p>
            <b className={styles.valor}>{data.status}</b>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function ItensSolicitacao({ data }: { data: ProdutoSolicitacao[] }) {
  return (
    <main className={styles2.entidade_page}>
      {data?.map((item) => (
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
      ))}
    </main>
  );
}
