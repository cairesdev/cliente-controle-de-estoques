import { auth } from "@/auth";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/unidade_veiculo.module.css";
import Link from "next/link";
import { FaCarSide } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { IoAlertCircleSharp } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";

export default async function GaragemHomePage({
  handler,
}: {
  handler: string;
}) {
  const session = await auth();
  const user = session?.user;

  const entidadeRepository = await EntidadeRepository.create();
  const unidade = await entidadeRepository.getUnidade({
    id: handler as string,
  });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          {unidade?.nome}
          {unidade?.status === 0 && " - Desativada"}
        </h1>
        <div className="ghost_traco" />
        <div className={styles.user_section}>
          <span>
            <FiUser className="icon" />
          </span>
          <p>
            Usuario: {user!.nome} - {user!.descricao}
          </p>
          <Link
            href={`/configuracoes/representante?trackId=${handler}`}
            passHref
            className={styles.options_user}
          >
            <HiOutlineCog6Tooth className="icon" />
          </Link>
        </div>
      </div>

      {unidade?.status === 1 && (
        <div className={styles.submenus}>
          {parseInt(user!.nivel) >= NIVEIS_USUARIO.ALMOXARIFADO && (
            <Link className="go_back_link" href={"/"} passHref target="_top">
              Voltar
            </Link>
          )}
          <Link href={`/unidade/${handler}/solicitar-veiculo`} target="_top">
            <FaCarSide />
            Solicitar veiculo
          </Link>
        </div>
      )}
    </main>
  );
}
