"use client";
import styles from "@/styles/components/forms.module.css";
import { Button } from "@/components/UI/button";
import React, { useState } from "react";
import { updateUsuarioBasics } from "./action";
import { GoBackButton } from "@/components/action-buttons";
import { TipoUsuario } from "@/constants/type-guard";

export default function UpdateInformacoesUsuario({ user }: { user: string }) {
  const [nivelUsuario, setNivelUsiario] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      USER: user,
      NOME: form.get("NOME"),
      DESCRICAO: form.get("DESCRICAO"),
      NIVEL: nivelUsuario,
    };

    updateUsuarioBasics(data);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.formulario_interno}>
      <div className={styles.input_container}>
        <label>Nome do usuário</label>
        <input type="text" name="NOME" placeholder="Nome completo" required />
      </div>
      <div className={styles.input_container}>
        <label>Cargo</label>
        <input
          type="text"
          name="DESCRICAO"
          placeholder="Cargo ocupado"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>Nivel de usuário</label>
        <select
          id="NIVEL"
          name="NIVEL"
          required
          onChange={(e) => {
            setNivelUsiario(parseInt(e.target.value));
          }}
        >
          {TipoUsuario.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="div_buttons">
        <Button htmlType="submit" rounded>
          Atualizar
        </Button>
        <GoBackButton />
      </div>
    </form>
  );
}
