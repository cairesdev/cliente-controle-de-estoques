import NovoVeiculoForm from "@/components/website-forms/garagem/add-veiculo";
import styles from "@/styles/homepage.module.css";
import { MdDirectionsCarFilled } from "react-icons/md";

export default async function NovoVeiculoPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { tipo } = (await searchParams) as {
    [key: string]: string;
  };

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <MdDirectionsCarFilled />
          Novo Veículo
        </h1>
        <div className="ghost_traco" />
      </div>
      <NovoVeiculoForm />
    </main>
  );
}
