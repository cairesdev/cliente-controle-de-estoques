"use client";
import { CategoriaUnidade } from "@/constants/type-guard";
import styles from "@/styles/components/forms.module.css";
import { Button } from "@/components/UI/button";
import { useRouter } from "next/navigation";
import React from "react";
import { adicionarUnidade } from "./action";
import { ItemBasic } from "@/types/entidade";

export default function FormUnidade({
  idEntidade,
  tiposUnidade,
}: {
  idEntidade: string;
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
      TIPO_UNIDADE: form.get("TIPO_UNIDADE"),
      ENTIDADE: idEntidade,
    };

    adicionarUnidade(data);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.formulario_interno}>
      <div className={styles.input_container}>
        <label>Nome</label>
        <input
          type="text"
          name="NOME"
          placeholder="Digite o nome da unidade"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label>Tipo de unidade</label>
        <select id="TIPO_UNIDADE" name="TIPO_UNIDADE">
          {tiposUnidade.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>
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
      <Button htmlType="submit" rounded>
        Cadastrar
      </Button>
      <Button
        htmlType="button"
        rounded
        type="danger"
        onClick={() => router.replace(`/entidade/${idEntidade}/almoxarifado`)}
      >
        Cancelar
      </Button>
    </form>
  );
}
