import { auth } from "@/auth";
import { NIVEIS_USUARIO } from "@/constants/type-guard";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/unidade_veiculo.module.css";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { MdTravelExplore } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import ItemViagem from "./UI/samples/item-viagem";
import { IoLayersOutline } from "react-icons/io5";

export default async function GaragemHomePage({
  handler,
}: {
  handler: string;
}) {
  const session = await auth();
  const user = session?.user;

  const entidadeRepository = await EntidadeRepository.create();
  const unidade = await entidadeRepository.getUnidade({
    id: handler as string,
  });

  const viajens = await entidadeRepository.getViagensUnidade({ id: handler });

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          {unidade?.nome}
          {unidade?.status === 0 && " - Desativada"}
        </h1>
        <div className="ghost_traco" />
        <div className={styles.user_section}>
          <span>
            <FiUser className="icon" />
          </span>
          <p>
            Usuario: {user!.nome} - {user!.descricao}
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
          {parseInt(user!.nivel) >= NIVEIS_USUARIO.ALMOXARIFADO && (
            <Link className="go_back_link" href={"/"} passHref target="_top">
              Voltar
            </Link>
          )}
          <Link href={`/unidade/${handler}/solicitar-veiculo`} target="_top">
            <MdTravelExplore />
            Solicitar veiculo
          </Link>
        </div>
      )}

      <div className={styles.titulo_sessao}>
        <h2>
          <IoLayersOutline />
          Viajens Liberadas
        </h2>
        <div className="ghost_bar" />
      </div>

      <div className={styles.lista_entidades}>
        {viajens
          ?.filter((v) => v.saida === null)
          .map((item) => (
            <ItemViagem key={item.id} item={item} />
          ))}
        {viajens?.filter((v) => v.saida === null)?.length === 0 && (
          <p>Nenhuma viagem em liberação.</p>
        )}
      </div>

      <div className={styles.titulo_sessao}>
        <h2>
          <IoLayersOutline />
          Viajens em andamento
        </h2>
        <div className="ghost_bar" />
      </div>

      <div className={styles.lista_entidades}>
        {viajens
          ?.filter((v) => v.chegada === null && v.saida !== null)
          .map((item) => (
            <ItemViagem key={item.id} item={item} />
          ))}
        {viajens?.filter((v) => v.chegada === null && v.saida !== null)
          ?.length === 0 && <p>Nenhuma viagem em andamento.</p>}
      </div>

      <div className={styles.titulo_sessao}>
        <h2>
          <IoLayersOutline />
          Viajens realizadas
        </h2>
        <div className="ghost_bar" />
      </div>

      <div className={styles.lista_entidades}>
        {viajens
          ?.filter((v) => v.chegada !== null)
          .map((item) => (
            <ItemViagem key={item.id} item={item} />
          ))}
        {viajens?.filter((v) => v.chegada !== null)?.length === 0 && (
          <p>Nenhuma viagem concluida.</p>
        )}
      </div>
    </main>
  );
}
