import { EntidadeRepository } from "@/services/getters/entidade";
import SessionExpiration from "@/components/session-expiration";
import ItemSimples from "@/components/UI/item-simples";
import { LogOutButton } from "@/components/UI/button";
import styles from "@/styles/homepage.module.css";
import { normalizeSearch, tituloPagina } from "@/utils";
import { auth } from "@/auth";
import { RiDashboardLine } from "react-icons/ri";
import { FaFingerprint } from "react-icons/fa";
import { Suspense } from "react";
import SearchInput, { SearchSkeleton } from "@/components/UI/search";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  const { q } = (await searchParams) as {
    [key: string]: string;
  };

  const pesquisaText = q?.toLowerCase();

  const entidadeRepository = await EntidadeRepository.create();
  const data = await entidadeRepository.getEntidades();

  const filtred = q
    ? data?.filter((item) =>
        normalizeSearch(item.nome).includes(normalizeSearch(pesquisaText))
      )
    : data;

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          {tituloPagina(
            parseInt(session?.user.nivel!),
            session?.user.entidade_nome!,
            session?.user.unidade_nome!
          )}
        </h1>
        <div className="ghost_traco" />
        <p>
          {session?.user.nome} - {session?.user.descricao}
        </p>
      </div>

      <div className={styles.titulo_sessao}>
        <h2>
          <FaFingerprint />
          Entidades Registradas
        </h2>
        <div className="ghost_bar" />
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchInput />
      </Suspense>

      <div className={styles.lista_entidades}>
        {filtred?.map((item) => (
          <ItemSimples tipo="entidade" item={item} key={item.id} />
        ))}
      </div>

      <div className={styles.rodape}>
        <LogOutButton />
        <SessionExpiration />
      </div>
    </main>
  );
}
