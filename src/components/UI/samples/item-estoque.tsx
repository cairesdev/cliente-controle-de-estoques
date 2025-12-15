import { Estoque } from "@/types/entidade";
import { transformData } from "@/utils";
import styles from "@/styles/sample/item.module.css";
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
      <p>Código: {item.codigo}</p>
      <h4>{item.nome_remessa}</h4>
      {item.local_estocado && <h4>Local: {item.local_estocado}</h4>}
      <p>Categoria: {item.tipo_estoque}</p>
      <p>Registrado em: {transformData(item.data_entrada)}</p>
    </Link>
  );
}
