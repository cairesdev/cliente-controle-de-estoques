"use client";
import { DetalheSolicitacao, Solicitacao } from "@/types/commons";
import { transformData } from "@/utils";
import styles from "@/styles/components/item_solicitacao.module.css";
import styles2 from "@/styles/entidade.module.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./button";

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
        href={`/${track}/solicitacao/${data.id}?trackId=${trackId}&unId=${data.id_unidade}`}
      >
        <h4 className={styles.nome}>{data.nome}</h4>

        <div className={styles.info_row}>
          <div>
            <p className={styles.label}>Unidade</p>
            <b className={styles.valor}>{data.unidade}</b>
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
            <p className={styles.label}>Status</p>
            <b className={styles.valor}>{data.status}</b>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function ItemSolicitacao({
  data,
  trackId,
  unId,
}: {
  data: DetalheSolicitacao;
  trackId: string;
  unId: string;
}) {
  const router = useRouter();
  return (
    <main className={styles2.entidade_page}>
      <div className={styles2.header_section}>
        <h1>
          {transformData(data?.solicitacao.data_solicitacao!)}
          {" - "}
          {data?.solicitacao.status}
        </h1>
        <p>
          {data?.solicitacao.unidade} - {data?.solicitacao.solicitante}
        </p>
      </div>
      <div className="ghost_traco" />
      <div>
        <h2>{data?.solicitacao.nome}</h2>
      </div>
      {data?.itens.map((item) => (
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
      <Button
        type="primary"
        rounded
        onClick={() =>
          router.push(
            `/entidade/solicitacao/${data.solicitacao.id}/liberar?trackId=${trackId}&unId=${unId}`
          )
        }
      >
        Liberar produtos
      </Button>
      <Button type="alternative" rounded onClick={() => router.back()}>
        Voltar
      </Button>
    </main>
  );
}
