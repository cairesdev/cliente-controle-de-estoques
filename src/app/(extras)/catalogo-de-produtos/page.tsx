import { GoBackButton } from "@/components/action-buttons";
import ItemCatalogo from "@/components/UI/item-catalogo";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
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

      {produtos?.map((item) => (
        <ItemCatalogo item={item} key={item.id} />
      ))}

      <GoBackButton />
    </main>
  );
}
