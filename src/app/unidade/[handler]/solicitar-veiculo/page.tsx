import SolicitarVeiculoForm from "@/components/website-forms/garagem/solicitar-veiculo";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
import { MdDirectionsCarFilled } from "react-icons/md";

export default async function SolicitarVeiculoPage() {
  const entidadeRepository = await EntidadeRepository.create();
  const veiculos = await entidadeRepository.getListaVeiculos();

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <MdDirectionsCarFilled />
          Solicitar Veículo
        </h1>
        <div className="ghost_traco" />
      </div>
      <SolicitarVeiculoForm veiculos={veiculos!} />
    </main>
  );
}
