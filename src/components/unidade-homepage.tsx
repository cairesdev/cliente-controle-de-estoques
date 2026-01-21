import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import { tituloPagina } from "@/utils";
import { User } from "next-auth";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { RiDashboardLine } from "react-icons/ri";
import { IoLayersOutline, IoQrCodeOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { HiInboxArrowDown } from "react-icons/hi2";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import { EntidadeRepository } from "@/services/getters/entidade";
import ItemEstoque from "./UI/samples/item-estoque";
import { IoAlertCircleSharp } from "react-icons/io5";

export default async function UnidadeHomepage({
  search,
  user,
  handler,
}: {
  search: string;
  user: User;
  handler?: string;
}) {
  const estoqueRepository = await EstoqueRepository.create();
  const estoque = await estoqueRepository.getEstoqueUnidade({
    id: handler as string,
  });

  const entidadeRepository = await EntidadeRepository.create();
  const unidade = await entidadeRepository.getUnidade({
    id: handler as string,
  });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          {parseInt(user.nivel) >= NIVEIS_USUARIO.GERENCIA
            ? unidade?.nome
            : tituloPagina(
                parseInt(user.nivel),
                user.entidade_nome!,
                user.unidade_nome!,
              )}
          {unidade?.status === 0 && " - Desativada"}
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
            href={`/configuracoes/representante?trackId=${handler}`}
            passHref
            className={styles.options_user}
          >
            <HiOutlineCog6Tooth className="icon" />
          </Link>
        </div>
      </div>
      {unidade?.status === 1 && (
        <div className={styles.submenus}>
          {parseInt(user.nivel) >= NIVEIS_USUARIO.ALMOXARIFADO && (
            <Link className="go_back_link" href={"/"} passHref target="_top">
              Voltar
            </Link>
          )}
          <Link
            href={`/unidade/${handler}/solicitacoes/disponiveis`}
            target="_top"
          >
            <IoAlertCircleSharp color="yellow" />
            Disponíveis
          </Link>
          <Link href={`/unidade/${handler}/nova-solicitacao`} target="_top">
            <MdAddCircleOutline />
            Fazer Solicitação
          </Link>
          <Link
            href={`/unidade/${handler}/almoxarifado/itens`}
            prefetch={false}
            target="_top"
            passHref
          >
            <HiInboxArrowDown />
            Registrar Consumo
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
      )}
      <div className={styles.titulo_sessao}>
        <h2>
          <IoLayersOutline />
          Estoques disponíveis
        </h2>
        <div className="ghost_bar" />
      </div>

      <div className={styles.lista_entidades}>
        {unidade?.status === 1 &&
          estoque?.map((item) => (
            <ItemEstoque tipo="unidade" item={item} key={item.id} />
          ))}
        {unidade?.status === 0 && (
          <div>
            <h4>Nenhuma remessa disponível em unidades desativadas.</h4>
            <br />
            <Link className="go_back_link" href={"/"} passHref target="_top">
              Voltar
            </Link>
          </div>
        )}
        {estoque?.length === 0 && <p>Nenhuma remessa disponível.</p>}
      </div>
    </main>
  );
}
