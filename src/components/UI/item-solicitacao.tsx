"use client";
import {
  DetalheSolicitacao,
  ProdutoSolicitacao,
  Solicitacao,
} from "@/types/commons";
import { transformData } from "@/utils";
import styles from "@/styles/components/item_solicitacao.module.css";
import styles2 from "@/styles/homepage.module.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { PrintPageButton } from "../action-buttons";

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
            <p className={styles.label}>Status</p>
            <b className={styles.valor}>{data.status}</b>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function ItemSolicitacaoAdmin({
  data,
  trackId,
  unId,
  tipo = "detalhe",
}: {
  data: DetalheSolicitacao;
  trackId: string;
  unId: string;
  tipo?: "comprovante" | "detalhe";
}) {
  const router = useRouter();
  return (
    <main className={styles2.homepage}>
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
        <p>Total de itens: {data.itens.length}</p>
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

      {tipo === "comprovante" ? (
        <PrintPageButton />
      ) : (
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
      )}
      <Button type="alternative" rounded onClick={() => router.back()}>
        Voltar
      </Button>
    </main>
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
