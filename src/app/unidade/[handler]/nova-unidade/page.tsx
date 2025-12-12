import FormUnidade from "@/components/website-forms/unidade/add-unidade";
import styles from "@/styles/homepage.module.css";
import { TbHomePlus } from "react-icons/tb";

export default async function NovaUnidadePage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <TbHomePlus /> Cadastro de unidade
        </h1>
        <p>Adicione uma nova unidade gerenciavel.</p>
      </div>
      <div className="ghost_traco" />
      <FormUnidade idEntidade={handler!} />
    </main>
  );
}
