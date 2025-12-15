"use client";
import { useRouter } from "next/navigation";
import { addTipo } from "./action";
import styles from "@/styles/components/forms.module.css";
import { Button } from "@/components/UI/button";
import { toast } from "react-toastify";

export default function NovoTipoForm({
  tipo,
}: {
  tipo: "unidade" | "estoque";
}) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      NOME: form.get("NOME"),
      TIPO: tipo,
    };

    const isOk = await addTipo(payload);
    if (isOk) {
      toast.success("Cadastrado com sucesso.");
      router.push(`/configuracoes/gerenciamento-de-listas`);
    } else {
      toast.warn("Tente novamente.");
    }
  };
  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Nome</label>
        <input type="text" name="NOME" placeholder="Digite o nome" required />
      </div>
      <Button htmlType="submit" rounded>
        Cadastrar
      </Button>
      <Button
        rounded
        type="danger"
        onClick={() => router.push(`/configuracoes/gerenciamento-de-listas`)}
      >
        Cancelar
      </Button>
    </form>
  );
}
