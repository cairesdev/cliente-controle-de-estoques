import { auth } from "@/auth";
import ItemProduto from "@/components/UI/samples/item-produto";
import ItemProdutoResumo from "@/components/UI/samples/item-produto-resumo";
import SearchInput, { SearchSkeleton } from "@/components/UI/search";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import { normalizeSearch } from "@/utils";
import Link from "next/link";
import { Suspense } from "react";

export default async function ListaItensPage({
  params,
  searchParams,
}: {
  params: Promise<{ handler: string | undefined }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  const { handler } = await params;

  const { q } = (await searchParams) as {
    [key: string]: string;
  };

  const estoqueRepository = await EstoqueRepository.create();
  const data = await estoqueRepository.getItensEntidade({
    id: handler!,
  });

  const pesquisaText = q?.toLowerCase();

  const filtred = q
    ? data?.filter((item) =>
        normalizeSearch(item.nome).includes(normalizeSearch(pesquisaText)),
      )
    : data;

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>Armazem interno</h1>
        <div className="ghost_traco" />
      </div>
      <Link
        className="go_back_link"
        href={`/entidade/${handler}/almoxarifado`}
        passHref
        target="_top"
      >
        Voltar
      </Link>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchInput />
      </Suspense>

      <div className={styles.lista_entidades}>
        {filtred?.map((item) => (
          <ItemProdutoResumo
            key={item.id}
            item={item}
            nivel={parseInt(session?.user.nivel!)}
            token={session?.user.access_token}
          />
        ))}
      </div>
    </main>
  );
}
