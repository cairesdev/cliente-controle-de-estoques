import SearchInput, { SearchSkeleton } from "@/components/UI/search";
import { EntidadeRepository } from "@/services/getters/entidade";
import SessionExpiration from "@/components/session-expiration";
import { normalizeSearch, tituloPagina } from "@/utils";
import ItemSimples from "@/components/UI/item-simples";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import styles from "@/styles/homepage.module.css";
import { RiDashboardLine } from "react-icons/ri";
import { FaFingerprint } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Suspense } from "react";
import { User } from "next-auth";
import Link from "next/link";

export default async function AdminHomepage({
  search,
  user,
}: {
  search: string;
  user: User;
}) {
  const pesquisaText = search?.toLowerCase();

  const entidadeRepository = await EntidadeRepository.create();
  const data = await entidadeRepository.getEntidades();

  const filtred = search
    ? data?.filter((item) =>
        normalizeSearch(item.nome).includes(normalizeSearch(pesquisaText))
      )
    : data;

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          {tituloPagina(3, user.entidade_nome!, user.unidade_nome!)}
        </h1>
        <div className="ghost_traco" />
        <div className={styles.user_section}>
          <span>
            <FiUser className="icon" />
          </span>
          <p>
            {user.nome} - {user.descricao}
          </p>
          <Link
            href="/configuracoes/administrativo"
            passHref
            className={styles.options_user}
          >
            <HiOutlineCog6Tooth className="icon" />
          </Link>
        </div>
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
        {filtred?.length === 0 && <p>Nenhuma entidade registrada.</p>}
      </div>

      <div className={styles.rodape}>
        <SessionExpiration />
      </div>
    </main>
  );
}
