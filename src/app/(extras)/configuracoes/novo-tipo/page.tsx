import NovoTipoForm from "@/components/website-forms/extras/add-tipo";
import styles from "@/styles/homepage.module.css";
import { BsBoxes } from "react-icons/bs";

export default async function TipoEstoquePage({
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
          <BsBoxes />
          Novo tipo de {tipo}
        </h1>
        <div className="ghost_traco" />
      </div>
      <NovoTipoForm tipo={tipo as "unidade" | "estoque"} />
    </main>
  );
}
