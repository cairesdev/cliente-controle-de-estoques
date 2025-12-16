import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
import { BsBoxes } from "react-icons/bs";

export default async function UsuariosPage() {
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
    </main>
  );
}
