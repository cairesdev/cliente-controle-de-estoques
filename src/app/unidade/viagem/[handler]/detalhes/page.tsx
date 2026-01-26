import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/components/viagem.module.css";
import { transformData } from "@/utils";
import Link from "next/link";
import { FaCarSide, FaRoute, FaUser, FaMapMarkerAlt } from "react-icons/fa";

export default async function DetalheViagemPage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;
  const entidadeRepository = await EntidadeRepository.create();

  const viagem = await entidadeRepository.getViagemDetalhe({
    id: handler as string,
  });

  const agora = new Date();
  const dataLiberacao = viagem?.liberacao ? new Date(viagem.liberacao) : null;

  const podeAntecipar =
    viagem?.saida === null && dataLiberacao !== null && agora < dataLiberacao;

  const podeIniciar =
    viagem?.saida === null && dataLiberacao !== null && agora >= dataLiberacao;

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

      <section className={styles.grid}>
        <div className={styles.card}>
          <strong>Disponivel para retirada</strong>
          <span>{transformData(viagem?.liberacao!)}</span>
        </div>
        <div className={styles.card}>
          <strong>Saída</strong>
          <span>{transformData(viagem?.saida!)}</span>
        </div>

        <div className={styles.card}>
          <strong>Chegada</strong>
          <span>{transformData(viagem?.chegada!)}</span>
        </div>

        <div className={styles.card}>
          <strong>KM Inicial</strong>
          <span>{viagem?.km_inicial}</span>
        </div>

        <div className={styles.card}>
          <strong>KM Final</strong>
          <span>{viagem?.km_final}</span>
        </div>
      </section>

      <section className={styles.motivo}>
        <FaRoute />
        <p>{viagem?.motivo}</p>
      </section>

      <section className={styles.info}>
        <div>
          <FaUser />
          <span>Motorista: {viagem?.motorista}</span>
        </div>
        <div>
          <FaUser />
          <span>Responsável: {viagem?.responsavel}</span>
        </div>
        <div>
          <FaMapMarkerAlt />
          <span>Unidade: {viagem?.unidade}</span>
        </div>
      </section>
      {/* CONCLUIR VIAGEM */}
      {viagem?.saida !== null && !viagem?.chegada && (
        <Link
          className="go_back_link"
          href={`/unidade/viagem/${viagem?.id}/concluir`}
          passHref
          target="_top"
        >
          Concluir Viagem
        </Link>
      )}

      {/* ANTECIPAR VIAGEM */}
      {podeAntecipar && (
        <Link
          className={`${styles.action} ${styles.antecipar}`}
          href={`/unidade/viagem/${viagem?.id}/liberar?modo=antecipar`}
          passHref
          target="_top"
        >
          Antecipar Viagem
        </Link>
      )}

      {/* INICIAR VIAGEM */}
      {podeIniciar && (
        <Link
          className={`${styles.action} ${styles.iniciar}`}
          href={`/unidade/viagem/${viagem?.id}/liberar`}
          passHref
          target="_top"
        >
          Iniciar Viagem
        </Link>
      )}
    </main>
  );
}
