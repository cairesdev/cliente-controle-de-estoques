"use client";
import { Button } from "@/components/UI/button";
import { CategoriaItens } from "@/constants/type-guard";
import styles from "@/styles/components/forms.module.css";
import { criarArmazenamento } from "./action";
import { useRouter } from "next/navigation";

export default function AdicionarRemessaForm({
  entidade,
}: {
  entidade: string;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      NOME: form.get("NOME"),
      LOCAL_ESTOCADO: form.get("LOCAL_ESTOCADO"),
      DATA_ENTRADA: form.get("DATA_ENTRADA"),
      TIPO_ESTOQUE: form.get("TIPO_ESTOQUE"),
      PLAN_TIPO: form.get("TIPO_ADICAO"),
      ENTIDADE: entidade,
    };

    criarArmazenamento(payload);
  };

  const router = useRouter();

  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Titulo da remessa</label>
        <input
          type="text"
          name="NOME"
          placeholder="Digite o titulo da remessa"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>Local de armazenagem</label>
        <input
          type="text"
          name="LOCAL_ESTOCADO"
          placeholder="Depósito, galpão, etc..."
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>Data de armazenagem</label>
        <input type="date" name="DATA_ENTRADA" required />
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

      <div className={styles.checkbox_container}>
        <input id="PLAN_TIPO" type="radio" name="TIPO_ADICAO" value="1" />
        <label htmlFor="PLAN_TIPO">Adicionar através de planilha</label>
      </div>

      <div className={styles.checkbox_container}>
        <input id="MANUAL_TIPO" type="radio" name="TIPO_ADICAO" value="0" />
        <label htmlFor="MANUAL_TIPO">Inserir manualmente</label>
      </div>
      <Button rounded htmlType="submit">
        Próximo
      </Button>
      <Button
        rounded
        type="danger"
        onClick={() => router.replace(`/entidade/${entidade}/almoxarifado`)}
      >
        Cancelar
      </Button>
    </form>
  );
}
