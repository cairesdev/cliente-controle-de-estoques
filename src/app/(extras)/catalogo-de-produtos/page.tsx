import { GoBackButton } from "@/components/action-buttons";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/sample/catalogo.module.css";
import { RiDashboardLine } from "react-icons/ri";

export default async function CatalogoPage() {
  const entidadeRepository = await EntidadeRepository.create();
  const produtos = await entidadeRepository.getListaProdutos();

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          Catálogo de produtos
        </h1>
        <div className="ghost_traco" />
      </div>

      <div className={styles.lista}>
        {produtos?.map((item) => (
          <div key={item.id} className={styles.item_container}>
            <p className={styles.nome}>{item.nome}</p>
            <span className={styles.unidade}>{item.und_medida}</span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <GoBackButton />
      </div>
    </main>
  );
}
