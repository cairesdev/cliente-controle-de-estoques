import { EntidadeRepository } from "@/services/getters/entidade";
import { transformData } from "@/utils";
import styles from "@/styles/components/detalhe_solicitacao_viagem.module.css";
import {
  FaCalendarAlt,
  FaCarSide,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
import LiberarVeiculoForm from "@/components/website-forms/garagem/liberar-veiculo";

export default async function LiberarSolicitacaoViagemPage({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;
  const entidadeRepository = await EntidadeRepository.create();

  const solicitacao = await entidadeRepository.getDetalheSolicitacao({
    id: handler as string,
  });

  const veiculos = await entidadeRepository.getListaVeiculos();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
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
            <strong>Veículo solicitado: </strong>
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

      <div className="ghost_traco" />
      <LiberarVeiculoForm
        idSolicitacao={handler!}
        idUnidade={solicitacao?.id_unidade!}
        veiculos={veiculos?.filter((v) => v.status != "INDISPONIVEL")!}
      />
    </main>
  );
}
