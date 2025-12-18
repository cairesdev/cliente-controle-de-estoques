import RegistroSolicitacao from "@/components/UI/samples/registro-solicitacao";
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
      <div className={styles.lista_entidades}>
        {itens
          ?.sort((a, b) => {
            const prioridade = ["Enviado", "Pendente"];

            const indexA = prioridade.indexOf(a.status);
            const indexB = prioridade.indexOf(b.status);

            const ordemA = indexA === -1 ? prioridade.length : indexA;
            const ordemB = indexB === -1 ? prioridade.length : indexB;

            return ordemA - ordemB;
          })
          ?.map((item) => (
            <RegistroSolicitacao
              idOrigem={handler as string}
              tipo="enviadas"
              item={item}
              key={item.id}
            />
          ))}
        {itens?.length === 0 && <p>Nenhuma solicitação.</p>}
      </div>
      <Link href={`/`} target="_top" className="go_back_link">
        Voltar
      </Link>
    </main>
  );
}
