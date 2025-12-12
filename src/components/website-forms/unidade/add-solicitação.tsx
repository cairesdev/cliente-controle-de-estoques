"use client";
import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { novaSolicitacao } from "./action";

export default function FormSolicitacao({ idUnidade }: { idUnidade: string }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      NOME: form.get("NOME"),
      UNIDADE: idUnidade,
    };

    novaSolicitacao(payload);
  };
  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Nome</label>
        <input
          type="text"
          name="NOME"
          placeholder="Nome identificador"
          required
        />
      </div>
      <Button htmlType="submit" rounded>
        Próximo
      </Button>
      <Button type="alternative" rounded>
        Cancelar
      </Button>
    </form>
  );
}
