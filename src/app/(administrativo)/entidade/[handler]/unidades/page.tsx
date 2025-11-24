import AlmoxarifeHomepage from "@/components/almoxarifado-homepage";
import { auth } from "@/auth";
import { User } from "next-auth";

export default async function EntidadePage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { handler } = await params;
  const { q } = (await searchParams) as {
    [key: string]: string;
  };

  const session = await auth();

  return (
    <AlmoxarifeHomepage
      handler={handler}
      search={q}
      user={session?.user as User}
    />
  );
}
