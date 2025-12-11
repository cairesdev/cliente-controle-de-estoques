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
import { IoLayersOutline } from "react-icons/io5";
import { EstoqueRepository } from "@/services/getters/estoque";
import ItemArmazem from "./UI/item-armazem";

export default async function AlmoxarifeHomepage({
  search,
  user,
  handler,
}: {
  search: string;
  user: User;
  handler?: string;
}) {
  const pesquisaText = search?.toLowerCase();

  const entidadeRepository = await EntidadeRepository.create();
  const data = await entidadeRepository.getUnidades({ id: handler as string });

  const estoqueRepository = await EstoqueRepository.create();
  const itens = await estoqueRepository.getEstoques({
    id: handler as string,
  });

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
          {tituloPagina(2, user.entidade_nome!, user.unidade_nome!)}
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
            href={`/configuracoes/almoxarifado?trackId=${handler}`}
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
          Unidades Registradas
        </h2>
        <div className="ghost_bar" />
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchInput />
      </Suspense>

      <div className={styles.lista_entidades}>
        {filtred?.map((item) => (
          <ItemSimples tipo="unidade" item={item} key={item.id} />
        ))}
      </div>

      {filtred?.length === 0 && <p>Nenhuma unidade registrada.</p>}

      <div className={styles.titulo_sessao}>
        <h2>
          <IoLayersOutline />
          Estoques disponíveis
        </h2>
        <div className="ghost_bar" />
      </div>

      {itens?.map((item) => (
        <ItemArmazem key={item.id} item={item} tipo="SIMPLES" />
      ))}

      {itens?.length === 0 && <p>Nenhum item no estoque.</p>}

      <div className={styles.rodape}>
        <SessionExpiration />
      </div>
    </main>
  );
}
