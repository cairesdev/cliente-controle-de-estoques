import { Viagem } from "@/types/entidade";
import styles from "@/styles/sample/item_viagem.module.css";
import { FaCarSide, FaRoute, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { transformData } from "@/utils";

export default function ItemViagem({ item }: { item: Viagem }) {
  return (
    <div className={styles.container}>
      <div className={styles.placa}>
        <FaCarSide size={14} />
        <span>{item.placa}</span>
      </div>
      <div className={styles.km}>
        <FaRoute />
        <span>
          {item.km_inicial} km → {item.km_final ?? "?"} km
        </span>
      </div>

      <p className={styles.motivo}>{item.motivo}</p>
      <div className={styles.info}>
        <span>
          <FaMapMarkerAlt />
          {item.unidade}
        </span>
        <span>
          <FaUser />
          Responsável: {item.responsavel}
        </span>
        <span>Motorista: {item.motorista}</span>
      </div>
      <div className={styles.datas}>
        <span>Saída: {transformData(item.saida)}</span>
        {item.chegada && <span>Chegada: {transformData(item.chegada)}</span>}
      </div>
    </div>
  );
}
