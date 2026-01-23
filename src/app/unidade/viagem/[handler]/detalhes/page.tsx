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

  return (
    <main className={styles.container}>
      {/* HEADER */}
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

      {/* DADOS PRINCIPAIS */}
      <section className={styles.grid}>
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

      {/* MOTIVO */}
      <section className={styles.motivo}>
        <FaRoute />
        <p>{viagem?.motivo}</p>
      </section>

      {/* RESPONSÁVEIS */}
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
    </main>
  );
}
