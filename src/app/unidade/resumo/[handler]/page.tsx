import { auth } from "@/auth";
import { GoToHomeButton, PrintPageButton } from "@/components/action-buttons";
import ItemArmazenado from "@/components/UI/item-estoque";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
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
        <h2>Código: {data?.remessa.codigo}</h2>
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data?.remessa.codigo}:unidade:${handler}`}
          alt="barcode"
          width={190}
          height={190}
          loading="eager"
        />
      </div>
      <p>Quantidade cadastrada: {data?.remessa.qnt_entrada}</p>
      <p>Quantidade disponivel: {data?.remessa.qnt_disponivel}</p>
      <p>Categoria: {data?.remessa.tipo_estoque}</p>
      <div className="ghost_bar"></div>
      <div>
        {data?.itens.map((item) => (
          <ItemArmazenado
            key={item.id}
            item={item}
            tipo="GERENCIAVEL"
            token={session?.user.access_token}
          />
        ))}
      </div>
      <footer className={styles.assinatura_box}>
        <p className={styles.assinatura_nome}>{data?.remessa.solicitante}</p>
        <p className={styles.assinatura_data}>
          {transformData(data?.remessa.data_solicitacao as string)} à{" "}
          {transformData(data?.remessa.data_encerramento as string)}
        </p>
      </footer>
      <PrintPageButton />
      <GoToHomeButton />
    </main>
  );
}
