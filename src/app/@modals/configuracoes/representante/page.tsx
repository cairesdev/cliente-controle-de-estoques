import { LogOutButton } from "@/components/UI/button";
import { ModalComponent } from "@/components/UI/modal";
import styles from "@/styles/components/lista_config.module.css";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { GrCircleAlert } from "react-icons/gr";
import { auth } from "@/auth";
import { NIVEIS_USUARIO } from "@/constants/type-guard";

export default async function UnidadeConfgPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  const { trackId } = (await searchParams) as {
    [key: string]: string;
  };

  return (
    <ModalComponent label="Configurações de Unidade">
      <ul className={styles.lista}>
        <li>
          <Link
            href={`/unidade/${trackId}/solicitacoes`}
            prefetch={false}
            target="_top"
            passHref
          >
            <span>
              <GrCircleAlert className="icon" />
            </span>
            Solicitações <FaAngleRight color="6c7072" />
          </Link>
        </li>

        {/* <li>
          <Link href={"#"} prefetch={false} target="_top" passHref>
            <span>
              <FaHistory className="icon" />
            </span>
            Histórico de Transações <FaAngleRight color="6c7072" />
          </Link>
        </li> */}

        {parseInt(session?.user.nivel!) >= NIVEIS_USUARIO.GERENCIA && (
          <li>
            <Link
              prefetch={false}
              target="_top"
              passHref
              href={`/unidade/${trackId}/editar`}
            >
              <span>
                <FaPenToSquare className="icon" />
              </span>
              Editar unidade <FaAngleRight color="6c7072" />
            </Link>
          </li>
        )}
      </ul>
      <LogOutButton />
    </ModalComponent>
  );
}
