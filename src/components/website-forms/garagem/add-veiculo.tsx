"use client";

import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import { useRouter } from "next/navigation";
import { addVeiculo } from "./action";
import { toast } from "react-toastify";

export default function NovoVeiculoForm() {
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
        <label>Nome</label>
        <input type="text" name="NOME" placeholder="Digite o nome" required />
      </div>
      <div className={styles.input_container}>
        <label>Marca</label>
        <input type="text" name="MARCA" placeholder="Fabricante" required />
      </div>
      <div className={styles.input_container}>
        <label>Modelo</label>
        <input
          type="text"
          name="MODELO"
          placeholder="Digite o modelo"
          required
        />
      </div>

      <div className={styles.input_container}>
        <label>Cor</label>
        <input
          className={styles.color_input}
          type="color"
          name="COR"
          placeholder="Cor do veiculo"
          required
        />
      </div>

      <div className={styles.input_container}>
        <label>Placa</label>
        <input
          type="text"
          name="PLACA"
          placeholder="Digite a placa do veiculo"
          required
        />
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
