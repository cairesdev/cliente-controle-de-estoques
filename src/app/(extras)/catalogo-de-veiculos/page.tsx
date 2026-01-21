import { GoBackButton } from "@/components/action-buttons";
import ItemCatalogo from "@/components/UI/item-catalogo";
import ItemVeiculo from "@/components/UI/item-veiculo";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";
import { MdDirectionsCarFilled } from "react-icons/md";

export default async function CatalogoPage() {
  const entidadeRepository = await EntidadeRepository.create();
  const veiculos = await entidadeRepository.getListaVeiculos();

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <MdDirectionsCarFilled />
          Catálogo Veicular
        </h1>
        <div className="ghost_traco" />
        <div className={styles.submenus}>
          <Link className="go_back_link" href={"/"} passHref target="_top">
            Voltar
          </Link>
          <Link href={"/catalogo-de-veiculos/novo-veiculo"} target="_top">
            <MdDirectionsCarFilled />
            Novo Veículo
          </Link>
        </div>
      </div>

      {veiculos?.map((item) => (
        <ItemVeiculo item={item} key={item.id} />
      ))}

      <GoBackButton />
    </main>
  );
}
