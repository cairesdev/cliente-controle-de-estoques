import SessionExpiration from "@/components/session-expiration";
import styles from "@/styles/homepage.module.css";
import { auth } from "@/auth";
import { tituloPagina } from "@/utils";
import { EntidadeRepository } from "@/services/getters/entidade";

export default async function Home() {
  const session = await auth();

  const entidadeRepository = await EntidadeRepository.create();
  const data = await entidadeRepository.getUnidades();

  return (
    <main className={styles.homepage}>
      <h1>
        {tituloPagina(
          parseInt(session?.user.nivel!),
          session?.user.entidade_nome!,
          session?.user.unidade_nome!
        )}
      </h1>
      {/* <SessionExpiration /> */}
      <p>
        {session?.user.nome} - {session?.user.descricao}
      </p>
    </main>
  );
}
