import { auth } from "@/auth";
import { GoToHomeButton, PrintPageButton } from "@/components/action-buttons";
import ItemProduto from "@/components/UI/samples/item-produto";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/components/detahe_armazem.module.css";
import { transformData } from "@/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LuLayers } from "react-icons/lu";

export default async function ResumoEstoquePage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;
  const session = await auth();

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getResumoEstoqueEntidade({
    id: handler!,
  });

  if (!data?.remessa) return notFound();

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
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data?.remessa.codigo}:entidade:${handler}`}
          alt="barcode"
          width={150}
          height={150}
          loading="eager"
        />
        <div className={styles.informacoes}>
          <h2>Código: {data?.remessa.codigo}</h2>
          <h4>Data entrada: {transformData(data?.remessa.data_entrada!)}</h4>
          <h4>Conferente: {data?.remessa.nome ?? "Não identificado"}</h4>
          <h4>Setor: {data?.remessa.tipo_estoque}</h4>
          <h4>Produtos registrados: {data?.remessa.qnt_registrada}</h4>
          <div>
            <PrintPageButton />
            <GoToHomeButton />
          </div>
        </div>
      </div>

      <div className={styles.lista_itens}>
        {data?.itens.map((item) => (
          <ItemProduto
            token={session?.user.access_token}
            nivel={parseInt(session?.user.nivel!)}
            key={item.id}
            item={item}
          />
        ))}
        {data?.itens.length === 0 && (
          <p className="error_message">
            Não há itens registrados ou disponíveis nesta remessa.
          </p>
        )}
      </div>
      <br />
      <br />
    </main>
  );
}
