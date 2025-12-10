import ItemArmazenado from "@/components/UI/item-estoque";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import { LuLayers } from "react-icons/lu";

export default async function ResumoEstoquePage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { handler } = await params;
  const { code } = (await searchParams) as {
    [key: string]: string;
  };

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getResumo({ id: handler! });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <LuLayers /> Resumo das adições
        </h1>
        <h2>Código: {data?.remessa.codigo}</h2>
        <p>{data?.remessa.nome}</p>
      </div>
      <div className="ghost_traco" />
      <div>
        {data?.itens.map((item) => (
          <ItemArmazenado key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
