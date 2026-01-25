import { EntidadeRepository } from "@/services/getters/entidade";
import { transformData } from "@/utils";
import styles from "@/styles/components/detalhe_solicitacao_viagem.module.css";
import {
  FaCarSide,
  FaUser,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";

export default async function DetalheSolicitacaoViagemPage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;
  const entidadeRepository = await EntidadeRepository.create();

  const solicitacao = await entidadeRepository.getDetalheSolicitacao({
    id: handler as string,
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.submenus}>
          <Link className={styles.voltar} href={"/"} target="_top">
            Voltar
          </Link>
        </div>
        <FaUser />

        <div>
          <h1>{solicitacao?.resumo}</h1>
          <span>{solicitacao?.responsavel}</span>
        </div>
      </header>

      <section className={styles.grid}>
        <div className={styles.card}>
          <FaCarSide />
          <div>
            <strong>Veículo: </strong>
            <span>
              {solicitacao?.veiculo} - {solicitacao?.placa}
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <FaCalendarAlt />
          <div>
            <strong>Telefone: </strong>
            <span>{solicitacao?.telefone_responsavel}</span>
          </div>
        </div>
        <div className={styles.card}>
          <FaCalendarAlt />
          <div>
            <strong>Data da desejada: </strong>
            <span>{transformData(solicitacao?.data_viagem!)}</span>
          </div>
        </div>
      </section>

      <section className={styles.motivo}>
        <FaClipboardList />
        <p>{solicitacao?.motivo}</p>
      </section>
      <Link
        className={styles.voltar}
        href={`/unidade/viagem/liberar/${solicitacao?.id}`}
      >
        Liberar Solicitação
      </Link>
    </main>
  );
}
