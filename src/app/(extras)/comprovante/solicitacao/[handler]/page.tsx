import { auth } from "@/auth";
import { ConcluirSolicitacao } from "@/components/action-buttons";
import ItemSolicitacao from "@/components/UI/samples/item-solicitacao";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/components/detalhe_solicitacao.module.css";
import { transformData } from "@/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoLayers } from "react-icons/io5";

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
  const data = await estoqueRepository.getSolicitacao({
    id: handler as string,
    tipo: "unidade",
    idUnidade: unId,
  });

  const session = await auth();

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          {data?.solicitacao.status}: {data?.solicitacao.nome}
        </h1>
        {data?.solicitacao.status === "Liberado" && (
          <ConcluirSolicitacao
            solicitacao={handler as string}
            token={session?.user.access_token!}
            code={data?.solicitacao.codigo!}
            remessa={data?.solicitacao.estoque!}
          />
        )}
        <div className="ghost_traco" />
      </div>
      <div>
        <h2>
          Data da solicitação:{" "}
          {transformData(data?.solicitacao.data_solicitacao!)}
        </h2>
        <p>Unidade solicitante: {data?.solicitacao.unidade}</p>
        <p>Representante: {data?.solicitacao.solicitante}</p>
      </div>
      <div className={styles.titulo_sessao}>
        <h2>
          <IoLayers />
          Produtos Solicitados
        </h2>
        <div className="ghost_bar" />
      </div>
      <div className={styles.lista_itens}>
        {data?.itens.map((item) => (
          <ItemSolicitacao tipo="comprovante" item={item} key={item.id} />
        ))}
      </div>

      <div>
        <Link
          className="go_back_link"
          target="_top"
          href={`/unidade/${trackId}/almoxarifado`}
        >
          Voltar
        </Link>
      </div>
    </main>
  );
}
