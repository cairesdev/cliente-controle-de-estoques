"use client";
import { Produto } from "@/types/entidade";
import styles from "@/styles/components/forms.module.css";
import { Button } from "@/components/UI/button";
import { adicionarProduto } from "./action";
import { useRouter } from "next/navigation";

export default function FormByItemProduto({
  produtos,
  idRemessa,
}: {
  produtos: Produto[];
  idRemessa: string;
}) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      PRODUTO: form.get("PRODUTO"),
      QUANTIDADE: form.get("QUANTIDADE"),
      DATA_VALIDADE: form.get("DATA_VALIDADE"),
      REMESSA: idRemessa,
    };

    const isAdd = await adicionarProduto(payload);
    if (isAdd) {
      router.refresh();
    } else {
      alert("Algo deu errado!");
    }
  };

  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Selecione o produto</label>
        <select id="PRODUTO" name="PRODUTO">
          {produtos.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome} - {item.und_medida}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.input_container}>
        <label>Quantidade</label>
        <input
          type="number"
          name="QUANTIDADE"
          placeholder="Quantidade disponivel"
          required
          min={0}
        />
      </div>
      <div className={styles.input_container}>
        <label>Data de validade</label>
        <input type="date" name="DATA_VALIDADE" required />
      </div>

      <Button rounded htmlType="submit">
        Adicionar
      </Button>
    </form>
  );
}
