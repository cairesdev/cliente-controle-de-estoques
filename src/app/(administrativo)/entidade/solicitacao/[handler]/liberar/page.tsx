import LiberaSolicitacao from "@/components/website-forms/unidade/libera-solicitacao";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/components/item_pedido.module.css";
import { LuBlocks } from "react-icons/lu";

export default async function LiberarItensPage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { handler } = await params;
  const { trackId, unId } = (await searchParams) as {
    [key: string]: string;
  };

  const estoqueRepository = await EstoqueRepository.create();
  const itens = await estoqueRepository.getSolicitacaoeComparaEstoque({
    id: handler as string,
    entidade: trackId,
  });

  return (
    <main className={styles.page}>
      <div className={styles.header_section}>
        <h1>
          <LuBlocks /> Liberação de demanda
        </h1>
        <p>{unId}</p>
      </div>

      <LiberaSolicitacao
        solicitacao={handler!}
        unId={unId}
        item={itens!}
        trackId={trackId}
      />
    </main>
  );
}
