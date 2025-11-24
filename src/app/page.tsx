import { auth } from "@/auth";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import AdminHomepage from "@/components/admin-homepage";
import { User } from "next-auth";

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

    default:
      return (
        <div>
          <p>Não autorizado.</p>
        </div>
      );
  }
}
