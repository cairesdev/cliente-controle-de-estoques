import { ItemSolicitacaoAdmin } from "@/components/UI/item-solicitacao";
import { EstoqueRepository } from "@/services/getters/estoque";

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
  });

  return (
    <ItemSolicitacaoAdmin
      unId={unId as string}
      trackId={trackId as string}
      data={data!}
    />
  );
}
