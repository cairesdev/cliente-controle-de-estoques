"use client";

import { SITE_URL } from "@/constants/enverioments";
import styles from "@/styles/components/representante_login.module.css";
import Link from "next/link";
import { BsPersonFill } from "react-icons/bs";
import { useState } from "react";
import { GoToHomeButton } from "../action-buttons";
import { Button } from "./button";

export default function RepresentanteItem({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);

  const accessLink = `${SITE_URL}log-in?username=${username}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accessLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erro ao copiar o link", error);
    }
  };

  return (
    <main className={styles.homepage}>
      <div className={styles.header_section}>
        <h1>
          <BsPersonFill /> Usuario registrado com sucesso!
        </h1>
        <p>Cadastre um usuario para exercer funções.</p>
      </div>

      <div className="ghost_traco" />

      <h2>Usuário: {username}</h2>

      <Link href={accessLink}>
        <p>Acessar via este usuario</p>
      </Link>

      <Button onClick={handleCopy}>
        {copied ? "Copiado!" : "Copiar link"}
      </Button>
      <GoToHomeButton />
    </main>
  );
}
