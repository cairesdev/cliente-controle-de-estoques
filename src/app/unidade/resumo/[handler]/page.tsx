import { auth } from "@/auth";
import { GoToHomeButton, PrintPageButton } from "@/components/action-buttons";
import ItemArmazenado from "@/components/UI/item-estoque";
import ItemProduto from "@/components/UI/samples/item-produto";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/components/detahe_armazem.module.css";
import { transformData } from "@/utils";
import Image from "next/image";
import { LuLayers } from "react-icons/lu";

export default async function ResumoEstoquePage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;
  const session = await auth();

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getResumoEstoqueUnidade({
    id: handler!,
  });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <LuLayers />
          {data?.remessa.nome_estoque}
        </h1>
        <div className="ghost_traco" />
      </div>

      <div className={styles.barcode_container}>
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data?.remessa.codigo}:unidade:${handler}`}
          alt="barcode"
          width={150}
          height={150}
          loading="eager"
        />
        <div className={styles.informacoes}>
          <h2>Código: {data?.remessa.codigo}</h2>
          <h4>
            Data solicitação: {transformData(data?.remessa.data_solicitacao!)}
          </h4>
          <h4>
            Data liberação: {transformData(data?.remessa.data_encerramento!)}
          </h4>
          <h4>Solicitante: {data?.remessa.solicitante}</h4>
          <h4>Setor: {data?.remessa.tipo_estoque}</h4>
          <h4>Produtos registrados: {data?.remessa.qnt_entrada}</h4>
          <div>
            <PrintPageButton />
            <GoToHomeButton />
          </div>
        </div>
      </div>
      <div className={styles.lista_itens}>
        {data?.itens.map((item) => (
          <ItemProduto key={item.id} item={item} />
        ))}
      </div>
      <br />
      <br />
    </main>
  );
}
