import FormEntidade from "@/components/website-forms/entidade/cadastro";
import styles from "@/styles/entidade.module.css";
import { TbHomePlus } from "react-icons/tb";

export default async function NovaEntidadePage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { code, message } = (await searchParams) as {
    [key: string]: string;
  };

  return (
    <main className={styles.entidade_page}>
      <div className={styles.header_section}>
        <h1>
          <TbHomePlus /> Cadastro de Entidade
        </h1>
        <p>Adicione uma nova entidade gerenciavel.</p>
      </div>
      <span className="error_message">{message ? message : null}</span>
      <div className="ghost_traco" />
      <FormEntidade />
    </main>
  );
}
