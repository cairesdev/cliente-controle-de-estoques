"use client";

import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { useRouter } from "next/navigation";
import { liberarViagem } from "./action";
import { toast } from "react-toastify";
import { Veiculo } from "@/types/entidade";

export default function LiberarVeiculoForm({
  veiculos,
  idUnidade,
  idSolicitacao,
}: {
  veiculos: Veiculo[];
  idUnidade: string;
  idSolicitacao: string;
}) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      ID_VEICULO: form.get("VEICULO"),
      DATA: form.get("DATA"),
      UNIDADE: idUnidade,
      SOLICITACAO: idSolicitacao,
    };

    const isOk = await liberarViagem(payload);
    if (isOk) {
      toast.success("Liberado com sucesso.");
      router.push(`/`);
    } else {
      toast.warn("Tente novamente.");
    }
  };
  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Disponivel para retirada</label>
        <input type="datetime-local" name="DATA" required />
      </div>

      <div className={styles.input_container}>
        <label>Veiculo liberado</label>
        <select id="VEICULO" name="VEICULO">
          {veiculos.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome} - {item.status}
            </option>
          ))}
        </select>
      </div>
      <Button htmlType="submit" rounded>
        Liberar
      </Button>
      <Button rounded type="danger" onClick={() => router.back()}>
        Cancelar
      </Button>
    </form>
  );
}
