import { EstoqueRepository } from "@/services/getters/estoque";
import styles from "@/styles/homepage.module.css";
import { tituloPagina } from "@/utils";
import { User } from "next-auth";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { RiDashboardLine } from "react-icons/ri";
import ItemArmazem from "./UI/item-armazem";

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

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          {tituloPagina(1, user.entidade_nome!, user.unidade_nome!)}
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
            href={`/configuracoes/representante?trackId=${handler}`}
            passHref
            className={styles.options_user}
          >
            <HiOutlineCog6Tooth className="icon" />
          </Link>
        </div>
      </div>
      <div>
        {estoque?.map((item) => (
          <ItemArmazem
            tipoEstoque="unidade"
            tipo="SIMPLES"
            item={item}
            key={item.id}
          />
        ))}
        {estoque?.length === 0 && <p>Nenhuma remessa disponível.</p>}
      </div>
    </main>
  );
}
