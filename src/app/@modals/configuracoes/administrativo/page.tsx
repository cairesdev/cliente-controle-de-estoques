import { LogOutButton } from "@/components/UI/button";
import { ModalComponent } from "@/components/UI/modal";
import styles from "@/styles/components/lista_config.module.css";
import Link from "next/link";
import { FaAngleRight, FaUserEdit } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export default async function AdmConfigPage() {
  return (
    <ModalComponent label="Configurações Gerais">
      <ul className={styles.lista}>
        <li>
          <Link href={"/"}>
            <span>
              <FaPenToSquare className="icon" />
            </span>
            Cadastrar Entidade <FaAngleRight color="6c7072" />
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
