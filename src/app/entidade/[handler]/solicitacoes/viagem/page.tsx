import ItemSolicitacaoViagem from "@/components/UI/samples/item-solicitacao-viagem";
import { EntidadeRepository } from "@/services/getters/entidade";
import styles from "@/styles/components/frota.module.css";
import Link from "next/link";
import { MdDirectionsCarFilled, MdTravelExplore } from "react-icons/md";

export default async function SolicitacoesViagem({
  params,
}: {
  params: Promise<{ handler: string | undefined }>;
}) {
  const { handler } = await params;

  const entidadeRepository = await EntidadeRepository.create();
  const solicitacoes = await entidadeRepository.getAllSolicitacoes();

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <MdTravelExplore />
          Solicitações de Viagem
        </h1>
        <div className="ghost_traco" />

        <div className={styles.submenus}>
          <Link className={styles.voltar} href={"/"} target="_top">
            Voltar
          </Link>
        </div>
      </div>

      <div className={styles.lista_veiculos}>
        {solicitacoes?.map((item) => (
          <ItemSolicitacaoViagem key={item.id} item={item} />
        ))}
        {solicitacoes?.length === 0 && (
          <p className={styles.empty}>Nenhum veículo cadastrado.</p>
        )}
      </div>
    </main>
  );
}
