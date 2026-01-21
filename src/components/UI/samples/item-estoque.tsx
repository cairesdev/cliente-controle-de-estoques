import { Estoque } from "@/types/entidade";
import { transformData } from "@/utils";
import styles from "@/styles/sample/item_estoque.module.css";
import Link from "next/link";
import { TipoVisualizacao } from "@/constants/type-guard";

export default function ItemEstoque({
  item,
  tipo,
}: {
  item: Estoque;
  tipo: "entidade" | "unidade";
}) {
  return (
    <Link
      href={`/${tipo}/resumo/${item.id}?code=${item.codigo}&tipo=${TipoVisualizacao.DETALHAR}`}
      target="_top"
      className={styles.item_estoque}
    >
      <div className={styles.codigo}>
        <span>{item.codigo}</span>
      </div>

      <div className={styles.info}>
        <p className={styles.nome}>{item.nome_remessa}</p>

        <div className={styles.meta}>
          {item.local_estocado && <span>Local: {item.local_estocado}</span>}
          <span>Categoria: {item.tipo_estoque}</span>
          <span>{transformData(item.data_entrada)}</span>
        </div>
      </div>
    </Link>
  );
}
