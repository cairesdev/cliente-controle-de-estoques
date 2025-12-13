import { auth } from "@/auth";
import { GoToHomeButton } from "@/components/action-buttons";
import ItemArmazenado from "@/components/UI/item-estoque";
import SearchInput, { SearchSkeleton } from "@/components/UI/search";
import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import { normalizeSearch } from "@/utils";
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
  const data = await estoqueRepository.getAllItensUnidade({
    id: handler!,
  });

  const pesquisaText = q?.toLowerCase();

  const filtred = q
    ? data?.filter((item) =>
        normalizeSearch(item.nome).includes(normalizeSearch(pesquisaText))
      )
    : data;

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>Realizar Consumo</h1>
        <div className="ghost_traco" />
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchInput />
      </Suspense>

      <div>
        {filtred?.map((item) => (
          <ItemArmazenado
            key={item.id}
            item={item}
            tipo="ESTOQUE"
            token={session?.user.access_token}
          />
        ))}
      </div>
      <GoToHomeButton />
    </main>
  );
}
