import AdicionarRemessaForm from "@/components/website-forms/entidade/adicionar-remessa";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/entidade.module.css";
import { LuLayers } from "react-icons/lu";

export default async function AdicionarRemessaPage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  const entidadeRepository = await EntidadeRepository.create();
  const estoque = await entidadeRepository.getListaTipoEstoque();

  return (
    <main className={styles.entidade_page}>
      <div className={styles.header_section}>
        <h1>
          <LuLayers /> Adicionar suprimentos
        </h1>
        <p>Insira uma nova remessa de produtos ao estoque.</p>
      </div>

      <div className="ghost_traco" />
      <AdicionarRemessaForm tipoEstoque={estoque!} entidade={handler!} />
    </main>
  );
}
