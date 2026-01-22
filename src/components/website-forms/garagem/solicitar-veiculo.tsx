"use client";

import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { useRouter } from "next/navigation";
import { addVeiculo } from "./action";
import { toast } from "react-toastify";
import { Veiculo } from "@/types/entidade";

export default function SolicitarVeiculoForm({
  veiculos,
}: {
  veiculos: Veiculo[];
}) {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      NOME: String(form.get("NOME")).toUpperCase(),
      MARCA: String(form.get("MARCA")).toUpperCase(),
      MODELO: String(form.get("MODELO")).toUpperCase(),
      PLACA: String(form.get("PLACA")).toUpperCase(),
      COR: String(form.get("COR")).toUpperCase(),
    };

    const isOk = await addVeiculo(payload);
    if (isOk) {
      toast.success("Cadastrado com sucesso.");
      router.push(`/catalogo-de-veiculos`);
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
        <label>Motivo da viagem</label>
        <input
          type="text"
          name="MOTIVO"
          placeholder="Razão da solicitação"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>Nivel de usuário</label>
        <select id="NIVEL" name="NIVEL">
          {veiculos.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>
      </div>
      <Button htmlType="submit" rounded>
        Cadastrar
      </Button>
      <Button
        rounded
        type="danger"
        onClick={() => router.push(`/catalogo-de-veiculos`)}
      >
        Cancelar
      </Button>
    </form>
  );
}
