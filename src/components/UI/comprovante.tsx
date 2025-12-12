"use client";
import styles from "@/styles/comprovante.module.css";
import { ComprovanteCriacao } from "@/types/commons";
import { transformData } from "@/utils";
import Image from "next/image";
import { LuLayers } from "react-icons/lu";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { PrintPageButton } from "../action-buttons";

export default function Comprovante({ data }: { data: ComprovanteCriacao }) {
  const router = useRouter();
  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>Comprovante de estoque</h1>
        <p>Remessa disponível para distribuição</p>
      </div>
      <div className="ghost_traco" />

      <section className={styles.codigo_section}>
        <p className={styles.codigo_label}>Código de Remessa</p>
        <h1 className={styles.codigo_value}>{data?.estoque.codigo}</h1>

        <div className={styles.barcode_container}>
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data?.estoque.codigo}`}
            alt="barcode"
            width={190}
            height={190}
            loading="eager"
          />
        </div>
      </section>

      <div className={styles.titulo_sessao}>
        <h2>
          <LuLayers />
          Produtos existêntes
        </h2>
        <div className="ghost_bar" />
      </div>

      <section className={styles.itens_section}>
        <div className={styles.itens_list}>
          {data?.itens.map((item) => (
            <div key={item.id} className={styles.item_card}>
              <span className={styles.item_nome}>{item.nome}</span>
              <span className={styles.item_data}>
                Validade: {transformData(item.data_validade)}
              </span>
              <span className={styles.item_qnt}>
                Quantidade:
                {item.qnt_entrada}
                {item.und_medida}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.assinatura_box}>
        <p className={styles.assinatura_nome}>{data?.estoque.solicitante}</p>
        <p className={styles.assinatura_data}>
          {transformData(data?.estoque.data_entrada as string)}
        </p>
      </footer>
      <PrintPageButton />
      <Button rounded type="alternative" onClick={() => router.push(`/`)}>
        Concluir
      </Button>
    </main>
  );
}
