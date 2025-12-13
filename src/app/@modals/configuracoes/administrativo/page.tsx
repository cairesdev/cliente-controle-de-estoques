import { LogOutButton } from "@/components/UI/button";
import { ModalComponent } from "@/components/UI/modal";
import styles from "@/styles/components/lista_config.module.css";
import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { FaAngleRight, FaUserEdit } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";

export default async function AdmConfigPage() {
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
            href={"/catalogo-de-produtos"}
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
            href={"/procurar-remessa"}
            prefetch={false}
            target="_top"
            passHref
          >
            <span>
              <IoQrCodeOutline className="icon" />
            </span>
            Buscar Remessa <FaAngleRight color="6c7072" />
          </Link>
        </li>
      </ul>
      <LogOutButton />
    </ModalComponent>
  );
}
