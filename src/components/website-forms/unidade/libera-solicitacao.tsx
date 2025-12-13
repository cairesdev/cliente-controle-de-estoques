"use client";
import { useMemo, useState, useEffect } from "react";
import { LiberaProduto } from "@/types/commons";
import { transformData } from "@/utils";
import styles from "@/styles/components/forms.module.css";
import styles2 from "@/styles/components/item_pedido.module.css";
import { Button } from "@/components/UI/button";
import { liberaDemanda } from "./action";

export default function LiberaSolicitacao({
  item,
  unId,
  solicitacao,
  trackId,
}: {
  solicitacao: string;
  item: LiberaProduto[];
  unId: string;
  trackId: string;
}) {
  const retiradasIniciais = useMemo(() => {
    return item.flatMap((prod) => {
      let restante = prod.qnt_solicitada;

      return prod.disponiveis.map((dis) => {
        const retirar = Math.min(restante, dis.qnt_disponivel);
        restante -= retirar;

        return {
          id: dis.id,
          qnt_liberada: retirar,
          id_estoque_origem: dis.id_estoque_origem,
        };
      });
    });
  }, [item]);

  const [retiradas, setRetiradas] = useState(retiradasIniciais);

  useEffect(() => {
    setRetiradas(retiradasIniciais);
  }, [retiradasIniciais]);

  const handleChange = (id: string, value: number, produto: LiberaProduto) => {
    setRetiradas((prev) => {
      const listaProduto = prev.filter((r) =>
        produto.disponiveis.some((d) => d.id === r.id)
      );

      const totalAtual = listaProduto.reduce(
        (acc, r) => acc + (r.id === id ? value : r.qnt_liberada),
        0
      );

      if (totalAtual > produto.qnt_solicitada) return prev;

      return prev.map((r) => (r.id === id ? { ...r, qnt_liberada: value } : r));
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      RETIRADAS: retiradas.filter((r) => r.qnt_liberada > 0),
      DESTINATARIO: unId,
      SOLICITACAO: solicitacao,
      ENTIDADE: trackId,
    };

    liberaDemanda(payload);
  };

  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
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
          {produto.disponiveis.length === 0 && (
            <p>Não há disponivel no estoque.</p>
          )}

          {produto.disponiveis.map((dis) => {
            const retirada = retiradas.find((r) => r.id === dis.id);

            return (
              <div className={styles2.box} key={dis.id}>
                <div>
                  <p>
                    Disponível:{" "}
                    <strong>
                      {dis.qnt_disponivel} {produto.und_medida}
                    </strong>
                  </p>
                  <p>Validade: {transformData(dis.data_validade)}</p>
                </div>

                <div className={styles.input_container}>
                  <label>Quantidade a liberar</label>

                  <input
                    type="number"
                    min={0}
                    max={dis.qnt_disponivel}
                    value={retirada?.qnt_liberada || 0}
                    onChange={(e) =>
                      handleChange(dis.id, Number(e.target.value), produto)
                    }
                  />
                </div>
              </div>
            );
          })}
        </section>
      ))}

      <Button type="primary" htmlType="submit" rounded>
        Concluir
      </Button>
    </form>
  );
}
