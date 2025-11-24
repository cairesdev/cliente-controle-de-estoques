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
  return (
    <Link className={styles.item_simples} href={`/${tipo}/${item.id}`}>
      <span>
        {item.status === 1 ? (
          <LuShieldCheck className="icon" color="green" />
        ) : (
          <LuShieldX className="icon" color="red" />
        )}
      </span>
      <p>{item.nome}</p>
      <FaAngleRight color="6c7072" />
    </Link>
  );
}
