import { GoToHomeButton } from "@/components/action-buttons";
import { ItensSolicitacao } from "@/components/UI/item-solicitacao";
import FormItemSolicitacao from "@/components/website-forms/unidade/add-item-solicitacao";
import { EntidadeRepository } from "@/services/getters/entidade";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import { LuInbox } from "react-icons/lu";

export default async function NovaSolicitacaoPage({
  params,
}: {
  params: Promise<{
    solicitacao: string | undefined;
    handler: string | undefined;
  }>;
}) {
  const { solicitacao, handler } = await params;

  const entidadeRepository = await EntidadeRepository.create();
  const produtos = await entidadeRepository.getListaProdutos();

  const estoqueRepository = await EstoqueRepository.create();
  const item = await estoqueRepository.getSolicitacao({
    id: solicitacao!,
    tipo: "unidade",
    idUnidade: handler!,
  });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <LuInbox /> Solicitar remessa
        </h1>
        <p>Faça uma solicitação de itens para sua unidade.</p>
      </div>
      <div className="ghost_traco" />
      <FormItemSolicitacao
        idUnidade={handler!}
        produtos={produtos!}
        idSolicitacao={solicitacao!}
      />
      <div className="ghost_bar" />
      <h2>Itens adicionados</h2>
      <ItensSolicitacao data={item?.itens!} />
      <GoToHomeButton />
    </main>
  );
}
