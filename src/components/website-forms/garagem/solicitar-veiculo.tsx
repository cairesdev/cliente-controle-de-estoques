"use client";

import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { useRouter } from "next/navigation";
import { addSolicitacaoViagem } from "./action";
import { toast } from "react-toastify";
import { Veiculo } from "@/types/entidade";

export default function SolicitarVeiculoForm({
  veiculos,
  idUnidade,
}: {
  veiculos: Veiculo[];
  idUnidade: string;
}) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      RESPONSAVEL: String(form.get("RESPONSAVEL")).toUpperCase(),
      MOTIVO: String(form.get("MOTIVO")).toUpperCase(),
      DATA_VIAGEM: form.get("DATA"),
      ID_VEICULO: form.get("VEICULO"),
      TELEFONE_RESPONSAVEL: form.get("TELEFONE_RESPONSAVEL"),
      RESUMO: form.get("RESUMO"),
      UNIDADE: idUnidade,
    };

    const isOk = await addSolicitacaoViagem(payload);
    if (isOk) {
      toast.success("Solicitado com sucesso.");
      router.push(`/`);
    } else {
      toast.warn("Tente novamente.");
    }
  };
  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
      <div className={styles.input_container}>
        <label>Solicitante</label>
        <input
          type="text"
          name="RESPONSAVEL"
          placeholder="Digite o nome da pessoa solicitante"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>Telefone para contato</label>
        <input
          type="text"
          name="TELEFONE_RESPONSAVEL"
          placeholder="Digite numero para contato"
          required
        />
      </div>

      <div className={styles.input_container}>
        <label>Data desejada</label>
        <input type="datetime-local" name="DATA" required />
      </div>
      <div className={styles.input_container}>
        <label>Veiculo desejado</label>
        <select id="VEICULO" name="VEICULO">
          {veiculos.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome} - {item.status}
            </option>
          ))}
        </select>
      </div>
      <div className="ghost_traco" />
      <div className={styles.input_container}>
        <label>Resumo</label>
        <input
          type="text"
          name="RESUMO"
          placeholder="Razão da solicitação"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>Motivo da Viagem</label>
        <textarea
          name="MOTIVO"
          placeholder="Razão da solicitação"
          maxLength={255}
        />
      </div>
      <Button htmlType="submit" rounded>
        Solicitar Veiculo
      </Button>
      <Button rounded type="danger" onClick={() => router.back()}>
        Cancelar
      </Button>
    </form>
  );
}
