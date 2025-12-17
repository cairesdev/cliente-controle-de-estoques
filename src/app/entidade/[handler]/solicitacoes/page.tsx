import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import { LuBlocks } from "react-icons/lu";
import Link from "next/link";
import RegistroSolicitacao from "@/components/UI/samples/registro-solicitacao";

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
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <LuBlocks /> Solicitações
        </h1>
        <p>Lista das demandas solicitadas pelas unidades.</p>
      </div>
      <div className="ghost_traco" />

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
              key={item.id}
              item={item}
              tipo="recebidas"
              idOrigem={handler!}
            />
          ))}

        {itens?.length === 0 && <p>Nenhuma solicitação.</p>}
      </div>

      <Link
        href={`/entidade/${handler}/almoxarifado`}
        target="_top"
        className="go_back_link"
      >
        Voltar
      </Link>
    </main>
  );
}
