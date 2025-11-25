import { LogOutButton } from "@/components/UI/button";
import { ModalComponent } from "@/components/UI/modal";
import styles from "@/styles/components/lista_config.module.css";
import Link from "next/link";
import { FaAngleRight, FaUserEdit } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { MdAddCircleOutline } from "react-icons/md";
import { GrCircleAlert } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";

export default async function AlmConfigPage() {
  return (
    <ModalComponent label="Configurações de Entidade">
      <ul className={styles.lista}>
        <li>
          <Link
            href={"/unidade/nova-remessa"}
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
          <Link
            href={"/unidade/nova-remessa"}
            prefetch={false}
            target="_top"
            passHref
          >
            <span>
              <MdAddCircleOutline className="icon" />
            </span>
            Adicionar Remessa <FaAngleRight color="6c7072" />
          </Link>
        </li>
        <li>
          <Link
            href={"/unidade/nova-remessa"}
            prefetch={false}
            target="_top"
            passHref
          >
            <span>
              <AiOutlineProduct className="icon" />
            </span>
            Catálogo de Produtos <FaAngleRight color="6c7072" />
          </Link>
        </li>
        <li>
          <Link
            href={"/unidade/nova-unidade"}
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
        <li>
          <Link href={"/"}>
            <span>
              <FaUserEdit className="icon" />
            </span>
            Cadastrar Usuário <FaAngleRight color="6c7072" />
          </Link>
        </li>
      </ul>
      <LogOutButton />
    </ModalComponent>
  );
}
