import { SolicitacaoItem } from "@/components/UI/item-solicitacao";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";

export default async function SolicitacaoPage({
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
  const itens = await estoqueRepository.getSolicitacoes({
    id: handler as string,
  });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>Solicitações</h1>
        <div className="ghost_traco" />
      </div>
      <div>
        {itens?.map((item) => (
          <SolicitacaoItem
            trackId={handler as string}
            track="unidade"
            data={item}
            key={item.id}
          />
        ))}
        {itens?.length === 0 && <p>Nenhuma solicitação.</p>}
      </div>
      <Link
        href={`/unidade/${handler}/almoxarifado`}
        target="_top"
        className="go_back_link"
      >
        Voltar
      </Link>
    </main>
  );
}
