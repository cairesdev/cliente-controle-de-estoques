import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/sample/resumo_viagem.module.css";
import { transformData } from "@/utils";
import Link from "next/link";
import {
  FaCarSide,
  FaRoute,
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaTachometerAlt,
} from "react-icons/fa";

function calcularDuracao(inicio?: string, fim?: string) {
  if (!inicio || !fim) return null;

  const start = new Date(inicio).getTime();
  const end = new Date(fim).getTime();

  if (end <= start) return null;

  const diffMs = end - start;

  const totalMinutos = Math.floor(diffMs / (1000 * 60));

  const dias = Math.floor(totalMinutos / (60 * 24));
  const horas = Math.floor((totalMinutos % (60 * 24)) / 60);
  const minutos = totalMinutos % 60;

  let resultado = "";

  if (dias > 0) resultado += `${dias}d `;
  if (horas > 0 || dias > 0) resultado += `${horas}h `;
  resultado += `${minutos}min`;

  return resultado.trim();
}

export default async function ResumoViagem({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;
  const entidadeRepository = await EntidadeRepository.create();

  const viagem = await entidadeRepository.getViagemDetalhe({
    id: handler as string,
  });

  const kmRodado =
    viagem?.km_final && viagem?.km_inicial
      ? (viagem?.km_final as any) - viagem.km_inicial
      : null;

  const duracao = calcularDuracao(viagem?.saida, viagem?.chegada!);

  return (
    <main className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <Link className={styles.concluir} href={`/`}>
          Concluir
        </Link>
        <FaCarSide />
        <div>
          <h1>{viagem?.placa}</h1>
          <span>{viagem?.veiculo}</span>
        </div>

        <span
          className={`${styles.status} ${
            viagem?.chegada ? styles.finalizada : styles.andamento
          }`}
        >
          {viagem?.chegada ? "Finalizada" : "Em andamento"}
        </span>
      </header>

      {/* KPIs */}
      <section className={styles.kpis}>
        <div className={styles.kpi}>
          <FaTachometerAlt />
          <div>
            <strong>{kmRodado ?? "--"} km</strong>
            <span> Rodados</span>
          </div>
        </div>

        <div className={styles.kpi}>
          <FaClock />
          <div>
            <strong>{duracao ?? "--"}</strong>
            <span> Duração</span>
          </div>
        </div>
      </section>

      {/* DADOS */}
      <section className={styles.grid}>
        <div className={styles.card}>
          <strong>Saída</strong>
          <span>{transformData(viagem?.saida!)}</span>
        </div>

        <div className={styles.card}>
          <strong>Chegada</strong>
          <span>{viagem?.chegada ? transformData(viagem?.chegada) : "—"}</span>
        </div>

        <div className={styles.card}>
          <strong>KM Inicial</strong>
          <span>{viagem?.km_inicial}</span>
        </div>

        <div className={styles.card}>
          <strong>KM Final</strong>
          <span>{viagem?.km_final ?? "—"}</span>
        </div>
      </section>

      {/* MOTIVO */}
      <section className={styles.motivo}>
        <FaRoute />
        <p>{viagem?.motivo}</p>
      </section>

      {/* INFO */}
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
