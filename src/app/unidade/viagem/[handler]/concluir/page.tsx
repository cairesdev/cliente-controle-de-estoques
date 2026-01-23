import ConcluirViagemForm from "@/components/website-forms/garagem/concluir-viagem";
import styles from "@/styles/homepage.module.css";
import { MdDirectionsCarFilled } from "react-icons/md";

export default async function DetalheViagemPage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <MdDirectionsCarFilled />
          Concluir Viagem
        </h1>
        <div className="ghost_traco" />
      </div>
      <ConcluirViagemForm idViagem={handler!} />
    </main>
  );
}
