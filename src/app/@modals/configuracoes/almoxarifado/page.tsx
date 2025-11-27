import { LogOutButton } from "@/components/UI/button";
import { ModalComponent } from "@/components/UI/modal";
import styles from "@/styles/components/lista_config.module.css";
import Link from "next/link";
import { FaAngleRight, FaHistory, FaUserEdit } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { MdAddCircleOutline } from "react-icons/md";
import { GrCircleAlert } from "react-icons/gr";
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
        <li>
          <Link
            href={`/entidade/${trackId}/solicitacoes`}
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

        <li>
          <Link href={"#"} prefetch={false} target="_top" passHref>
            <span>
              <MdAddCircleOutline className="icon" />
            </span>
            Adicionar Remessa <FaAngleRight color="6c7072" />
          </Link>
        </li>

        <li>
          <Link href={"#"} prefetch={false} target="_top" passHref>
            <span>
              <FaHistory className="icon" />
            </span>
            Histórico de Transações <FaAngleRight color="6c7072" />
          </Link>
        </li>
        {parseInt(session?.user.nivel!) >= NIVEIS_USUARIO.GERENCIA && (
          <li>
            <Link href={"#"} prefetch={false} target="_top" passHref>
              <span>
                <FaPenToSquare className="icon" />
              </span>
              Cadastrar Unidade <FaAngleRight color="6c7072" />
            </Link>
          </li>
        )}
        {parseInt(session?.user.nivel!) >= NIVEIS_USUARIO.GERENCIA && (
          <li>
            <Link href={"#"}>
              <span>
                <FaUserEdit className="icon" />
              </span>
              Cadastrar Usuário <FaAngleRight color="6c7072" />
            </Link>
          </li>
        )}
        {parseInt(session?.user.nivel!) >= NIVEIS_USUARIO.GERENCIA && (
          <li>
            <Link href={"#"}>
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
