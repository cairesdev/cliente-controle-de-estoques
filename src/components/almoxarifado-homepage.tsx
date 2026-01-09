import SearchInput, { SearchSkeleton } from "@/components/UI/search";
import { EntidadeRepository } from "@/services/getters/entidade";
import SessionExpiration from "@/components/session-expiration";
import { normalizeSearch, tituloPagina } from "@/utils";
import ItemSimples from "@/components/UI/item-simples";
import { HiInboxArrowDown, HiOutlineCog6Tooth } from "react-icons/hi2";
import styles from "@/styles/homepage.module.css";
import { RiDashboardLine } from "react-icons/ri";
import { FaFingerprint } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Suspense } from "react";
import { User } from "next-auth";
import Link from "next/link";
import { IoLayersOutline, IoQrCodeOutline } from "react-icons/io5";
import { EstoqueRepository } from "@/services/getters/estoque";
import { AiOutlineProduct } from "react-icons/ai";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import ItemEstoque from "@/components/UI/samples/item-estoque";

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

  const unidades = await entidadeRepository.getUnidades({
    id: handler as string,
  });
  const entidade = await entidadeRepository.getEntidade({
    id: handler as string,
  });
  // const modulos = await entidadeRepository.getModulosDisponiveis({
  //   id: handler as string,
  // });

  const estoqueRepository = await EstoqueRepository.create();
  const itens = await estoqueRepository.getEstoqueEntidade({
    id: handler as string,
  });

  const filtred = search
    ? unidades?.filter((item) =>
        normalizeSearch(item.nome).includes(normalizeSearch(pesquisaText))
      )
    : unidades;

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          {parseInt(user.nivel) >= NIVEIS_USUARIO.GERENCIA
            ? entidade?.nome
            : tituloPagina(
                parseInt(user.nivel),
                user.entidade_nome!,
                user.unidade_nome!
              )}
        </h1>
        <div className="ghost_traco" />
        <div className={styles.user_section}>
          <span>
            <FiUser className="icon" />
          </span>
          <p>
            Usuario: {user.nome} - {user.descricao}
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

      <div className={styles.submenus}>
        {parseInt(user.nivel) >= NIVEIS_USUARIO.GERENCIA && (
          <Link className="go_back_link" href={"/"} passHref target="_top">
            Voltar
          </Link>
        )}
        <Link href={"/catalogo-de-produtos"} target="_top">
          <AiOutlineProduct />
          Catálogo de Produtos
        </Link>
        <Link
          href={`/entidade/${handler}/almoxarifado/itens`}
          prefetch={false}
          target="_top"
          passHref
        >
          <HiInboxArrowDown />
          Visualizar armazem de itens
        </Link>
        <Link
          href={"/procurar-remessa"}
          prefetch={false}
          target="_top"
          passHref
        >
          <IoQrCodeOutline />
          Buscar Remessa
        </Link>
      </div>

      <div className={styles.titulo_sessao}>
        <h2>
          <FaFingerprint />
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
        <ItemEstoque tipo="entidade" key={item.id} item={item} />
      ))}

      {itens?.length === 0 && <p>Nenhum item no estoque.</p>}

      <div className={styles.rodape}>
        <SessionExpiration />
      </div>
      <br />
      <br />
    </main>
  );
}
