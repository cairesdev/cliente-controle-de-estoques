"use client";
import { useEffect, useState } from "react";
import { LiberaProduto } from "@/types/commons";
import { transformData } from "@/utils";
import styles from "@/styles/components/forms.module.css";
import styles2 from "@/styles/components/item_pedido.module.css";
import { Button } from "@/components/UI/button";

export default function LiberaSolicitacao({
  item,
  unId,
  solicitacao,
}: {
  solicitacao: string;
  item: LiberaProduto[];
  unId: string;
}) {
  const [retiradas, setRetiradas] = useState<
    { id: string; qnt_liberada: number; id_estoque_origem: string }[]
  >([]);

  useEffect(() => {
    const inicial = item.flatMap((prod) =>
      prod.disponiveis.map((dis) => ({
        id: dis.id,
        qnt_liberada: prod.qnt_solicitada,
        id_estoque_origem: dis.id_estoque_origem,
      }))
    );
    setRetiradas(inicial);
  }, [item]);

  const handleChange = (id: string, value: number) => {
    setRetiradas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, qnt_liberada: value } : r))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      RETIRADAS: retiradas,
      DESTINATARIO: unId,
      SOLICITACAO: solicitacao,
    };

    console.log("ENVIANDO: ", payload);
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      {item.map((produto) => (
        <section key={produto.id} className={styles2.cardItem}>
          <h3>{produto.nome}</h3>
          <p className={styles2.label}>
            Solicitado:{" "}
            <strong>
              {produto.qnt_solicitada}
              {produto.und_medida}
            </strong>
          </p>

          {produto.disponiveis.map((dis) => (
            <div className={styles2.box} key={dis.id}>
              <div className={styles.styles2}>
                <p>
                  Disponível:{" "}
                  <strong>
                    {dis.qnt_disponivel}
                    {"  "}
                    {produto.und_medida}
                  </strong>
                </p>
                <p>Validade: {transformData(dis.data_validade)}</p>
              </div>
              <br />
              <div className={styles.input_container}>
                <label>Quantidade a liberar</label>
                <input
                  type="number"
                  min={1}
                  defaultValue={produto.qnt_solicitada}
                  max={dis.qnt_disponivel}
                  onChange={(e) => handleChange(dis.id, Number(e.target.value))}
                  required
                />
              </div>
            </div>
          ))}
        </section>
      ))}

      <Button htmlType="submit" type="primary" rounded>
        Concluir
      </Button>
    </form>
  );
}
