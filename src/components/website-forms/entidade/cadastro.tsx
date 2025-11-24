"use client";
import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import React from "react";
import addEntidade from "./action";
import { useRouter } from "next/navigation";

export default function FormEntidade() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      NOME: form.get("NOME"),
      EMAIL: form.get("EMAIL"),
      TELEFONE: form.get("TELEFONE"),
      ENDERECO: form.get("ENDERECO"),
      BAIRRO: form.get("BAIRRO"),
      CIDADE: form.get("CIDADE"),
    };

    addEntidade(data);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.formulario}>
      <div className={styles.input_container}>
        <label>Nome</label>
        <input
          type="text"
          name="NOME"
          placeholder="Digite o nome da entidade"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>E-mail</label>
        <input type="email" name="EMAIL" placeholder="Digite o e-mail" />
      </div>
      <div className={styles.input_container}>
        <label>Telefone</label>
        <input type="text" name="TELEFONE" placeholder="Digite o telefone" />
      </div>
      <div className={styles.input_container}>
        <label>Endereço</label>
        <input type="text" name="ENDERECO" placeholder="Digite o endereço" />
      </div>
      <div className={styles.input_container}>
        <label>Bairro</label>
        <input type="text" name="BAIRRO" placeholder="Digite o bairro" />
      </div>
      <div className={styles.input_container}>
        <label>Cidade</label>
        <input
          type="text"
          name="CIDADE"
          placeholder="Digite a cidade"
          required
        />
      </div>
      <Button htmlType="submit" rounded>
        Cadastrar
      </Button>
      <Button
        htmlType="button"
        rounded
        type="alternative"
        onClick={() => router.push("/")}
      >
        Cancelar
      </Button>
    </form>
  );
}
