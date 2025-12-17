"use client";
import styles from "@/styles/components/forms.module.css";
import { Button } from "@/components/UI/button";
import React from "react";
import { updateUsuario } from "./action";

export default function UpdatePassForm({ user }: { user: string }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      USER: user,
      SENHA_CHECK: form.get("SENHA_CHECK"),
      SENHA: form.get("SENHA"),
    };

    updateUsuario(data);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.formulario_interno}>
      <div className={styles.input_container}>
        <label>Senha</label>
        <input type="password" name="SENHA" placeholder="*******" required />
      </div>
      <div className={styles.input_container}>
        <label>Repita a senha</label>
        <input
          type="password"
          name="SENHA_CHECK"
          placeholder="*******"
          required
        />
      </div>
      <Button htmlType="submit" rounded>
        Cadastrar
      </Button>
    </form>
  );
}
