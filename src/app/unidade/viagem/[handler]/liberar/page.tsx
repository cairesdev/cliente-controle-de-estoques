import IniciarViagemForm from "@/components/website-forms/garagem/iniciar-veiagem";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/components/viagem.module.css";
import { transformData } from "@/utils";
import Link from "next/link";
import { FaCarSide, FaRoute } from "react-icons/fa";

export default async function LiberarViagemPage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;
  const entidadeRepository = await EntidadeRepository.create();

  const viagem = await entidadeRepository.getViagemDetalhe({
    id: handler as string,
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link className="go_back_link" href={"/"} passHref target="_top">
          Voltar
        </Link>
        <FaCarSide />
        <div>
          <h1>{viagem?.placa}</h1>
          <span>{viagem?.veiculo}</span>
        </div>
      </header>

      <section className={styles.motivo}>
        <FaRoute />
        <p>{viagem?.motivo}</p>
      </section>

      <IniciarViagemForm idViagem={handler!} />
    </main>
  );
}
