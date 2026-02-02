import SearchInput, { SearchSkeleton } from "@/components/UI/search";
import { EntidadeRepository } from "@/services/getters/entidade";
import { normalizeSearch, tituloPagina } from "@/utils";
import ItemSimples from "@/components/UI/item-simples";
import { HiInboxArrowDown, HiOutlineCog6Tooth } from "react-icons/hi2";
import styles from "@/styles/almoxarifado.module.css";
import { RiDashboardLine } from "react-icons/ri";
import { FaFingerprint } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Suspense } from "react";
import { User } from "next-auth";
import Link from "next/link";
import { IoLayersOutline, IoQrCodeOutline } from "react-icons/io5";
import { EstoqueRepository } from "@/services/getters/estoque";
import { AiOutlineProduct } from "react-icons/ai";
import { MODULO, NIVEIS_USUARIO, TipoModulo } from "@/constants/type-guard";
import ItemEstoque from "@/components/UI/samples/item-estoque";
import { MdDirectionsCarFilled, MdTravelExplore } from "react-icons/md";
import ItemViagem from "./UI/samples/item-viagem";

export default async function AlmoxarifeHomepage({
  search,
  user,
  handler,
  mod,
}: {
  search: string;
  user: User;
  handler?: string;
  mod?: string;
}) {
  const pesquisaText = search?.toLowerCase();

  const entidadeRepository = await EntidadeRepository.create();

  const unidades = await entidadeRepository.getUnidades({
    id: handler as string,
  });
  const entidade = await entidadeRepository.getEntidade({
    id: handler as string,
  });

  const modulos = await entidadeRepository.getModulosDisponiveis({
    id: handler as string,
  });

  const viagens = await entidadeRepository.getViagens();

  const estoqueRepository = await EstoqueRepository.create();
  const itens = await estoqueRepository.getEstoqueEntidade({
    id: handler as string,
  });

  const filtred = search
    ? unidades?.filter((item) =>
        normalizeSearch(item.nome).includes(normalizeSearch(pesquisaText)),
      )
    : unidades;

  const modulo = TipoModulo.find(
    (i) => i.id === parseInt(user.tipo_almoxarife),
  );

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
                user.unidade_nome!,
              )}
        </h1>
        <h2>{modulo?.nome}</h2>
        <div className="ghost_traco" />
        <div className={styles.user_section}>
          <span>
            <FiUser className="icon" />
          </span>
          <p>
            Usuario: {user.nome} - {user.descricao}
          </p>
          {modulo?.id === MODULO.VEICULAR && (
            <Link
              href={`/configuracoes/almoxarifado-veicular?trackId=${handler}`}
              passHref
              className={styles.options_user}
            >
              <HiOutlineCog6Tooth className="icon" />
            </Link>
          )}

          {modulo?.id === MODULO.ESCOLAR && (
            <Link
              href={`/configuracoes/almoxarifado?trackId=${handler}`}
              passHref
              className={styles.options_user}
            >
              <HiOutlineCog6Tooth className="icon" />
            </Link>
          )}
        </div>
      </div>

      {parseInt(user.nivel) === NIVEIS_USUARIO.GERENCIA && (
        <div className={styles.submenus}>
          {modulos?.escolar === 1 && (
            <Link
              target="_self"
              href={`/entidade/${handler}/almoxarifado?mod=1`}
            >
              Alimentação Escolar
            </Link>
          )}
          {modulos?.combustivel === 1 && (
            <Link
              target="_self"
              href={`/entidade/${handler}/almoxarifado?mod=255`}
            >
              Controle Veicular
            </Link>
          )}
          {modulos?.saude === 1 && (
            <Link
              target="_self"
              href={`/entidade/${handler}/almoxarifado?mod=99`}
            >
              Unidades de Saúde
            </Link>
          )}
          <Link target="_self" href={`/entidade/${handler}/almoxarifado`}>
            Geral
          </Link>
        </div>
      )}
      {modulo?.id === MODULO.VEICULAR && (
        <div className={styles.submenus}>
          {parseInt(user.nivel) >= NIVEIS_USUARIO.GERENCIA && (
            <Link className="go_back_link" href={"/"} passHref target="_top">
              Voltar
            </Link>
          )}
          <Link href={"/catalogo-de-veiculos"} target="_top">
            <MdDirectionsCarFilled />
            Frota Municipal
          </Link>
          <Link href={`/entidade/${handler}/solicitacoes/viagem`} target="_top">
            <MdTravelExplore />
            Solicitações de Viagem
          </Link>
        </div>
      )}
      {modulo?.id === MODULO.ESCOLAR &&
        parseInt(user.nivel) <= NIVEIS_USUARIO.ALMOXARIFADO && (
          <div className={styles.submenus}>
            {parseInt(user.nivel) >= NIVEIS_USUARIO.GERENCIA && (
              <Link
                className={`${styles.menuButton} ${styles.voltar}`}
                href={"/"}
                target="_top"
              >
                Voltar
              </Link>
            )}

            <Link
              href={"/catalogo-de-produtos"}
              target="_top"
              className={styles.menuButton}
            >
              <AiOutlineProduct />
              <span>Catálogo</span>
            </Link>

            <Link
              href={`/entidade/${handler}/almoxarifado/itens`}
              prefetch={false}
              target="_top"
              className={styles.menuButton}
            >
              <HiInboxArrowDown />
              <span>Armazém</span>
            </Link>

            <Link
              href={"/procurar-remessa"}
              prefetch={false}
              target="_top"
              className={styles.menuButton}
            >
              <IoQrCodeOutline />
              <span>Buscar Remessa</span>
            </Link>
          </div>
        )}
      <div className={styles.titulo_sessao}>
        <h2>
          <FaFingerprint />
          Unidades registradas
        </h2>
        <div className="ghost_bar" />
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchInput />
      </Suspense>

      <div className={styles.lista_entidades}>
        {parseInt(user.nivel) <= NIVEIS_USUARIO.ALMOXARIFADO
          ? filtred
              ?.filter((i) => i.id_tipo_unidade == modulo?.id)
              ?.map((item) => (
                <ItemSimples tipo="unidade" item={item} key={item.id} />
              ))
          : filtred
              ?.filter((i) => (mod ? i.id_tipo_unidade === parseInt(mod!) : i))
              ?.map((item) => (
                <ItemSimples tipo="unidade" item={item} key={item.id} />
              ))}
      </div>

      {filtred?.length === 0 && <p>Nenhuma unidade registrada.</p>}

      {parseInt(user.nivel) <= NIVEIS_USUARIO.ALMOXARIFADO &&
        modulo?.id == MODULO.ESCOLAR && (
          <>
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
          </>
        )}

      {modulo?.id === MODULO.VEICULAR && (
        <div className={styles.lista_entidades}>
          <div className={styles.titulo_sessao}>
            <h2>
              <IoLayersOutline />
              Viagens Liberadas
            </h2>
            <div className="ghost_bar" />
          </div>

          <div className={styles.lista_entidades}>
            {viagens
              ?.filter((v) => v.saida === null)
              .map((item) => (
                <ItemViagem key={item.id} item={item} />
              ))}
            {viagens?.filter((v) => v.saida === null)?.length === 0 && (
              <p>Nenhuma viagem em liberação.</p>
            )}
          </div>

          <div className={styles.titulo_sessao}>
            <h2>
              <IoLayersOutline />
              Viagens em andamento
            </h2>
            <div className="ghost_bar" />
          </div>

          <div className={styles.lista_entidades}>
            {viagens
              ?.filter((v) => v.chegada === null && v.saida !== null)
              .map((item) => (
                <ItemViagem key={item.id} item={item} />
              ))}
            {viagens?.filter((v) => v.chegada === null && v.saida !== null)
              ?.length === 0 && <p>Nenhuma viagem em andamento.</p>}
          </div>

          <div className={styles.titulo_sessao}>
            <h2>
              <IoLayersOutline />
              Viagens realizadas
            </h2>
            <div className="ghost_bar" />
          </div>

          <div className={styles.lista_entidades}>
            {viagens
              ?.filter((v) => v.chegada !== null)
              .map((item) => (
                <ItemViagem key={item.id} item={item} />
              ))}
            {viagens?.filter((v) => v.chegada !== null)?.length === 0 && (
              <p>Nenhuma viagem concluida.</p>
            )}
          </div>
        </div>
      )}
      <br />
      <br />
    </main>
  );
}
