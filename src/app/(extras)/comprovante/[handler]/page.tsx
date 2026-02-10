import ItemProduto from "@/components/UI/samples/item-produto";
import { EstoqueRepository } from "@/services/getters/estoque";
import { transformData } from "@/utils";
import Image from "next/image";
import { LuLayers } from "react-icons/lu";
import styles from "@/styles/components/detahe_armazem.module.css";
import { GoToHomeButton, PrintPageButton } from "@/components/action-buttons";
import Link from "next/link";

export default async function ComprovantePage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { code } = (await searchParams) as { [key: string]: string };
  const { handler } = await params;

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getComprovante({
    id: handler as string,
    comprovante: code,
  });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <LuLayers />
          {data?.estoque.nome}
        </h1>
        <div className="ghost_traco" />
      </div>
      <div className={styles.barcode_container}>
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data?.estoque.codigo}:entidade:${handler}`}
          alt="barcode"
          width={150}
          height={150}
          loading="eager"
        />
        <div className={styles.informacoes}>
          <h2>Código: {data?.estoque.codigo}</h2>
          <h4>Data entrada: {transformData(data?.estoque.data_entrada!)}</h4>
          <h4>Solicitante: {data?.estoque.solicitante}</h4>
          <h4>Despachante: {data?.estoque.despachante}</h4>
          <h4>Produtos registrados: {data?.estoque.qnt_disponivel}</h4>
          <h4>Status: {data?.estoque.status}</h4>
          <div>
            <Link
              className="go_back_link"
              target="_blank"
              href={`/comprovante/autenticacao/${handler}/liberacao-solicitacao?code=${code}`}
            >
              Imprimir
            </Link>
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
