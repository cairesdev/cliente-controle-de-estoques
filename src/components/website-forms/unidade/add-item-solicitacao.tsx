"use client";
import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { Produto } from "@/types/entidade";
import { adicionarItensSolicitacao } from "./action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function FormItemSolicitacao({
  idSolicitacao,
  produtos,
  idUnidade,
}: {
  idSolicitacao: string;
  idUnidade: string;
  produtos: Produto[];
}) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      PRODUTO: form.get("PRODUTO"),
      QNT_SOLICITADA: form.get("QNT_SOLICITADA"),
      SOLICITACAO: idSolicitacao,
      UNIDADE: idUnidade,
    };

    const isAdd = await adicionarItensSolicitacao(payload);
    if (isAdd) {
      router.refresh();
      toast.success("Item adicionado com sucesso!");
    } else {
      alert("Algo deu errado!");
    }
  };

  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Selecione o produto</label>
        <select id="PRODUTO" name="PRODUTO">
          {produtos.map((item, i) => (
            <option key={item.id} value={item.id}>
              {item.nome} - Disponíveis {item.qnt_disponivel}
              {item.und_medida}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.input_container}>
        <label>Quantidade</label>
        <input
          type="number"
          name="QNT_SOLICITADA"
          placeholder="Quantidade necessária"
          required
          min={0}
        />
      </div>
      <Button htmlType="submit" rounded>
        Adicionar
      </Button>
    </form>
  );
}
