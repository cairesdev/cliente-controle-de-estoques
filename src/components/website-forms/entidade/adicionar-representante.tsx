"use client";
import { ItemBasic } from "@/types/entidade";
import styles from "@/styles/components/forms.module.css";
import { Button } from "@/components/UI/button";
import { novoRepresentante } from "./action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NovoRepresentante({
  unidades,
  entidade,
  niveisAutorizados,
}: {
  unidades: ItemBasic[];
  entidade: string;
  niveisAutorizados: { id: number; nome: string }[];
}) {
  const [nivelUsuario, setNivelUsiario] = useState<number>(2);

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      NOME: form.get("NOME"),
      DESCRICAO: form.get("DESCRICAO"),
      LOGIN: form.get("LOGIN"),
      SENHA_CHECK: form.get("SENHA_CHECK"),
      SENHA: form.get("SENHA"),
      UNIDADE: form.get("UNIDADE"),
      NIVEL: form.get("NIVEL"),
      TIPO_ALMOXARIFE: form.get("TIPO_ALMOXARIFE"),
      ORGAO: entidade,
    };

    novoRepresentante(payload);
  };
  return (
    <form className={styles.formulario_interno} onSubmit={handleSubmit}>
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
          {niveisAutorizados.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>
      </div>
      {nivelUsuario === 1 && (
        <div className={styles.input_container}>
          <label>Unidade Responsável</label>
          <select id="UNIDADE" name="UNIDADE">
            {unidades.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>
      )}
      {nivelUsuario === 2 && (
        <div className={styles.input_container}>
          <label>Tipo de Almoxarifado</label>
          <select id="TIPO_ALMOXARIFE" name="TIPO_ALMOXARIFE" required>
            <option value={1}>Unidades Escolares</option>
            <option value={99}>Unidades de Saúde</option>
            <option value={255}>Controle Veicular</option>
          </select>
        </div>
      )}
      <h2>Informações de login</h2>
      <div className="ghost_bar" />

      <div className={styles.input_container}>
        <label>Usuário</label>
        <input
          type="text"
          name="LOGIN"
          placeholder="ex: joaodasilva ou joao@mail.com"
          required
        />
      </div>
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
      <Button
        rounded
        type="danger"
        onClick={() => router.replace(`/entidade/${entidade}/almoxarifado`)}
      >
        Cancelar
      </Button>
    </form>
  );
}
