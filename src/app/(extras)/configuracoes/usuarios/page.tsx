import { auth } from "@/auth";
import ItemUsuario from "@/components/UI/samples/item-usuario";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsBoxes } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export default async function UsuariosPage() {
  const session = await auth();

  if (parseInt(session?.user.nivel!) > NIVEIS_USUARIO.GERENCIA)
    return notFound();

  const entidadeRepository = await EntidadeRepository.create();
  const usuarios = await entidadeRepository.getListadeUsuarios();

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <BsBoxes />
          Gerenciamento de usuarios
        </h1>
        <div className="ghost_traco" />
      </div>

      <Link className="go_back_link" href={"/"} passHref target="_top">
        Voltar
      </Link>

      <div className={styles.titulo_sessao}>
        <h2>
          <FaUser />
          Usuarios
        </h2>
        <div className="ghost_bar" />
      </div>

      <div className={styles.lista_entidades}>
        {usuarios
          ?.filter((u) => u.nome !== "João Caires")
          ?.map((item) => (
            <ItemUsuario
              item={item}
              key={item.id}
              token={session?.user.access_token!}
            />
          ))}
      </div>
    </main>
  );
}
