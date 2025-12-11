import SucessoView from "@/components/UI/SucessoView";

export default async function CadastroRealizado({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { ref, callback } = (await searchParams) as {
    [key: string]: string;
  };

  return <SucessoView refId={ref} callback={callback} />;
}
