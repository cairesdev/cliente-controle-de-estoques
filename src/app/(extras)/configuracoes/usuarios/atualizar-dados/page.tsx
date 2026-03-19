import { auth } from "@/auth";
import UpdateInformacoesUsuario from "@/components/website-forms/extras/update-usuario";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import styles from "@/styles/homepage.module.css";
import { notFound } from "next/navigation";
import { BsBoxes } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export default async function NovaSenhaPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { user, code } = (await searchParams) as { [key: string]: string };

  const session = await auth();
  if (parseInt(session?.user.nivel!) !== NIVEIS_USUARIO.GERENCIA) {
    return notFound();
  }

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <BsBoxes />
          Alteração de informações
        </h1>
        <div className="ghost_traco" />
      </div>

      <div className={styles.titulo_sessao}>
        <h2>
          <FaUser />
          Atualizar dados
        </h2>
        <div className="ghost_bar" />
      </div>
      <UpdateInformacoesUsuario user={user} />
    </main>
  );
}
