import { GoToHomeButton } from "@/components/action-buttons";
import { ItensSolicitacao } from "@/components/UI/item-solicitacao";
import ItemSolicitacao from "@/components/UI/samples/item-solicitacao";
import FormItemSolicitacao from "@/components/website-forms/unidade/add-item-solicitacao";
import { EntidadeRepository } from "@/services/getters/entidade";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";
import { LuInbox } from "react-icons/lu";

export default async function NovaSolicitacaoPage({
  params,
  searchParams,
}: {
  params: Promise<{
    solicitacao: string | undefined;
    handler: string | undefined;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { solicitacao, handler } = await params;
  const { categoria } = (await searchParams) as {
    [key: string]: string;
  };

  const entidadeRepository = await EntidadeRepository.create();

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getSolicitacao({
    id: solicitacao!,
    tipo: "unidade",
    idUnidade: handler!,
  });

  const itens = await estoqueRepository.getItensListaDisponiveisEntidade({
    id: handler!,
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
        produtos={
          itens?.filter((p) => p.id_tipo_estoque === parseInt(categoria))!
        }
        idSolicitacao={solicitacao!}
      />
      <div className="ghost_bar" />
      <h2>Itens adicionados</h2>
      <div className={styles.lista_entidades}>
        {data?.itens.map((item) => (
          <ItemSolicitacao tipo="lista" item={item!} key={item.id} />
        ))}
      </div>
      {data?.itens.length !== 0 && (
        <Link
          className="go_back_link"
          target="_self"
          href={`/tracks/cadastrado?ref=Solicitação de Alimentos&callback=/`}
        >
          Concluir
        </Link>
      )}
      <br />
    </main>
  );
}
