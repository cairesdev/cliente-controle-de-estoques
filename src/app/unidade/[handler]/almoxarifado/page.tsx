import { auth } from "@/auth";
import UnidadeHomepage from "@/components/unidade-homepage";

export default async function ArmazemPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ handler: string | undefined }>;
}) {
  const session = await auth();
  const { handler } = await params;

  const { q } = (await searchParams) as {
    [key: string]: string;
  };

  return <UnidadeHomepage search={q} user={session?.user!} handler={handler} />;
}
