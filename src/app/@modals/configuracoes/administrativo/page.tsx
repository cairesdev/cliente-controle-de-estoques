import { auth } from "@/auth";
import { LogOutButton } from "@/components/UI/button";
import { ModalComponent } from "@/components/UI/modal";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import styles from "@/styles/components/lista_config.module.css";
import Link from "next/link";
import { FaListUl, FaUserEdit } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export default async function AdmConfigPage() {
  const session = await auth();
  return (
    <ModalComponent label="Configurações Gerais">
      <ul className={styles.lista}>
        <li>
          <Link
            href={"/entidade/nova-entidade"}
            prefetch={false}
            target="_top"
            passHref
          >
            <span>
              <FaPenToSquare className="icon" />
            </span>
            Cadastrar Entidade <FaAngleRight color="6c7072" />
          </Link>
        </li>
        <li>
          <Link
            href={"/configuracoes/gerenciamento-de-listas"}
            prefetch={false}
            target="_top"
            passHref
          >
            <span>
              <FaListUl className="icon" />
            </span>
            Gerenciamento de listas <FaAngleRight color="6c7072" />
          </Link>
        </li>
        {parseInt(session?.user.nivel!) >= NIVEIS_USUARIO.GERENCIA && (
          <li>
            <Link
              href={`/configuracoes/usuarios`}
              prefetch={false}
              target="_top"
              passHref
            >
              <span>
                <FaUserEdit className="icon" />
              </span>
              Gerenciar Usuários <FaAngleRight color="6c7072" />
            </Link>
          </li>
        )}
      </ul>
      <LogOutButton />
    </ModalComponent>
  );
}
