"use client";
import styles from "@/styles/components/item_estoque.module.css";
import { TipoVisualizacao } from "@/constants/type-guard";
import { DeleteItem } from "../action-buttons";
import { Estoque } from "@/types/entidade";
import { transformData } from "@/utils";
import Link from "next/link";

export default function ItemArmazem({
  item,
  tipo = "SIMPLES",
  token,
  tipoEstoque,
}: {
  item: Estoque;
  tipo?: "GERENCIAVEL" | "SIMPLES";
  token?: string;
  tipoEstoque: "unidade" | "entidade";
}) {
  return (
    <div className={styles.card}>
      <Link
        href={`/${tipoEstoque}/resumo/${item.id}?code=${item.codigo}&tipo=${TipoVisualizacao.DETALHAR}`}
      >
        <h2 className={styles.nome}>
          {item.nome_remessa}
          <p>Codigo: {item.codigo}</p>
        </h2>
      </Link>
      <div className={styles.info_row}>
        <div>
          <p className={styles.label}>Tipo</p>
          <b className={styles.valor}>{item.tipo_estoque}</b>
        </div>
        <div>
          <p className={styles.label}>Registrado em</p>
          <b className={styles.valor}>{transformData(item.data_entrada)}</b>
        </div>
      </div>

      <div>
        {tipo === "GERENCIAVEL" && <DeleteItem token={token!} id={item.id} />}
      </div>
    </div>
  );
}
