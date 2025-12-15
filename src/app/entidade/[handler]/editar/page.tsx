import { RiDashboardLine } from "react-icons/ri";
import styles from "@/styles/homepage.module.css";
import { EntidadeRepository } from "@/services/getters/entidade";
import FormEntidadeEditar from "@/components/website-forms/entidade/editar-entidade";

export default async function EditarEntidadePage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  const entidadeRepository = await EntidadeRepository.create();
  const entidade = await entidadeRepository.getEntidade({ id: handler! });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          Alterar informações
        </h1>
        <div className="ghost_traco" />
      </div>
      <FormEntidadeEditar data={entidade!} idEntidae={handler!} />
    </main>
  );
}
