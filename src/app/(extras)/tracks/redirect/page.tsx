import ErroView from "@/components/UI/ErroView";

export default async function ErroRealizado({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { message, callback } = (await searchParams) as {
    [key: string]: string;
  };

  return <ErroView message={message} callback={callback} />;
}
