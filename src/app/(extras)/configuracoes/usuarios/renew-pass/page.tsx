import { auth } from "@/auth";
import ItemUsuario from "@/components/UI/samples/item-usuario";
import UpdatePassForm from "@/components/website-forms/extras/update-pass";
import { HttpStatus, NIVEIS_USUARIO } from "@/constants/type-guard";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsBoxes } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export default async function NovaSenhaPage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { user, code } = (await searchParams) as { [key: string]: string };

  const session = await auth();
  if (parseInt(session?.user.nivel!) > NIVEIS_USUARIO.GERENCIA) {
    return notFound();
  }

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <BsBoxes />
          Alteração de senha
        </h1>
        <div className="ghost_traco" />
      </div>

      <Link className="go_back_link" href={"/"} passHref target="_top">
        Voltar
      </Link>

      <div className={styles.titulo_sessao}>
        <h2>
          <FaUser />
          Nova senha
        </h2>
        <div className="ghost_bar" />
      </div>
      {code && (
        <span className="error_message">
          {parseInt(code) === HttpStatus.NOT_ACEPTABLE && "Senhas não conferem"}
          {parseInt(code) === HttpStatus.CONFLICT && "Usuário indisponível"}
        </span>
      )}
      <UpdatePassForm user={user} />
    </main>
  );
}
