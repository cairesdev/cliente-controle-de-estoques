import { EstoqueRepository } from "@/services/getters/estoque";
import { SolicitacaoItem } from "@/components/UI/item-solicitacao";
import styles from "@/styles/entidade.module.css";
import { LuBlocks } from "react-icons/lu";
import Link from "next/link";

export default async function SolicitacoesPage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  const estoqueRepository = await EstoqueRepository.create();
  const itens = await estoqueRepository.getSolicitacoes({
    id: handler as string,
  });

  return (
    <main className={styles.entidade_page}>
      <div className={styles.header_section}>
        <h1>
          <LuBlocks /> Solicitações
        </h1>
        <p>Lista das demandas solicitadas pelas unidades.</p>
      </div>
      <div className="ghost_traco" />
      <div>
        {itens?.map((item) => (
          <SolicitacaoItem
            trackId={handler as string}
            track="entidade"
            data={item}
            key={item.id}
          />
        ))}
        {itens?.length === 0 && <p>Nenhuma solicitação.</p>}
      </div>
      <Link href={`/entidade/${handler}/almoxarifado`}>Voltar</Link>
    </main>
  );
}
