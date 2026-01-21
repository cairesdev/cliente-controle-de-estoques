import { GoToHomeButton } from "@/components/action-buttons";
import ItemVeiculo from "@/components/UI/item-veiculo";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/components/frota.module.css";
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
          <Link className={styles.voltar} href={"/"} target="_top">
            Voltar
          </Link>

          <Link
            href={"/catalogo-de-veiculos/novo-veiculo"}
            target="_top"
            className={styles.menuButton}
          >
            <MdDirectionsCarFilled />
            <span>Novo Veículo</span>
          </Link>
        </div>
      </div>

      <div className={styles.lista_veiculos}>
        {veiculos?.map((item) => (
          <ItemVeiculo item={item} key={item.id} />
        ))}

        {veiculos?.length === 0 && (
          <p className={styles.empty}>Nenhum veículo cadastrado.</p>
        )}
      </div>

      <div className={styles.footer}>
        <GoToHomeButton />
      </div>
    </main>
  );
}
