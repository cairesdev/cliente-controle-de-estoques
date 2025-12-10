import AdicionarRemessaForm from "@/components/website-forms/unidade/adicionar-remessa";
import styles from "@/styles/entidade.module.css";
import { LuLayers } from "react-icons/lu";

export default async function AdicionarRemessaPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  return (
    <main className={styles.entidade_page}>
      <div className={styles.header_section}>
        <h1>
          <LuLayers /> Adicionar suprimentos
        </h1>
        <p>Insira uma nova remessa de produtos ao estoque.</p>
      </div>
      {/* <span className="error_message">{message ? message : null}</span> */}
      <div className="ghost_traco" />
      <AdicionarRemessaForm entidade={handler!} />
    </main>
  );
}
