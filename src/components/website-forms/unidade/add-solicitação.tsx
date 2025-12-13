"use client";
import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { novaSolicitacao } from "./action";
import { useRouter } from "next/navigation";
import { CategoriaItens } from "@/constants/type-guard";

export default function FormSolicitacao({ idUnidade }: { idUnidade: string }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      NOME: form.get("NOME"),
      TIPO_ESTOQUE: form.get("TIPO_ESTOQUE"),
      UNIDADE: idUnidade,
    };

    novaSolicitacao(payload);
  };
  const router = useRouter();
  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Nome</label>
        <input
          type="text"
          name="NOME"
          placeholder="Nome identificador"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>Categoria dos Itens</label>
        <select id="TIPO_ESTOQUE" name="TIPO_ESTOQUE" required>
          {CategoriaItens.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>
      </div>
      <Button htmlType="submit" rounded>
        Próximo
      </Button>
      <Button
        type="danger"
        rounded
        onClick={() => router.push(`/unidade/${idUnidade}/almoxarifado`)}
      >
        Cancelar
      </Button>
    </form>
  );
}
