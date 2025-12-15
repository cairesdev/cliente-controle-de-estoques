import { auth } from "@/auth";
import ItemTipo from "@/components/UI/samples/item-tipo";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/homepage.module.css";
import Link from "next/link";
import { IoLayersOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";

export default async function GerenciamentoListasPage() {
  const entidadeRepository = await EntidadeRepository.create();
  const unidade = await entidadeRepository.getListaTipoUnidade();
  const estoque = await entidadeRepository.getListaTipoEstoque();

  const session = await auth();

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <RiDashboardLine />
          Gerenciamento de Listas
        </h1>
        <div className="ghost_traco" />
      </div>

      <div className={styles.submenus}>
        <Link href={`/configuracoes/novo-tipo?tipo=estoque`} target="_top">
          <MdAddCircleOutline />
          Novo tipo de estoque
        </Link>
        <Link href={`/configuracoes/novo-tipo?tipo=unidade`} target="_top">
          <MdAddCircleOutline />
          Novo tipo de unidade
        </Link>
      </div>

      <div className={styles.titulo_sessao}>
        <h2>
          <IoLayersOutline />
          Tipos de Unidade
        </h2>
        <div className="ghost_bar" />
      </div>

      <div>
        {unidade?.map((item) => (
          <ItemTipo
            tipo="unidade"
            token={session?.user.access_token!}
            item={item}
            key={item.id}
          />
        ))}
      </div>
      <div className={styles.titulo_sessao}>
        <h2>
          <IoLayersOutline />
          Tipos de Estoque
        </h2>
        <div className="ghost_bar" />
      </div>

      <div>
        {estoque?.map((item) => (
          <ItemTipo
            tipo="estoque"
            token={session?.user.access_token!}
            item={item}
            key={item.id}
          />
        ))}
      </div>

      <Link className="go_back_link" href={"/"} passHref target="_top">
        Voltar
      </Link>
      <br />
    </main>
  );
}
