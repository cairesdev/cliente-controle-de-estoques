import { RiDashboardLine } from "react-icons/ri";
import styles from "@/styles/homepage.module.css";
import { EntidadeRepository } from "@/services/getters/entidade";
import FormUnidadeEditar from "@/components/website-forms/unidade/editar-unidade";

export default async function EditarUnidadePage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  const entidadeRepository = await EntidadeRepository.create();
  const unidade = await entidadeRepository.getUnidade({ id: handler! });
  const unidades = await entidadeRepository.getListaTipoUnidade();

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          Alterar informações
        </h1>
        <div className="ghost_traco" />
      </div>
      <FormUnidadeEditar
        tiposUnidade={unidades!}
        data={unidade!}
        idUnidade={handler!}
      />
    </main>
  );
}
