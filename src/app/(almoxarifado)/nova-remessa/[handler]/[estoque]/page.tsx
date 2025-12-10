import { auth } from "@/auth";
import AddByFile from "@/components/website-forms/unidade/add-by-file";
import styles from "@/styles/entidade.module.css";
import { LuLayers } from "react-icons/lu";

export default async function AdicionarRemessaPage({
  searchParams,
  params,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ handler: string | undefined; estoque: string | undefined }>;
}) {
  const { code } = (await searchParams) as {
    [key: string]: string;
  };

  const { estoque } = await params;
  const session = await auth();

  return (
    <main className={styles.entidade_page}>
      <div className={styles.header_section}>
        <h1>
          <LuLayers /> Adicionar itens
        </h1>
        <p>Insira uma nova remessa de produtos ao estoque.</p>
      </div>

      <div className="ghost_traco" />
      <AddByFile
        sessionToken={session?.user.access_token!}
        idEstoque={estoque!}
        code={code}
      />
    </main>
  );
}
