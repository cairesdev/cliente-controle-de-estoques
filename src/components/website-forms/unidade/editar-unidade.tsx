"use client";
import { Button } from "@/components/UI/button";
import styles from "@/styles/components/forms.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import { ItemBasic, UnidadeDetalhe } from "@/types/entidade";
import { editarUnidade } from "./action";

export default function FormUnidadeEditar({
  data,
  idUnidade,
  tiposUnidade,
}: {
  idUnidade: string;
  data: UnidadeDetalhe;
  tiposUnidade: ItemBasic[];
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
      TIPO_UNIDADE: form.get("TIPO_UNIDADE"),
      ID: idUnidade,
    };

    editarUnidade(data);
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
        <label>Tipo de unidade</label>
        <select
          defaultValue={data.id_tipo_unidade}
          id="TIPO_UNIDADE"
          name="TIPO_UNIDADE"
        >
          {tiposUnidade.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>
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
      <div className={styles.checkbox_container}>
        <input
          id="STATUS_1"
          type="radio"
          name="STATUS"
          value="1"
          defaultChecked={data.status === 1}
        />
        <label htmlFor="STATUS_1">Unidade ativa</label>
      </div>

      <div className={styles.checkbox_container}>
        <input
          id="STATUS_0"
          type="radio"
          name="STATUS"
          value="0"
          defaultChecked={data.status === 0}
        />
        <label htmlFor="STATUS_0">Unidade Inativa</label>
      </div>
      <Button htmlType="submit" rounded>
        Atualizar
      </Button>
      <Button
        htmlType="button"
        rounded
        type="alternative"
        onClick={() => router.push(`/entidade/${idUnidade}/almoxarifado`)}
      >
        Cancelar
      </Button>
    </form>
  );
}
