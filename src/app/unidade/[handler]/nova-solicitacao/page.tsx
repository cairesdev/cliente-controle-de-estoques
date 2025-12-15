import FormSolicitacao from "@/components/website-forms/unidade/add-solicitação";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/entidade.module.css";
import { LuInbox } from "react-icons/lu";

export default async function NovaSolicitacaoPage({
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
          <LuInbox /> Solicitar remessa
        </h1>
        <p>Faça uma solicitação de itens para sua unidade.</p>
      </div>
      <div className="ghost_traco" />
      <FormSolicitacao idUnidade={handler!} tipoEstoque={estoque!} />
    </main>
  );
}
