import RepresentanteItem from "@/components/UI/novo-representante";

export default async function RepresentantePage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { username } = (await searchParams) as {
    [key: string]: string;
  };

  return <RepresentanteItem username={username} />;
}
