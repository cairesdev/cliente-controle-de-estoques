import Comprovante from "@/components/UI/comprovante";
import { EstoqueRepository } from "@/services/getters/estoque";

export default async function ComprovantePage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { handler } = await params;
  const { code } = (await searchParams) as { [key: string]: string };

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getComprovante({
    id: handler as string,
    comprovante: code,
  });

  console.log(data);

  return <Comprovante idEstoque={handler!} data={data!} />;
}
