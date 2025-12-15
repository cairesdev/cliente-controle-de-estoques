"use client";
import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import React from "react";
import { updateEntidae } from "./action";
import { useRouter } from "next/navigation";
import { EntidadeDetalhe } from "@/types/entidade";

export default function FormEntidadeEditar({
  data,
  idEntidae,
}: {
  idEntidae: string;
  data: EntidadeDetalhe;
}) {
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
      STATUS: form.get("STATUS"),
      CIDADE: form.get("CIDADE"),
      ID: idEntidae,
    };

    updateEntidae(data);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.formulario_interno}>
      <div className={styles.input_container}>
        <label>Nome</label>
        <input
          type="text"
          name="NOME"
          placeholder="Digite o nome da entidade"
          required
          defaultValue={data.nome}
        />
      </div>
      <div className={styles.input_container}>
        <label>E-mail</label>
        <input
          type="email"
          name="EMAIL"
          placeholder="Digite o e-mail"
          defaultValue={data.email}
        />
      </div>
      <div className={styles.input_container}>
        <label>Telefone</label>
        <input
          type="text"
          name="TELEFONE"
          placeholder="Digite o telefone"
          defaultValue={data.telefone}
        />
      </div>
      <div className={styles.input_container}>
        <label>Endereço</label>
        <input
          type="text"
          name="ENDERECO"
          placeholder="Digite o endereço"
          defaultValue={data.endereco}
        />
      </div>
      <div className={styles.input_container}>
        <label>Bairro</label>
        <input
          type="text"
          name="BAIRRO"
          placeholder="Digite o bairro"
          defaultValue={data.bairro}
        />
      </div>
      <div className={styles.input_container}>
        <label>Cidade</label>
        <input
          type="text"
          name="CIDADE"
          placeholder="Digite a cidade"
          defaultValue={data.cidade}
        />
      </div>

      <div className={styles.checkbox_container}>
        <input
          id="STATUS_1"
          type="radio"
          name="STATUS"
          value="1"
          defaultChecked={data.status === 1}
        />
        <label htmlFor="STATUS_1">Entidade ativa</label>
      </div>

      <div className={styles.checkbox_container}>
        <input
          id="STATUS_0"
          type="radio"
          name="STATUS"
          value="0"
          defaultChecked={data.status === 0}
        />
        <label htmlFor="STATUS_0">Entidade Inativa</label>
      </div>
      <Button htmlType="submit" rounded>
        Atualizar
      </Button>
      <Button
        htmlType="button"
        rounded
        type="alternative"
        onClick={() => router.push(`/entidade/${idEntidae}/almoxarifado`)}
      >
        Cancelar
      </Button>
    </form>
  );
}
