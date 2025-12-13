"use client";
import styles from "@/styles/components/forms.module.css";
import { Button } from "@/components/UI/button";
import { addModulos } from "./action";
import React from "react";

export default function FormModulo({ idEntidade }: { idEntidade: string }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      ENTIDADE: idEntidade,
      ESCOLAR: parseInt(form.get("ESCOLAR") as string) || 0,
      SAUDE: parseInt(form.get("SAUDE") as string) || 0,
      ASSISTENCIA_SOCIAL:
        parseInt(form.get("ASSISTENCIA_SOCIAL") as string) || 0,
      OUTROS: parseInt(form.get("OUTROS") as string) || 0,
    };

    addModulos(data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formulario_interno}>
      <div className={styles.checkbox_container}>
        <input id="alimentacao" type="checkbox" name="ESCOLAR" value="1" />
        <label htmlFor="alimentacao">Alimentação Escolar</label>
      </div>

      <div className={styles.checkbox_container}>
        <input id="hospitais" type="checkbox" name="SAUDE" value="1" />
        <label htmlFor="hospitais">Hospitais & UBS</label>
      </div>

      <div className={styles.checkbox_container}>
        <input
          id="assistencia"
          type="checkbox"
          name="ASSISTENCIA_SOCIAL"
          value="1"
        />
        <label htmlFor="assistencia">Assistência Social</label>
      </div>

      <div className={styles.checkbox_container}>
        <input id="outros" type="checkbox" name="OUTROS" value="1" />
        <label htmlFor="outros">Outros</label>
      </div>

      <Button htmlType="submit" rounded>
        Finalizar
      </Button>
    </form>
  );
}
