import { ItemSolicitacao } from "@/components/UI/item-solicitacao";
import { EstoqueRepository } from "@/services/getters/estoque";

export default async function SolicitacaoPage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getSolicitacao({
    id: handler as string,
    tipo: "administrativa",
  });

  return <ItemSolicitacao data={data!} />;
}
