"use client";

import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { useRouter } from "next/navigation";
import { concluirViagem } from "./action";
import { toast } from "react-toastify";

export default function ConcluirViagemForm({ idViagem }: { idViagem: string }) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      CHEGADA: form.get("CHEGADA"),
      DATA: form.get("DATA"),
      VIAGEM: idViagem,
    };

    const isOk = await concluirViagem(payload);
    if (isOk) {
      toast.success("Concluido com sucesso.");
      router.push(`/unidade/viagem/${idViagem}/resumo`);
    } else {
      toast.warn("Tente novamente.");
    }
  };
  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Qual a quilometragem do veiculo atual?</label>
        <input type="number" name="CHEGADA" placeholder="1000" required />
      </div>

      <div className={styles.input_container}>
        <label>Qual a data e hora de chegada?</label>
        <input type="datetime-local" name="DATA" required />
      </div>

      <Button htmlType="submit" rounded>
        Concluir Viagem
      </Button>
      <Button rounded type="danger" onClick={() => router.back()}>
        Cancelar
      </Button>
    </form>
  );
}
