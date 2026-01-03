import { transformData } from "@/utils";
import styles from "@/styles/components/detalhe_solicitacao.module.css";
import { ProdutoSolicitacao } from "@/types/commons";

export default function ItemSolicitacao({
  item,
  tipo,
}: {
  item: ProdutoSolicitacao;
  tipo: "comprovante" | "lista";
}) {
  return (
    <div className={styles.item_solicitacao}>
      <div>
        <h4>{item.nome}</h4>
        <p>
          Solicitado: {item.qnt_solicitada} {item.und_medida}
        </p>
      </div>
      {tipo !== "comprovante" &&
        item.disponiveis &&
        item.disponiveis.map((disp) => (
          <div key={disp.id}>
            <p>
              Disponível na unidade: {disp.qnt_disponivel}
              {disp.und_medida}
            </p>
            <p>Recebido em: {transformData(disp.data_entrada)}</p>
            <p>Validade: {transformData(disp.data_validade)}</p>
          </div>
        ))}
    </div>
  );
}
