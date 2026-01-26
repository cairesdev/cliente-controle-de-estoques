import { LogOutButton } from "@/components/UI/button";
import { ModalComponent } from "@/components/UI/modal";
import styles from "@/styles/components/lista_config.module.css";
import Link from "next/link";
import { FaAngleRight, FaUserEdit } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

import { auth } from "@/auth";
import { NIVEIS_USUARIO } from "@/constants/type-guard";

export default async function AlmConfigPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  const { trackId } = (await searchParams) as {
    [key: string]: string;
  };

  return (
    <ModalComponent label="Configurações de Entidade">
      <ul className={styles.lista}>
        {parseInt(session?.user.nivel!) >= NIVEIS_USUARIO.ALMOXARIFADO && (
          <li>
            <Link
              href={`/unidade/${trackId}/nova-unidade`}
              prefetch={false}
              target="_top"
              passHref
            >
              <span>
                <FaPenToSquare className="icon" />
              </span>
              Cadastrar Unidade <FaAngleRight color="6c7072" />
            </Link>
          </li>
        )}

        {parseInt(session?.user.nivel!) >= NIVEIS_USUARIO.GERENCIA && (
          <li>
            <Link
              href={`/entidade/${trackId}/novo-representante`}
              prefetch={false}
              target="_top"
              passHref
            >
              <span>
                <FaUserEdit className="icon" />
              </span>
              Cadastrar representante <FaAngleRight color="6c7072" />
            </Link>
          </li>
        )}

        {parseInt(session?.user.nivel!) >= NIVEIS_USUARIO.GERENCIA && (
          <li>
            <Link
              prefetch={false}
              target="_top"
              passHref
              href={`/entidade/${trackId}/editar`}
            >
              <span>
                <FaPenToSquare className="icon" />
              </span>
              Editar Entidade <FaAngleRight color="6c7072" />
            </Link>
          </li>
        )}
      </ul>
      <LogOutButton />
    </ModalComponent>
  );
}
