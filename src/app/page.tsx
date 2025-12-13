import { auth } from "@/auth";
import { User } from "next-auth";
import AdminHomepage from "@/components/admin-homepage";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import UnidadeHomepage from "@/components/unidade-homepage";
import AlmoxarifeHomepage from "@/components/almoxarifado-homepage";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  const { q } = (await searchParams) as {
    [key: string]: string;
  };

  switch (parseInt(session?.user.nivel as string)) {
    case NIVEIS_USUARIO.GERENCIA:
      return <AdminHomepage user={session?.user as User} search={q} />;
    case NIVEIS_USUARIO.ALMOXARIFADO:
      return (
        <AlmoxarifeHomepage
          user={session?.user as User}
          search={q}
          handler={session?.user.entidade_id}
        />
      );
    case NIVEIS_USUARIO.RESPONSAVEL:
      return (
        <UnidadeHomepage
          user={session?.user as User}
          search={q}
          handler={session?.user.unidade_id}
        />
      );

    default:
      redirect("/log-in");
  }
}
