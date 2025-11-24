import FormModulo from "@/components/website-forms/entidade/modulo";
import styles from "@/styles/entidade.module.css";
import { LuBlocks } from "react-icons/lu";

export default async function ModulosPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ handler: string | undefined }>;
}) {
  const { ref } = (await searchParams) as {
    [key: string]: string;
  };

  const { handler } = await params;

  return (
    <main className={styles.entidade_page}>
      <div className={styles.header_section}>
        <h1>
          <LuBlocks /> Módulos Gerenciáveis
        </h1>
        <p>Marque as opções disponíveis a esta entidadel.</p>
      </div>
      <div className="ghost_traco" />
      <FormModulo idEntidade={handler as string} />
    </main>
  );
}
