"use client";

import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { useRouter } from "next/navigation";
import { iniciarViagem } from "./action";
import { toast } from "react-toastify";

export default function IniciarViagemForm({ idViagem }: { idViagem: string }) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      KM_INICIAL: form.get("KM_INICIAL"),
      MOTORISTA: form.get("MOTORISTA"),
      VIAGEM: idViagem,
    };

    const isOk = await iniciarViagem(payload);
    if (isOk) {
      toast.success("Iniciado com sucesso.");
      router.push(`/`);
    } else {
      toast.warn("Tente novamente.");
    }
  };
  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>KM atual do veículo</label>
        <input
          type="number"
          name="KM_INICIAL"
          placeholder="1000KM"
          required
          min={0}
        />
      </div>
      <div className={styles.input_container}>
        <label>Motorista</label>
        <input
          type="text"
          name="MOTORISTA"
          placeholder="Motorista designado"
          required
        />
      </div>
      <Button htmlType="submit" rounded>
        Iniciar Viagem
      </Button>
      <Button rounded type="danger" onClick={() => router.back()}>
        Cancelar
      </Button>
    </form>
  );
}
