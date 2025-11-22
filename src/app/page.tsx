import { EntidadeRepository } from "@/services/getters/entidade";
import SessionExpiration from "@/components/session-expiration";
import ItemSimples from "@/components/UI/item-simples";
import { LogOutButton } from "@/components/UI/button";
import styles from "@/styles/homepage.module.css";
import { tituloPagina } from "@/utils";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  const entidadeRepository = await EntidadeRepository.create();
  const data = await entidadeRepository.getEntidades();

  return (
    <main className={styles.homepage}>
      <div>
        <h1>
          {tituloPagina(
            parseInt(session?.user.nivel!),
            session?.user.entidade_nome!,
            session?.user.unidade_nome!
          )}
        </h1>
        <p>
          {session?.user.nome} - {session?.user.descricao}
        </p>
      </div>

      <h2 className={styles.titulo_sessao}>Entidades Registradas</h2>

      <div className={styles.lista_entidades}>
        {data?.map((item) => (
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
