import styles from "@/styles/components/commons.module.css";
import { LuShieldCheck, LuShieldX } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa";
import { ItemBasic } from "@/types/entidade";
import Link from "next/link";

export default function ItemSimples({
  item,
  tipo,
}: {
  item: ItemBasic;
  tipo: "entidade" | "unidade";
}) {
  const ativo = item.status === 1;

  return (
    <Link
      className={styles.item_simples}
      href={`/${tipo}/${item.id}/almoxarifado`}
    >
      <span
        className={`${styles.statusIcon} ${
          ativo ? styles.ativo : styles.inativo
        }`}
      >
        {ativo ? <LuShieldCheck /> : <LuShieldX />}
      </span>

      <p className={styles.nome}>{item.nome}</p>

      <FaAngleRight className={styles.arrow} />
    </Link>
  );
}
